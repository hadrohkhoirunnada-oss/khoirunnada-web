"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import { INITIAL_KRU_PROFILE, KRU_ROLE_OPTIONS } from "@/data/initialKruVocalis";
import {
  listenKruVocalisAuthState,
  logoutKruVocalis,
} from "@/services/kruVocalisAuthService";
import { getKruVocalisDashboardCounts } from "@/services/kruVocalisMemberDataService";

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

function UserIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.75 19.25c.8-3.15 3.08-5 6.25-5s5.45 1.85 6.25 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RoleIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13.25a3.25 3.25 0 0 0 3.25-3.25V6.75a3.25 3.25 0 0 0-6.5 0V10A3.25 3.25 0 0 0 12 13.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6.75 10.25a5.25 5.25 0 0 0 10.5 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 15.5v3.75M9.25 19.25h5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function NoteIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 4.75h7.1L18.75 9v10.25h-11.5V4.75Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 4.95V9.2h4.1M9.5 12.25h5M9.5 15.25h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M18.75 12a7.2 7.2 0 0 0-.08-1.03l1.68-1.32-1.75-3.02-2.02.82a7.08 7.08 0 0 0-1.77-1.02l-.3-2.18h-3.5l-.3 2.18a7.08 7.08 0 0 0-1.77 1.02l-2.02-.82-1.75 3.02 1.68 1.32a7.2 7.2 0 0 0 0 2.06l-1.68 1.32 1.75 3.02 2.02-.82c.54.43 1.14.78 1.77 1.02l.3 2.18h3.5l.3-2.18c.63-.24 1.23-.59 1.77-1.02l2.02.82 1.75-3.02-1.68-1.32c.05-.34.08-.68.08-1.03Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

function LogoutIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 5.25H6.75a2 2 0 0 0-2 2v9.5a2 2 0 0 0 2 2h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.75 8.25 18.5 12l-3.75 3.75M18.25 12H9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function getEmailUsername(email) {
  const cleanEmail = String(email || "").trim();

  if (!cleanEmail.includes("@")) {
    return "kru.khoirunnada";
  }

  return cleanEmail.split("@")[0] || "kru.khoirunnada";
}

function getProfileRoles(profile) {
  const roles = Array.isArray(profile?.roles) ? profile.roles : [];
  const mergedRoles = [profile?.mainRole, ...roles]
    .map((role) => String(role || "").trim())
    .filter(Boolean);

  return Array.from(new Set(mergedRoles));
}

function getStatusContent(status) {
  const cleanStatus = normalizeText(status);

  if (cleanStatus === "pending") {
    return {
      label: "Pending",
      title: "Menunggu Persetujuan",
      description:
        "Pendaftaran Kru/Vocalis berhasil. Mohon tunggu admin Khoirunnada menyetujui akses akun ini.",
      badgeClass:
        "border-amber-300/18 bg-amber-300/10 text-amber-100 shadow-[0_0_22px_rgba(245,197,66,0.12)]",
    };
  }

  if (cleanStatus === "rejected") {
    return {
      label: "Rejected",
      title: "Akses Ditolak",
      description:
        "Pendaftaran akun ini belum dapat disetujui sebagai Kru/Vocalis Khoirunnada.",
      badgeClass:
        "border-red-300/18 bg-red-500/10 text-red-100 shadow-[0_0_22px_rgba(248,113,113,0.12)]",
    };
  }

  if (cleanStatus === "inactive") {
    return {
      label: "Inactive",
      title: "Akses Dinonaktifkan",
      description:
        "Akses Kru/Vocalis akun ini sedang dinonaktifkan oleh admin.",
      badgeClass:
        "border-slate-300/14 bg-slate-500/10 text-slate-200 shadow-[0_0_22px_rgba(148,163,184,0.08)]",
    };
  }

  return {
    label: "Tidak Terdaftar",
    title: "Akun Belum Memiliki Akses",
    description:
      "Akun ini belum terdaftar sebagai Kru/Vocalis. Silakan daftar terlebih dahulu.",
    badgeClass:
      "border-red-300/18 bg-red-500/10 text-red-100 shadow-[0_0_22px_rgba(248,113,113,0.12)]",
  };
}

function MenuItem({
  title,
  description,
  status,
  icon: Icon,
  href,
  isLocked = false,
}) {
  const content = (
    <div
      className={`group flex min-h-[4.9rem] items-center justify-between gap-4 rounded-[1.55rem] border px-4 py-3 shadow-lg shadow-black/20 transition ${isLocked
          ? "border-white/8 bg-black/22 opacity-70"
          : "border-amber-300/10 bg-black/30 active:scale-[0.99]"
        }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${isLocked
              ? "border-slate-500/12 bg-white/[0.035] text-slate-500"
              : "border-amber-300/12 bg-[#121009] text-amber-200"
            }`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <h3
            className={`truncate text-[0.95rem] font-black tracking-[-0.04em] ${isLocked ? "text-slate-400" : "text-white"
              }`}
          >
            {title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-500">
            {description}
          </p>
          {status ? (
            <p
              className={`mt-1.5 text-[0.58rem] font-black uppercase tracking-[0.18em] ${isLocked ? "text-slate-500" : "text-amber-300/75"
                }`}
            >
              {status}
            </p>
          ) : null}
        </div>
      </div>

      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${isLocked
            ? "border-slate-500/12 bg-black/25 text-slate-500"
            : "border-amber-300/10 bg-[#070706] text-amber-300"
          }`}
      >
        {isLocked ? (
          <LockIcon className="h-4 w-4" />
        ) : (
          <ArrowIcon className="h-4 w-4" />
        )}
      </span>
    </div>
  );

  if (href && !isLocked) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

function LoadingState() {
  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="relative z-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/20 bg-black/34 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <img
              src={INITIAL_KRU_PROFILE.avatarUrl}
              alt="Khoirunnada"
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <p className="mt-6 text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
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

function AccessStatusCard({ user, profile, onLogout, isLoggingOut }) {
  const statusContent = getStatusContent(profile?.status);
  const displayName = profile?.name || user?.name || user?.email || "Kru/Vocalis";
  const displayEmail = profile?.email || user?.email || "";

  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 pb-6 pt-7 shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <div className="relative z-10 text-center">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Status Akses
          </p>

          <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/20 bg-black/34 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            {user?.photoURL || profile?.photoURL ? (
              <img
                src={profile?.photoURL || user?.photoURL}
                alt={displayName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <img
                src={INITIAL_KRU_PROFILE.avatarUrl}
                alt="Khoirunnada"
                className="h-full w-full rounded-full object-contain"
              />
            )}
          </div>

          <h1 className="mt-5 text-[1.65rem] font-black leading-none tracking-[-0.065em] text-white">
            {statusContent.title}
          </h1>

          <p className="mx-auto mt-4 max-w-[18rem] text-sm font-semibold leading-7 text-slate-400">
            {statusContent.description}
          </p>

          <div className="mt-5 rounded-[1.5rem] border border-amber-300/10 bg-black/30 px-4 py-4 text-left">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-amber-300">
              Akun
            </p>
            <p className="mt-2 text-base font-black text-white">
              {displayName}
            </p>
            {displayEmail ? (
              <p className="mt-1 break-words text-xs font-semibold text-slate-500">
                {displayEmail}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.16em] ${statusContent.badgeClass}`}
              >
                {statusContent.label}
              </span>

              {profile?.mainRole ? (
                <span className="rounded-full border border-amber-300/16 bg-amber-300/10 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.16em] text-amber-200">
                  {profile.mainRole}
                </span>
              ) : null}
            </div>

            {profile?.approvalNote ? (
              <p className="mt-4 rounded-2xl border border-amber-300/10 bg-amber-300/[0.055] px-3 py-2 text-xs font-semibold leading-6 text-amber-100">
                {profile.approvalNote}
              </p>
            ) : null}
          </div>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="relative flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-red-400/16 bg-red-500/10 px-4 text-sm font-black text-red-100 shadow-lg shadow-black/20 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.2))]" />
              <LogoutIcon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">
                {isLoggingOut ? "Keluar..." : "Keluar dari Akun"}
              </span>
            </button>

            <Link
              href="/login-kru-vocalis"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-amber-300/14 bg-amber-300/10 px-4 text-sm font-black text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.99]"
            >
              Kembali ke Login
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default function KruVocalisProfilePage() {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    user: null,
    profile: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [dashboardCounts, setDashboardCounts] = useState({
    notes: 0,
    favorites: {
      qosidah: 0,
      wirid: 0,
      maulid: 0,
    },
  });
  const [isLoadingDashboardCounts, setIsLoadingDashboardCounts] =
    useState(true);

  useEffect(() => {
    const unsubscribe = listenKruVocalisAuthState(({ user, profile }) => {
      setAuthState({
        user,
        profile,
      });

      setIsLoading(false);

      if (!user) {
        router.replace("/login-kru-vocalis?error=login-required");
      }
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    const cleanStatus = normalizeText(authState.profile?.status);

    if (!authState.user || cleanStatus !== "approved") {
      setDashboardCounts({
        notes: 0,
        favorites: {
          qosidah: 0,
          wirid: 0,
          maulid: 0,
        },
      });
      setIsLoadingDashboardCounts(false);
      return;
    }

    let isMounted = true;

    async function loadDashboardCounts() {
      try {
        setIsLoadingDashboardCounts(true);

        const counts = await getKruVocalisDashboardCounts();

        if (!isMounted) {
          return;
        }

        setDashboardCounts({
          notes: Number(counts?.notes || 0),
          favorites: {
            qosidah: Number(counts?.favorites?.qosidah || 0),
            wirid: Number(counts?.favorites?.wirid || 0),
            maulid: Number(counts?.favorites?.maulid || 0),
          },
        });
      } catch (error) {
        console.error("Gagal memuat ringkasan Kru/Vocalis:", error);

        if (isMounted) {
          setDashboardCounts({
            notes: 0,
            favorites: {
              qosidah: 0,
              wirid: 0,
              maulid: 0,
            },
          });
        }
      } finally {
        if (isMounted) {
          setIsLoadingDashboardCounts(false);
        }
      }
    }

    loadDashboardCounts();

    return () => {
      isMounted = false;
    };
  }, [authState.user, authState.profile]);

  const profileData = useMemo(() => {
    const { user, profile } = authState;

    const displayName =
      profile?.name ||
      user?.name ||
      user?.email ||
      INITIAL_KRU_PROFILE.name;

    const displayEmail = profile?.email || user?.email || "";
    const displayUsername = getEmailUsername(displayEmail);
    const displayRoles = getProfileRoles(profile);

    return {
      name: displayName,
      email: displayEmail,
      username: displayUsername,
      avatarUrl:
        profile?.photoURL || user?.photoURL || INITIAL_KRU_PROFILE.avatarUrl,
      mainRole:
        profile?.mainRole ||
        displayRoles[0] ||
        INITIAL_KRU_PROFILE.role ||
        "Vocalis / Kru",
      roles: displayRoles.length > 0 ? displayRoles : [INITIAL_KRU_PROFILE.role],
      status: "Anggota Aktif",
      note:
        profile?.approvalNote ||
        "Akses Kru/Vocalis aktif. Gunakan halaman ini untuk mengelola profil, role, favorit, dan kebutuhan internal Khoirunnada.",
    };
  }, [authState]);

  const visibleRoles = useMemo(() => {
    const roles = profileData.roles.filter(Boolean);

    if (roles.length >= 3) {
      return roles.slice(0, 3);
    }

    const fallbackRoles = KRU_ROLE_OPTIONS.map((role) => role.label).filter(
      Boolean
    );

    return Array.from(new Set([...roles, ...fallbackRoles])).slice(0, 3);
  }, [profileData.roles]);

  const accountMenus = [
    {
      title: "Edit Profil",
      description: "Lengkapi nama, foto, dan identitas anggota.",
      icon: UserIcon,
      status: "Aktif",
      href: "/kru-vocalis/edit-profil",
    },
    {
      title: "Role Kru/Vocalis",
      description:
        "Lihat peran aktif seperti vocalis, terbang, bass, dan lainnya.",
      icon: RoleIcon,
      status: profileData.mainRole || "Aktif",
      href: "/kru-vocalis/role",
    },
  ];

  const favoriteMenus = [
    {
      title: "Qosidah Favorit",
      description: "Bacaan qosidah yang sering dibuka atau disimpan.",
      icon: StarIcon,
      status: isLoadingDashboardCounts
        ? "Memuat"
        : `${dashboardCounts.favorites.qosidah} Bacaan`,
      href: "/kru-vocalis/favorit/qosidah",
    },
    {
      title: "Wirid Favorit",
      description: "Wirid pilihan untuk latihan dan amalan rutin.",
      icon: StarIcon,
      status: isLoadingDashboardCounts
        ? "Memuat"
        : `${dashboardCounts.favorites.wirid} Bacaan`,
      href: "/kru-vocalis/favorit/wirid",
    },
    {
      title: "Maulid Favorit",
      description: "Bacaan maulid yang ingin disimpan anggota.",
      icon: StarIcon,
      status: "Terkunci",
      href: "",
      isLocked: true,
    },
  ];

  const internalMenus = [
    {
      title: "Catatan Latihan",
      description: "Simpan catatan nada, tugas, dan kebutuhan latihan.",
      icon: NoteIcon,
      status: isLoadingDashboardCounts
        ? "Memuat"
        : `${dashboardCounts.notes} Catatan`,
      href: "/kru-vocalis/catatan",
    },
    {
      title: "Pengaturan Akun",
      description: "Kelola akses dan preferensi akun internal.",
      icon: SettingsIcon,
      status: "Terkunci",
      href: "",
      isLocked: true,
    },
  ];

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logoutKruVocalis();
      router.replace("/login-kru-vocalis");
    } catch (error) {
      console.error("Gagal logout Kru/Vocalis:", error);
      setIsLoggingOut(false);
      alert("Gagal keluar dari akun. Silakan coba lagi.");
    }
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!authState.user) {
    return <LoadingState />;
  }

  const cleanStatus = normalizeText(authState.profile?.status);

  if (!authState.profile || cleanStatus !== "approved") {
    return (
      <AccessStatusCard
        user={authState.user}
        profile={authState.profile}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    );
  }

  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 pb-6 pt-7 shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Profil Anggota
          </p>

          <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-amber-300/20 bg-black/34 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <img
              src={profileData.avatarUrl}
              alt={profileData.name}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <h1 className="mt-5 text-[1.85rem] font-black leading-none tracking-[-0.065em] text-white">
            {profileData.name}
          </h1>

          <p className="mt-2 text-sm font-bold text-slate-500">
            @{profileData.username}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-amber-300/16 bg-amber-300/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-amber-200">
              {profileData.mainRole}
            </span>

            <span className="rounded-full border border-emerald-300/16 bg-emerald-400/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-emerald-200">
              {profileData.status}
            </span>
          </div>

          <p className="mx-auto mt-5 max-w-[18rem] text-xs font-semibold leading-6 text-slate-400">
            {profileData.note}
          </p>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mx-auto mt-5 flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-red-400/14 bg-red-500/10 px-4 text-xs font-black text-red-100 shadow-lg shadow-black/20 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogoutIcon className="h-3.5 w-3.5" />
            {isLoggingOut ? "Keluar..." : "Log Out"}
          </button>
        </div>
      </section>

      <section className="mt-5 rounded-[1.8rem] border border-amber-300/10 bg-black/24 p-3 shadow-lg shadow-black/20">
        <div className="grid grid-cols-3 gap-2">
          {visibleRoles.map((role) => (
            <div
              key={role}
              className="rounded-[1.3rem] border border-amber-300/10 bg-black/32 px-2 py-3 text-center"
            >
              <p className="truncate text-[0.68rem] font-black text-white">
                {role}
              </p>
              <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.14em] text-amber-300/70">
                Role
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Akun Kru
          </p>
        </div>

        <div className="space-y-3">
          {accountMenus.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Bacaan Favorit
          </p>
        </div>

        <div className="space-y-3">
          {favoriteMenus.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Lainnya
          </p>
        </div>

        <div className="space-y-3">
          {internalMenus.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}