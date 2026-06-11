"use client";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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

function normalizeAuthUser(user) {
  if (!user) {
    return null;
  }

  return {
    uid: String(user.uid || ""),
    name: String(user.displayName || ""),
    email: String(user.email || ""),
    photoURL: String(user.photoURL || ""),
    emailVerified: Boolean(user.emailVerified),
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
    photoURL: String(data.photoURL || ""),
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

function cleanText(value) {
  return String(value || "").trim();
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
    photoURL: authUser.photoURL || "",
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
    photoURL: authUser.photoURL || "",
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