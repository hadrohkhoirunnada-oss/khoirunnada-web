"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp, getFirebaseAuth } from "@/lib/firebase";

const KRU_VOCALIS_COLLECTION = "kruVocalisMembers";

const ALLOWED_STATUSES = ["pending", "approved", "rejected", "inactive"];

function getDb() {
  return getFirestore(firebaseApp);
}

function cleanText(value) {
  return String(value || "").trim();
}

function getAdminEmail() {
  const auth = getFirebaseAuth();

  return cleanText(auth?.currentUser?.email || "");
}

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

function normalizeKruVocalisMember(documentSnapshot) {
  const data = documentSnapshot.data() || {};

  return {
    id: String(documentSnapshot.id),
    uid: String(data.uid || documentSnapshot.id),
    name: String(data.name || "Kru/Vocalis Khoirunnada"),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    photoURL: String(data.photoURL || ""),
    mainRole: String(data.mainRole || ""),
    roles: Array.isArray(data.roles) ? data.roles.map(String) : [],
    status: String(data.status || "pending"),
    approvalNote: String(data.approvalNote || ""),
    source: String(data.source || ""),
    approvedBy: String(data.approvedBy || ""),
    rejectedBy: String(data.rejectedBy || ""),
    inactiveBy: String(data.inactiveBy || ""),
    statusChangedBy: String(data.statusChangedBy || ""),
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt),
    approvedAt: serializeTimestamp(data.approvedAt),
    rejectedAt: serializeTimestamp(data.rejectedAt),
    inactiveAt: serializeTimestamp(data.inactiveAt),
    statusChangedAt: serializeTimestamp(data.statusChangedAt),
    createdAtMillis: getTimestampValue(data.createdAt),
    updatedAtMillis: getTimestampValue(data.updatedAt),
  };
}

function sortMembers(a, b) {
  const statusWeight = {
    pending: 1,
    approved: 2,
    inactive: 3,
    rejected: 4,
  };

  const weightA = statusWeight[a.status] || 99;
  const weightB = statusWeight[b.status] || 99;

  if (weightA !== weightB) {
    return weightA - weightB;
  }

  return Number(b.createdAtMillis || 0) - Number(a.createdAtMillis || 0);
}

export async function getKruVocalisMembers() {
  try {
    const db = getDb();
    const membersQuery = query(
      collection(db, KRU_VOCALIS_COLLECTION),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(membersQuery);

    return snapshot.docs.map(normalizeKruVocalisMember).sort(sortMembers);
  } catch (error) {
    console.error("Gagal memuat data Kru/Vocalis:", error);
    throw new Error(error?.message || "Gagal memuat data Kru/Vocalis.");
  }
}

export async function updateKruVocalisMemberStatus({
  memberId,
  status,
  approvalNote = "",
}) {
  const cleanMemberId = cleanText(memberId);
  const cleanStatus = cleanText(status).toLowerCase();
  const cleanApprovalNote = cleanText(approvalNote);
  const adminEmail = getAdminEmail();
  const now = Date.now();

  if (!cleanMemberId) {
    throw new Error("ID anggota tidak valid.");
  }

  if (!ALLOWED_STATUSES.includes(cleanStatus)) {
    throw new Error("Status anggota tidak valid.");
  }

  const db = getDb();

  const payload = {
    status: cleanStatus,
    approvalNote: cleanApprovalNote,
    updatedAt: serverTimestamp(),
    statusChangedAt: serverTimestamp(),
    statusChangedBy: adminEmail,
  };

  if (cleanStatus === "approved") {
    payload.approvedAt = serverTimestamp();
    payload.approvedBy = adminEmail;
  }

  if (cleanStatus === "rejected") {
    payload.rejectedAt = serverTimestamp();
    payload.rejectedBy = adminEmail;
  }

  if (cleanStatus === "inactive") {
    payload.inactiveAt = serverTimestamp();
    payload.inactiveBy = adminEmail;
  }

  await updateDoc(doc(db, KRU_VOCALIS_COLLECTION, cleanMemberId), payload);

  return {
    id: cleanMemberId,
    status: cleanStatus,
    approvalNote: cleanApprovalNote,
    updatedAt: new Date(now).toISOString(),
    updatedAtMillis: now,
    statusChangedAt: new Date(now).toISOString(),
    statusChangedBy: adminEmail,
    ...(cleanStatus === "approved"
      ? {
          approvedAt: new Date(now).toISOString(),
          approvedBy: adminEmail,
        }
      : {}),
    ...(cleanStatus === "rejected"
      ? {
          rejectedAt: new Date(now).toISOString(),
          rejectedBy: adminEmail,
        }
      : {}),
    ...(cleanStatus === "inactive"
      ? {
          inactiveAt: new Date(now).toISOString(),
          inactiveBy: adminEmail,
        }
      : {}),
  };
}

export async function deleteKruVocalisMemberAccess(memberId) {
  const cleanMemberId = cleanText(memberId);

  if (!cleanMemberId) {
    throw new Error("ID anggota tidak valid.");
  }

  const db = getDb();

  await deleteDoc(doc(db, KRU_VOCALIS_COLLECTION, cleanMemberId));

  return {
    id: cleanMemberId,
    deleted: true,
  };
}