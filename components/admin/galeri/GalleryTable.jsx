"use client";

import { useEffect, useMemo, useState } from "react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deleteGalleryItem } from "@/services/galleryService";

const HIGHLIGHT_LIMIT = 10;

const fallbackImages = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
];

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

function StarIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m12 4.75 2.05 4.15 4.58.67-3.32 3.23.78 4.57L12 15.22l-4.09 2.15.78-4.57-3.32-3.23 4.58-.67L12 4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function getGalleryImage(item, index) {
  return (
    item?.imageUrl ||
    item?.image ||
    item?.src ||
    item?.thumbnail ||
    fallbackImages[index % fallbackImages.length]
  );
}

function getHighlightCount(items) {
  return items.filter((item) => item?.isHighlight).length;
}

function dispatchHighlightStats(items) {
  window.dispatchEvent(
    new CustomEvent("khoirunnada-gallery-highlight-stats", {
      detail: {
        count: getHighlightCount(items),
        limit: HIGHLIGHT_LIMIT,
      },
    })
  );
}

export default function GalleryTable({ items = [] }) {
  const [query, setQuery] = useState("");
  const [galleryItems, setGalleryItems] = useState(items);
  const [deletingId, setDeletingId] = useState("");
  const [activeEditId, setActiveEditId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    setGalleryItems(items);
  }, [items]);

  useEffect(() => {
    dispatchHighlightStats(galleryItems);
  }, [galleryItems]);

  useEffect(() => {
    function handleStatsRequest() {
      dispatchHighlightStats(galleryItems);
    }

    window.addEventListener(
      "khoirunnada-gallery-highlight-stats-request",
      handleStatsRequest
    );

    return () => {
      window.removeEventListener(
        "khoirunnada-gallery-highlight-stats-request",
        handleStatsRequest
      );
    };
  }, [galleryItems]);

  useEffect(() => {
    function handleCreated(event) {
      const item = event.detail?.item;

      if (!item?.id) {
        return;
      }

      setGalleryItems((currentItems) => {
        const exists = currentItems.some(
          (currentItem) => currentItem.id === item.id
        );

        if (exists) {
          return currentItems;
        }

        return [item, ...currentItems];
      });

      setMessageType("success");
      setMessage("Data galeri baru sudah masuk ke tabel.");
    }

    function handleUpdated(event) {
      const item = event.detail?.item;

      if (!item?.id) {
        return;
      }

      setGalleryItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.id === item.id
            ? {
                ...currentItem,
                ...item,
                image: item.imageUrl || item.image || currentItem.image,
                isHighlight: Boolean(item.isHighlight),
              }
            : currentItem
        )
      );

      setActiveEditId("");
      setMessageType("success");
      setMessage("Data galeri di tabel sudah diperbarui.");
    }

    window.addEventListener("khoirunnada-gallery-created", handleCreated);
    window.addEventListener("khoirunnada-gallery-updated", handleUpdated);

    return () => {
      window.removeEventListener("khoirunnada-gallery-created", handleCreated);
      window.removeEventListener("khoirunnada-gallery-updated", handleUpdated);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = normalizeText(query);

    if (!keyword) {
      return galleryItems;
    }

    return galleryItems.filter((item) => {
      const searchableText = [item.title, item.category, item.description]
        .map(normalizeText)
        .join(" ");

      return searchableText.includes(keyword);
    });
  }, [galleryItems, query]);

  function handleEdit(item) {
    if (!item?.id) {
      setMessageType("error");
      setMessage("ID galeri tidak valid.");
      return;
    }

    setActiveEditId(item.id);
    setMessageType("info");
    setMessage("Data dipindahkan ke form utama untuk diedit.");

    window.dispatchEvent(
      new CustomEvent("khoirunnada-gallery-edit", {
        detail: {
          item,
          highlightCount: getHighlightCount(galleryItems),
          highlightLimit: HIGHLIGHT_LIMIT,
        },
      })
    );
  }

  async function deleteSupabaseImage(imagePath) {
    const cleanImagePath = String(imagePath || "").trim();

    if (!cleanImagePath) {
      return;
    }

    const response = await fetch("/api/gallery/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imagePath: cleanImagePath }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message || "Gagal menghapus gambar dari Supabase."
      );
    }
  }

  async function handleDelete(item) {
    const galleryId = String(item?.id || "").trim();

    if (!galleryId) {
      setMessageType("error");
      setMessage("ID galeri tidak valid.");
      return;
    }

    const isConfirmed = window.confirm(
      `Hapus galeri "${item?.title || "Dokumentasi"}"? Data Firestore dan gambar Supabase akan dihapus.`
    );

    if (!isConfirmed) {
      return;
    }

    setDeletingId(galleryId);
    setMessageType("info");
    setMessage("Menghapus galeri...");

    try {
      if (item?.imagePath) {
        await deleteSupabaseImage(item.imagePath);
      }

      await deleteGalleryItem(galleryId);

      setGalleryItems((currentItems) =>
        currentItems.filter((galleryItem) => galleryItem.id !== galleryId)
      );

      if (activeEditId === galleryId) {
        setActiveEditId("");
      }

      window.dispatchEvent(
        new CustomEvent("khoirunnada-gallery-deleted", {
          detail: { id: galleryId },
        })
      );

      setMessageType("success");
      setMessage("Galeri berhasil dihapus dari Firestore dan Supabase.");
    } catch (error) {
      console.error("Gagal menghapus galeri:", error);

      setMessageType("error");
      setMessage(error?.message || "Gagal menghapus galeri.");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10 space-y-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
            Data Galeri
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Daftar dokumentasi yang tersedia.
          </p>

          <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/80">
            Highlight {getHighlightCount(galleryItems)} / {HIGHLIGHT_LIMIT}
          </p>
        </div>

        {message ? (
          <div
            className={`rounded-2xl border px-4 py-3 ${
              messageType === "error"
                ? "border-red-300/16 bg-red-500/10"
                : messageType === "success"
                  ? "border-emerald-300/16 bg-emerald-500/10"
                  : "border-amber-300/12 bg-amber-300/[0.055]"
            }`}
          >
            <p
              className={`text-xs font-semibold leading-6 ${
                messageType === "error"
                  ? "text-red-100"
                  : messageType === "success"
                    ? "text-emerald-100"
                    : "text-amber-100"
              }`}
            >
              {message}
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
            placeholder="Cari dokumentasi..."
            className="relative z-10 min-h-[3.25rem] w-full bg-transparent px-4 pr-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item, index) => {
              const isDeleting = deletingId === item.id;
              const isEditing = activeEditId === item.id;

              return (
                <article
                  key={item.id || `${item.title}-${index}`}
                  className={`group relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border bg-black/30 shadow-lg shadow-black/20 ${
                    isEditing
                      ? "border-amber-300/45"
                      : "border-amber-300/12"
                  }`}
                >
                  <img
                    src={getGalleryImage(item, index)}
                    alt={item.title || "Dokumentasi Khoirunnada"}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-active:scale-105"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.48)_42%,rgba(0,0,0,0.92)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.14),transparent_42%)]" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-3">
                    <div className="flex flex-wrap gap-2">
                      <p className="inline-flex rounded-full border border-amber-300/16 bg-black/35 px-3 py-1 text-[0.55rem] font-extrabold uppercase tracking-[0.16em] text-amber-200">
                        {item.category || "Galeri"}
                      </p>

                      {item.isHighlight ? (
                        <p className="inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-amber-300/14 px-3 py-1 text-[0.55rem] font-extrabold uppercase tracking-[0.14em] text-amber-100">
                          <StarIcon className="h-3 w-3" />
                          Highlight
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <h2 className="line-clamp-2 text-sm font-black leading-tight tracking-[-0.04em] text-white">
                        {item.title}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-[0.7rem] font-semibold leading-5 text-slate-200/85">
                        {item.description || "Dokumentasi kegiatan Khoirunnada."}
                      </p>

                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-amber-300/14 bg-amber-300/10 px-3 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-amber-100 transition active:scale-[0.98]"
                        >
                          <EditIcon className="h-3.5 w-3.5" />
                          {isEditing ? "Dipilih" : "Edit"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          disabled={isDeleting}
                          className="flex min-h-9 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/12 bg-red-500/10 text-red-200 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Hapus ${item.title}`}
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <AdminEmptyState
            title="Galeri Tidak Ditemukan"
            description="Coba gunakan kata kunci lain untuk mencari dokumentasi."
          />
        )}
      </div>
    </section>
  );
}