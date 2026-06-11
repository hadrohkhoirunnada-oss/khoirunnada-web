import { NextResponse } from "next/server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const KRU_VOCALIS_COLLECTION = "kruVocalisMembers";

const ADMIN_EMAILS = String(process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountJson) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY belum diatur.");
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

async function verifyAdminRequest(request) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

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

    const db = getFirestore();

    await db.collection(KRU_VOCALIS_COLLECTION).doc(memberId).delete();

    try {
      await getAuth().deleteUser(memberId);
    } catch (error) {
      if (error?.code !== "auth/user-not-found") {
        throw error;
      }
    }

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