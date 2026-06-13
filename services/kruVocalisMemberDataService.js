"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getKruVocalisFirebaseAuth,
  getKruVocalisFirebaseDb,
} from "@/lib/firebase";

const KRU_VOCALIS_COLLECTION = "kruVocalisMembers";
const NOTES_SUBCOLLECTION = "notes";
const FAVORITES_SUBCOLLECTION = "favorites";

export const KRU_NOTE_CATEGORIES = [
  "Umum",
  "Nada",
  "Irama",
  "Tugas",
  "Latihan",
  "Majelis",
];

export const KRU_FAVORITE_TYPES = {
  QOSIDAH: "qosidah",
  WIRID: "wirid",
  MAULID: "maulid",
};

function getDb() {
  const db = getKruVocalisFirebaseDb();

  if (!db) {
    throw new Error(
      "Firestore Kru/Vocalis hanya bisa digunakan di sisi browser."
    );
  }

  return db;
}

function getAuth() {
  const auth = getKruVocalisFirebaseAuth();

  if (!auth) {
    throw new Error(
      "Firebase Auth Kru/Vocalis hanya bisa digunakan di browser."
    );
  }

  return auth;
}

function cleanText(value = "") {
  return String(value || "").trim();
}

function getTimestampMillis(value) {
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

function formatDateLabel(value) {
  const millis = getTimestampMillis(value);

  if (!millis) {
    return "Baru saja";
  }

  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(millis));
  } catch {
    return "Tersimpan";
  }
}

export function getCurrentKruVocalisUid() {
  const auth = getAuth();
  const uid = cleanText(auth.currentUser?.uid);

  if (!uid) {
    throw new Error("Kamu harus login sebagai Kru/Vocalis terlebih dahulu.");
  }

  return uid;
}

function getNotesCollectionRef(uid) {
  const db = getDb();

  return collection(db, KRU_VOCALIS_COLLECTION, uid, NOTES_SUBCOLLECTION);
}

function getFavoritesCollectionRef(uid) {
  const db = getDb();

  return collection(db, KRU_VOCALIS_COLLECTION, uid, FAVORITES_SUBCOLLECTION);
}

function normalizeNoteSnapshot(documentSnapshot) {
  const data = documentSnapshot.data() || {};

  return {
    id: String(documentSnapshot.id),
    title: String(data.title || ""),
    category: String(data.category || "Umum"),
    content: String(data.content || ""),
    isPinned: Boolean(data.isPinned),
    source: String(data.source || "firestore"),
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt),
    createdAtMillis: getTimestampMillis(data.createdAt),
    updatedAtMillis: getTimestampMillis(data.updatedAt),
    createdAtLabel: formatDateLabel(data.createdAt),
  };
}

function sortNotes(items = []) {
  return [...items].sort((firstItem, secondItem) => {
    if (firstItem.isPinned !== secondItem.isPinned) {
      return firstItem.isPinned ? -1 : 1;
    }

    return (
      Number(secondItem.createdAtMillis || 0) -
      Number(firstItem.createdAtMillis || 0)
    );
  });
}

function buildNotePayload(payload = {}) {
  const title = cleanText(payload.title);
  const content = cleanText(payload.content);
  const category = cleanText(payload.category) || "Umum";

  if (!title) {
    throw new Error("Judul catatan wajib diisi.");
  }

  if (!content) {
    throw new Error("Isi catatan wajib diisi.");
  }

  return {
    title,
    category: KRU_NOTE_CATEGORIES.includes(category) ? category : "Umum",
    content,
    isPinned: Boolean(payload.isPinned),
    source: "firestore",
    updatedAt: serverTimestamp(),
  };
}

export async function getKruVocalisNotes() {
  const uid = getCurrentKruVocalisUid();
  const notesRef = getNotesCollectionRef(uid);

  try {
    const notesQuery = query(notesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(notesQuery);

    const items = snapshot.docs.map(normalizeNoteSnapshot);

    return sortNotes(items);
  } catch (error) {
    console.error("Gagal memuat catatan Kru/Vocalis:", error);
    throw new Error(error?.message || "Gagal memuat catatan latihan.");
  }
}

export async function createKruVocalisNote(payload = {}) {
  const uid = getCurrentKruVocalisUid();
  const notesRef = getNotesCollectionRef(uid);
  const cleanPayload = buildNotePayload(payload);

  const documentReference = await addDoc(notesRef, {
    ...cleanPayload,
    createdAt: serverTimestamp(),
  });

  return {
    id: documentReference.id,
    ...cleanPayload,
    createdAt: "",
    updatedAt: "",
    createdAtMillis: Date.now(),
    updatedAtMillis: Date.now(),
    createdAtLabel: "Baru saja",
  };
}

export async function updateKruVocalisNote(noteId = "", payload = {}) {
  const uid = getCurrentKruVocalisUid();
  const cleanNoteId = cleanText(noteId);

  if (!cleanNoteId) {
    throw new Error("ID catatan tidak valid.");
  }

  const db = getDb();
  const cleanPayload = buildNotePayload(payload);

  await updateDoc(
    doc(db, KRU_VOCALIS_COLLECTION, uid, NOTES_SUBCOLLECTION, cleanNoteId),
    cleanPayload
  );

  return {
    id: cleanNoteId,
    ...cleanPayload,
    updatedAt: "",
    updatedAtMillis: Date.now(),
  };
}

export async function deleteKruVocalisNote(noteId = "") {
  const uid = getCurrentKruVocalisUid();
  const cleanNoteId = cleanText(noteId);

  if (!cleanNoteId) {
    throw new Error("ID catatan tidak valid.");
  }

  const db = getDb();

  await deleteDoc(
    doc(db, KRU_VOCALIS_COLLECTION, uid, NOTES_SUBCOLLECTION, cleanNoteId)
  );

  return {
    id: cleanNoteId,
    deleted: true,
  };
}

function normalizeFavoriteSnapshot(documentSnapshot) {
  const data = documentSnapshot.data() || {};

  return {
    id: String(documentSnapshot.id),
    type: String(data.type || ""),
    itemId: String(data.itemId || ""),
    slug: String(data.slug || ""),
    title: String(data.title || ""),
    category: String(data.category || ""),
    source: String(data.source || "firestore"),
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt),
    createdAtMillis: getTimestampMillis(data.createdAt),
    updatedAtMillis: getTimestampMillis(data.updatedAt),
    createdAtLabel: formatDateLabel(data.createdAt),
  };
}

function sortFavorites(items = []) {
  return [...items].sort((firstItem, secondItem) => {
    return (
      Number(secondItem.createdAtMillis || 0) -
      Number(firstItem.createdAtMillis || 0)
    );
  });
}

function buildFavoritePayload(payload = {}) {
  const type = cleanText(payload.type);
  const itemId = cleanText(payload.itemId);
  const slug = cleanText(payload.slug);
  const title = cleanText(payload.title);
  const category = cleanText(payload.category);

  const allowedTypes = Object.values(KRU_FAVORITE_TYPES);

  if (!allowedTypes.includes(type)) {
    throw new Error("Tipe favorit tidak valid.");
  }

  if (!title) {
    throw new Error("Judul favorit wajib diisi.");
  }

  return {
    type,
    itemId,
    slug,
    title,
    category,
    source: "firestore",
    updatedAt: serverTimestamp(),
  };
}

export async function getKruVocalisFavoritesByType(type = "") {
  const uid = getCurrentKruVocalisUid();
  const cleanType = cleanText(type);

  if (!cleanType) {
    return [];
  }

  const favoritesRef = getFavoritesCollectionRef(uid);
  const snapshot = await getDocs(favoritesRef);

  const items = snapshot.docs
    .map(normalizeFavoriteSnapshot)
    .filter((item) => item.type === cleanType);

  return sortFavorites(items);
}

export async function createKruVocalisFavorite(payload = {}) {
  const uid = getCurrentKruVocalisUid();
  const favoritesRef = getFavoritesCollectionRef(uid);
  const cleanPayload = buildFavoritePayload(payload);

  const existingFavorites = await getKruVocalisFavoritesByType(
    cleanPayload.type
  );

  const alreadyExists = existingFavorites.find((item) => {
    if (cleanPayload.slug && item.slug === cleanPayload.slug) {
      return true;
    }

    if (cleanPayload.itemId && item.itemId === cleanPayload.itemId) {
      return true;
    }

    return false;
  });

  if (alreadyExists) {
    return {
      ...alreadyExists,
      alreadyExists: true,
    };
  }

  const documentReference = await addDoc(favoritesRef, {
    ...cleanPayload,
    createdAt: serverTimestamp(),
  });

  return {
    id: documentReference.id,
    ...cleanPayload,
    createdAt: "",
    updatedAt: "",
    createdAtMillis: Date.now(),
    updatedAtMillis: Date.now(),
    createdAtLabel: "Baru saja",
    alreadyExists: false,
  };
}

export async function deleteKruVocalisFavorite(favoriteId = "") {
  const uid = getCurrentKruVocalisUid();
  const cleanFavoriteId = cleanText(favoriteId);

  if (!cleanFavoriteId) {
    throw new Error("ID favorit tidak valid.");
  }

  const db = getDb();

  await deleteDoc(
    doc(
      db,
      KRU_VOCALIS_COLLECTION,
      uid,
      FAVORITES_SUBCOLLECTION,
      cleanFavoriteId
    )
  );

  return {
    id: cleanFavoriteId,
    deleted: true,
  };
}

export async function getKruVocalisFavoriteForItem({
  type = "",
  itemId = "",
  slug = "",
} = {}) {
  const cleanType = cleanText(type);
  const cleanItemId = cleanText(itemId);
  const cleanSlug = cleanText(slug);

  if (!cleanType) {
    return null;
  }

  if (!cleanItemId && !cleanSlug) {
    return null;
  }

  const favorites = await getKruVocalisFavoritesByType(cleanType);

  return (
    favorites.find((item) => {
      if (cleanSlug && item.slug === cleanSlug) {
        return true;
      }

      if (cleanItemId && item.itemId === cleanItemId) {
        return true;
      }

      return false;
    }) || null
  );
}

export async function getKruVocalisFavoriteCounts() {
  const uid = getCurrentKruVocalisUid();
  const favoritesRef = getFavoritesCollectionRef(uid);
  const snapshot = await getDocs(favoritesRef);

  const counts = {
    qosidah: 0,
    wirid: 0,
    maulid: 0,
  };

  snapshot.docs.forEach((documentSnapshot) => {
    const item = normalizeFavoriteSnapshot(documentSnapshot);

    if (item.type === KRU_FAVORITE_TYPES.QOSIDAH) {
      counts.qosidah += 1;
    }

    if (item.type === KRU_FAVORITE_TYPES.WIRID) {
      counts.wirid += 1;
    }

    if (item.type === KRU_FAVORITE_TYPES.MAULID) {
      counts.maulid += 1;
    }
  });

  return counts;
}

export async function getKruVocalisDashboardCounts() {
  const [notes, favoriteCounts] = await Promise.all([
    getKruVocalisNotes(),
    getKruVocalisFavoriteCounts(),
  ]);

  return {
    notes: notes.length,
    favorites: favoriteCounts,
  };
}

function normalizeRoleList(roles = []) {
  if (!Array.isArray(roles)) {
    return [];
  }

  const normalizedRoles = roles
    .map((role) => cleanText(role))
    .filter(Boolean);

  return Array.from(new Set(normalizedRoles)).slice(0, 12);
}

function buildKruVocalisRolePayload(payload = {}) {
  const mainRole = cleanText(payload.mainRole);
  const roles = normalizeRoleList(payload.roles);

  if (!mainRole) {
    throw new Error("Role utama wajib dipilih.");
  }

  const mergedRoles = normalizeRoleList([mainRole, ...roles]);

  return {
    mainRole,
    roles: mergedRoles,
    updatedAt: serverTimestamp(),
  };
}

export async function updateKruVocalisRoles(payload = {}) {
  const uid = getCurrentKruVocalisUid();
  const db = getDb();
  const cleanPayload = buildKruVocalisRolePayload(payload);

  await updateDoc(doc(db, KRU_VOCALIS_COLLECTION, uid), cleanPayload);

  return {
    ...cleanPayload,
    updatedAt: "",
  };
}