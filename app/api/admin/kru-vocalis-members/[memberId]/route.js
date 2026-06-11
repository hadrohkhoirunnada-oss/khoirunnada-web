import { NextResponse } from "next/server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const runtime = "nodejs";

const KRU_VOCALIS_COLLECTION = "kruVocalisMembers";

const FALLBACK_ADMIN_EMAILS = [
  "hadrohkhoirunnada@gmail.com",
  "dzarinalkhairaat@gmail.com",
];

const ADMIN_EMAILS = Array.from(
  new Set(
    [
      ...FALLBACK_ADMIN_EMAILS,
      ...String(process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ].filter(Boolean)
  )
);

function parseServiceAccount() {
  const base64ServiceAccount = String(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 || ""
  ).trim();

  const jsonServiceAccount = String(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || ""
  ).trim();

  if (base64ServiceAccount) {
    const decodedJson = Buffer.from(base64ServiceAccount, "base64").toString(
      "utf8"
    );

    return JSON.parse(decodedJson);
  }

  if (jsonServiceAccount) {
    return JSON.parse(jsonServiceAccount);
  }

  throw new Error(
    "Firebase service account belum diatur. Isi FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 di Vercel."
  );
}

function normalizePrivateKey(serviceAccount) {
  if (!serviceAccount?.private_key) {
    return serviceAccount;
  }

  return {
    ...serviceAccount,
    private_key: String(serviceAccount.private_key).replace(/\\n/g, "\n"),
  };
}

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccount = normalizePrivateKey(parseServiceAccount());

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

function getBearerToken(request) {
  const authorization = request.headers.get("authorization") || "";

  if (!authorization.startsWith("Bearer ")) {
    return "";
  }

  return authorization.slice("Bearer ".length).trim();
}

async function verifyAdminRequest(request) {
  const token = getBearerToken(request);

  if (!token) {
    throw new Error("Token admin tidak ditemukan.");
  }

  getFirebaseAdminApp();

  const decodedToken = await getAuth().verifyIdToken(token);
  const email = String(decodedToken.email || "").toLowerCase();

  if (!email || !ADMIN_EMAILS.includes(email)) {
    throw new Error("Akun ini tidak memiliki akses admin.");
  }

  return decodedToken;
}

export async function DELETE(request, context) {
  try {
    await verifyAdminRequest(request);

    const params = await context.params;
    const memberId = String(params?.memberId || "").trim();

    if (!memberId) {
      return NextResponse.json(
        {
          ok: false,
          message: "ID anggota tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    getFirebaseAdminApp();

    const auth = getAuth();
    const db = getFirestore();

    try {
      await auth.deleteUser(memberId);
    } catch (error) {
      if (error?.code !== "auth/user-not-found") {
        throw error;
      }
    }

    await db.collection(KRU_VOCALIS_COLLECTION).doc(memberId).delete();

    return NextResponse.json({
      ok: true,
      deleted: true,
      id: memberId,
      message: "Akses Kru/Vocalis dan akun Authentication berhasil dihapus.",
    });
  } catch (error) {
    console.error("Gagal menghapus akses Kru/Vocalis:", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          error?.message ||
          "Gagal menghapus akses Kru/Vocalis dan akun Authentication.",
      },
      {
        status: 500,
      }
    );
  }
}