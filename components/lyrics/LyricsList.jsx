"use client";

import { useMemo, useState } from "react";
import LyricsSearch from "@/components/lyrics/LyricsSearch";
import LyricsCard from "@/components/lyrics/LyricsCard";

export default function LyricsList({ lyrics }) {
  const [query, setQuery] = useState("");

  const filteredLyrics = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return lyrics;
    }

    return lyrics.filter((lyric) => {
      return (
        lyric.title.toLowerCase().includes(keyword) ||
        lyric.category.toLowerCase().includes(keyword) ||
        lyric.shortDescription.toLowerCase().includes(keyword)
      );
    });
  }, [lyrics, query]);

  return (
    <section className="space-y-4">
      <LyricsSearch value={query} onChange={setQuery} />

      <div className="space-y-3">
        {filteredLyrics.length > 0 ? (
          filteredLyrics.map((lyric) => (
            <LyricsCard key={lyric.id} lyric={lyric} />
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-amber-300/15 bg-white/[0.035] p-5 text-center">
            <p className="text-sm leading-6 text-slate-300">
              Lirik yang dicari belum tersedia.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}