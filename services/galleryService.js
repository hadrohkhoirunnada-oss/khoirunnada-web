import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase";

const GALLERY_COLLECTION = "gallery";

function getTimestampValue(value) {
  if (!value) {
    return 0;
  }

  if (typeof value?.toMillis === "function") {
    return value.toMillis();
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  return 0;
}

function serializeTimestamp(value) {
  if (!value) {
    return "";
  }

  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return new Date(value).toISOString();
  }

  return "";
}

function normalizeGalleryItem(documentSnapshot) {
  const data = documentSnapshot.data() || {};

  const imageUrl = data.imageUrl || data.image || "";

  return {
    id: String(documentSnapshot.id),
    title: String(data.title || "Dokumentasi Khoirunnada"),
    category: String(data.category || "Dokumentasi"),
    description: String(
      data.description || "Dokumentasi kegiatan Khoirunnada Majelis Sholawat."
    ),
    imageUrl: String(imageUrl),
    image: String(imageUrl),
    imagePath: String(data.imagePath || ""),
    imageProvider: String(data.imageProvider || ""),
    imageOriginalName: String(data.imageOriginalName || ""),
    imageContentType: String(data.imageContentType || ""),
    imageSize: Number(data.imageSize || 0),
    isHighlight: Boolean(data.isHighlight),
    status: String(data.status || "published"),
    order:
      typeof data.order === "number"
        ? data.order
        : Number.parseInt(data.order || "9999", 10),
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt),
    createdAtMillis: getTimestampValue(data.createdAt),
    updatedAtMillis: getTimestampValue(data.updatedAt),
  };
}

function sortGalleryItems(a, b) {
  const orderA = Number.isFinite(a.order) ? a.order : 9999;
  const orderB = Number.isFinite(b.order) ? b.order : 9999;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return Number(b.createdAtMillis || 0) - Number(a.createdAtMillis || 0);
}

function getDb() {
  return getFirestore(firebaseApp);
}

export async function getGalleryItems() {
  try {
    const db = getDb();
    const snapshot = await getDocs(collection(db, GALLERY_COLLECTION));

    return snapshot.docs
      .map(normalizeGalleryItem)
      .filter((item) => {
        const status = String(item.status || "").toLowerCase();

        return !status || status === "published" || status === "active";
      })
      .sort(sortGalleryItems);
  } catch (error) {
    console.error("Gagal memuat data galeri dari Firestore:", error);
    return [];
  }
}

export async function createGalleryItem(payload) {
  const db = getDb();

  const cleanPayload = {
    title: String(payload?.title || "").trim(),
    category: String(payload?.category || "Dokumentasi").trim(),
    description: String(payload?.description || "").trim(),
    imageUrl: String(payload?.imageUrl || "").trim(),
    image: String(payload?.imageUrl || "").trim(),
    imagePath: String(payload?.imagePath || "").trim(),
    imageProvider: String(payload?.imageProvider || "").trim(),
    imageOriginalName: String(payload?.imageOriginalName || "").trim(),
    imageContentType: String(payload?.imageContentType || "").trim(),
    imageSize: Number(payload?.imageSize || 0),
    isHighlight: Boolean(payload?.isHighlight),
    status: String(payload?.status || "published").trim(),
    order: Number(payload?.order || 9999),
    source: "firestore",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const documentReference = await addDoc(
    collection(db, GALLERY_COLLECTION),
    cleanPayload
  );

  return {
    id: documentReference.id,
    ...cleanPayload,
  };
}

export async function updateGalleryItem(galleryId, payload) {
  const cleanGalleryId = String(galleryId || "").trim();

  if (!cleanGalleryId) {
    throw new Error("ID galeri tidak valid.");
  }

  const db = getDb();
  const now = Date.now();

  const cleanPayload = {
    title: String(payload?.title || "").trim(),
    category: String(payload?.category || "Dokumentasi").trim(),
    description: String(payload?.description || "").trim(),
    imageUrl: String(payload?.imageUrl || "").trim(),
    image: String(payload?.imageUrl || "").trim(),
    imagePath: String(payload?.imagePath || "").trim(),
    imageProvider: String(payload?.imageProvider || "").trim(),
    imageOriginalName: String(payload?.imageOriginalName || "").trim(),
    imageContentType: String(payload?.imageContentType || "").trim(),
    imageSize: Number(payload?.imageSize || 0),
    isHighlight: Boolean(payload?.isHighlight),
    status: String(payload?.status || "published").trim(),
    order: Number(payload?.order || 9999),
    source: "firestore",
    updatedAt: serverTimestamp(),
  };

  await updateDoc(doc(db, GALLERY_COLLECTION, cleanGalleryId), cleanPayload);

  return {
    id: cleanGalleryId,
    title: cleanPayload.title,
    category: cleanPayload.category,
    description: cleanPayload.description,
    imageUrl: cleanPayload.imageUrl,
    image: cleanPayload.image,
    imagePath: cleanPayload.imagePath,
    imageProvider: cleanPayload.imageProvider,
    imageOriginalName: cleanPayload.imageOriginalName,
    imageContentType: cleanPayload.imageContentType,
    imageSize: cleanPayload.imageSize,
    isHighlight: cleanPayload.isHighlight,
    status: cleanPayload.status,
    order: cleanPayload.order,
    source: cleanPayload.source,
    updatedAt: new Date(now).toISOString(),
    updatedAtMillis: now,
  };
}

export async function deleteGalleryItem(galleryId) {
  const cleanGalleryId = String(galleryId || "").trim();

  if (!cleanGalleryId) {
    throw new Error("ID galeri tidak valid.");
  }

  const db = getDb();

  await deleteDoc(doc(db, GALLERY_COLLECTION, cleanGalleryId));

  return {
    id: cleanGalleryId,
    deleted: true,
  };
}

export async function getItems() {
  return getGalleryItems();
}