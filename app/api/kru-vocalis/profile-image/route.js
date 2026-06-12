import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const SUPABASE_KRU_PROFILE_BUCKET =
  process.env.SUPABASE_KRU_PROFILE_BUCKET || "kru-profile-images";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function slugifyFileName(value) {
  return String(value || "profile-image")
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

function sanitizePathSegment(value) {
  const cleanValue = String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 90);

  return cleanValue || "unknown";
}

function isSafeKruProfilePath(value) {
  const cleanValue = String(value || "").trim();

  return (
    cleanValue.startsWith("khoirunnada/kru-profiles/") &&
    !cleanValue.includes("..") &&
    !cleanValue.startsWith("/") &&
    cleanValue.length <= 420
  );
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");
    const uid = sanitizePathSegment(formData.get("uid"));

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          message: "File foto profil wajib dikirim.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          message: "Format foto profil harus JPG, PNG, atau WEBP.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          message: "Ukuran foto profil maksimal 5 MB.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();

    const extension = getFileExtension(file);
    const cleanName = slugifyFileName(file.name);
    const uniqueSuffix =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.round(Math.random() * 1000000)}`;

    const filePath = `khoirunnada/kru-profiles/${uid}/${Date.now()}-${uniqueSuffix}-${cleanName}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from(SUPABASE_KRU_PROFILE_BUCKET)
      .upload(filePath, Buffer.from(arrayBuffer), {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) {
      console.error("Gagal upload foto profil Kru/Vocalis ke Supabase:", error);

      return NextResponse.json(
        {
          message: "Gagal upload foto profil Kru/Vocalis.",
        },
        { status: 500 }
      );
    }

    const { data } = supabase.storage
      .from(SUPABASE_KRU_PROFILE_BUCKET)
      .getPublicUrl(filePath);

    return NextResponse.json({
      photoURL: data?.publicUrl || "",
      photoPath: filePath,
      photoBucket: SUPABASE_KRU_PROFILE_BUCKET,
      photoProvider: "supabase",
      photoOriginalName: file.name,
      photoContentType: file.type,
      photoSize: file.size,
    });
  } catch (error) {
    console.error("Terjadi error saat upload foto profil Kru/Vocalis:", error);

    return NextResponse.json(
      {
        message: "Terjadi error saat upload foto profil Kru/Vocalis.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const payload = await request.json().catch(() => ({}));

    const photoBucket = String(payload?.photoBucket || "").trim();
    const photoPath = String(payload?.photoPath || "").trim();

    if (
      photoBucket !== SUPABASE_KRU_PROFILE_BUCKET ||
      !isSafeKruProfilePath(photoPath)
    ) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        message: "Foto lama dilewati karena bukan file profil Kru/Vocalis.",
      });
    }

    const supabase = getSupabaseAdminClient();

    const { error } = await supabase.storage
      .from(SUPABASE_KRU_PROFILE_BUCKET)
      .remove([photoPath]);

    if (error) {
      console.error("Gagal menghapus foto profil lama dari Supabase:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Gagal menghapus foto profil lama.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      deleted: true,
    });
  } catch (error) {
    console.error("Terjadi error saat menghapus foto profil lama:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Terjadi error saat menghapus foto profil lama.",
      },
      { status: 500 }
    );
  }
}