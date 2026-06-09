"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deleteQasidahItem } from "@/services/qasidahService";

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

function BookIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.75 4.75h7.5a3 3 0 0 1 3 3v11.5H9.75a3 3 0 0 0-3 3V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 18.25h10.5M10 8.25h4M10 11.25h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M3.75 12s2.85-5.75 8.25-5.75S20.25 12 20.25 12s-2.85 5.75-8.25 5.75S3.75 12 3.75 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
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

function getItemCategory(item) {
  return item.category || item.type || "Qasidah";
}

function getItemCollection(item) {
  return item.qasidahCategory || item.collectionTitle || "qosidah-umum";
}

function getPreviewHref(item) {
  if (!item?.slug) {
    return "/lirik";
  }

  return `/lirik/${item.slug}`;
}

function isFirestoreItem(item) {
  return item?.source === "firestore";
}

function getItemKey(item, index) {
  return item.id || item.slug || `${item.title}-${index}`;
}

export default function QasidahTable({
  items = [],
  isLoading = false,
  onEdit,
  onDeleted,
}) {
  const [query, setQuery] = useState("");
  const [deletedIds, setDeletedIds] = useState([]);
  const [deletingId, setDeletingId] = useState("");
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const visibleItems = useMemo(() => {
    if (deletedIds.length === 0) {
      return items;
    }

    return items.filter((item) => !deletedIds.includes(item.id));
  }, [items, deletedIds]);

  const filteredItems = useMemo(() => {
    const keyword = normalizeText(query);

    if (!keyword) {
      return visibleItems;
    }

    return visibleItems.filter((item) => {
      const searchableText = [
        item.title,
        item.slug,
        getItemCategory(item),
        getItemCollection(item),
        item.shortDescription,
        item.description,
      ]
        .map(normalizeText)
        .join(" ");

      return searchableText.includes(keyword);
    });
  }, [visibleItems, query]);

  const handleEdit = (item) => {
    if (!isFirestoreItem(item)) {
      setMessage({
        type: "info",
        text: "Data dari file hanya bisa diedit langsung melalui code editor.",
      });
      return;
    }

    if (!onEdit) {
      setMessage({
        type: "info",
        text: "Fitur edit data DB akan disambungkan pada tahap berikutnya.",
      });
      return;
    }

    onEdit(item);
  };

  const handleDelete = async (item) => {
    if (!isFirestoreItem(item)) {
      setMessage({
        type: "info",
        text: "Data dari file tidak bisa dihapus dari admin panel. Hapus melalui code editor.",
      });
      return;
    }

    const isConfirmed = window.confirm(
      `Hapus qasidah "${item.title}" dari database?`
    );

    if (!isConfirmed) {
      return;
    }

    setDeletingId(item.id);
    setMessage({
      type: "",
      text: "",
    });

    try {
      await deleteQasidahItem(item.id);

      setDeletedIds((currentIds) => [...currentIds, item.id]);
      setMessage({
        type: "success",
        text: `Qasidah "${item.title}" berhasil dihapus dari database.`,
      });

      onDeleted?.(item.id);
    } catch (error) {
      console.error("Gagal menghapus qasidah:", error);

      setMessage({
        type: "error",
        text: error.message || "Gagal menghapus qasidah dari database.",
      });
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Data Qasidah
            </p>

            <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              Daftar Bacaan
            </h2>

            <p className="mt-2 text-xs font-semibold leading-6 text-slate-500">
              Cari, preview, edit, atau hapus data qasidah dari daftar ini.
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-amber-300/14 bg-black/35 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-amber-100">
            {isLoading ? "..." : `${filteredItems.length}/${visibleItems.length}`}
          </span>
        </div>

        {message.text ? (
          <div
            className={`rounded-2xl border px-4 py-3 ${
              message.type === "success"
                ? "border-emerald-400/14 bg-emerald-400/10"
                : message.type === "error"
                  ? "border-red-400/14 bg-red-500/10"
                  : "border-amber-300/14 bg-amber-300/10"
            }`}
          >
            <p
              className={`text-xs font-semibold leading-6 ${
                message.type === "success"
                  ? "text-emerald-100"
                  : message.type === "error"
                    ? "text-red-100"
                    : "text-amber-100"
              }`}
            >
              {message.text}
            </p>
          </div>
        ) : null}

        <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/35 shadow-lg shadow-black/20">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

          <span className="pointer-events-none absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/12 bg-black/35 text-amber-100/80">
            <SearchIcon className="h-4 w-4" />
          </span>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari judul, kategori, atau slug..."
            className="relative z-10 min-h-[3.3rem] w-full bg-transparent px-4 pr-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {isLoading ? (
          <div className="rounded-[1.45rem] border border-amber-300/12 bg-black/30 p-5">
            <p className="text-sm font-bold text-slate-400">
              Memuat data qasidah...
            </p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map((item, index) => {
              const category = getItemCategory(item);
              const collection = getItemCollection(item);
              const previewHref = getPreviewHref(item);
              const isDbItem = isFirestoreItem(item);
              const isDeleting = deletingId === item.id;

              return (
                <article
                  key={getItemKey(item, index)}
                  className="relative overflow-hidden rounded-[1.45rem] border border-amber-300/12 bg-black/30 p-4 shadow-lg shadow-black/20"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.008)_44%,rgba(0,0,0,0.18))]" />
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/12 bg-black/35 text-amber-200 shadow-inner shadow-black/20">
                        <BookIcon className="h-5 w-5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                                {category}
                              </p>

                              <span
                                className={`rounded-full border px-2 py-0.5 text-[0.52rem] font-black uppercase tracking-[0.14em] ${
                                  isDbItem
                                    ? "border-sky-300/14 bg-sky-400/10 text-sky-100"
                                    : "border-amber-300/12 bg-amber-300/10 text-amber-100"
                                }`}
                              >
                                {isDbItem ? "DB" : "FILE"}
                              </span>
                            </div>

                            <h3 className="mt-2 line-clamp-2 text-base font-black leading-tight tracking-[-0.04em] text-white">
                              {item.title}
                            </h3>
                          </div>

                          <span
                            className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] ${
                              item.status === "draft"
                                ? "border-amber-300/14 bg-amber-300/10 text-amber-100"
                                : "border-emerald-400/14 bg-emerald-400/10 text-emerald-100"
                            }`}
                          >
                            {item.status === "draft" ? "Draft" : "Aktif"}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-amber-300/10 bg-black/30 px-2.5 py-1 text-[0.62rem] font-bold text-slate-400">
                            {collection}
                          </span>

                          {item.slug ? (
                            <span className="max-w-full truncate rounded-full border border-amber-300/10 bg-black/30 px-2.5 py-1 text-[0.62rem] font-bold text-slate-500">
                              /{item.slug}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Link
                        href={previewHref}
                        className="flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-emerald-400/12 bg-emerald-400/10 px-3 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-emerald-100 transition active:scale-[0.98]"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        Preview
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className={`flex min-h-9 items-center justify-center gap-1.5 rounded-xl border px-3 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] transition active:scale-[0.98] ${
                          isDbItem
                            ? "border-amber-300/12 bg-amber-300/10 text-amber-100"
                            : "border-white/8 bg-white/[0.025] text-slate-500"
                        }`}
                      >
                        <EditIcon className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        disabled={!isDbItem || isDeleting}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition active:scale-[0.96] disabled:cursor-not-allowed ${
                          isDbItem
                            ? "border-red-400/12 bg-red-500/10 text-red-200 disabled:opacity-60"
                            : "border-white/8 bg-white/[0.025] text-slate-600"
                        }`}
                        aria-label={`Hapus ${item.title}`}
                        title={
                          isDbItem
                            ? "Hapus data dari database"
                            : "Data file hanya bisa dihapus lewat code editor"
                        }
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
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