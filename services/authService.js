"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

const ADMIN_AUTH_COOKIE_NAME = "khoirunnada_admin_auth";
const ADMIN_AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

function getAuthInstance() {
  const auth = getFirebaseAuth();

  if (!auth) {
    throw new Error("Firebase Auth hanya bisa digunakan di sisi browser.");
  }

  return auth;
}

function getSecureCookieFlag() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.protocol === "https:" ? "; Secure" : "";
}

function setAdminAuthCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ADMIN_AUTH_COOKIE_NAME}=1; Path=/; Max-Age=${ADMIN_AUTH_COOKIE_MAX_AGE}; SameSite=Lax${getSecureCookieFlag()}`;
}

function clearAdminAuthCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ADMIN_AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${getSecureCookieFlag()}`;
}

export function normalizeAuthUser(user) {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    emailVerified: user.emailVerified,
  };
}

export async function loginWithGoogle() {
  const auth = getAuthInstance();
  const result = await signInWithPopup(auth, googleProvider);

  setAdminAuthCookie();

  return normalizeAuthUser(result.user);
}

export async function loginWithEmailPassword({ email, password }) {
  const auth = getAuthInstance();

  const result = await signInWithEmailAndPassword(
    auth,
    String(email || "").trim(),
    password
  );

  setAdminAuthCookie();

  return normalizeAuthUser(result.user);
}

export async function logoutAdmin() {
  const auth = getAuthInstance();

  clearAdminAuthCookie();

  await signOut(auth);
}

export function listenAuthState(callback) {
  const auth = getFirebaseAuth();

  if (!auth) {
    clearAdminAuthCookie();
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setAdminAuthCookie();
    } else {
      clearAdminAuthCookie();
    }

    callback(normalizeAuthUser(user));
  });
}

export function getCurrentAuthUser() {
  const auth = getFirebaseAuth();

  return normalizeAuthUser(auth?.currentUser || null);
}