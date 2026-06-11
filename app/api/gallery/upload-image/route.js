import { NextResponse } from "next/server";
import {
  getSupabaseAdminClient,
  SUPABASE_GALLERY_BUCKET,
} from "@/lib/supabase";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function slugifyFileName(value) {
  return String(value || "gallery-image")
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 70);
}

function getFileExtension(file) {
  const mimeExtensionMap = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return mimeExtensionMap[file.type] || "jpg";
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          message: "File gambar wajib dikirim.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          message: "Format gambar harus JPG, PNG, atau WEBP.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          message: "Ukuran gambar maksimal 5 MB.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();

    const extension = getFileExtension(file);
    const cleanName = slugifyFileName(file.name);
    const filePath = `khoirunnada/gallery/${Date.now()}-${cleanName}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from(SUPABASE_GALLERY_BUCKET)
      .upload(filePath, Buffer.from(arrayBuffer), {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) {
      console.error("Gagal upload gambar galeri ke Supabase:", error);

      return NextResponse.json(
        {
          message: "Gagal upload gambar galeri.",
        },
        { status: 500 }
      );
    }

    const { data } = supabase.storage
      .from(SUPABASE_GALLERY_BUCKET)
      .getPublicUrl(filePath);

    return NextResponse.json({
      imageUrl: data?.publicUrl || "",
      imagePath: filePath,
      imageProvider: "supabase",
      imageOriginalName: file.name,
      imageContentType: file.type,
      imageSize: file.size,
    });
  } catch (error) {
    console.error("Terjadi error saat upload gambar galeri:", error);

    return NextResponse.json(
      {
        message: "Terjadi error saat upload gambar galeri.",
      },
      { status: 500 }
    );
  }
}