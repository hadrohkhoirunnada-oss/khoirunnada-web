"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LyricsDetail from "@/components/lyrics/LyricsDetail";
import {
  getPublishedQasidahItems,
  normalizeQasidahSlug,
} from "@/services/qasidahService";

function normalizeLines(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeDatabaseLyric(item = {}) {
  return {
    ...item,
    id: item.id || item.slug,
    source: "firestore",
    category: item.category || "Qosidah Umum",
    qasidahCategory: item.qasidahCategory || "qosidah-umum",
    shortDescription: item.shortDescription || "",
    arabicText: normalizeLines(item.arabicText),
    latinText: normalizeLines(item.latinText),
    translation: normalizeLines(item.translationText || item.translation),
  };
}

function LoadingState() {
  return (
    <section className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/14 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
          Memuat Bacaan
        </p>

        <h1 className="mt-3 text-xl font-black leading-tight tracking-[-0.05em] text-white">
          Mengambil data dari database
        </h1>

        <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
          Mohon tunggu sebentar.
        </p>
      </div>
    </section>
  );
}

function NotFoundState({ message }) {
  return (
    <section className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/14 bg-black/38 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
          Bacaan Tidak Ditemukan
        </p>

        <h1 className="mt-3 text-xl font-black leading-tight tracking-[-0.05em] text-white">
          Data belum tersedia
        </h1>

        <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
          {message ||
            "Bacaan ini belum tersedia, masih draft, atau sudah dihapus dari database."}
        </p>

        <Link
          href="/lirik"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-2xl border border-amber-300/18 bg-amber-300/10 px-5 text-sm font-black text-amber-100 transition active:scale-[0.98]"
        >
          Kembali ke Daftar Lirik
        </Link>
      </div>
    </section>
  );
}

export default function DatabaseLyricsDetail({ slug }) {
  const [lyric, setLyric] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadLyric() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const normalizedSlug = normalizeQasidahSlug(slug);
        const items = await getPublishedQasidahItems();

        const foundItem = items.find(
          (item) => normalizeQasidahSlug(item.slug) === normalizedSlug
        );

        if (!isMounted) {
          return;
        }

        setLyric(foundItem ? normalizeDatabaseLyric(foundItem) : null);
      } catch (error) {
        console.error("Gagal memuat detail qasidah dari database:", error);

        if (isMounted) {
          setErrorMessage(
            error.message || "Gagal memuat detail bacaan dari database."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLyric();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!lyric) {
    return <NotFoundState message={errorMessage} />;
  }

  return <LyricsDetail lyric={lyric} />;
}