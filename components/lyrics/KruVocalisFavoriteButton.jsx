"use client";

import { useEffect, useMemo, useState } from "react";
import { listenKruVocalisAuthState } from "@/services/kruVocalisAuthService";
import {
  KRU_FAVORITE_TYPES,
  createKruVocalisFavorite,
  deleteKruVocalisFavorite,
  getKruVocalisFavoriteForItem,
} from "@/services/kruVocalisMemberDataService";

function StarIcon({ className = "", isFilled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={isFilled ? "currentColor" : "none"}
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

function normalizeText(value = "") {
  return String(value || "").trim().toLowerCase();
}

function cleanText(value = "") {
  return String(value || "").trim();
}

function getFavoriteTypeFromLyric(lyric = {}) {
  const combinedText = [
    lyric?.type,
    lyric?.favoriteType,
    lyric?.category,
    lyric?.qasidahCategory,
    lyric?.title,
    lyric?.slug,
  ]
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .join(" ");

  if (
    combinedText.includes("wirid") ||
    combinedText.includes("ratib") ||
    combinedText.includes("haddad") ||
    combinedText.includes("athos") ||
    combinedText.includes("al-attas") ||
    combinedText.includes("attas")
  ) {
    return KRU_FAVORITE_TYPES.WIRID;
  }

  if (
    combinedText.includes("maulid") ||
    combinedText.includes("simtudduror") ||
    combinedText.includes("diba") ||
    combinedText.includes("barzanji")
  ) {
    return KRU_FAVORITE_TYPES.MAULID;
  }

  return KRU_FAVORITE_TYPES.QOSIDAH;
}

function getFavoriteLabel(type = "") {
  if (type === KRU_FAVORITE_TYPES.WIRID) {
    return "Wirid";
  }

  if (type === KRU_FAVORITE_TYPES.MAULID) {
    return "Maulid";
  }

  return "Qosidah";
}

export default function KruVocalisFavoriteButton({ lyric }) {
  const [canUseFavorite, setCanUseFavorite] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [favorite, setFavorite] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const favoritePayload = useMemo(() => {
    const favoriteType = getFavoriteTypeFromLyric(lyric);

    return {
      type: favoriteType,
      itemId: cleanText(lyric?.id),
      slug: cleanText(lyric?.slug),
      title: cleanText(lyric?.title),
      category:
        cleanText(lyric?.category) || cleanText(getFavoriteLabel(favoriteType)),
    };
  }, [lyric]);

  const favoriteLabel = getFavoriteLabel(favoritePayload.type);

  const canIdentifyLyric = Boolean(
    favoritePayload.itemId || favoritePayload.slug
  );

  useEffect(() => {
    const unsubscribe = listenKruVocalisAuthState(({ user, profile }) => {
      const isApprovedKru =
        Boolean(user) && normalizeText(profile?.status) === "approved";

      setCanUseFavorite(isApprovedKru);
      setIsCheckingAccess(false);

      if (!isApprovedKru) {
        setFavorite(null);
        setMessage("");
        setErrorMessage("");
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isCheckingAccess || !canUseFavorite || !canIdentifyLyric) {
      return;
    }

    let isMounted = true;

    async function loadFavoriteStatus() {
      try {
        setIsLoadingFavorite(true);
        setErrorMessage("");

        const currentFavorite = await getKruVocalisFavoriteForItem({
          type: favoritePayload.type,
          itemId: favoritePayload.itemId,
          slug: favoritePayload.slug,
        });

        if (!isMounted) {
          return;
        }

        setFavorite(currentFavorite);
      } catch (error) {
        console.error("Gagal mengecek status favorit Kru/Vocalis:", error);

        if (isMounted) {
          setFavorite(null);
          setErrorMessage(
            error?.message || "Gagal mengecek status favorit bacaan."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingFavorite(false);
        }
      }
    }

    loadFavoriteStatus();

    return () => {
      isMounted = false;
    };
  }, [
    canUseFavorite,
    canIdentifyLyric,
    favoritePayload.type,
    favoritePayload.itemId,
    favoritePayload.slug,
    isCheckingAccess,
  ]);

  useEffect(() => {
    if (!message && !errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage("");
      setErrorMessage("");
    }, 2600);

    return () => clearTimeout(timer);
  }, [message, errorMessage]);

  async function handleToggleFavorite() {
    if (isSavingFavorite || isLoadingFavorite) {
      return;
    }

    if (!canIdentifyLyric) {
      setMessage("");
      setErrorMessage("Data bacaan belum lengkap.");
      return;
    }

    try {
      setIsSavingFavorite(true);
      setMessage("");
      setErrorMessage("");

      if (favorite?.id) {
        await deleteKruVocalisFavorite(favorite.id);

        setFavorite(null);
        setMessage(`${favoriteLabel} dihapus dari favorit.`);
        return;
      }

      const createdFavorite = await createKruVocalisFavorite(favoritePayload);

      setFavorite(createdFavorite);
      setMessage(
        createdFavorite?.alreadyExists
          ? `${favoriteLabel} sudah ada di favorit.`
          : `${favoriteLabel} disimpan ke favorit.`
      );
    } catch (error) {
      console.error("Gagal mengubah favorit Kru/Vocalis:", error);
      setErrorMessage(error?.message || "Gagal mengubah favorit.");
    } finally {
      setIsSavingFavorite(false);
    }
  }

  if (isCheckingAccess || !canUseFavorite) {
    return null;
  }

  return (
    <div className="relative rounded-[1.35rem] border border-amber-300/12 bg-black/28 px-3 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-amber-300/80">
            Favorit Kru
          </p>

          <p className="mt-1 truncate text-sm font-black tracking-[-0.035em] text-white">
            {favorite ? "Tersimpan di Favorit" : "Simpan Bacaan"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleFavorite}
          disabled={isLoadingFavorite || isSavingFavorite}
          className={`flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-2xl border px-4 text-xs font-black shadow-lg shadow-black/20 transition active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${
            favorite
              ? "border-red-300/16 bg-red-500/10 text-red-100"
              : "border-amber-300/18 bg-amber-300/10 text-amber-100"
          }`}
        >
          <StarIcon className="h-4 w-4" isFilled={Boolean(favorite)} />
          {isLoadingFavorite
            ? "Cek..."
            : isSavingFavorite
            ? "..."
            : favorite
            ? "Hapus"
            : "Favorit"}
        </button>
      </div>

      {message ? (
        <p className="mt-2 text-center text-[0.68rem] font-bold leading-5 text-emerald-200">
          {message}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-2 text-center text-[0.68rem] font-bold leading-5 text-red-200">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}