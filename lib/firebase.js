import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missingConfigKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingConfigKeys.length > 0 && typeof window !== "undefined") {
  console.warn(
    "Firebase config belum lengkap. Cek kembali .env.local:",
    missingConfigKeys
  );
}

function getOrInitializeFirebaseApp(appName = "[DEFAULT]") {
  const existingApp = getApps().find((app) => app.name === appName);

  if (existingApp) {
    return existingApp;
  }

  if (appName === "[DEFAULT]") {
    return initializeApp(firebaseConfig);
  }

  return initializeApp(firebaseConfig, appName);
}

export const firebaseApp = getOrInitializeFirebaseApp("[DEFAULT]");

export const kruVocalisFirebaseApp = getOrInitializeFirebaseApp(
  "khoirunnada-kru-vocalis"
);

export const getFirebaseAuth = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return getAuth(firebaseApp);
};

export const getKruVocalisFirebaseAuth = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return getAuth(kruVocalisFirebaseApp);
};

export const getFirebaseDb = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return getFirestore(firebaseApp);
};

export const getKruVocalisFirebaseDb = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return getFirestore(kruVocalisFirebaseApp);
};