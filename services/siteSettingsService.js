"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

const SITE_SETTINGS_COLLECTION = "siteSettings";
const CONTACT_DOCUMENT_ID = "contact";

export const MAX_WHATSAPP_ADMINS = 5;

export const DEFAULT_SITE_CONTACT_SETTINGS = {
  adminName: "Admin Khoirunnada",
  whatsappNumber: "",
  whatsappLabel: "Booking Kami Disini",
  whatsappMessage:
    "Assalamu'alaikum, saya ingin bertanya tentang booking Khoirunnada.",
  whatsappAdmins: [],
};

export function normalizeWhatsappNumber(value = "") {
  const digitsOnly = String(value).replace(/[^\d]/g, "");

  if (!digitsOnly) {
    return "";
  }

  if (digitsOnly.startsWith("0")) {
    return `62${digitsOnly.slice(1)}`;
  }

  if (digitsOnly.startsWith("8")) {
    return `62${digitsOnly}`;
  }

  return digitsOnly;
}

export function getWhatsappUrl(number, message = "") {
  const normalizedNumber = normalizeWhatsappNumber(number);

  if (!normalizedNumber) {
    return "";
  }

  const encodedMessage = encodeURIComponent(message || "");

  return encodedMessage
    ? `https://wa.me/${normalizedNumber}?text=${encodedMessage}`
    : `https://wa.me/${normalizedNumber}`;
}

export function createWhatsappAdminId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `admin-${crypto.randomUUID()}`;
  }

  return `admin-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function normalizeWhatsappAdmin(admin = {}, index = 0) {
  const whatsappNumber = normalizeWhatsappNumber(admin.whatsappNumber);

  if (!whatsappNumber) {
    return null;
  }

  const name = admin.name?.trim() || `Admin ${index + 1}`;

  return {
    id: admin.id || `admin-${whatsappNumber}`,
    name,
    whatsappNumber,
    isActive: admin.isActive !== false,
  };
}

export function getDuplicateWhatsappNumber(admins = []) {
  const seenNumbers = new Set();

  for (const admin of admins) {
    const whatsappNumber = normalizeWhatsappNumber(admin?.whatsappNumber);

    if (!whatsappNumber) {
      continue;
    }

    if (seenNumbers.has(whatsappNumber)) {
      return whatsappNumber;
    }

    seenNumbers.add(whatsappNumber);
  }

  return "";
}

export function normalizeWhatsappAdmins(admins = [], legacySettings = {}) {
  const sourceAdmins = Array.isArray(admins) ? admins : [];
  const normalizedAdmins = [];
  const usedNumbers = new Set();

  sourceAdmins.forEach((admin, index) => {
    const normalizedAdmin = normalizeWhatsappAdmin(admin, index);

    if (!normalizedAdmin) {
      return;
    }

    if (usedNumbers.has(normalizedAdmin.whatsappNumber)) {
      return;
    }

    usedNumbers.add(normalizedAdmin.whatsappNumber);
    normalizedAdmins.push(normalizedAdmin);
  });

  const legacyNumber = normalizeWhatsappNumber(legacySettings.whatsappNumber);

  if (normalizedAdmins.length === 0 && legacyNumber) {
    normalizedAdmins.push({
      id: `admin-${legacyNumber}`,
      name:
        legacySettings.adminName?.trim() ||
        DEFAULT_SITE_CONTACT_SETTINGS.adminName,
      whatsappNumber: legacyNumber,
      isActive: true,
    });
  }

  return normalizedAdmins.slice(0, MAX_WHATSAPP_ADMINS);
}

export function getPrimaryWhatsappAdmin(settings = {}) {
  const admins = normalizeWhatsappAdmins(settings.whatsappAdmins, settings);

  const activeAdmin = admins.find((admin) => admin.isActive);

  if (activeAdmin) {
    return activeAdmin;
  }

  if (admins[0]) {
    return admins[0];
  }

  const legacyNumber = normalizeWhatsappNumber(settings.whatsappNumber);

  if (!legacyNumber) {
    return null;
  }

  return {
    id: `admin-${legacyNumber}`,
    name:
      settings.adminName?.trim() || DEFAULT_SITE_CONTACT_SETTINGS.adminName,
    whatsappNumber: legacyNumber,
    isActive: true,
  };
}

function buildContactSettingsPayload(settings = {}) {
  const duplicateNumber = getDuplicateWhatsappNumber(
    settings.whatsappAdmins || []
  );

  if (duplicateNumber) {
    throw new Error(
      `Nomor WhatsApp ${duplicateNumber} sudah terdaftar. Gunakan nomor lain.`
    );
  }

  const whatsappAdmins = normalizeWhatsappAdmins(
    settings.whatsappAdmins,
    settings
  );

  if (whatsappAdmins.length > MAX_WHATSAPP_ADMINS) {
    throw new Error(`Maksimal hanya boleh ${MAX_WHATSAPP_ADMINS} admin.`);
  }

  const primaryAdmin = whatsappAdmins[0] || null;

  return {
    adminName:
      primaryAdmin?.name ||
      settings.adminName?.trim() ||
      DEFAULT_SITE_CONTACT_SETTINGS.adminName,
    whatsappNumber:
      primaryAdmin?.whatsappNumber ||
      normalizeWhatsappNumber(settings.whatsappNumber),
    whatsappAdmins,
    whatsappLabel:
      settings.whatsappLabel?.trim() ||
      DEFAULT_SITE_CONTACT_SETTINGS.whatsappLabel,
    whatsappMessage:
      settings.whatsappMessage?.trim() ||
      DEFAULT_SITE_CONTACT_SETTINGS.whatsappMessage,
    updatedAt: serverTimestamp(),
  };
}

export async function getSiteContactSettings() {
  const db = getFirebaseDb();

  if (!db) {
    return DEFAULT_SITE_CONTACT_SETTINGS;
  }

  const settingsRef = doc(
    db,
    SITE_SETTINGS_COLLECTION,
    CONTACT_DOCUMENT_ID
  );

  const snapshot = await getDoc(settingsRef);

  if (!snapshot.exists()) {
    return DEFAULT_SITE_CONTACT_SETTINGS;
  }

  const data = {
    ...DEFAULT_SITE_CONTACT_SETTINGS,
    ...snapshot.data(),
  };

  const whatsappAdmins = normalizeWhatsappAdmins(data.whatsappAdmins, data);
  const primaryAdmin = getPrimaryWhatsappAdmin({
    ...data,
    whatsappAdmins,
  });

  return {
    ...data,
    adminName: primaryAdmin?.name || data.adminName,
    whatsappNumber: primaryAdmin?.whatsappNumber || data.whatsappNumber,
    whatsappAdmins,
  };
}

export async function updateSiteContactSettings(settings) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  const settingsRef = doc(
    db,
    SITE_SETTINGS_COLLECTION,
    CONTACT_DOCUMENT_ID
  );

  const payload = buildContactSettingsPayload(settings);

  await setDoc(settingsRef, payload, {
    merge: true,
  });

  return {
    ...DEFAULT_SITE_CONTACT_SETTINGS,
    ...payload,
  };
}

export async function updateWhatsappAdmins(whatsappAdmins = [], extraSettings = {}) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  if (!Array.isArray(whatsappAdmins)) {
    throw new Error("Data admin WhatsApp tidak valid.");
  }

  if (whatsappAdmins.length > MAX_WHATSAPP_ADMINS) {
    throw new Error(`Maksimal hanya boleh ${MAX_WHATSAPP_ADMINS} admin.`);
  }

  const settingsRef = doc(
    db,
    SITE_SETTINGS_COLLECTION,
    CONTACT_DOCUMENT_ID
  );

  const payload = buildContactSettingsPayload({
    ...extraSettings,
    whatsappAdmins,
  });

  await setDoc(settingsRef, payload, {
    merge: true,
  });

  return {
    ...DEFAULT_SITE_CONTACT_SETTINGS,
    ...payload,
  };
}