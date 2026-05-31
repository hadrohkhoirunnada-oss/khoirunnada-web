"use client";

import { useEffect, useMemo, useState } from "react";

const fallbackImages = [
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
];

export default function GalleryHighlightCarousel({ items = [] }) {
  const slides = useMemo(() => {
    const itemImages = items
      .slice(0, 10)
      .map((item) => item.image)
      .filter(Boolean);

    const mergedImages = [...itemImages, ...fallbackImages].slice(0, 10);

    return mergedImages.map((image, index) => ({
      id: `gallery-highlight-${index}`,
      image,
    }));
  }, [items]);

  const loopSlides = slides.length > 0 ? [...slides, slides[0]] : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timer = setInterval(() => {
      setWithTransition(true);
      setActiveIndex((current) => current + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTransitionEnd = () => {
    if (activeIndex === slides.length) {
      setWithTransition(false);
      setActiveIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
    }
  };

  const visibleIndex = activeIndex === slides.length ? 0 : activeIndex;

  return (
    <section className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/15 bg-black/38 p-4 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.1),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.2))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300">
              Sorotan Galeri
            </p>
            <p className="mt-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              Momen Khoirunnada
            </p>
          </div>

          <span className="rounded-full border border-amber-300/14 bg-black/30 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
            {String(visibleIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-[1.35rem] border border-amber-300/12 bg-black/40 shadow-inner shadow-black/30">
          <div
            className={`flex h-full ${
              withTransition ? "transition-transform duration-700 ease-out" : ""
            }`}
            style={{
              width: `${loopSlides.length * 100}%`,
              transform: `translateX(-${
                activeIndex * (100 / loopSlides.length)
              }%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopSlides.map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="relative h-full shrink-0 overflow-hidden"
                style={{ width: `${100 / loopSlides.length}%` }}
              >
                <img
                  src={slide.image}
                  alt="Momen kegiatan Khoirunnada"
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/28" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.14),transparent_52%)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={`h-1.5 rounded-full transition-all ${
                visibleIndex === index
                  ? "w-8 bg-amber-300"
                  : "w-1.5 bg-amber-300/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}