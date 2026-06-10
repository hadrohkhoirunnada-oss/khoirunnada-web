"use client";

import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";

const SHOP_PRODUCTS_COLLECTION = "products";

export const SHOP_PRODUCT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  COMING_SOON: "coming-soon",
  SOLD_OUT: "sold-out",
};

export const DEFAULT_SHOP_PRODUCT_FORM_DATA = {
  title: "",
  category: "",
  status: SHOP_PRODUCT_STATUS.DRAFT,
  price: "",
  originalPrice: "",
  discount: "",
  stock: "",
  description: "",
  imageId: "",
  imageUrl: "",
  imageFilename: "",
  imageOriginalName: "",
  imageContentType: "",
  imageSize: 0,
};

function normalizeEmail(value = "") {
  return String(value || "").trim().toLowerCase();
}

function normalizeText(value = "") {
  return String(value || "").trim();
}

function waitForAuthUser(timeoutMs = 4000) {
  const auth = getFirebaseAuth();

  if (!auth) {
    return Promise.resolve(null);
  }

  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser);
  }

  return new Promise((resolve) => {
    let isSettled = false;
    let unsubscribe = () => {};

    const finish = (user) => {
      if (isSettled) {
        return;
      }

      isSettled = true;
      clearTimeout(timer);
      unsubscribe();
      resolve(user || auth.currentUser || null);
    };

    const timer = setTimeout(() => {
      finish(auth.currentUser);
    }, timeoutMs);

    unsubscribe = onAuthStateChanged(auth, (user) => {
      finish(user);
    });
  });
}

async function requireShopProductAdminAuth() {
  const user = await waitForAuthUser();
  const email = normalizeEmail(user?.email);

  if (!user) {
    throw new Error(
      "Sesi login admin belum terbaca. Silakan refresh halaman atau login ulang."
    );
  }

  if (!email) {
    throw new Error(
      "Email admin belum terbaca dari Firebase Auth. Silakan login ulang."
    );
  }

  await user.getIdToken(true);

  return {
    uid: user.uid,
    email,
  };
}

function createPermissionErrorMessage(error, adminAuth) {
  if (error?.code !== "permission-denied") {
    return error?.message || "Gagal mengakses database produk.";
  }

  return `Akses Firestore ditolak untuk email ${
    adminAuth?.email || "tidak terbaca"
  }. Pastikan email ini sudah terdaftar di Firestore Rules sebagai admin.`;
}

export function normalizeShopProductSlug(value = "") {
  return normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createShopProductSlugFromTitle(title = "") {
  return normalizeShopProductSlug(title);
}

export function normalizeShopProductStatus(status = "") {
  if (status === SHOP_PRODUCT_STATUS.PUBLISHED) {
    return SHOP_PRODUCT_STATUS.PUBLISHED;
  }

  if (status === SHOP_PRODUCT_STATUS.COMING_SOON) {
    return SHOP_PRODUCT_STATUS.COMING_SOON;
  }

  if (status === SHOP_PRODUCT_STATUS.SOLD_OUT) {
    return SHOP_PRODUCT_STATUS.SOLD_OUT;
  }

  return SHOP_PRODUCT_STATUS.DRAFT;
}

export function normalizeShopProductStock(value = "") {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 0) {
    return 0;
  }

  return numberValue;
}

export function normalizeShopProductItem(item = {}, id = "") {
  return {
    id: item.id || id,
    title: item.title || "",
    slug: normalizeShopProductSlug(item.slug || item.title),
    category: item.category || "Katalog",
    status: normalizeShopProductStatus(item.status),
    price: item.price || "",
    originalPrice: item.originalPrice || "",
    discount: item.discount || "",
    stock: normalizeShopProductStock(item.stock),
    description: item.description || "",
    imageId: item.imageId || "",
    imageUrl: item.imageUrl || "",
    imageFilename: item.imageFilename || "",
    imageOriginalName: item.imageOriginalName || "",
    imageContentType: item.imageContentType || "",
    imageSize: item.imageSize || 0,
    source: item.source || "firestore",
    createdAt: item.createdAt || null,
    updatedAt: item.updatedAt || null,
  };
}

function validateShopProductPayload(data = {}) {
  const title = normalizeText(data.title);
  const slug = normalizeShopProductSlug(data.slug || title);

  if (!title) {
    throw new Error("Nama produk wajib diisi.");
  }

  if (!slug) {
    throw new Error("Slug produk tidak valid.");
  }

  if (!normalizeText(data.category)) {
    throw new Error("Kategori produk wajib dipilih.");
  }

  return {
    title,
    slug,
  };
}

function buildShopProductPayload(data = {}) {
  const validated = validateShopProductPayload(data);

  return {
    title: validated.title,
    slug: validated.slug,
    category: normalizeText(data.category) || "Katalog",
    status: normalizeShopProductStatus(data.status),
    price: normalizeText(data.price),
    originalPrice: normalizeText(data.originalPrice),
    discount: normalizeText(data.discount),
    stock: normalizeShopProductStock(data.stock),
    description: normalizeText(data.description),
    imageId: normalizeText(data.imageId),
    imageUrl: normalizeText(data.imageUrl),
    imageFilename: normalizeText(data.imageFilename),
    imageOriginalName: normalizeText(data.imageOriginalName),
    imageContentType: normalizeText(data.imageContentType),
    imageSize: Number(data.imageSize) || 0,
    source: "firestore",
    updatedAt: serverTimestamp(),
  };
}

function sortShopProducts(items = []) {
  return [...items].sort((firstItem, secondItem) => {
    const firstCreatedAt =
      firstItem.createdAt?.toMillis?.() || firstItem.createdAt?.seconds || 0;
    const secondCreatedAt =
      secondItem.createdAt?.toMillis?.() || secondItem.createdAt?.seconds || 0;

    if (firstCreatedAt !== secondCreatedAt) {
      return secondCreatedAt - firstCreatedAt;
    }

    return String(firstItem.title || "").localeCompare(
      String(secondItem.title || ""),
      "id"
    );
  });
}

export async function getShopProducts() {
  const db = getFirebaseDb();

  if (!db) {
    return [];
  }

  const snapshot = await getDocs(collection(db, SHOP_PRODUCTS_COLLECTION));

  const items = snapshot.docs.map((documentSnapshot) =>
    normalizeShopProductItem(documentSnapshot.data(), documentSnapshot.id)
  );

  return sortShopProducts(items);
}

export async function getPublishedShopProducts() {
  const db = getFirebaseDb();

  if (!db) {
    return [];
  }

  const productsQuery = query(
    collection(db, SHOP_PRODUCTS_COLLECTION),
    where("status", "in", [
      SHOP_PRODUCT_STATUS.PUBLISHED,
      SHOP_PRODUCT_STATUS.COMING_SOON,
      SHOP_PRODUCT_STATUS.SOLD_OUT,
    ])
  );

  const snapshot = await getDocs(productsQuery);

  const items = snapshot.docs.map((documentSnapshot) =>
    normalizeShopProductItem(documentSnapshot.data(), documentSnapshot.id)
  );

  return sortShopProducts(items);
}

export async function isShopProductSlugTaken(slug = "", ignoredId = "") {
  const db = getFirebaseDb();

  if (!db) {
    return false;
  }

  const normalizedSlug = normalizeShopProductSlug(slug);

  if (!normalizedSlug) {
    return false;
  }

  const productsQuery = query(
    collection(db, SHOP_PRODUCTS_COLLECTION),
    where("slug", "==", normalizedSlug)
  );

  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.some((documentSnapshot) => {
    if (!ignoredId) {
      return true;
    }

    return documentSnapshot.id !== ignoredId;
  });
}

export async function createShopProduct(data = {}) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  const adminAuth = await requireShopProductAdminAuth();
  const payload = buildShopProductPayload(data);

  const slugAlreadyUsed = await isShopProductSlugTaken(payload.slug);

  if (slugAlreadyUsed) {
    throw new Error(`Slug "${payload.slug}" sudah terdaftar di database.`);
  }

  try {
    const documentRef = await addDoc(collection(db, SHOP_PRODUCTS_COLLECTION), {
      ...payload,
      createdAt: serverTimestamp(),
    });

    return {
      ...payload,
      id: documentRef.id,
    };
  } catch (error) {
    throw new Error(createPermissionErrorMessage(error, adminAuth));
  }
}

export async function updateShopProduct(id = "", data = {}) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  if (!id) {
    throw new Error("ID produk tidak valid.");
  }

  const adminAuth = await requireShopProductAdminAuth();
  const payload = buildShopProductPayload(data);

  const slugAlreadyUsed = await isShopProductSlugTaken(payload.slug, id);

  if (slugAlreadyUsed) {
    throw new Error(`Slug "${payload.slug}" sudah terdaftar di database.`);
  }

  const documentRef = doc(db, SHOP_PRODUCTS_COLLECTION, id);

  try {
    await setDoc(
      documentRef,
      {
        ...payload,
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    return {
      ...payload,
      id,
    };
  } catch (error) {
    throw new Error(createPermissionErrorMessage(error, adminAuth));
  }
}

export async function deleteShopProduct(id = "") {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  if (!id) {
    throw new Error("ID produk tidak valid.");
  }

  const adminAuth = await requireShopProductAdminAuth();

  try {
    await deleteDoc(doc(db, SHOP_PRODUCTS_COLLECTION, id));

    return id;
  } catch (error) {
    throw new Error(createPermissionErrorMessage(error, adminAuth));
  }
}