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

const QASIDAH_COLLECTION = "qasidah";

export const QASIDAH_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const DEFAULT_QASIDAH_FORM_DATA = {
  title: "",
  slug: "",
  category: "",
  qasidahCategory: "",
  status: QASIDAH_STATUS.DRAFT,
  order: "",
  shortDescription: "",
  arabicText: "",
  latinText: "",
  translationText: "",
};

function normalizeEmail(value = "") {
  return String(value || "").trim().toLowerCase();
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

async function requireQasidahAdminAuth() {
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
    return error?.message || "Gagal mengakses database qasidah.";
  }

  return `Akses Firestore ditolak untuk email ${
    adminAuth?.email || "tidak terbaca"
  }. Pastikan email ini sudah terdaftar di Firestore Rules sebagai admin.`;
}

export function normalizeQasidahSlug(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createSlugFromTitle(title = "") {
  return normalizeQasidahSlug(title);
}

export function normalizeQasidahStatus(status = "") {
  if (status === QASIDAH_STATUS.PUBLISHED) {
    return QASIDAH_STATUS.PUBLISHED;
  }

  return QASIDAH_STATUS.DRAFT;
}

export function normalizeQasidahOrder(value = "") {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 1) {
    return 999;
  }

  return numberValue;
}

export function normalizeQasidahItem(item = {}, id = "") {
  return {
    id: item.id || id,
    title: item.title || "",
    slug: normalizeQasidahSlug(item.slug || item.title),
    category: item.category || "Qasidah",
    qasidahCategory: item.qasidahCategory || "qosidah-umum",
    status: normalizeQasidahStatus(item.status),
    order: normalizeQasidahOrder(item.order),
    shortDescription: item.shortDescription || item.description || "",
    arabicText: item.arabicText || "",
    latinText: item.latinText || "",
    translationText: item.translationText || "",
    source: item.source || "firestore",
    createdAt: item.createdAt || null,
    updatedAt: item.updatedAt || null,
  };
}

export function getStaticQasidahSlugs(items = []) {
  return items
    .map((item) => normalizeQasidahSlug(item?.slug || item?.title))
    .filter(Boolean);
}

export function isSlugReserved(slug = "", reservedSlugs = []) {
  const normalizedSlug = normalizeQasidahSlug(slug);

  return reservedSlugs
    .map((item) => normalizeQasidahSlug(item))
    .filter(Boolean)
    .includes(normalizedSlug);
}

function validateQasidahPayload(data = {}) {
  const title = data.title?.trim();
  const slug = normalizeQasidahSlug(data.slug || title);

  if (!title) {
    throw new Error("Judul qasidah wajib diisi.");
  }

  if (!slug) {
    throw new Error("Slug qasidah wajib diisi.");
  }

  return {
    title,
    slug,
  };
}

function buildQasidahPayload(data = {}) {
  const validated = validateQasidahPayload(data);

  return {
    title: validated.title,
    slug: validated.slug,
    category: data.category?.trim() || "Qasidah",
    qasidahCategory: data.qasidahCategory?.trim() || "qosidah-umum",
    status: normalizeQasidahStatus(data.status),
    order: normalizeQasidahOrder(data.order),
    shortDescription: data.shortDescription?.trim() || "",
    arabicText: data.arabicText?.trim() || "",
    latinText: data.latinText?.trim() || "",
    translationText: data.translationText?.trim() || "",
    source: "firestore",
    updatedAt: serverTimestamp(),
  };
}

function sortQasidahItems(items = []) {
  return [...items].sort((firstItem, secondItem) => {
    const firstOrder = normalizeQasidahOrder(firstItem.order);
    const secondOrder = normalizeQasidahOrder(secondItem.order);

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return String(firstItem.title || "").localeCompare(
      String(secondItem.title || ""),
      "id"
    );
  });
}

export async function getQasidahItems() {
  const db = getFirebaseDb();

  if (!db) {
    return [];
  }

  const snapshot = await getDocs(collection(db, QASIDAH_COLLECTION));

  const items = snapshot.docs.map((documentSnapshot) =>
    normalizeQasidahItem(documentSnapshot.data(), documentSnapshot.id)
  );

  return sortQasidahItems(items);
}

export async function getPublishedQasidahItems() {
  const db = getFirebaseDb();

  if (!db) {
    return [];
  }

  const qasidahQuery = query(
    collection(db, QASIDAH_COLLECTION),
    where("status", "==", QASIDAH_STATUS.PUBLISHED)
  );

  const snapshot = await getDocs(qasidahQuery);

  const items = snapshot.docs.map((documentSnapshot) =>
    normalizeQasidahItem(documentSnapshot.data(), documentSnapshot.id)
  );

  return sortQasidahItems(items);
}

export async function isQasidahSlugTaken(slug = "", ignoredId = "") {
  const db = getFirebaseDb();

  if (!db) {
    return false;
  }

  const normalizedSlug = normalizeQasidahSlug(slug);

  if (!normalizedSlug) {
    return false;
  }

  const qasidahQuery = query(
    collection(db, QASIDAH_COLLECTION),
    where("slug", "==", normalizedSlug)
  );

  const snapshot = await getDocs(qasidahQuery);

  return snapshot.docs.some((documentSnapshot) => {
    if (!ignoredId) {
      return true;
    }

    return documentSnapshot.id !== ignoredId;
  });
}

export async function createQasidahItem(data = {}, options = {}) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  const adminAuth = await requireQasidahAdminAuth();
  const payload = buildQasidahPayload(data);
  const reservedSlugs = options.reservedSlugs || [];

  if (isSlugReserved(payload.slug, reservedSlugs)) {
    throw new Error(
      `Slug "${payload.slug}" sudah digunakan di data file. Gunakan slug lain.`
    );
  }

  const slugAlreadyUsed = await isQasidahSlugTaken(payload.slug);

  if (slugAlreadyUsed) {
    throw new Error(`Slug "${payload.slug}" sudah terdaftar di database.`);
  }

  try {
    const documentRef = await addDoc(collection(db, QASIDAH_COLLECTION), {
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

export async function updateQasidahItem(id = "", data = {}, options = {}) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  if (!id) {
    throw new Error("ID qasidah tidak valid.");
  }

  const adminAuth = await requireQasidahAdminAuth();
  const payload = buildQasidahPayload(data);
  const reservedSlugs = options.reservedSlugs || [];

  if (isSlugReserved(payload.slug, reservedSlugs)) {
    throw new Error(
      `Slug "${payload.slug}" sudah digunakan di data file. Gunakan slug lain.`
    );
  }

  const slugAlreadyUsed = await isQasidahSlugTaken(payload.slug, id);

  if (slugAlreadyUsed) {
    throw new Error(`Slug "${payload.slug}" sudah terdaftar di database.`);
  }

  const documentRef = doc(db, QASIDAH_COLLECTION, id);

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

export async function deleteQasidahItem(id = "") {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  if (!id) {
    throw new Error("ID qasidah tidak valid.");
  }

  const adminAuth = await requireQasidahAdminAuth();

  try {
    await deleteDoc(doc(db, QASIDAH_COLLECTION, id));

    return id;
  } catch (error) {
    throw new Error(createPermissionErrorMessage(error, adminAuth));
  }
}