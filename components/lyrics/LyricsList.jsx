"use client";

import { useEffect, useMemo, useState } from "react";
import LyricsSearch from "@/components/lyrics/LyricsSearch";
import LyricsCard from "@/components/lyrics/LyricsCard";
import { getPublishedQasidahItems } from "@/services/qasidahService";

function normalizeArrayText(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeFirestoreLyric(item = {}) {
  return {
    ...item,
    id: item.id || item.slug,
    source: "firestore",
    category: item.category || "Qosidah Umum",
    qasidahCategory: item.qasidahCategory || "qosidah-umum",
    shortDescription: item.shortDescription || "",
    arabicText: normalizeArrayText(item.arabicText),
    latinText: normalizeArrayText(item.latinText),
    translation: normalizeArrayText(item.translationText || item.translation),
  };
}

function normalizeStaticLyric(item = {}) {
  return {
    ...item,
    source: item.source || "file",
    qasidahCategory: item.qasidahCategory || "qosidah-umum",
    shortDescription: item.shortDescription || "",
    arabicText: normalizeArrayText(item.arabicText),
    latinText: normalizeArrayText(item.latinText),
    translation: normalizeArrayText(item.translation),
  };
}

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

export default function LyricsList({ lyrics = [] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [databaseLyrics, setDatabaseLyrics] = useState([]);
  const [isLoadingDatabase, setIsLoadingDatabase] = useState(true);
  const [databaseError, setDatabaseError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDatabaseLyrics() {
      setIsLoadingDatabase(true);
      setDatabaseError("");

      try {
        const items = await getPublishedQasidahItems();

        if (!isMounted) {
          return;
        }

        setDatabaseLyrics(items.map(normalizeFirestoreLyric));
      } catch (error) {
        console.error("Gagal memuat qasidah dari database:", error);

        if (isMounted) {
          setDatabaseLyrics([]);
          setDatabaseError(
            error.message || "Gagal memuat bacaan dari database."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingDatabase(false);
        }
      }
    }

    loadDatabaseLyrics();

    return () => {
      isMounted = false;
    };
  }, []);

  const mergedLyrics = useMemo(() => {
    const staticLyrics = lyrics.map(normalizeStaticLyric);

    const usedSlugs = new Set(
      staticLyrics.map((item) => item.slug).filter(Boolean)
    );

    const uniqueDatabaseLyrics = databaseLyrics.filter((item) => {
      if (!item.slug) {
        return true;
      }

      return !usedSlugs.has(item.slug);
    });

    return [...staticLyrics, ...uniqueDatabaseLyrics];
  }, [lyrics, databaseLyrics]);

  const filteredLyrics = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return mergedLyrics.filter((lyric) => {
      const arabicText = normalizeArrayText(lyric.arabicText).join(" ");
      const latinText = normalizeArrayText(lyric.latinText).join(" ");
      const translation = normalizeArrayText(
        lyric.translation || lyric.translationText
      ).join(" ");

      const qasidahCategory = lyric.qasidahCategory || "qosidah-umum";

      const matchesCategory =
        selectedCategory === "all" || qasidahCategory === selectedCategory;

      const matchesKeyword =
        !keyword ||
        normalizeText(lyric.title).includes(keyword) ||
        normalizeText(lyric.category).includes(keyword) ||
        normalizeText(lyric.shortDescription).includes(keyword) ||
        normalizeText(arabicText).includes(keyword) ||
        normalizeText(latinText).includes(keyword) ||
        normalizeText(translation).includes(keyword);

      return matchesCategory && matchesKeyword;
    });
  }, [mergedLyrics, query, selectedCategory]);

  return (
    <section className="relative space-y-4">
      <LyricsSearch
        value={query}
        onChange={setQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {isLoadingDatabase ? (
        <div className="relative overflow-hidden rounded-[1.35rem] border border-amber-300/12 bg-black/28 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
          <p className="relative z-10 text-xs font-semibold leading-6 text-slate-400">
            Memuat bacaan tambahan dari database...
          </p>
        </div>
      ) : null}

      {databaseError ? (
        <div className="relative overflow-hidden rounded-[1.35rem] border border-red-400/14 bg-red-500/10 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
          <p className="relative z-10 text-xs font-semibold leading-6 text-red-100">
            {databaseError}
          </p>
        </div>
      ) : null}

      <div className="relative z-10 space-y-3">
        {filteredLyrics.length > 0 ? (
          filteredLyrics.map((lyric) => (
            <LyricsCard
              key={`${lyric.source || "file"}-${lyric.id || lyric.slug}`}
              lyric={lyric}
            />
          ))
        ) : (
          <div className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

            <p className="relative z-10 text-sm font-medium leading-7 text-slate-100/85">
              Lirik yang dicari belum tersedia untuk kategori ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}