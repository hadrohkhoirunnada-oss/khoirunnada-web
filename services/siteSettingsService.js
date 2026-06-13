"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

const SITE_SETTINGS_COLLECTION = "siteSettings";
const CONTACT_DOCUMENT_ID = "contact";
const SOCIAL_MEDIA_DOCUMENT_ID = "socialMedia";
const PROFILE_DOCUMENT_ID = "profile";

export const MAX_WHATSAPP_ADMINS = 5;

export const DEFAULT_SITE_CONTACT_SETTINGS = {
  adminName: "Admin Khoirunnada",
  whatsappNumber: "",
  whatsappLabel: "Booking Kami Disini",
  whatsappMessage:
    "Assalamu'alaikum, saya ingin bertanya tentang booking Khoirunnada.",
  whatsappAdmins: [],
};

export const DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS = {
  facebookUrl:
    "https://www.facebook.com/profile.php?id=61590473526585&locale=id_ID",
  instagramUrl: "https://www.instagram.com/majelissholawatkhoirunnada/",
  youtubeUrl: "",
  tiktokUrl: "",
  copyrightText: "© 2026 Hadroh Khoirunnada.",
};

export const DEFAULT_SITE_PROFILE_SETTINGS = {
  heroEyebrow: "Profil & Sejarah",
  heroTitle: "Khoirunnada",
  heroDescription:
    "Majelis Sholawat dan Hadroh yang hadir sebagai ruang syiar, sholawat, kebersamaan, dan kecintaan kepada Rasulullah ﷺ.",
  mainInfo: [
    {
      label: "Nama Majelis",
      value: "Majelis Sholawat & Hadroh Khoirunnada",
    },
    {
      label: "Harlah",
      value: "11 Agustus 2022",
    },
    {
      label: "Inisiator / Pendiri",
      value: "Bro Toniman",
    },
    {
      label: "Pemberi Nama",
      value: "Ustaz Sukron Makmur Nawawi (Gus Syukron Nawawi)",
    },
    {
      label: "Pelatih / Pembina Awal",
      value: "Mbak Dewi",
    },
  ],
  shortHistoryEyebrow: "Sejarah Singkat",
  shortHistoryTitle:
    "Awal berdirinya Majelis Sholawat & Hadroh Khoirunnada",
  shortHistoryParagraphs: [
    'Majelis Sholawat & Hadroh Khoirunnada resmi berdiri pada tanggal 11 Agustus 2022. Nama "Khoirunnada" diberikan langsung oleh Ustaz Sukron Makmur Nawawi.',
    "Berawal dari wadah latihan hadroh bagi anak-anak mengaji, majelis ini terus didukung hingga berkembang dan eksis secara istiqomah sampai sekarang.",
  ],
  historyHighlights: [
    {
      label: "Harlah",
      value: "11 Agustus 2022",
    },
    {
      label: "Cikal Bakal",
      value: "Wadah latihan hadroh anak-anak mengaji",
    },
  ],
  timelineEyebrow: "Kronologi Sejarah",
  timelineTitle: "Perjalanan lahirnya nama Khoirunnada",
  timelineItems: [
    {
      title: "Niat Awal dan Sowan yang Tertunda",
      description:
        "Perjalanan majelis ini dimulai pada tanggal 11 Agustus 2022. Bro Toniman memiliki niat mulia untuk membentuk sebuah majelis sholawat. Untuk memulai langkah tersebut, ia pergi sowan ke pondok Ustaz Sukron Makmur Nawawi demi meminta petunjuk dan restu. Namun, saat itu Ustaz Sukron sedang tidak berada di tempat karena ada agenda kegiatan di Marisa Kota.",
    },
    {
      title: "Menitipkan Amanah Lewat Ustaz Jupri",
      description:
        "Karena tidak bisa bertemu langsung, Bro Toniman akhirnya meminta bantuan kepada Ustaz Jupri. Beliau menitipkan salam sekaligus menyampaikan amanah terkait niat dan rencana pembentukan majelis sholawat tersebut.",
    },
    {
      title: 'Restu dan Lahirnya Nama "Khoirunnada"',
      description:
        "Ustaz Jupri kemudian meneruskan pesan tersebut kepada Ustaz Sukron Makmur Nawawi melalui pesan WhatsApp. Niat baik ini disambut dengan tangan terbuka. Melalui balasan pesan tersebut, Ustaz Sukron memberikan restunya sekaligus memberikan nama resmi bagi majelis ini, yaitu Khoirunnada.",
    },
    {
      title: "Cikal Bakal dari Anak Ngaji",
      description:
        "Cikal bakal dari tim hadroh majelis ini sebenarnya berasal dari santri anak-anak mengaji yang dilatih oleh Mbak Dewi. Melihat potensi dan semangat mereka, Bro Toniman mengambil peran untuk terus mendorong, memotivasi, dan memberikan support penuh agar mereka rajin latihan. Tujuannya satu: agar majelis ini bisa terus berkembang dan tetap eksis.",
    },
  ],
  hopeEyebrow: "Harapan dan Doa",
  hopeTitle: "Semoga terus istiqomah dalam syiar sholawat",
  hopeText:
    "Sejak resmi berdiri pada Agustus 2022 hingga saat ini, Majelis Sholawat & Hadroh Khoirunnada terus berjalan mensyiarkan sholawat. Semoga ke depannya majelis ini selalu dijaga kelestariannya dan seluruh anggotanya diberikan keistiqomahan.",
  valuesEyebrow: "Nilai Majelis",
  valuesTitle: "Nilai yang dijaga dalam setiap langkah",
  values: [
    {
      title: "Adab",
      description:
        "Menjaga sikap, tutur kata, dan ketertiban dalam majelis maupun saat tampil di tengah masyarakat.",
    },
    {
      title: "Kebersamaan",
      description:
        "Menguatkan ukhuwah, kekompakan, dan rasa saling mendukung antaranggota.",
    },
    {
      title: "Syiar",
      description:
        "Menghadirkan sholawat dan hadroh sebagai jalan kebaikan yang dekat dengan masyarakat.",
    },
    {
      title: "Amanah",
      description:
        "Menjaga kepercayaan dalam setiap undangan, jadwal, dan kegiatan yang dijalankan.",
    },
  ],
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

function normalizeExternalUrl(value = "") {
  const cleanValue = String(value || "").trim();

  if (!cleanValue || cleanValue === "#") {
    return "";
  }

  if (/^https?:\/\//i.test(cleanValue)) {
    return cleanValue;
  }

  return `https://${cleanValue.replace(/^\/+/, "")}`;
}

function normalizeText(value = "", fallback = "") {
  const cleanValue = String(value || "").trim();

  return cleanValue || fallback;
}

function normalizeTextArray(value = [], fallback = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const normalizedItems = value
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  return normalizedItems.length > 0 ? normalizedItems : fallback;
}

function normalizeLabelValueItems(value = [], fallback = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const normalizedItems = value
    .map((item) => ({
      label: String(item?.label || "").trim(),
      value: String(item?.value || "").trim(),
    }))
    .filter((item) => item.label && item.value);

  return normalizedItems.length > 0 ? normalizedItems : fallback;
}

function normalizeTitleDescriptionItems(value = [], fallback = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const normalizedItems = value
    .map((item) => ({
      title: String(item?.title || "").trim(),
      description: String(item?.description || "").trim(),
    }))
    .filter((item) => item.title && item.description);

  return normalizedItems.length > 0 ? normalizedItems : fallback;
}

export function normalizeSiteSocialMediaSettings(settings = {}) {
  return {
    facebookUrl: normalizeExternalUrl(settings.facebookUrl),
    instagramUrl: normalizeExternalUrl(settings.instagramUrl),
    youtubeUrl: normalizeExternalUrl(settings.youtubeUrl),
    tiktokUrl: normalizeExternalUrl(settings.tiktokUrl),
    copyrightText:
      String(settings.copyrightText || "").trim() ||
      DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS.copyrightText,
  };
}

export function normalizeSiteProfileSettings(settings = {}) {
  return {
    heroEyebrow: normalizeText(
      settings.heroEyebrow,
      DEFAULT_SITE_PROFILE_SETTINGS.heroEyebrow
    ),
    heroTitle: normalizeText(
      settings.heroTitle,
      DEFAULT_SITE_PROFILE_SETTINGS.heroTitle
    ),
    heroDescription: normalizeText(
      settings.heroDescription,
      DEFAULT_SITE_PROFILE_SETTINGS.heroDescription
    ),
    mainInfo: normalizeLabelValueItems(
      settings.mainInfo,
      DEFAULT_SITE_PROFILE_SETTINGS.mainInfo
    ),
    shortHistoryEyebrow: normalizeText(
      settings.shortHistoryEyebrow,
      DEFAULT_SITE_PROFILE_SETTINGS.shortHistoryEyebrow
    ),
    shortHistoryTitle: normalizeText(
      settings.shortHistoryTitle,
      DEFAULT_SITE_PROFILE_SETTINGS.shortHistoryTitle
    ),
    shortHistoryParagraphs: normalizeTextArray(
      settings.shortHistoryParagraphs,
      DEFAULT_SITE_PROFILE_SETTINGS.shortHistoryParagraphs
    ),
    historyHighlights: normalizeLabelValueItems(
      settings.historyHighlights,
      DEFAULT_SITE_PROFILE_SETTINGS.historyHighlights
    ),
    timelineEyebrow: normalizeText(
      settings.timelineEyebrow,
      DEFAULT_SITE_PROFILE_SETTINGS.timelineEyebrow
    ),
    timelineTitle: normalizeText(
      settings.timelineTitle,
      DEFAULT_SITE_PROFILE_SETTINGS.timelineTitle
    ),
    timelineItems: normalizeTitleDescriptionItems(
      settings.timelineItems,
      DEFAULT_SITE_PROFILE_SETTINGS.timelineItems
    ),
    hopeEyebrow: normalizeText(
      settings.hopeEyebrow,
      DEFAULT_SITE_PROFILE_SETTINGS.hopeEyebrow
    ),
    hopeTitle: normalizeText(
      settings.hopeTitle,
      DEFAULT_SITE_PROFILE_SETTINGS.hopeTitle
    ),
    hopeText: normalizeText(
      settings.hopeText,
      DEFAULT_SITE_PROFILE_SETTINGS.hopeText
    ),
    valuesEyebrow: normalizeText(
      settings.valuesEyebrow,
      DEFAULT_SITE_PROFILE_SETTINGS.valuesEyebrow
    ),
    valuesTitle: normalizeText(
      settings.valuesTitle,
      DEFAULT_SITE_PROFILE_SETTINGS.valuesTitle
    ),
    values: normalizeTitleDescriptionItems(
      settings.values,
      DEFAULT_SITE_PROFILE_SETTINGS.values
    ),
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

function buildSocialMediaSettingsPayload(settings = {}) {
  const normalizedSettings = normalizeSiteSocialMediaSettings(settings);

  return {
    ...normalizedSettings,
    updatedAt: serverTimestamp(),
  };
}

function buildProfileSettingsPayload(settings = {}) {
  const normalizedSettings = normalizeSiteProfileSettings(settings);

  return {
    ...normalizedSettings,
    updatedAt: serverTimestamp(),
  };
}

export async function getSiteContactSettings() {
  const db = getFirebaseDb();

  if (!db) {
    return DEFAULT_SITE_CONTACT_SETTINGS;
  }

  const settingsRef = doc(db, SITE_SETTINGS_COLLECTION, CONTACT_DOCUMENT_ID);

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

  const settingsRef = doc(db, SITE_SETTINGS_COLLECTION, CONTACT_DOCUMENT_ID);

  const payload = buildContactSettingsPayload(settings);

  await setDoc(settingsRef, payload, {
    merge: true,
  });

  return {
    ...DEFAULT_SITE_CONTACT_SETTINGS,
    ...payload,
  };
}

export async function updateWhatsappAdmins(
  whatsappAdmins = [],
  extraSettings = {}
) {
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

  const settingsRef = doc(db, SITE_SETTINGS_COLLECTION, CONTACT_DOCUMENT_ID);

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

export async function getSiteSocialMediaSettings() {
  const db = getFirebaseDb();

  if (!db) {
    return DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS;
  }

  try {
    const settingsRef = doc(
      db,
      SITE_SETTINGS_COLLECTION,
      SOCIAL_MEDIA_DOCUMENT_ID
    );

    const snapshot = await getDoc(settingsRef);

    if (!snapshot.exists()) {
      return DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS;
    }

    return {
      ...DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS,
      ...normalizeSiteSocialMediaSettings(snapshot.data()),
    };
  } catch (error) {
    console.error("Gagal memuat pengaturan media sosial:", error);

    return DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS;
  }
}

export async function updateSiteSocialMediaSettings(settings = {}) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  const settingsRef = doc(
    db,
    SITE_SETTINGS_COLLECTION,
    SOCIAL_MEDIA_DOCUMENT_ID
  );

  const payload = buildSocialMediaSettingsPayload(settings);

  await setDoc(settingsRef, payload, {
    merge: true,
  });

  return {
    ...DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS,
    ...payload,
  };
}

export async function getSiteProfileSettings() {
  const db = getFirebaseDb();

  if (!db) {
    return DEFAULT_SITE_PROFILE_SETTINGS;
  }

  try {
    const settingsRef = doc(db, SITE_SETTINGS_COLLECTION, PROFILE_DOCUMENT_ID);

    const snapshot = await getDoc(settingsRef);

    if (!snapshot.exists()) {
      return DEFAULT_SITE_PROFILE_SETTINGS;
    }

    return normalizeSiteProfileSettings(snapshot.data());
  } catch (error) {
    console.error("Gagal memuat pengaturan profil dan sejarah:", error);

    return DEFAULT_SITE_PROFILE_SETTINGS;
  }
}

export async function updateSiteProfileSettings(settings = {}) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore hanya bisa digunakan di sisi browser.");
  }

  const settingsRef = doc(db, SITE_SETTINGS_COLLECTION, PROFILE_DOCUMENT_ID);

  const payload = buildProfileSettingsPayload(settings);

  await setDoc(settingsRef, payload, {
    merge: true,
  });

  return {
    ...DEFAULT_SITE_PROFILE_SETTINGS,
    ...payload,
  };
}