"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getQasidahItems } from "@/services/qasidahService";
import { getGalleryItems } from "@/services/galleryService";
import { getShopProducts } from "@/services/shopProductService";

function BookingIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7.25 4.75v2.5M16.75 4.75v2.5M5.25 9.25h13.5M6.75 6h10.5a2 2 0 0 1 2 2v9.25a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LyricsIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.75 4.75h7.5a3 3 0 0 1 3 3v11.5H9.75a3 3 0 0 0-3 3V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 18.25h10.5M10 8.25h4M10 11.25h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GalleryIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5.75 5.25h12.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m4.75 16 3.5-3.25 2.25 2.1 3.75-4.1 5 5.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.75h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShopIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.75 9.25h10.5l-.75 10H7.5l-.75-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.25V7.75a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.25 9.25h13.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7.75 10.25V8.15a4.25 4.25 0 0 1 8.5 0v2.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.75 10.25h10.5a1.8 1.8 0 0 1 1.8 1.8v6.1a1.8 1.8 0 0 1-1.8 1.8H6.75a1.8 1.8 0 0 1-1.8-1.8v-6.1a1.8 1.8 0 0 1 1.8-1.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.35v1.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M19.25 12a7.25 7.25 0 0 1-12.4 5.12M4.75 12a7.25 7.25 0 0 1 12.4-5.12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.25 3.75v3.5h-3.5M6.75 20.25v-3.5h3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ADMIN_WHATSAPP_URL =
  "https://wa.me/6285173057576?text=Assalamu%27alaikum%20admin%2C%20saya%20ingin%20bertanya%20tentang%20cara%20menggunakan%20halaman%20admin%20Khoirunnada.";

const INITIAL_DASHBOARD_COUNTS = {
  booking: 0,
  qasidah: 0,
  gallery: 0,
  products: 0,
};

function getFulfilledArray(result) {
  if (result?.status !== "fulfilled") {
    return [];
  }

  if (!Array.isArray(result.value)) {
    return [];
  }

  return result.value;
}

function AdminDashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "amber",
  isLoading = false,
  isLocked = false,
}) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-400/18 bg-emerald-400/10 text-emerald-300"
      : tone === "sky"
      ? "border-sky-400/18 bg-sky-400/10 text-sky-300"
      : tone === "violet"
      ? "border-violet-400/18 bg-violet-400/10 text-violet-300"
      : "border-amber-300/18 bg-amber-300/10 text-amber-300";

  return (
    <article
      className={`group relative min-h-[9.4rem] overflow-hidden rounded-[1.65rem] border p-4 shadow-xl shadow-black/25 backdrop-blur-xl ${
        isLocked
          ? "border-white/8 bg-black/24 opacity-75"
          : "border-amber-300/14 bg-black/34"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(245,197,66,0.11),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.24))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-amber-300/8 blur-2xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className={`text-[0.64rem] font-extrabold uppercase tracking-[0.25em] ${
                isLocked ? "text-slate-500" : "text-amber-300"
              }`}
            >
              {title}
            </p>

            {isLocked ? (
              <p className="mt-2 inline-flex rounded-full border border-slate-500/14 bg-white/[0.035] px-2.5 py-1 text-[0.55rem] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Terkunci
              </p>
            ) : null}
          </div>

          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border shadow-inner shadow-black/25 ${
              isLocked
                ? "border-slate-500/14 bg-white/[0.035] text-slate-500"
                : toneClass
            }`}
          >
            {isLocked ? <LockIcon className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
          </span>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-end gap-2">
            <p
              className={`text-[2rem] font-black leading-none tracking-[-0.08em] drop-shadow-[0_10px_28px_rgba(0,0,0,0.7)] ${
                isLocked ? "text-slate-500" : "text-white"
              }`}
            >
              {isLocked ? "—" : isLoading ? "…" : value}
            </p>

            {isLocked ? (
              <p className="pb-1 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-slate-600">
                Belum Aktif
              </p>
            ) : null}
          </div>

          <p className="mt-3 text-sm font-bold leading-5 text-slate-300">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  const [dashboardCounts, setDashboardCounts] = useState(
    INITIAL_DASHBOARD_COUNTS
  );
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardStats() {
      try {
        setIsLoadingStats(true);
        setStatsError("");

        const [qasidahResult, galleryResult, productsResult] =
          await Promise.allSettled([
            getQasidahItems(),
            getGalleryItems(),
            getShopProducts(),
          ]);

        if (!isMounted) {
          return;
        }

        const qasidahItems = getFulfilledArray(qasidahResult);
        const galleryItems = getFulfilledArray(galleryResult);
        const productItems = getFulfilledArray(productsResult);

        setDashboardCounts({
          booking: 0,
          qasidah: qasidahItems.length,
          gallery: galleryItems.length,
          products: productItems.length,
        });

        if (
          qasidahResult.status === "rejected" ||
          galleryResult.status === "rejected" ||
          productsResult.status === "rejected"
        ) {
          setStatsError(
            "Sebagian data statistik gagal dimuat. Cek koneksi atau rules Firestore."
          );
        }
      } catch (error) {
        console.error("Gagal memuat statistik dashboard admin:", error);

        if (isMounted) {
          setDashboardCounts(INITIAL_DASHBOARD_COUNTS);
          setStatsError(
            error?.message || "Gagal memuat statistik dashboard admin."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingStats(false);
        }
      }
    }

    loadDashboardStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      title: "Booking",
      value: dashboardCounts.booking,
      description: "Masih Dalam Tahap Pengembangan",
      icon: BookingIcon,
      tone: "emerald",
      isLocked: true,
    },
    {
      title: "Qasidah",
      value: dashboardCounts.qasidah,
      description: "Data lirik",
      icon: LyricsIcon,
      tone: "amber",
    },
    {
      title: "Galeri",
      value: dashboardCounts.gallery,
      description: "Dokumentasi",
      icon: GalleryIcon,
      tone: "sky",
    },
    {
      title: "Shop & Katalog",
      value: dashboardCounts.products,
      description: "Produk katalog",
      icon: ShopIcon,
      tone: "violet",
    },
  ];

  return (
    <AdminShell>
      <section className="space-y-5">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 px-5 py-6 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_48%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

          <div className="relative z-10" dir="rtl" lang="ar">
            <p className="font-arabic text-[1.38rem] font-semibold leading-[2.45rem] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>

            <p className="mt-2 font-arabic text-[1.05rem] font-semibold leading-8 text-amber-300/85 drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
              أَهْلًا وَسَهْلًا
            </p>
          </div>
        </section>

        {statsError ? (
          <div className="relative overflow-hidden rounded-2xl border border-red-400/18 bg-red-400/10 p-4 text-sm font-semibold leading-6 text-red-100 shadow-lg shadow-black/20">
            {statsError}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Ringkasan Data
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Statistik Dashboard
            </p>
          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/30 text-amber-200 shadow-inner shadow-black/25">
            <RefreshIcon
              className={`h-4 w-4 ${isLoadingStats ? "animate-spin" : ""}`}
            />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <AdminDashboardStatCard
              key={stat.title}
              {...stat}
              isLoading={isLoadingStats}
            />
          ))}
        </div>

        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

          <div className="relative z-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Panduan Admin
            </p>

            <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              Gunakan panel ini dengan teliti
            </h2>

            <div className="mt-4 space-y-3 text-sm font-medium leading-7 text-slate-300">
              <p>
                Pilih menu admin melalui tombol garis tiga di bagian header
                untuk mengelola data qasidah, shop & katalog, galeri, QR
                booking, pengaturan website, dan kebutuhan admin lainnya.
              </p>

              <p>
                Setiap perubahan data yang dimasukkan akan menjadi acuan
                tampilan website, jadi pastikan judul, tanggal, lokasi, teks,
                dan gambar sudah benar sebelum disimpan.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-300/12 bg-amber-300/[0.06] px-4 py-3">
              <p className="text-xs font-bold leading-6 text-amber-100">
                Catatan: selalu periksa ulang data sebelum publikasi agar
                informasi yang tampil tetap rapi, akurat, dan tidak
                membingungkan pengunjung.
              </p>
            </div>

            <p className="mt-4 text-xs font-semibold leading-6 text-slate-400">
              Kalo Belum Faham, Silahkan{" "}
              <a
                href={ADMIN_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#f5c542" }}
                className="font-extrabold decoration-[#f5c542]/35 underline-offset-4 transition hover:opacity-90"
              >
                Hubungi Admin
              </a>
              .
            </p>
          </div>
        </section>
      </section>
    </AdminShell>
  );
}