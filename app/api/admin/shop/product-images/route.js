import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import { connectToMongoDB } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCT_IMAGES_BUCKET = "productImages";
const ADMIN_AUTH_COOKIE = "khoirunnada_admin_auth";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function normalizeText(value = "") {
  return String(value || "").trim();
}

function normalizeSlug(value = "") {
  return normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createSafeFilename(filename = "product-image") {
  const safeName = normalizeText(filename)
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-");

  return safeName || "product-image";
}

async function isAdminRequest() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_AUTH_COOKIE);

  return Boolean(adminCookie?.value);
}

async function uploadImageToGridFS({ db, imageFile, productSlug }) {
  if (!imageFile || typeof imageFile.arrayBuffer !== "function") {
    throw new Error("File gambar produk wajib dipilih.");
  }

  if (!imageFile.size) {
    throw new Error("File gambar produk tidak valid.");
  }

  if (!imageFile.type?.startsWith("image/")) {
    throw new Error("File produk harus berupa gambar.");
  }

  if (imageFile.size > MAX_IMAGE_SIZE) {
    throw new Error("Ukuran gambar maksimal 5MB.");
  }

  const bucket = new GridFSBucket(db, {
    bucketName: PRODUCT_IMAGES_BUCKET,
  });

  const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
  const safeFilename = createSafeFilename(imageFile.name);
  const storedFilename = `${
    productSlug || "produk"
  }-${Date.now()}-${safeFilename}`;

  return await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(storedFilename, {
      contentType: imageFile.type,
      metadata: {
        originalName: imageFile.name,
        productSlug,
        uploadedAt: new Date(),
      },
    });

    Readable.from(fileBuffer)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        const imageId = uploadStream.id.toString();

        resolve({
          imageId,
          imageUrl: `/api/shop/product-images/${imageId}`,
          imageFilename: storedFilename,
          imageOriginalName: imageFile.name,
          imageContentType: imageFile.type,
          imageSize: imageFile.size,
        });
      });
  });
}

export async function POST(request) {
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

    const formData = await request.formData();
    const title = normalizeText(formData.get("title"));
    const imageFile = formData.get("image");

    const productSlug = normalizeSlug(title || imageFile?.name || "produk");

    const { db } = await connectToMongoDB();

    const imageData = await uploadImageToGridFS({
      db,
      imageFile,
      productSlug,
    });

    return NextResponse.json({
      ok: true,
      message: "Gambar produk berhasil diupload ke MongoDB.",
      image: imageData,
    });
  } catch (error) {
    console.error("Gagal upload gambar produk:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Gagal upload gambar produk.",
      },
      {
        status: 400,
      }
    );
  }
}