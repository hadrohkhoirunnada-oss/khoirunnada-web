"use client";

import { useEffect, useMemo, useState } from "react";

const HIGHLIGHT_LIMIT = 10;

export default function GalleryHighlightCarousel({ items = [] }) {
  const slides = useMemo(() => {
    return items
      .filter((item) => item?.isHighlight)
      .slice(0, HIGHLIGHT_LIMIT)
      .map((item, index) => ({
        id: item.id || `gallery-highlight-${index}`,
        image: item.image || item.imageUrl,
      }))
      .filter((slide) => Boolean(slide.image));
  }, [items]);

  const loopSlides = slides.length > 1 ? [...slides, slides[0]] : slides;

  const [activeIndex, setActiveIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    setWithTransition(false);
    setActiveIndex(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setWithTransition(true);
      });
    });
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setWithTransition(true);
      setActiveIndex((current) => {
        if (current >= slides.length) {
          return current;
        }

        return current + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

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