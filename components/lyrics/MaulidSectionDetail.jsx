"use client";

import { useState } from "react";
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

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 6.75 15.25 12l-5.5 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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
          className={`absolute bottom-1.5 top-1.5 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 shadow-lg shadow-amber-950/25 transition-all duration-300 ease-out ${value === "normal"
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
              className={`relative z-10 min-h-10 flex-1 rounded-full px-3 text-sm font-bold transition active:scale-[0.98] ${isActive
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

function TextBlock({ section, arabOnly }) {
  const arabicLines = Array.isArray(section.arabicText)
    ? section.arabicText
    : [];

  const latinLines = Array.isArray(section.latinText)
    ? section.latinText
    : [];

  const translationLines = Array.isArray(section.translation)
    ? section.translation
    : [];

  const hasContent =
    arabicLines.length > 0 ||
    latinLines.length > 0 ||
    translationLines.length > 0;

  if (!hasContent) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

        <p className="relative z-10 text-sm font-medium leading-7 text-slate-100/85">
          Teks bagian ini belum tersedia. Nanti bacaan akan ditambahkan dalam
          format Arab, latin, dan terjemahan.
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[1.9rem] border border-amber-300/15 bg-black/38 px-5 py-6 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10 space-y-8">
        {arabicLines.length > 0 ? (
          <div
            className="font-arabic space-y-4 text-right"
            dir="rtl"
            lang="ar"
          >
            {arabicLines.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className="text-[1.9rem] font-semibold leading-[3.35rem] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)]"
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}

        {!arabOnly && latinLines.length > 0 ? (
          <div className="space-y-3 border-t border-amber-300/10 pt-6">
            {latinLines.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className="text-[0.98rem] font-semibold leading-7 text-emerald-300/90"
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}

        {!arabOnly && translationLines.length > 0 ? (
          <div className="space-y-3 border-t border-amber-300/10 pt-6">
            {translationLines.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className="text-sm font-medium leading-7 text-slate-300"
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SectionNavigation({ maulid, previousSection, nextSection }) {
  return (
    <nav className="flex justify-center pt-1">
      <div className="grid w-full max-w-[340px] grid-cols-2 gap-3">
        {previousSection ? (
          <Link
            href={`/lirik/${maulid.slug}/${previousSection.slug}`}
            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-300/14 bg-black/30 px-4 text-sm font-bold text-amber-100 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
          >
            <BackIcon className="h-4 w-4" />
            Sebelumnya
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="min-h-12 rounded-2xl border border-amber-300/8 bg-white/[0.02] px-4 text-sm font-bold text-slate-600"
          >
            Sebelumnya
          </button>
        )}

        {nextSection ? (
          <Link
            href={`/lirik/${maulid.slug}/${nextSection.slug}`}
            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-300/14 bg-black/30 px-4 text-sm font-bold text-amber-100 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
          >
            Berikutnya
            <ArrowIcon className="h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="min-h-12 rounded-2xl border border-amber-300/8 bg-white/[0.02] px-4 text-sm font-bold text-slate-600"
          >
            Berikutnya
          </button>
        )}
      </div>
    </nav>
  );
}

export default function MaulidSectionDetail({
  maulid,
  section,
  sectionIndex,
  totalSections,
  previousSection,
  nextSection,
}) {
  const [readingMode, setReadingMode] = useState("normal");
  const isArabOnly = readingMode === "arab-only";

  return (
    <article className="space-y-5">
      <section className="relative isolate -mx-5 overflow-hidden px-5 pb-7 pt-5">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.006)_24%,rgba(0,0,0,0.16)_58%,rgba(0,0,0,0.26)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-7rem] -z-10 h-80 w-[140%] -translate-x-1/2 rounded-full bg-white/[0.018] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/24 to-transparent" />

        <div className="relative z-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-start gap-3">
            <Link
              href={`/lirik/${maulid.slug}`}
              aria-label="Kembali ke daftar bagian"
              className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/10 bg-black/35 text-amber-200/75 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.96]"
            >
              <BackIcon className="h-4.5 w-4.5" />
            </Link>

            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-200/75">
                {maulid.title}
              </p>

              <h1 className="mt-3 text-[1.85rem] font-black leading-[1.08] tracking-[-0.075em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
                {section.title}
              </h1>
            </div>

            <span className="mt-1 shrink-0 rounded-full border border-amber-300/10 bg-black/35 px-3 py-1.5 text-[0.68rem] font-extrabold text-amber-200/75 shadow-lg shadow-black/20 backdrop-blur-xl">
              {sectionIndex + 1}/{totalSections}
            </span>
          </div>
        </div>
      </section>

      <ReadingModeToggle value={readingMode} onChange={setReadingMode} />

      <TextBlock section={section} arabOnly={isArabOnly} />

      <SectionNavigation
        maulid={maulid}
        previousSection={previousSection}
        nextSection={nextSection}
      />
    </article>
  );
}