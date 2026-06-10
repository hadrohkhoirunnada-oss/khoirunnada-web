import { NextResponse } from "next/server";
import { GridFSBucket, ObjectId } from "mongodb";
import { connectToMongoDB } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCT_IMAGES_BUCKET = "productImages";

function isValidObjectId(value = "") {
  return ObjectId.isValid(String(value));
}

export async function GET(request, { params }) {
  try {
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

    const fileId = new ObjectId(imageId);
    const files = await bucket.find({ _id: fileId }).toArray();
    const file = files[0];

    if (!file) {
      return NextResponse.json(
        {
          ok: false,
          message: "Gambar produk tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    const chunks = [];

    await new Promise((resolve, reject) => {
      bucket
        .openDownloadStream(fileId)
        .on("data", (chunk) => {
          chunks.push(chunk);
        })
        .on("error", reject)
        .on("end", resolve);
    });

    const imageBuffer = Buffer.concat(chunks);
    const contentType =
      file.contentType || file.metadata?.contentType || "image/jpeg";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Gagal memuat gambar produk:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Gagal memuat gambar produk.",
      },
      {
        status: 500,
      }
    );
  }
}