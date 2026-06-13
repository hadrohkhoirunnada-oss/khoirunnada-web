"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import { listenKruVocalisAuthState } from "@/services/kruVocalisAuthService";
import {
  deleteKruVocalisFavorite,
  getKruVocalisFavoritesByType,
} from "@/services/kruVocalisMemberDataService";

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 6.75 15.25 12l-5.5 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12 4.25 2.15 4.36 4.81.7-3.48 3.39.82 4.79L12 15.23l-4.3 2.26.82-4.79-3.48-3.39 4.81-.7L12 4.25Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 16.25a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m15 15 4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 5.25h9a3.5 3.5 0 0 1 3.5 3.5v10h-9a3.5 3.5 0 0 0-3.5-3.5v-10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 15.25V5.25M8.5 8.5h5.75M8.5 11.5h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 8.75v9M12 8.75v9M15.75 8.75v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.75 6.25h12.5M9.5 6.25l.75-2h3.5l.75 2M7.25 6.25l.7 13h8.1l.7-13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KruVocalisFavoritePage({
  favoriteType = "qosidah",
  eyebrow = "Bacaan Favorit",
  title = "Qosidah Favorit",
  description = "Simpan dan kelola bacaan favorit anggota Kru/Vocalis Khoirunnada.",
  emptyTitle = "Belum Ada Favorit",
  emptyDescription = "Bacaan favorit akan tampil di sini setelah sistem favorit Kru/Vocalis disambungkan.",
  searchPlaceholder = "Cari bacaan favorit...",
  publicBrowseHref = "/lirik",
  publicBrowseLabel = "Cari Bacaan",
}) {
  const router = useRouter();

  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingFavoriteId, setDeletingFavoriteId] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = listenKruVocalisAuthState(({ user, profile }) => {
      if (!user) {
        router.replace("/login-kru-vocalis?error=login-required");
        return;
      }

      if (!profile || profile.status !== "approved") {
        router.replace("/kru-vocalis");
        return;
      }

      setIsCheckingAccess(false);
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (isCheckingAccess) {
      return;
    }

    let isMounted = true;

    async function loadFavorites() {
      try {
        setIsLoadingFavorites(true);
        setErrorMessage("");

        const items = await getKruVocalisFavoritesByType(favoriteType);

        if (!isMounted) {
          return;
        }

        setFavorites(items);
      } catch (error) {
        console.error("Gagal memuat favorit Kru/Vocalis:", error);

        if (isMounted) {
          setErrorMessage(error?.message || "Gagal memuat bacaan favorit.");
          setFavorites([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingFavorites(false);
        }
      }
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [favoriteType, isCheckingAccess]);

  const filteredFavorites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return favorites;
    }

    return favorites.filter((item) => {
      return (
        String(item.title || "").toLowerCase().includes(query) ||
        String(item.category || "").toLowerCase().includes(query) ||
        String(item.slug || "").toLowerCase().includes(query)
      );
    });
  }, [favorites, searchQuery]);

  async function handleDeleteFavorite(favoriteId) {
    if (!favoriteId || deletingFavoriteId) {
      return;
    }

    const confirmed = window.confirm("Hapus bacaan ini dari favorit?");

    if (!confirmed) {
      return;
    }

    try {
      setDeletingFavoriteId(favoriteId);
      setMessage("");
      setErrorMessage("");

      await deleteKruVocalisFavorite(favoriteId);

      setFavorites((current) =>
        current.filter((item) => item.id !== favoriteId)
      );
      setMessage("Bacaan berhasil dihapus dari favorit.");
    } catch (error) {
      console.error("Gagal menghapus favorit:", error);
      setErrorMessage(error?.message || "Gagal menghapus favorit.");
    } finally {
      setDeletingFavoriteId("");
    }
  }

  if (isCheckingAccess) {
    return (
      <PageContainer className="pb-28 pt-7">
        <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />

          <div className="relative z-10">
            <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
              Memuat Akses
            </p>

            <h1 className="mt-3 text-2xl font-black tracking-[-0.06em] text-white">
              Mengecek akun Kru/Vocalis
            </h1>

            <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
              Mohon tunggu sebentar, sistem sedang membaca status akses akun.
            </p>
          </div>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 pb-6 pt-7 shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/16 bg-[#15120b] text-amber-200 shadow-inner shadow-black/25">
            <StarIcon className="h-8 w-8" />
          </span>

          <p className="mt-6 text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            {eyebrow}
          </p>

          <h1 className="mt-3 text-[1.95rem] font-black leading-none tracking-[-0.07em] text-white">
            {title}
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            {description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-[1.45rem] border border-amber-300/12 bg-black/30 px-3 py-4">
              <p className="text-2xl font-black tracking-[-0.06em] text-white">
                {isLoadingFavorites ? "…" : favorites.length}
              </p>
              <p className="mt-1 text-[0.56rem] font-black uppercase tracking-[0.16em] text-amber-300/75">
                Tersimpan
              </p>
            </div>

            <div className="rounded-[1.45rem] border border-emerald-300/14 bg-emerald-400/10 px-3 py-4">
              <p className="text-2xl font-black tracking-[-0.06em] text-emerald-100">
                DB
              </p>
              <p className="mt-1 text-[0.56rem] font-black uppercase tracking-[0.16em] text-emerald-200/80">
                Aktif
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
            <SearchIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
              Cari Favorit
            </p>
            <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
              Daftar Bacaan
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/34 shadow-lg shadow-black/20 transition focus-within:border-amber-300/40">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

          <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/75">
            <SearchIcon className="h-4 w-4" />
          </span>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setMessage("");
              setErrorMessage("");
            }}
            placeholder={searchPlaceholder}
            className="relative z-10 min-h-[3.25rem] w-full bg-transparent px-4 pl-14 text-sm font-semibold text-white outline-none placeholder:text-slate-600"
          />
        </div>

        {isLoadingFavorites ? (
          <div className="mt-5 rounded-[1.65rem] border border-amber-300/10 bg-black/28 px-4 py-7 text-center">
            <h3 className="text-xl font-black tracking-[-0.055em] text-white">
              Memuat Favorit
            </h3>

            <p className="mx-auto mt-3 max-w-[16rem] text-sm font-semibold leading-6 text-slate-500">
              Sistem sedang mengambil bacaan favorit dari database.
            </p>
          </div>
        ) : filteredFavorites.length > 0 ? (
          <div className="mt-4 space-y-3">
            {filteredFavorites.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.55rem] border border-amber-300/10 bg-black/30 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-amber-300/75">
                      {item.category || title} • {item.createdAtLabel || "Tersimpan"}
                    </p>

                    <h3 className="mt-2 text-base font-black tracking-[-0.045em] text-white">
                      {item.title}
                    </h3>

                    {item.slug ? (
                      <p className="mt-1 break-words text-xs font-semibold text-slate-500">
                        {item.slug}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteFavorite(item.id)}
                    disabled={deletingFavoriteId === item.id}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-300/10 bg-red-500/10 text-red-200 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Hapus favorit"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.65rem] border border-amber-300/10 bg-black/28 px-4 py-7 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
              <BookIcon className="h-7 w-7" />
            </span>

            <h3 className="mt-5 text-xl font-black tracking-[-0.055em] text-white">
              {emptyTitle}
            </h3>

            <p className="mx-auto mt-3 max-w-[16rem] text-sm font-semibold leading-6 text-slate-500">
              {emptyDescription}
            </p>
          </div>
        )}
      </section>

      {message ? (
        <p className="mt-5 rounded-2xl border border-emerald-300/16 bg-emerald-400/10 px-4 py-3 text-center text-xs font-bold leading-6 text-emerald-100">
          {message}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-5 rounded-2xl border border-red-300/16 bg-red-500/10 px-4 py-3 text-center text-xs font-bold leading-6 text-red-100">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-amber-300/12 bg-amber-300/[0.06] px-4 py-3 text-center">
          <p className="text-xs font-bold leading-6 text-amber-100">
            Tambah favorit dilakukan dari halaman detail bacaan. Tombol favorit
            hanya tampil untuk akun Kru/Vocalis yang sudah login dan disetujui.
          </p>
        </div>

        <Link
          href={publicBrowseHref}
          className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985]"
        >
          {publicBrowseLabel}
          <ArrowIcon className="h-4 w-4" />
        </Link>

        <Link
          href="/kru-vocalis"
          className="flex min-h-[3rem] w-full items-center justify-center rounded-2xl border border-amber-300/10 bg-black/20 px-5 text-sm font-black text-slate-400 active:scale-[0.985]"
        >
          Kembali ke Profil
        </Link>
      </div>
    </PageContainer>
  );
}