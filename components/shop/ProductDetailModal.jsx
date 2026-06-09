"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

function ProductIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m4.75 8.25 7.25-4 7.25 4-7.25 4-7.25-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4.75 8.25v7.5l7.25 4 7.25-4v-7.5M12 12.25v7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StockIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m4.75 8.25 7.25-4 7.25 4-7.25 4-7.25-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4.75 8.25v7.5l7.25 4 7.25-4v-7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 4.25a7.58 7.58 0 0 0-6.5 11.47l-.72 3.5 3.58-.83A7.58 7.58 0 1 0 12 4.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35 8.85c.18-.4.36-.42.58-.42h.45c.15 0 .36.05.55.43.2.38.65 1.3.7 1.4.05.1.08.23.02.36-.07.14-.1.22-.22.35l-.33.38c-.1.12-.22.24-.1.45.12.22.55.9 1.18 1.45.82.73 1.48.96 1.7 1.07.22.1.35.08.48-.05.15-.17.55-.65.7-.88.15-.22.3-.18.5-.1.22.08 1.36.64 1.6.76.23.12.38.18.43.28.05.1.05.58-.13 1.13-.18.55-1.05 1.05-1.45 1.1-.38.05-.88.08-2.84-.75-2.4-1.02-3.92-3.5-4.04-3.66-.12-.15-.96-1.27-.96-2.42 0-1.15.6-1.72.82-1.95.2-.23.45-.3.6-.3"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isMounted || !isOpen || !product) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end justify-center px-4 pb-5 pt-20">
      <button
        type="button"
        aria-label="Tutup detail produk"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <section className="relative z-10 max-h-[82dvh] w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-amber-300/14 bg-[#05070d]/96 shadow-[0_24px_80px_rgba(0,0,0,0.58)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.12),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.24))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

        <div className="relative z-10 flex max-h-[82dvh] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-amber-300/10 px-5 py-4">
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                Detail Produk
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-500">
                Lihat informasi produk sebelum checkout.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail produk"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.96]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto px-5 py-5">
            <div className="relative aspect-square overflow-hidden rounded-[1.45rem] border border-amber-300/12 bg-black/35 shadow-lg shadow-black/30">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-amber-200/70">
                  <ProductIcon className="h-16 w-16" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/12 to-black/75" />

              <span className="absolute left-4 top-4 rounded-full border border-amber-300/28 bg-[#4b3f0d] px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-amber-100 shadow-lg shadow-black/25">
                {product.discountLabel}
              </span>
            </div>

            <div>
              <h3 className="text-[1.45rem] font-black leading-tight tracking-[-0.06em] text-white">
                {product.title}
              </h3>

              <div className="mt-4 flex items-end gap-2">
                <p className="text-[1.18rem] font-black leading-none tracking-[-0.045em] text-amber-200">
                  {product.price}
                </p>

                {product.originalPrice ? (
                  <p className="text-sm font-bold leading-none text-slate-500 line-through">
                    {product.originalPrice}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-300/12 bg-black/30 p-4">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
                Deskripsi Produk
              </p>

              <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-amber-300/12 bg-black/30 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/14 bg-black/35 text-amber-200">
                <StockIcon className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                  Jumlah Produk Tersedia
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {product.stock}
                </p>
              </div>
            </div>

            {product.checkoutUrl ? (
              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border border-emerald-400/18 bg-emerald-400/12 px-4 text-sm font-black text-emerald-50 shadow-lg shadow-black/20 transition active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5 text-emerald-300" />
                Checkout
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex min-h-14 w-full items-center justify-center rounded-2xl border border-amber-300/10 bg-white/[0.025] px-4 text-sm font-black text-slate-500"
              >
                Checkout Belum Tersedia
              </button>
            )}
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}