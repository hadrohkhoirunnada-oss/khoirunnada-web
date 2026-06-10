"use client";

import { useMemo, useState } from "react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deleteShopProduct } from "@/services/shopProductService";

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

function EyeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M3.75 12s2.9-5.25 8.25-5.25S20.25 12 20.25 12 17.35 17.25 12 17.25 3.75 12 3.75 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function BoxIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m4.75 8 7.25-4 7.25 4-7.25 4-7.25-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4.75 8v8l7.25 4 7.25-4V8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 12v8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon({ className = "" }) {
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

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function getSafeProduct(item) {
  if (!item || typeof item !== "object") {
    return {};
  }

  return item;
}

function getProductImage(item = {}) {
  const product = getSafeProduct(item);

  return (
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    product.photoUrl ||
    ""
  );
}

function getProductTitle(item = {}) {
  const product = getSafeProduct(item);

  return product.title || product.name || "Produk Tanpa Nama";
}

function getProductCategory(item = {}) {
  const product = getSafeProduct(item);

  return product.category || "Katalog";
}

function getProductStatus(item = {}) {
  const product = getSafeProduct(item);

  return product.status || "published";
}

function getProductPrice(item = {}) {
  const product = getSafeProduct(item);

  return product.price || product.salePrice || "";
}

function getProductOriginalPrice(item = {}) {
  const product = getSafeProduct(item);

  return (
    product.originalPrice ||
    product.normalPrice ||
    product.strikePrice ||
    ""
  );
}

function getProductDiscount(item = {}) {
  const product = getSafeProduct(item);

  return product.discount || product.discountLabel || "";
}

function getProductStock(item = {}) {
  const product = getSafeProduct(item);

  if (product.stock === 0) {
    return "0";
  }

  return product.stock || product.stockLabel || "Belum diatur";
}

function getProductSource(item = {}) {
  const product = getSafeProduct(item);

  if (product.source === "firestore") {
    return "Firestore";
  }

  if (product.source === "mongodb") {
    return "MongoDB";
  }

  return "File";
}

function isFirestoreProduct(item = {}) {
  const product = getSafeProduct(item);

  return product.source === "firestore";
}

function getStatusLabel(status = "") {
  if (status === "draft") {
    return "Draft";
  }

  if (status === "coming-soon") {
    return "Coming Soon";
  }

  if (status === "sold-out") {
    return "Stok Habis";
  }

  return "Tampil";
}

function getStatusClass(status = "") {
  if (status === "draft") {
    return "border-slate-400/12 bg-slate-400/10 text-slate-300";
  }

  if (status === "coming-soon") {
    return "border-sky-400/14 bg-sky-500/10 text-sky-100";
  }

  if (status === "sold-out") {
    return "border-red-400/14 bg-red-500/10 text-red-100";
  }

  return "border-emerald-400/14 bg-emerald-400/10 text-emerald-100";
}

async function deleteProductImage(imageId = "") {
  if (!imageId) {
    return null;
  }

  const response = await fetch(`/api/admin/shop/product-images/${imageId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.message || "Gagal menghapus gambar produk.");
  }

  return result;
}

export default function ProductTable({
  items = [],
  isLoading = false,
  errorMessage = "",
  onRefresh,
  onEdit,
}) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [deletingId, setDeletingId] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = normalizeText(query);
    const safeItems = Array.isArray(items)
      ? items.filter((item) => item && typeof item === "object")
      : [];

    if (!keyword) {
      return safeItems;
    }

    return safeItems.filter((item) => {
      const product = getSafeProduct(item);

      const searchableText = [
        getProductTitle(product),
        getProductCategory(product),
        getProductStatus(product),
        getProductPrice(product),
        getProductOriginalPrice(product),
        getProductDiscount(product),
        getProductStock(product),
        getProductSource(product),
        product.description,
        product.shortDescription,
      ]
        .map(normalizeText)
        .join(" ");

      return searchableText.includes(keyword);
    });
  }, [items, query]);

  const handleEditProduct = (item) => {
    if (!isFirestoreProduct(item)) {
      setMessage({
        type: "error",
        text: "Produk dari file hanya bisa diedit langsung melalui kode.",
      });
      return;
    }

    setMessage({ type: "", text: "" });
    onEdit?.(item);
  };

  const handleDeleteProduct = async (item) => {
    if (!isFirestoreProduct(item)) {
      setMessage({
        type: "error",
        text: "Produk dari file hanya bisa dihapus langsung melalui kode.",
      });
      return;
    }

    const productTitle = getProductTitle(item);
    const isConfirmed = window.confirm(
      `Hapus produk "${productTitle}"? Data produk akan dihapus dari Firestore dan gambar terkait akan dihapus dari MongoDB.`
    );

    if (!isConfirmed) {
      return;
    }

    setDeletingId(item.id);
    setMessage({ type: "", text: "" });

    try {
      await deleteShopProduct(item.id);

      if (item.imageId) {
        try {
          await deleteProductImage(item.imageId);
        } catch (imageError) {
          console.warn("Produk terhapus, tapi gambar gagal dihapus:", imageError);

          setMessage({
            type: "success",
            text: "Produk berhasil dihapus dari Firestore, tetapi gambar lama perlu dicek manual di MongoDB.",
          });

          await onRefresh?.();
          return;
        }
      }

      setMessage({
        type: "success",
        text: "Produk berhasil dihapus dari Firestore dan gambar MongoDB.",
      });

      await onRefresh?.();
    } catch (error) {
      console.error("Gagal menghapus produk:", error);

      setMessage({
        type: "error",
        text: error.message || "Gagal menghapus produk.",
      });
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.07),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Data Produk
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-500">
              Daftar produk yang tampil di halaman Shop & Katalog.
            </p>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading || !onRefresh}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/12 bg-black/35 text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-55"
            aria-label="Muat ulang produk"
          >
            <RefreshIcon className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
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
            placeholder="Cari produk katalog..."
            className="relative z-10 min-h-[3.25rem] w-full bg-transparent px-4 pr-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {message.text ? (
          <div
            className={`rounded-2xl border px-4 py-3 ${
              message.type === "success"
                ? "border-emerald-400/14 bg-emerald-400/10"
                : "border-red-400/14 bg-red-500/10"
            }`}
          >
            <p
              className={`text-xs font-semibold leading-6 ${
                message.type === "success" ? "text-emerald-100" : "text-red-100"
              }`}
            >
              {message.text}
            </p>
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-2xl border border-red-400/14 bg-red-500/10 px-4 py-3">
            <p className="text-xs font-semibold leading-6 text-red-100">
              {errorMessage}
            </p>
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-amber-300/12 bg-black/24 px-4 py-4">
            <p className="text-xs font-semibold leading-6 text-slate-400">
              Memuat data produk dari Firestore...
            </p>
          </div>
        ) : null}

        {!isLoading && filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const imageUrl = getProductImage(item);
              const title = getProductTitle(item);
              const category = getProductCategory(item);
              const status = getProductStatus(item);
              const price = getProductPrice(item);
              const originalPrice = getProductOriginalPrice(item);
              const discount = getProductDiscount(item);
              const stock = getProductStock(item);
              const source = getProductSource(item);
              const description =
                item.shortDescription ||
                item.description ||
                "Belum ada deskripsi produk.";
              const canManage = isFirestoreProduct(item);
              const isDeleting = deletingId === item.id;

              return (
                <article
                  key={item.id || item._id || item.slug || title}
                  className="relative overflow-hidden rounded-[1.55rem] border border-amber-300/12 bg-black/30 p-4 shadow-lg shadow-black/20"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_44%,rgba(0,0,0,0.2))]" />

                  <div className="relative z-10">
                    <div className="flex gap-3">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-amber-300/12 bg-black/35 shadow-inner shadow-black/30">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-amber-200/80">
                            <BoxIcon className="h-8 w-8" />
                          </div>
                        )}

                        {discount ? (
                          <span className="absolute left-2 top-2 rounded-full border border-amber-200/16 bg-amber-300/18 px-2 py-1 text-[0.52rem] font-black uppercase text-amber-100 backdrop-blur-xl">
                            {discount}
                          </span>
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                              {category}
                            </p>

                            <h2 className="mt-2 line-clamp-2 text-base font-black leading-tight tracking-[-0.04em] text-white">
                              {title}
                            </h2>
                          </div>

                          <span
                            className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.56rem] font-extrabold uppercase ${getStatusClass(
                              status
                            )}`}
                          >
                            {getStatusLabel(status)}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-end gap-2">
                          <p className="text-lg font-black leading-none text-amber-200">
                            {price || "Rp0"}
                          </p>

                          {originalPrice ? (
                            <p className="text-xs font-bold leading-none text-slate-500 line-through">
                              {originalPrice}
                            </p>
                          ) : null}
                        </div>

                        <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-slate-400">
                          {description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-2xl border border-amber-300/10 bg-black/24 px-4 py-3">
                        <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/80">
                          Stok
                        </p>

                        <p className="mt-1 text-sm font-black text-white">
                          {stock}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-amber-300/10 bg-black/24 px-4 py-3">
                        <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/80">
                          Sumber
                        </p>

                        <p className="mt-1 text-sm font-black text-white">
                          {source}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-[1fr_1fr_auto] gap-2">
                      <a
                        href="/shop"
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-emerald-400/12 bg-emerald-400/10 px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-100 transition active:scale-[0.98]"
                      >
                        <EyeIcon className="h-4 w-4" />
                        Lihat
                      </a>

                      <button
                        type="button"
                        onClick={() => handleEditProduct(item)}
                        disabled={!canManage || isDeleting}
                        className="flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-amber-300/12 bg-amber-300/10 px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-amber-100 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        <EditIcon className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(item)}
                        disabled={!canManage || isDeleting}
                        className="flex min-h-10 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/12 bg-red-500/10 text-red-200 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-45"
                        aria-label={`Hapus ${title}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {!isLoading && filteredItems.length === 0 ? (
          <AdminEmptyState
            title="Produk Tidak Ditemukan"
            description="Coba gunakan kata kunci lain untuk mencari data produk katalog."
          />
        ) : null}
      </div>
    </section>
  );
}