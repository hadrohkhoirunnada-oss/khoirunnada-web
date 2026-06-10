"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ProductForm from "@/components/admin/shop/ProductForm";
import ProductTable from "@/components/admin/shop/ProductTable";
import { getShopProducts } from "@/services/shopProductService";

function ShopIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.25 8.25h11.5l-.85 10.25a2 2 0 0 1-2 1.75h-5.8a2 2 0 0 1-2-1.75L6.25 8.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.25V7a3 3 0 0 1 6 0v1.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9.75 12.25h4.5M9.75 15.25h3"
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

function isVisibleProduct(item = {}) {
  return item.status !== "draft";
}

export default function Page() {
  const [productItems, setProductItems] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setProductsError("");

    try {
      const items = await getShopProducts();
      setProductItems(items);
    } catch (error) {
      console.error("Gagal mengambil produk Firestore:", error);
      setProductItems([]);
      setProductsError(error.message || "Gagal mengambil data produk Firestore.");
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSavedProduct = async () => {
    setEditingProduct(null);
    await loadProducts();
  };

  const activeProducts = productItems.filter(isVisibleProduct);

  return (
    <AdminShell>
      <section className="space-y-5">
        <section className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,66,0.12),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-amber-300/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
                <ShopIcon className="h-6 w-6" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                  Admin Shop
                </p>

                <h1 className="mt-2 text-[1.7rem] font-black leading-tight tracking-[-0.06em] text-white">
                  Kelola Shop & Katalog
                </h1>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                  Data produk disimpan di Firestore, sedangkan file gambar
                  produk disimpan di MongoDB GridFS.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Total Produk
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {productItems.length}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Tampil
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {activeProducts.length}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadProducts}
              disabled={isLoadingProducts}
              className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/12 bg-black/35 px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshIcon
                className={`h-4 w-4 ${isLoadingProducts ? "animate-spin" : ""}`}
              />
              {isLoadingProducts ? "Memuat Produk..." : "Muat Ulang Produk"}
            </button>
          </div>
        </section>

        <ProductForm
          editingProduct={editingProduct}
          onSaved={handleSavedProduct}
          onCancelEdit={handleCancelEdit}
        />

        <ProductTable
          items={productItems}
          isLoading={isLoadingProducts}
          errorMessage={productsError}
          onRefresh={loadProducts}
          onEdit={handleEditProduct}
        />
      </section>
    </AdminShell>
  );
}