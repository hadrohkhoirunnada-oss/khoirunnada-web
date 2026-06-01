"use client";

import { useMemo, useState } from "react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

function SearchIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M10.75 17.25a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m15.5 15.5 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5.25 18.75h3.25l9.9-9.9a2.3 2.3 0 0 0-3.25-3.25l-9.9 9.9v3.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m13.75 7 3.25 3.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.75 7.25h10.5M10 4.75h4M9.25 10.25v6M14.75 10.25v6M8 7.25l.65 11a1.5 1.5 0 0 0 1.5 1.4h3.7a1.5 1.5 0 0 0 1.5-1.4l.65-11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

export default function QasidahTable({ items = [] }) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = normalizeText(query);

    if (!keyword) {
      return items;
    }

    return items.filter((item) => {
      const searchableText = [
        item.title,
        item.slug,
        item.category,
        item.qasidahCategory,
        item.shortDescription,
      ]
        .map(normalizeText)
        .join(" ");

      return searchableText.includes(keyword);
    });
  }, [items, query]);

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10 space-y-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
            Data Qasidah
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Daftar lirik dan bacaan yang tersedia.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/35 shadow-lg shadow-black/20">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

          <span className="pointer-events-none absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/12 bg-black/35 text-amber-100/80">
            <SearchIcon className="h-4 w-4" />
          </span>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari judul qasidah..."
            className="relative z-10 min-h-[3.25rem] w-full bg-transparent px-4 pr-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="relative overflow-hidden rounded-[1.35rem] border border-amber-300/12 bg-black/30 p-4 shadow-lg shadow-black/20"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.008)_44%,rgba(0,0,0,0.18))]" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
                        {item.category}
                      </p>

                      <h2 className="mt-2 line-clamp-2 text-base font-black leading-tight tracking-[-0.04em] text-white">
                        {item.title}
                      </h2>

                      <p className="mt-2 line-clamp-1 text-xs font-semibold text-slate-500">
                        {item.qasidahCategory || "qosidah-umum"}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-amber-300/12 bg-black/35 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-amber-100">
                      Aktif
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-300/12 bg-amber-300/10 px-4 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-100 transition active:scale-[0.98]"
                    >
                      <EditIcon className="h-4 w-4" />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="flex min-h-10 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-400/12 bg-red-500/10 text-red-200 transition active:scale-[0.96]"
                      aria-label={`Hapus ${item.title}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <AdminEmptyState
            title="Qasidah Tidak Ditemukan"
            description="Coba gunakan kata kunci lain untuk mencari data qasidah."
          />
        )}
      </div>
    </section>
  );
}