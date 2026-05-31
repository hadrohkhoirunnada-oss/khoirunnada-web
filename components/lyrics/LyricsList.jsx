"use client";

import { useMemo, useState } from "react";
import LyricsSearch from "@/components/lyrics/LyricsSearch";
import LyricsCard from "@/components/lyrics/LyricsCard";

export default function LyricsList({ lyrics }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredLyrics = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return lyrics.filter((lyric) => {
      const arabicText = Array.isArray(lyric.arabicText)
        ? lyric.arabicText.join(" ")
        : "";

      const latinText = Array.isArray(lyric.latinText)
        ? lyric.latinText.join(" ")
        : "";

      const translation = Array.isArray(lyric.translation)
        ? lyric.translation.join(" ")
        : "";

      const qasidahCategory = lyric.qasidahCategory || "qosidah-umum";

      const matchesCategory =
        selectedCategory === "all" || qasidahCategory === selectedCategory;

      const matchesKeyword =
        !keyword ||
        lyric.title.toLowerCase().includes(keyword) ||
        lyric.category.toLowerCase().includes(keyword) ||
        lyric.shortDescription.toLowerCase().includes(keyword) ||
        arabicText.toLowerCase().includes(keyword) ||
        latinText.toLowerCase().includes(keyword) ||
        translation.toLowerCase().includes(keyword);

      return matchesCategory && matchesKeyword;
    });
  }, [lyrics, query, selectedCategory]);

  return (
    <section className="relative space-y-4">
      <LyricsSearch
        value={query}
        onChange={setQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="relative z-10 space-y-3">
        {filteredLyrics.length > 0 ? (
          filteredLyrics.map((lyric) => (
            <LyricsCard key={lyric.id} lyric={lyric} />
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