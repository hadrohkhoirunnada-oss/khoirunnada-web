"use client";

import { useEffect, useState } from "react";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryHighlightCarousel from "@/components/gallery/GalleryHighlightCarousel";

const fallbackImages = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
];

function CloseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m7.25 7.25 9.5 9.5M16.75 7.25l-9.5 9.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getGalleryImage(item, index = 0) {
  return (
    item?.imageUrl ||
    item?.image ||
    item?.src ||
    item?.thumbnail ||
    fallbackImages[index % fallbackImages.length]
  );
}

export default function GalleryGrid({ items }) {
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    if (!selectedGallery) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedGallery(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedGallery]);

  if (!items || items.length === 0) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <div className="relative z-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
            Belum Ada Galeri
          </p>

          <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em] text-white">
            Dokumentasi akan ditampilkan
          </h2>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
            Galeri kegiatan Khoirunnada akan tampil di sini setelah dokumentasi
            resmi tersedia.
          </p>
        </div>
      </section>
    );
  }

  const selectedImage = selectedGallery
    ? getGalleryImage(selectedGallery.item, selectedGallery.index)
    : "";

  return (
    <>
      <section className="space-y-5">
        <GalleryHighlightCarousel items={items} />

        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onOpenPreview={() => setSelectedGallery({ item, index })}
            />
          ))}
        </div>
      </section>

      {selectedGallery ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-5 py-8">
          <button
            type="button"
            aria-label="Tutup popup galeri"
            onClick={() => setSelectedGallery(null)}
            className="absolute inset-0 bg-black/72 backdrop-blur-md"
          />

          <article className="relative z-10 max-h-[88vh] w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-amber-300/20 bg-[#05070b]/95 shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.12),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_48%,rgba(0,0,0,0.22))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

            <div className="relative z-10 max-h-[88vh] overflow-y-auto p-4">
              <div className="flex items-start justify-between gap-4 pb-4">
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
                    Detail Galeri
                  </p>
                  <h2 className="mt-2 line-clamp-2 text-2xl font-black leading-tight tracking-[-0.06em] text-white">
                    {selectedGallery.item.title || "Dokumentasi"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedGallery(null)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-slate-300 shadow-inner shadow-black/25 transition active:scale-95"
                  aria-label="Tutup detail galeri"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-amber-300/14 bg-black/45 shadow-inner shadow-black/35">
                <img
                  src={selectedImage}
                  alt={selectedGallery.item.title || "Dokumentasi Khoirunnada"}
                  className="max-h-[52vh] w-full object-contain"
                />
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-amber-300/12 bg-black/30 p-4">
                <p className="inline-flex rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                  {selectedGallery.item.category || "Galeri"}
                </p>

                <h3 className="mt-4 text-xl font-black leading-tight tracking-[-0.05em] text-white">
                  {selectedGallery.item.title || "Dokumentasi Khoirunnada"}
                </h3>

                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
                  {selectedGallery.item.description ||
                    "Dokumentasi kegiatan Khoirunnada Majelis Sholawat."}
                </p>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}