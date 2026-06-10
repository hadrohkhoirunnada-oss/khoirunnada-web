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

function isOutOfStock(product = {}) {
  if (product.status === "sold-out") {
    return true;
  }

  if (product.stock === 0 || product.stock === "0") {
    return true;
  }

  const stockText = String(product.stock ?? "").trim().toLowerCase();

  return stockText === "habis" || stockText.includes("stok habis");
}

function getMainBadge(product = {}) {
  if (product.status === "coming-soon") {
    return {
      label: "Coming Soon",
      className: "border-amber-300/28 bg-[#4b3f0d] text-amber-100",
    };
  }

  if (isOutOfStock(product)) {
    return {
      label: "Stok Habis",
      className: "border-red-300/24 bg-red-950/70 text-red-100",
    };
  }

  const discountLabel = product.discountLabel || product.discount || "";

  if (discountLabel) {
    return {
      label: discountLabel,
      className: "border-amber-300/28 bg-[#4b3f0d] text-amber-100",
    };
  }

  return null;
}

export default function ProductCard({ product }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const title = product.title || "Produk Khoirunnada";
  const imageUrl = product.imageUrl || product.image || "";
  const badge = getMainBadge(product);

  return (
    <>
      <article className="relative overflow-hidden rounded-[1.35rem] border border-amber-300/14 bg-black/40 shadow-xl shadow-black/25 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setIsDetailOpen(true)}
          className="relative z-10 block h-full w-full text-left transition active:scale-[0.99]"
          aria-label={`Lihat detail ${title}`}
        >
          <div className="relative aspect-square overflow-hidden bg-black/35">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-amber-200/70">
                <ProductIcon className="h-14 w-14" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/58" />

            {badge ? (
              <span
                className={`absolute left-2 top-2 rounded-full border px-2.5 py-1 text-[0.55rem] font-black uppercase tracking-[0.14em] shadow-lg shadow-black/25 backdrop-blur-xl ${badge.className}`}
              >
                {badge.label}
              </span>
            ) : null}
          </div>

          <div className="p-3">
            <h2 className="line-clamp-2 min-h-[2.45rem] text-[0.92rem] font-black leading-tight tracking-[-0.045em] text-white">
              {title}
            </h2>

            <div className="mt-3">
              <p className="text-[0.96rem] font-black leading-none tracking-[-0.04em] text-amber-200">
                {product.price || "Hubungi Admin"}
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
        product={{
          ...product,
          title,
          image: imageUrl,
          imageUrl,
          discountLabel: product.discountLabel || product.discount || "",
        }}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}