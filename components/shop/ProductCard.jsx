"use client";

import { useState } from "react";
import ProductDetailModal from "@/components/shop/ProductDetailModal";

function ProductIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

export default function ProductCard({ product }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <article className="relative overflow-hidden rounded-[1.35rem] border border-amber-300/14 bg-black/40 shadow-xl shadow-black/25 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setIsDetailOpen(true)}
          className="relative z-10 block h-full w-full text-left transition active:scale-[0.99]"
          aria-label={`Lihat detail ${product.title}`}
        >
          <div className="relative aspect-square overflow-hidden bg-black/35">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-amber-200/70">
                <ProductIcon className="h-14 w-14" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/58" />

            <span className="absolute left-2 top-2 rounded-full border border-amber-300/28 bg-[#4b3f0d] px-2.5 py-1 text-[0.55rem] font-black uppercase tracking-[0.14em] text-amber-100 shadow-lg shadow-black/25">
              {product.discountLabel}
            </span>
          </div>

          <div className="p-3">
            <h2 className="line-clamp-2 min-h-[2.45rem] text-[0.92rem] font-black leading-tight tracking-[-0.045em] text-white">
              {product.title}
            </h2>

            <div className="mt-3">
              <p className="text-[0.96rem] font-black leading-none tracking-[-0.04em] text-amber-200">
                {product.price}
              </p>

              {product.originalPrice ? (
                <p className="mt-1 text-[0.72rem] font-bold text-slate-500 line-through">
                  {product.originalPrice}
                </p>
              ) : null}
            </div>
          </div>
        </button>
      </article>

      <ProductDetailModal
        product={product}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}