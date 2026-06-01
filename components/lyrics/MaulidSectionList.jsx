"use client";

import { useMemo, useState } from "react";
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

function BookIcon({ className = "" }) {
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
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 17.25a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m15.75 15.75 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
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

export default function MaulidSectionList({ maulid }) {
  const [query, setQuery] = useState("");

  const sections = Array.isArray(maulid.sections) ? maulid.sections : [];

  const filteredSections = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return sections;
    }

    return sections.filter((section) => {
      const title = section.title || "";
      const arabicText = Array.isArray(section.arabicText)
        ? section.arabicText.join(" ")
        : "";
      const latinText = Array.isArray(section.latinText)
        ? section.latinText.join(" ")
        : "";
      const translation = Array.isArray(section.translation)
        ? section.translation.join(" ")
        : "";

      return (
        title.toLowerCase().includes(keyword) ||
        arabicText.toLowerCase().includes(keyword) ||
        latinText.toLowerCase().includes(keyword) ||
        translation.toLowerCase().includes(keyword)
      );
    });
  }, [sections, query]);

  return (
    <article className="space-y-5">
      <section className="relative isolate -mx-5 overflow-hidden px-5 pb-7 pt-4">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(245,197,66,0.028)_0%,rgba(245,197,66,0.01)_28%,rgba(0,0,0,0.13)_58%,rgba(0,0,0,0.24)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-7rem] -z-10 h-80 w-[140%] -translate-x-1/2 rounded-full bg-amber-300/[0.035] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/24 to-transparent" />

        <div className="relative z-10">
          <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-3">
            <Link
              href="/lirik/maulid"
              aria-label="Kembali ke daftar maulid"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/10 bg-black/32 text-amber-200/80 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.96]"
            >
              <BackIcon className="h-4.5 w-4.5" />
            </Link>

            <div className="min-w-0 text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.36em] text-amber-300/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                Maulid Lengkap
              </p>
              <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-500">
                Bacaan Per Bagian
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/12 bg-black/35 text-amber-200/80 shadow-inner shadow-black/25">
              <BookIcon className="h-5 w-5" />
            </span>
          </div>

          <h1 className="mt-5 text-[2.05rem] font-black leading-[1.05] tracking-[-0.085em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
            {maulid.title}
          </h1>

          <p className="mt-4 max-w-[340px] text-sm font-semibold leading-7 text-slate-300">
            {maulid.shortDescription}
          </p>

          <div className="relative mt-5 overflow-hidden rounded-2xl border border-amber-300/14 bg-black/38 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/45 focus-within:bg-black/48 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.18))]" />
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari bagian maulid..."
              className="relative z-10 min-h-13 w-full bg-transparent px-4 pr-12 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
            />

            <span className="pointer-events-none absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/14 bg-black/35 text-amber-100 shadow-inner shadow-black/25">
              <SearchIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <Link
              key={section.id || section.slug || index}
              href={`/lirik/${maulid.slug}/${section.slug}`}
              className="group relative flex min-h-16 items-center gap-4 overflow-hidden rounded-[1.35rem] border border-amber-300/12 bg-black/32 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.99]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_48%,rgba(0,0,0,0.18))]" />
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-sm font-black text-amber-200 shadow-inner shadow-black/25">
                {String(section.number || index + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 min-w-0 flex-1">
                <h2 className="line-clamp-1 text-[0.98rem] font-black tracking-[-0.04em] text-white">
                  {section.title}
                </h2>

                {section.shortTitle ? (
                  <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-500">
                    {section.shortTitle}
                  </p>
                ) : null}
              </div>

              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/14 bg-black/28 text-amber-200 transition group-active:translate-x-0.5">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </Link>
          ))
        ) : (
          <div className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

            <p className="relative z-10 text-sm font-medium leading-7 text-slate-100/85">
              Bagian Maulid belum tersedia. Nanti teks akan ditambahkan per
              bagian agar nyaman dibaca.
            </p>
          </div>
        )}
      </section>
    </article>
  );
}