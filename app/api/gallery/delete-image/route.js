import { NextResponse } from "next/server";
import {
  getSupabaseAdminClient,
  SUPABASE_GALLERY_BUCKET,
} from "@/lib/supabase";

function isValidGalleryPath(value) {
  const path = String(value || "").trim();

  return path.startsWith("khoirunnada/gallery/") && !path.includes("..");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const imagePath = String(body?.imagePath || "").trim();

    if (!imagePath) {
      return NextResponse.json({
        message: "Tidak ada imagePath, file Supabase tidak perlu dihapus.",
        skipped: true,
      });
    }

    if (!isValidGalleryPath(imagePath)) {
      return NextResponse.json(
        {
          message: "Path gambar galeri tidak valid.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();

    const { error } = await supabase.storage
      .from(SUPABASE_GALLERY_BUCKET)
      .remove([imagePath]);

    if (error) {
      console.error("Gagal menghapus gambar galeri dari Supabase:", error);

      return NextResponse.json(
        {
          message: "Gagal menghapus gambar dari Supabase.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Gambar galeri berhasil dihapus dari Supabase.",
      deleted: true,
      imagePath,
    });
  } catch (error) {
    console.error("Terjadi error saat hapus gambar galeri:", error);

    return NextResponse.json(
      {
        message: "Terjadi error saat hapus gambar galeri.",
      },
      { status: 500 }
    );
  }
}