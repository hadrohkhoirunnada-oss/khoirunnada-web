import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GridFSBucket, ObjectId } from "mongodb";
import { connectToMongoDB } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCT_IMAGES_BUCKET = "productImages";
const ADMIN_AUTH_COOKIE = "khoirunnada_admin_auth";

function isValidObjectId(value = "") {
  return ObjectId.isValid(String(value));
}

async function isAdminRequest() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_AUTH_COOKIE);

  return Boolean(adminCookie?.value);
}

export async function DELETE(request, { params }) {
  try {
    const isAdmin = await isAdminRequest();

    if (!isAdmin) {
      return NextResponse.json(
        {
          ok: false,
          message: "Akses admin tidak valid. Silakan login ulang.",
        },
        {
          status: 401,
        }
      );
    }

    const { imageId } = await params;

    if (!isValidObjectId(imageId)) {
      return NextResponse.json(
        {
          ok: false,
          message: "ID gambar tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    const { db } = await connectToMongoDB();

    const bucket = new GridFSBucket(db, {
      bucketName: PRODUCT_IMAGES_BUCKET,
    });

    await bucket.delete(new ObjectId(imageId));

    return NextResponse.json({
      ok: true,
      message: "Gambar produk berhasil dihapus dari MongoDB.",
      imageId,
    });
  } catch (error) {
    console.error("Gagal menghapus gambar produk:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Gagal menghapus gambar produk.",
      },
      {
        status: 400,
      }
    );
  }
}