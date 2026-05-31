"use client";

import { useState } from "react";
import ArabicTextBlock from "@/components/lyrics/ArabicTextBlock";
import LyricsActions from "@/components/lyrics/LyricsActions";
import Link from "next/link";

function BackIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.25 6.75 9 12l5.25 5.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookOpenIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.75 6.25c0-.83.67-1.5 1.5-1.5h4.25c.83 0 1.5.67 1.5 1.5v13c0-.83-.67-1.5-1.5-1.5H6.25c-.83 0-1.5-.67-1.5-1.5v-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M19.25 6.25c0-.83-.67-1.5-1.5-1.5H13.5c-.83 0-1.5.67-1.5 1.5v13c0-.83.67-1.5 1.5-1.5h4.25c.83 0 1.5-.67 1.5-1.5v-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.75h1.9M14.1 8.75H16M8 12h1.9M14.1 12H16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.75 13.35 8.7 18.25 10 13.35 11.3 12 16.25 10.65 11.3 5.75 10l4.9-1.3L12 3.75Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M18 14.75 18.7 17.05 21 17.75 18.7 18.45 18 20.75 17.3 18.45 15 17.75l2.3-.7.7-2.3Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReadingModeToggle({ value, onChange }) {
  const modes = [
    {
      id: "normal",
      label: "Normal",
    },
    {
      id: "arab-only",
      label: "Arab Saja",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="relative isolate flex w-full max-w-[292px] overflow-hidden rounded-full border border-amber-300/16 bg-white/[0.035] p-1.5 shadow-xl shadow-black/25 backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.018)_48%,rgba(245,197,66,0.08))]" />
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <span
          className={`absolute bottom-1.5 top-1.5 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 shadow-lg shadow-amber-950/25 transition-all duration-300 ease-out ${
            value === "normal"
              ? "left-1.5 w-[calc(50%-0.375rem)]"
              : "left-1/2 w-[calc(50%-0.375rem)]"
          }`}
        />

        {modes.map((mode) => {
          const isActive = value === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={`relative z-10 min-h-10 flex-1 rounded-full px-3 text-sm font-bold transition active:scale-[0.98] ${
                isActive
                  ? "text-slate-950"
                  : "text-slate-300 hover:text-amber-100"
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LyricsDetail({ lyric }) {
  const [readingMode, setReadingMode] = useState("normal");

  const isArabOnly = readingMode === "arab-only";

  return (
    <article className="space-y-5">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-amber-300/16 bg-black/40 px-5 py-5 text-white shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.095),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.2))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/lirik"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-amber-300/14 bg-black/30 px-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
            >
              <BackIcon className="h-4 w-4" />
              Daftar
            </Link>

            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-amber-300/14 bg-black/30 px-3.5 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl">
              <SparkIcon className="h-3.5 w-3.5" />
              Baca
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
              <BookOpenIcon className="h-5 w-5" />
            </span>

            <p className="text-xs font-extrabold uppercase tracking-[0.36em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              {lyric.category}
            </p>
          </div>

          <h1 className="mt-4 text-[1.95rem] font-black leading-[1.08] tracking-[-0.08em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.68)]">
            {lyric.title}
          </h1>

          <p className="mt-4 max-w-[340px] text-sm font-semibold leading-7 text-slate-300">
            {lyric.shortDescription}
          </p>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-amber-300/32 to-transparent" />
        </div>
      </section>

      <LyricsActions lyric={lyric} />

      <ReadingModeToggle value={readingMode} onChange={setReadingMode} />

      <ArabicTextBlock
        arabicLines={lyric.arabicText}
        latinLines={lyric.latinText}
        arabOnly={isArabOnly}
      />

      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

        <div className="relative z-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
            Terjemahan
          </p>

          <div className="mt-4 space-y-3">
            {lyric.translation.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className="text-sm font-medium leading-7 text-slate-300"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}