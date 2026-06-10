"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { getShopProducts } from "@/services/shopProductService";

function EmptyShopIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 9.25h10.5l-.75 10H7.5l-.75-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.25V7.75a3 3 0 0 1 6 0v1.5M5.25 9.25h13.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoadingIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5.25 12A6.75 6.75 0 0 1 17.7 8.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M18.25 5.75v4h-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 12A6.75 6.75 0 0 1 6.3 15.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.75 18.25v-4h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPrice(value = "") {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return "";
  }

  if (rawValue.toLowerCase().startsWith("rp")) {
    return rawValue;
  }

  const numberValue = Number(rawValue.replace(/[^\d]/g, ""));

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    return rawValue;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(numberValue)
    .replace(/\s/g, "");
}

function normalizeProduct(product = {}, source = "file") {
  const imageUrl =
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    product.photoUrl ||
    "";

  return {
    ...product,
    id: product.id || product.slug || `${source}-${product.title || "produk"}`,
    source: product.source || source,
    title: product.title || product.name || "Produk Khoirunnada",
    category: product.category || "Katalog",
    status: product.status || "published",
    price: formatPrice(product.price || product.salePrice),
    originalPrice: formatPrice(
      product.originalPrice || product.normalPrice || product.strikePrice
    ),
    discountLabel: product.discountLabel || product.discount || "",
    image: imageUrl,
    imageUrl,
    description:
      product.description ||
      product.shortDescription ||
      "Belum ada deskripsi produk.",
    stock: product.stock === 0 ? 0 : product.stock || product.stockLabel || "",
    order: Number(product.order || 999),
  };
}

function isPublicProduct(product = {}) {
  return product.status !== "draft";
}

function sortProducts(firstProduct, secondProduct) {
  const firstOrder = Number(firstProduct.order || 999);
  const secondOrder = Number(secondProduct.order || 999);

  if (firstOrder !== secondOrder) {
    return firstOrder - secondOrder;
  }

  return String(firstProduct.title || "").localeCompare(
    String(secondProduct.title || ""),
    "id"
  );
}

export default function ProductList({ products = [] }) {
  const [databaseProducts, setDatabaseProducts] = useState([]);
  const [isLoadingDatabase, setIsLoadingDatabase] = useState(true);
  const [databaseError, setDatabaseError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDatabaseProducts() {
      setIsLoadingDatabase(true);
      setDatabaseError("");

      try {
        const items = await getShopProducts();

        if (!isMounted) {
          return;
        }

        setDatabaseProducts(
          items
            .map((item) => normalizeProduct(item, "firestore"))
            .filter(isPublicProduct)
            .sort(sortProducts)
        );
      } catch (error) {
        console.error("Gagal memuat produk dari Firestore:", error);

        if (isMounted) {
          setDatabaseProducts([]);
          setDatabaseError(
            error.message || "Gagal memuat produk dari database."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingDatabase(false);
        }
      }
    }

    loadDatabaseProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayProducts = useMemo(() => {
    const staticProducts = products
      .map((item) => normalizeProduct(item, "file"))
      .filter(isPublicProduct)
      .sort(sortProducts);

    if (databaseProducts.length > 0) {
      return databaseProducts;
    }

    return staticProducts;
  }, [products, databaseProducts]);

  if (isLoadingDatabase && displayProducts.length === 0) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-6 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <LoadingIcon className="h-8 w-8 animate-spin" />
          </div>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
            Memuat Katalog
          </p>

          <p className="mx-auto mt-3 max-w-[320px] text-sm font-medium leading-7 text-slate-300">
            Mengambil produk dari database Khoirunnada.
          </p>
        </div>
      </section>
    );
  }

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-6 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <EmptyShopIcon className="h-8 w-8" />
          </div>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
            Katalog Kosong
          </p>

          <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em] text-white">
            Produk belum tersedia
          </h2>

          <p className="mx-auto mt-3 max-w-[320px] text-sm font-medium leading-7 text-slate-300">
            Katalog produk Khoirunnada akan tampil di sini setelah data produk
            siap ditampilkan.
          </p>

          {databaseError ? (
            <p className="mx-auto mt-3 max-w-[320px] text-xs font-semibold leading-6 text-red-200">
              {databaseError}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {databaseError ? (
        <div className="relative overflow-hidden rounded-[1.35rem] border border-red-400/14 bg-red-500/10 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
          <p className="relative z-10 text-xs font-semibold leading-6 text-red-100">
            {databaseError}
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        {displayProducts.map((product) => (
          <ProductCard
            key={`${product.source || "file"}-${product.id}`}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}