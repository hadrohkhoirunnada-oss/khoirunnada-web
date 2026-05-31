"use client";

import { useState } from "react";

const FILTER_CATEGORIES = [
  {
    label: "Semua Kategori",
    value: "all",
  },
  {
    label: "Qosidah Umum",
    value: "qosidah-umum",
  },
  {
    label: "Qosidah Jawa",
    value: "qosidah-jawa",
  },
  {
    label: "Maulid Lengkap",
    value: "maulid-lengkap",
  },
  {
    label: "Qosidah Yamani",
    value: "qosidah-yamani",
  },
];

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

function FilterIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 7h13.5M8 12h8M10.75 17h2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.75 12.35 3.15 3.15 7.35-7.35"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LyricsSearch({
  value,
  onChange,
  selectedCategory = "all",
  onCategoryChange,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeCategory =
    FILTER_CATEGORIES.find((item) => item.value === selectedCategory) ||
    FILTER_CATEGORIES[0];

  const handleCategoryChange = (categoryValue) => {
    onCategoryChange?.(categoryValue);
    setIsFilterOpen(false);
  };

  return (
    <div className="relative z-50 overflow-visible rounded-[1.65rem] border border-amber-300/15 bg-black/30 p-4 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] bg-[radial-gradient(circle_at_12%_0%,rgba(245,197,66,0.11),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.014)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.075),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

      <div className="relative z-20">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              Cari Lirik
            </p>

            <p className="mt-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              Temukan qasidah cepat
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((current) => !current)}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border bg-black/35 text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-95 ${
                isFilterOpen
                  ? "border-amber-300/45 bg-amber-300/10 shadow-[0_0_24px_rgba(245,197,66,0.12)]"
                  : "border-amber-300/16"
              }`}
              aria-label="Filter kategori lirik"
              aria-expanded={isFilterOpen}
            >
              <FilterIcon className="h-5 w-5" />
            </button>

            {isFilterOpen ? (
              <div className="absolute right-0 top-full z-[999] mt-2 w-[225px] overflow-hidden rounded-2xl border border-amber-300/18 bg-[#070910]/98 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.018)_44%,rgba(0,0,0,0.25))]" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

                <div className="relative z-10 space-y-1">
                  {FILTER_CATEGORIES.map((category) => {
                    const isActive = category.value === selectedCategory;

                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => handleCategoryChange(category.value)}
                        className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-xs font-extrabold transition active:scale-[0.99] ${
                          isActive
                            ? "bg-amber-300/14 text-amber-100"
                            : "text-slate-200 hover:bg-white/[0.045]"
                        }`}
                      >
                        <span className="min-w-0 flex-1 truncate">
                          {category.label}
                        </span>

                        {isActive ? (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-300/18 bg-black/30 text-amber-200">
                            <CheckIcon className="h-3.5 w-3.5" />
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex max-w-full rounded-full border border-amber-300/12 bg-black/25 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-amber-200/90">
            {activeCategory.label}
          </span>

          <span className="h-px flex-1 bg-gradient-to-r from-amber-300/18 to-transparent" />
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-amber-300/14 bg-black/38 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/45 focus-within:bg-black/48 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.18))]" />
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

          <input
            id="lyrics-search"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Cari judul qasidah..."
            className="relative z-10 min-h-13 w-full bg-transparent px-4 pr-12 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
          />

          <span className="pointer-events-none absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/14 bg-black/35 text-amber-100 shadow-inner shadow-black/25">
            <SearchIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}