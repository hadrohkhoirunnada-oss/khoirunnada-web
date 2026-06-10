import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";
import { connectToMongoDB } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCTS_COLLECTION = "products";
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

function normalizeStatus(value = "") {
  const status = normalizeText(value);

  if (["published", "draft", "coming-soon", "sold-out"].includes(status)) {
    return status;
  }

  return "draft";
}

function normalizeStock(value = "") {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 0) {
    return 0;
  }

  return numberValue;
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

async function uploadProductImage({ db, imageFile, slug }) {
  if (!imageFile || typeof imageFile.arrayBuffer !== "function") {
    return null;
  }

  if (!imageFile.size) {
    return null;
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
  const storedFilename = `${slug || "produk"}-${Date.now()}-${safeFilename}`;

  return await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(storedFilename, {
      contentType: imageFile.type,
      metadata: {
        originalName: imageFile.name,
        productSlug: slug,
        uploadedAt: new Date(),
      },
    });

    Readable.from(fileBuffer)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        resolve({
          imageId: uploadStream.id.toString(),
          imageFilename: storedFilename,
          imageOriginalName: imageFile.name,
          imageContentType: imageFile.type,
          imageSize: imageFile.size,
        });
      });
  });
}

function serializeProduct(product = {}) {
  return {
    ...product,
    _id: product._id?.toString?.() || product._id,
    imageId: product.imageId?.toString?.() || product.imageId || "",
  };
}

export async function GET() {
  try {
    const { db } = await connectToMongoDB();

    const products = await db
      .collection(PRODUCTS_COLLECTION)
      .find({})
      .sort({
        createdAt: -1,
      })
      .toArray();

    return NextResponse.json({
      ok: true,
      products: products.map(serializeProduct),
    });
  } catch (error) {
    console.error("Gagal mengambil produk:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Gagal mengambil data produk.",
      },
      {
        status: 500,
      }
    );
  }
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
    const category = normalizeText(formData.get("category"));
    const status = normalizeStatus(formData.get("status"));
    const price = normalizeText(formData.get("price"));
    const originalPrice = normalizeText(formData.get("originalPrice"));
    const discount = normalizeText(formData.get("discount"));
    const stock = normalizeStock(formData.get("stock"));
    const description = normalizeText(formData.get("description"));
    const imageFile = formData.get("image");

    if (!title) {
      throw new Error("Nama produk wajib diisi.");
    }

    if (!category) {
      throw new Error("Kategori produk wajib dipilih.");
    }

    const slug = normalizeSlug(title);

    if (!slug) {
      throw new Error("Slug produk tidak valid.");
    }

    const { db } = await connectToMongoDB();

    const existingProduct = await db.collection(PRODUCTS_COLLECTION).findOne({
      slug,
    });

    if (existingProduct) {
      throw new Error(
        `Produk dengan slug "${slug}" sudah ada. Gunakan nama produk lain.`
      );
    }

    const imageData = await uploadProductImage({
      db,
      imageFile,
      slug,
    });

    const now = new Date();

    const productPayload = {
      title,
      slug,
      category,
      status,
      price,
      originalPrice,
      discount,
      stock,
      description,
      source: "mongodb",
      imageId: imageData?.imageId || "",
      imageUrl: imageData?.imageId
        ? `/api/shop/product-images/${imageData.imageId}`
        : "",
      imageFilename: imageData?.imageFilename || "",
      imageOriginalName: imageData?.imageOriginalName || "",
      imageContentType: imageData?.imageContentType || "",
      imageSize: imageData?.imageSize || 0,
      createdAt: now,
      updatedAt: now,
    };

    const insertResult = await db
      .collection(PRODUCTS_COLLECTION)
      .insertOne(productPayload);

    return NextResponse.json({
      ok: true,
      message: "Produk berhasil disimpan ke MongoDB.",
      product: serializeProduct({
        ...productPayload,
        _id: insertResult.insertedId,
      }),
    });
  } catch (error) {
    console.error("Gagal menyimpan produk:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Gagal menyimpan produk.",
      },
      {
        status: 400,
      }
    );
  }
}