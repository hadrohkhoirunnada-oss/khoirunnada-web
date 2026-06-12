"use client";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  linkWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getKruVocalisFirebaseAuth,
  getKruVocalisFirebaseDb,
} from "@/lib/firebase";

const KRU_VOCALIS_COLLECTION = "kruVocalisMembers";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

function getAuthInstance() {
  const auth = getKruVocalisFirebaseAuth();

  if (!auth) {
    throw new Error("Firebase Auth hanya bisa digunakan di sisi browser.");
  }

  return auth;
}

function getDb() {
  const db = getKruVocalisFirebaseDb();

  if (!db) {
    throw new Error("Firestore Kru/Vocalis hanya bisa digunakan di sisi browser.");
  }

  return db;
}

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeUsername(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._-]/g, "");
}

function getUsernameFromEmail(email) {
  const cleanEmail = cleanText(email).toLowerCase();

  if (!cleanEmail.includes("@")) {
    return "";
  }

  return normalizeUsername(cleanEmail.split("@")[0]);
}

function getLinkedProviderIds(user) {
  if (!user?.providerData) {
    return [];
  }

  return Array.from(
    new Set(
      user.providerData
        .map((provider) => String(provider?.providerId || "").trim())
        .filter(Boolean)
    )
  );
}

function getGoogleProviderData(user) {
  return user?.providerData?.find(
    (provider) => provider?.providerId === "google.com"
  );
}

export function normalizeAuthUser(user) {
  if (!user) {
    return null;
  }

  return {
    uid: String(user.uid || ""),
    name: String(user.displayName || ""),
    email: String(user.email || ""),
    photoURL: String(user.photoURL || ""),
    emailVerified: Boolean(user.emailVerified),
    providerIds: getLinkedProviderIds(user),
  };
}

function normalizeKruProfile(snapshot) {
  if (!snapshot?.exists()) {
    return null;
  }

  const data = snapshot.data() || {};

  return {
    id: String(snapshot.id),
    uid: String(data.uid || snapshot.id),
    name: String(data.name || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    username: String(data.username || getUsernameFromEmail(data.email)),
    bio: String(data.bio || ""),

    photoURL: String(data.photoURL || ""),
    photoPath: String(data.photoPath || ""),
    photoBucket: String(data.photoBucket || ""),
    photoProvider: String(data.photoProvider || ""),
    photoOriginalName: String(data.photoOriginalName || ""),
    photoContentType: String(data.photoContentType || ""),
    photoSize: Number(data.photoSize || 0),

    googlePhotoURL: String(data.googlePhotoURL || ""),
    linkedProviders: Array.isArray(data.linkedProviders)
      ? data.linkedProviders
      : [],

    mainRole: String(data.mainRole || ""),
    roles: Array.isArray(data.roles) ? data.roles : [],
    status: String(data.status || "pending"),
    approvalNote: String(data.approvalNote || ""),
    source: String(data.source || ""),
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
    approvedAt: data.approvedAt || null,
    approvedBy: String(data.approvedBy || ""),
    statusChangedAt: data.statusChangedAt || null,
    statusChangedBy: String(data.statusChangedBy || ""),
  };
}

export async function getKruVocalisProfile(uid) {
  const cleanUid = cleanText(uid);

  if (!cleanUid) {
    return null;
  }

  const db = getDb();
  const snapshot = await getDoc(doc(db, KRU_VOCALIS_COLLECTION, cleanUid));

  return normalizeKruProfile(snapshot);
}

export async function registerKruWithEmailPassword({
  name,
  email,
  password,
  phone,
  mainRole,
}) {
  const cleanName = cleanText(name);
  const cleanEmail = cleanText(email).toLowerCase();
  const cleanPhone = cleanText(phone);
  const cleanRole = cleanText(mainRole);
  const username = getUsernameFromEmail(cleanEmail);

  if (!cleanName) {
    throw new Error("Nama lengkap wajib diisi.");
  }

  if (!cleanEmail) {
    throw new Error("Email wajib diisi.");
  }

  if (!password || String(password).length < 6) {
    throw new Error("Password minimal 6 karakter.");
  }

  if (!cleanPhone) {
    throw new Error("Nomor WhatsApp wajib diisi.");
  }

  if (!cleanRole) {
    throw new Error("Role yang diajukan wajib dipilih.");
  }

  const auth = getAuthInstance();
  const db = getDb();

  const result = await createUserWithEmailAndPassword(
    auth,
    cleanEmail,
    password
  );

  await updateProfile(result.user, {
    displayName: cleanName,
  });

  const authUser = normalizeAuthUser(result.user);

  const profilePayload = {
    uid: authUser.uid,
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    username,
    bio: "",

    photoURL: authUser.photoURL || "",
    photoPath: "",
    photoBucket: "",
    photoProvider: authUser.photoURL ? "auth" : "default",
    photoOriginalName: "",
    photoContentType: "",
    photoSize: 0,

    googlePhotoURL: "",
    linkedProviders: authUser.providerIds,

    mainRole: cleanRole,
    roles: cleanRole ? [cleanRole] : [],
    status: "pending",
    approvalNote: "",
    source: "email-password",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    approvedAt: null,
    approvedBy: "",
    statusChangedAt: serverTimestamp(),
    statusChangedBy: "",
  };

  await setDoc(doc(db, KRU_VOCALIS_COLLECTION, authUser.uid), profilePayload);

  return {
    user: authUser,
    profile: {
      id: authUser.uid,
      ...profilePayload,
      createdAt: "",
      updatedAt: "",
      statusChangedAt: "",
    },
  };
}

export async function registerKruWithGoogle({ phone, mainRole } = {}) {
  const cleanPhone = cleanText(phone);
  const cleanRole = cleanText(mainRole);

  if (!cleanPhone) {
    throw new Error("Nomor WhatsApp wajib diisi sebelum daftar dengan Google.");
  }

  if (!cleanRole) {
    throw new Error(
      "Role yang diajukan wajib dipilih sebelum daftar dengan Google."
    );
  }

  const auth = getAuthInstance();
  const db = getDb();

  const result = await signInWithPopup(auth, googleProvider);
  const authUser = normalizeAuthUser(result.user);
  const googleProviderData = getGoogleProviderData(result.user);
  const googlePhotoURL = String(
    googleProviderData?.photoURL || authUser.photoURL || ""
  );

  const profileReference = doc(db, KRU_VOCALIS_COLLECTION, authUser.uid);
  const existingProfileSnapshot = await getDoc(profileReference);
  const existingProfile = normalizeKruProfile(existingProfileSnapshot);

  if (existingProfile) {
    return {
      user: authUser,
      profile: existingProfile,
      alreadyRegistered: true,
    };
  }

  const profilePayload = {
    uid: authUser.uid,
    name: authUser.name || authUser.email || "Kru Khoirunnada",
    email: authUser.email,
    phone: cleanPhone,
    username: getUsernameFromEmail(authUser.email),
    bio: "",

    photoURL: googlePhotoURL,
    photoPath: "",
    photoBucket: "",
    photoProvider: googlePhotoURL ? "google" : "default",
    photoOriginalName: "",
    photoContentType: "",
    photoSize: 0,

    googlePhotoURL,
    linkedProviders: authUser.providerIds,

    mainRole: cleanRole,
    roles: cleanRole ? [cleanRole] : [],
    status: "pending",
    approvalNote: "",
    source: "google",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    approvedAt: null,
    approvedBy: "",
    statusChangedAt: serverTimestamp(),
    statusChangedBy: "",
  };

  await setDoc(profileReference, profilePayload);

  return {
    user: authUser,
    profile: {
      id: authUser.uid,
      ...profilePayload,
      createdAt: "",
      updatedAt: "",
      statusChangedAt: "",
    },
    alreadyRegistered: false,
  };
}

export async function loginKruWithEmailPassword({ email, password }) {
  const cleanEmail = cleanText(email).toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error("Email dan password wajib diisi.");
  }

  const auth = getAuthInstance();

  const result = await signInWithEmailAndPassword(auth, cleanEmail, password);
  const authUser = normalizeAuthUser(result.user);
  const profile = await getKruVocalisProfile(authUser.uid);

  if (!profile) {
    await signOut(auth);
    throw new Error("Akun ini belum terdaftar sebagai Kru/Vocalis.");
  }

  return {
    user: authUser,
    profile,
  };
}

export async function loginKruWithGoogle() {
  const auth = getAuthInstance();

  const result = await signInWithPopup(auth, googleProvider);
  const authUser = normalizeAuthUser(result.user);
  const profile = await getKruVocalisProfile(authUser.uid);

  if (!profile) {
    await signOut(auth);
    throw new Error("Akun Google ini belum daftar sebagai Kru/Vocalis.");
  }

  return {
    user: authUser,
    profile,
  };
}

export async function updateKruVocalisProfile(payload = {}) {
  const auth = getAuthInstance();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Kamu harus login terlebih dahulu.");
  }

  const cleanName = cleanText(payload.name);
  const cleanPhone = cleanText(payload.phone);
  const cleanUsername = normalizeUsername(payload.username);
  const cleanBio = cleanText(payload.bio);

  const cleanPhotoURL = cleanText(payload.photoURL);
  const cleanPhotoPath = cleanText(payload.photoPath);
  const cleanPhotoBucket = cleanText(payload.photoBucket);
  const cleanPhotoProvider = cleanPhotoURL
    ? cleanText(payload.photoProvider) || "supabase"
    : "default";
  const cleanPhotoOriginalName = cleanText(payload.photoOriginalName);
  const cleanPhotoContentType = cleanText(payload.photoContentType);
  const cleanPhotoSize = Number(payload.photoSize || 0);

  if (!cleanName) {
    throw new Error("Nama lengkap wajib diisi.");
  }

  if (!cleanUsername) {
    throw new Error("Username wajib diisi.");
  }

  if (!cleanPhone) {
    throw new Error("Nomor WhatsApp wajib diisi.");
  }

  const db = getDb();
  const authUser = normalizeAuthUser(currentUser);
  const profileReference = doc(db, KRU_VOCALIS_COLLECTION, authUser.uid);

  const updatePayload = {
    name: cleanName,
    phone: cleanPhone,
    username: cleanUsername,
    bio: cleanBio,

    photoURL: cleanPhotoURL,
    photoPath: cleanPhotoURL ? cleanPhotoPath : "",
    photoBucket: cleanPhotoURL ? cleanPhotoBucket : "",
    photoProvider: cleanPhotoProvider,
    photoOriginalName: cleanPhotoURL ? cleanPhotoOriginalName : "",
    photoContentType: cleanPhotoURL ? cleanPhotoContentType : "",
    photoSize: cleanPhotoURL ? cleanPhotoSize : 0,

    linkedProviders: authUser.providerIds,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(profileReference, updatePayload);

  await updateProfile(currentUser, {
    displayName: cleanName,
    photoURL: cleanPhotoURL || null,
  });

  const latestProfile = await getKruVocalisProfile(authUser.uid);

  return {
    user: normalizeAuthUser(auth.currentUser),
    profile: {
      ...latestProfile,
      ...updatePayload,
      updatedAt: "",
    },
  };
}

export async function linkGoogleToCurrentKruAccount({
  useGooglePhoto = true,
} = {}) {
  const auth = getAuthInstance();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Kamu harus login terlebih dahulu.");
  }

  let linkedUser = currentUser;
  const alreadyLinked = currentUser.providerData?.some(
    (provider) => provider?.providerId === "google.com"
  );

  try {
    if (!alreadyLinked) {
      const result = await linkWithPopup(currentUser, googleProvider);
      linkedUser = result.user;
    }
  } catch (error) {
    if (error?.code === "auth/provider-already-linked") {
      linkedUser = auth.currentUser;
    } else if (error?.code === "auth/credential-already-in-use") {
      throw new Error(
        "Akun Google ini sudah terhubung dengan akun lain. Gunakan akun Google yang sama dengan akun Kru/Vocalis ini."
      );
    } else if (error?.code === "auth/email-already-in-use") {
      throw new Error(
        "Email Google ini sudah digunakan akun lain. Gunakan Google yang sesuai dengan akun Kru/Vocalis."
      );
    } else {
      throw error;
    }
  }

  const authUser = normalizeAuthUser(linkedUser);
  const profile = await getKruVocalisProfile(authUser.uid);

  if (!profile) {
    throw new Error("Profil Kru/Vocalis tidak ditemukan.");
  }

  const googleProviderData = getGoogleProviderData(linkedUser);
  const googlePhotoURL = String(
    googleProviderData?.photoURL || linkedUser?.photoURL || ""
  );

  const updatePayload = {
    googlePhotoURL,
    linkedProviders: authUser.providerIds,
    updatedAt: serverTimestamp(),
  };

  if (useGooglePhoto && googlePhotoURL) {
    updatePayload.photoURL = googlePhotoURL;
    updatePayload.photoPath = "";
    updatePayload.photoBucket = "";
    updatePayload.photoProvider = "google";
    updatePayload.photoOriginalName = "";
    updatePayload.photoContentType = "";
    updatePayload.photoSize = 0;

    await updateProfile(linkedUser, {
      photoURL: googlePhotoURL,
    });
  }

  const db = getDb();

  await updateDoc(
    doc(db, KRU_VOCALIS_COLLECTION, authUser.uid),
    updatePayload
  );

  const latestProfile = await getKruVocalisProfile(authUser.uid);

  return {
    user: normalizeAuthUser(auth.currentUser),
    profile: {
      ...latestProfile,
      ...updatePayload,
      updatedAt: "",
    },
  };
}

export async function logoutKruVocalis() {
  const auth = getAuthInstance();

  await signOut(auth);
}

export function listenKruVocalisAuthState(callback) {
  const auth = getKruVocalisFirebaseAuth();

  if (!auth) {
    callback({
      user: null,
      profile: null,
    });

    return () => {};
  }

  return onAuthStateChanged(auth, async (user) => {
    const authUser = normalizeAuthUser(user);

    if (!authUser) {
      callback({
        user: null,
        profile: null,
      });

      return;
    }

    try {
      const profile = await getKruVocalisProfile(authUser.uid);

      callback({
        user: authUser,
        profile,
      });
    } catch (error) {
      console.error("Gagal membaca profil Kru/Vocalis:", error);

      callback({
        user: authUser,
        profile: null,
      });
    }
  });
}