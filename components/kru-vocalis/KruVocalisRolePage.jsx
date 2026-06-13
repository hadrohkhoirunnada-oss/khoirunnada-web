"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import { INITIAL_KRU_PROFILE, KRU_ROLE_OPTIONS } from "@/data/initialKruVocalis";
import { listenKruVocalisAuthState } from "@/services/kruVocalisAuthService";
import { updateKruVocalisRoles } from "@/services/kruVocalisMemberDataService";

const EXTRA_ROLE_OPTIONS = [
  {
    id: "koordinator",
    label: "Koordinator",
    description: "Mengatur kebutuhan kru dan alur kegiatan internal.",
  },
  {
    id: "sound-system",
    label: "Sound System",
    description: "Membantu kebutuhan audio, mic, dan teknis suara.",
  },
  {
    id: "dokumentasi",
    label: "Dokumentasi",
    description: "Mengambil foto, video, dan arsip kegiatan Khoirunnada.",
  },
];

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

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.75 12.35 3.35 3.25 7.15-7.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaveIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 4.75h11.2l2.3 2.3v12.2H5.25V4.75Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 4.95v5.3h6.5v-5.3M8.25 19.05v-5.3h7.5v5.3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DatabaseIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 7.25c0-1.65 3.02-3 6.75-3s6.75 1.35 6.75 3-3.02 3-6.75 3-6.75-1.35-6.75-3Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M5.25 7.25v4.75c0 1.65 3.02 3 6.75 3s6.75-1.35 6.75-3V7.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M5.25 12v4.75c0 1.65 3.02 3 6.75 3s6.75-1.35 6.75-3V12"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function createRoleId(value = "") {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getDisplayName(user, profile) {
  return (
    profile?.name ||
    user?.displayName ||
    user?.name ||
    user?.email ||
    INITIAL_KRU_PROFILE.name
  );
}

function getProfileRoles(profile) {
  const roles = Array.isArray(profile?.roles) ? profile.roles : [];
  const mergedRoles = [profile?.mainRole, ...roles]
    .map((role) => String(role || "").trim())
    .filter(Boolean);

  return Array.from(new Set(mergedRoles));
}

function getRoleDescription(roleLabel = "", roleOptions = []) {
  const cleanRoleLabel = normalizeText(roleLabel);

  const matchedRole = roleOptions.find((role) => {
    const cleanLabel = normalizeText(role.label);

    return cleanLabel === cleanRoleLabel || cleanRoleLabel.includes(cleanLabel);
  });

  return matchedRole?.description || "Role anggota tersimpan dari database Kru/Vocalis.";
}

function getRoleOptionFromLabel(roleLabel = "", roleOptions = []) {
  const cleanRoleLabel = normalizeText(roleLabel);

  return roleOptions.find((role) => normalizeText(role.label) === cleanRoleLabel);
}

function normalizeRoleLabels(roles = []) {
  return Array.from(
    new Set(
      roles
        .map((role) => String(role || "").trim())
        .filter(Boolean)
    )
  );
}

function LoadingState() {
  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />

        <div className="relative z-10">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Memuat Role
          </p>

          <h1 className="mt-3 text-2xl font-black tracking-[-0.06em] text-white">
            Mengecek role Kru/Vocalis
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            Mohon tunggu sebentar, sistem sedang membaca data akun dari
            database.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

function RoleOptionCard({ role, isSelected, onSelect, disabled = false }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled) {
          onSelect(role);
        }
      }}
      disabled={disabled}
      className={`relative w-full overflow-hidden rounded-[1.55rem] border p-4 text-left shadow-lg shadow-black/20 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${
        isSelected
          ? "border-amber-300/32 bg-[#211a07]"
          : "border-amber-300/10 bg-black/30"
      }`}
    >
      {isSelected ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.14),rgba(245,197,66,0.035)_42%,rgba(0,0,0,0.08))]" />
          <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
        </>
      ) : null}

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
              isSelected
                ? "border-amber-300/30 bg-[#3b3008] text-amber-200"
                : "border-amber-300/12 bg-[#121009] text-amber-200"
            }`}
          >
            <RoleIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <h3 className="text-base font-black tracking-[-0.045em] text-white">
              {role.label}
            </h3>

            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
              {role.description}
            </p>

            <p
              className={`mt-2 text-[0.58rem] font-black uppercase tracking-[0.18em] ${
                isSelected ? "text-amber-200" : "text-amber-300/70"
              }`}
            >
              {isSelected ? "Role Utama" : "Pilih Role"}
            </p>
          </div>
        </div>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
            isSelected
              ? "border-amber-300/30 bg-[#4a3b08] text-amber-200"
              : "border-amber-300/10 bg-[#070706] text-slate-600"
          }`}
        >
          {isSelected ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-slate-700" />
          )}
        </span>
      </div>
    </button>
  );
}

function SecondaryRoleToggle({
  role,
  isChecked,
  isMainRole,
  onToggle,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled && !isMainRole) {
          onToggle(role.id);
        }
      }}
      disabled={disabled || isMainRole}
      className={`flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 text-left active:scale-[0.99] disabled:cursor-not-allowed ${
        isMainRole
          ? "border-amber-300/18 bg-amber-300/[0.055] text-amber-100 opacity-80"
          : isChecked
          ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
          : "border-amber-300/10 bg-black/28 text-slate-300"
      }`}
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-black">{role.label}</span>
        {isMainRole ? (
          <span className="mt-1 block text-[0.55rem] font-black uppercase tracking-[0.16em] text-amber-300/70">
            Sudah role utama
          </span>
        ) : null}
      </span>

      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
          isMainRole || isChecked
            ? "border-amber-300/30 bg-[#4a3b08] text-amber-200"
            : "border-amber-300/10 bg-[#070706] text-slate-700"
        }`}
      >
        {isMainRole || isChecked ? <CheckIcon className="h-3.5 w-3.5" /> : null}
      </span>
    </button>
  );
}

export default function KruVocalisRolePage() {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    user: null,
    profile: null,
  });
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [selectedMainRoleId, setSelectedMainRoleId] = useState("");
  const [selectedSecondaryRoleIds, setSelectedSecondaryRoleIds] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const baseRoleOptions = useMemo(
    () => [...KRU_ROLE_OPTIONS, ...EXTRA_ROLE_OPTIONS],
    []
  );

  useEffect(() => {
    const unsubscribe = listenKruVocalisAuthState(({ user, profile }) => {
      if (!user) {
        router.replace("/login-kru-vocalis?error=login-required");
        return;
      }

      if (!profile || normalizeText(profile.status) !== "approved") {
        router.replace("/kru-vocalis");
        return;
      }

      setAuthState({
        user,
        profile,
      });
      setIsCheckingAccess(false);
    });

    return unsubscribe;
  }, [router]);

  const profileData = useMemo(() => {
    const { user, profile } = authState;
    const roles = getProfileRoles(profile);

    const mainRole =
      profile?.mainRole ||
      roles[0] ||
      INITIAL_KRU_PROFILE.role ||
      "Vocalis / Kru";

    const visibleRoles = roles.length > 0 ? roles : [mainRole];

    return {
      name: getDisplayName(user, profile),
      email: profile?.email || user?.email || "",
      mainRole,
      roles: visibleRoles,
      photoURL:
        profile?.photoURL || user?.photoURL || INITIAL_KRU_PROFILE.avatarUrl,
    };
  }, [authState]);

  const roleOptions = useMemo(() => {
    const optionMap = new Map();

    baseRoleOptions.forEach((role) => {
      optionMap.set(normalizeText(role.label), role);
    });

    normalizeRoleLabels([profileData.mainRole, ...profileData.roles]).forEach(
      (roleLabel) => {
        const cleanLabel = normalizeText(roleLabel);

        if (!cleanLabel || optionMap.has(cleanLabel)) {
          return;
        }

        optionMap.set(cleanLabel, {
          id: createRoleId(roleLabel) || `role-${optionMap.size + 1}`,
          label: roleLabel,
          description: "Role anggota tersimpan dari database Kru/Vocalis.",
        });
      }
    );

    return Array.from(optionMap.values());
  }, [baseRoleOptions, profileData.mainRole, profileData.roles]);

  useEffect(() => {
    if (isCheckingAccess) {
      return;
    }

    const mainRoleOption =
      getRoleOptionFromLabel(profileData.mainRole, roleOptions) ||
      roleOptions[0];

    const nextMainRoleId = mainRoleOption?.id || "";
    const nextSecondaryRoleIds = normalizeRoleLabels(profileData.roles)
      .filter(
        (roleLabel) =>
          normalizeText(roleLabel) !== normalizeText(mainRoleOption?.label)
      )
      .map((roleLabel) => getRoleOptionFromLabel(roleLabel, roleOptions)?.id)
      .filter(Boolean);

    setSelectedMainRoleId(nextMainRoleId);
    setSelectedSecondaryRoleIds(Array.from(new Set(nextSecondaryRoleIds)));
    setMessage("");
    setErrorMessage("");
  }, [isCheckingAccess, profileData.mainRole, profileData.roles, roleOptions]);

  const selectedMainRole = useMemo(() => {
    return (
      roleOptions.find((role) => role.id === selectedMainRoleId) ||
      roleOptions[0] ||
      null
    );
  }, [roleOptions, selectedMainRoleId]);

  const selectedRoleLabels = useMemo(() => {
    const secondaryLabels = selectedSecondaryRoleIds
      .map((roleId) => roleOptions.find((role) => role.id === roleId)?.label)
      .filter(Boolean);

    return normalizeRoleLabels([selectedMainRole?.label, ...secondaryLabels]);
  }, [roleOptions, selectedMainRole, selectedSecondaryRoleIds]);

  function handleSelectMainRole(nextRole) {
    setSelectedMainRoleId(nextRole.id);
    setSelectedSecondaryRoleIds((current) =>
      current.filter((roleId) => roleId !== nextRole.id)
    );
    setMessage("");
    setErrorMessage("");
  }

  function toggleSecondaryRole(roleId) {
    setSelectedSecondaryRoleIds((current) => {
      if (current.includes(roleId)) {
        return current.filter((item) => item !== roleId);
      }

      return [...current, roleId];
    });

    setMessage("");
    setErrorMessage("");
  }

  async function handleSave() {
    if (isSaving) {
      return;
    }

    if (!selectedMainRole?.label) {
      setMessage("");
      setErrorMessage("Role utama wajib dipilih.");
      return;
    }

    try {
      setIsSaving(true);
      setMessage("");
      setErrorMessage("");

      await updateKruVocalisRoles({
        mainRole: selectedMainRole.label,
        roles: selectedRoleLabels,
      });

      setAuthState((current) => ({
        ...current,
        profile: {
          ...current.profile,
          mainRole: selectedMainRole.label,
          roles: selectedRoleLabels,
        },
      }));

      setMessage("Role Kru/Vocalis berhasil disimpan ke database.");
    } catch (error) {
      console.error("Gagal menyimpan role Kru/Vocalis:", error);
      setErrorMessage(
        error?.message ||
          "Gagal menyimpan role. Pastikan rules Firestore sudah diperbarui."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isCheckingAccess) {
    return <LoadingState />;
  }

  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 pb-6 pt-7 shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/16 bg-[#15120b] text-amber-200 shadow-inner shadow-black/25">
            <RoleIcon className="h-8 w-8" />
          </span>

          <p className="mt-6 text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Role Kru
          </p>

          <h1 className="mt-3 text-[1.95rem] font-black leading-none tracking-[-0.07em] text-white">
            Role Kru/Vocalis
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            Pilih role utama dan role tambahan sesuai peran aktif anggota
            Khoirunnada.
          </p>

          <div className="mt-6 rounded-[1.6rem] border border-amber-300/12 bg-black/30 px-4 py-4">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-amber-300/80">
              Role Utama Saat Ini
            </p>

            <p className="mt-2 text-xl font-black tracking-[-0.055em] text-white">
              {selectedMainRole?.label || profileData.mainRole}
            </p>

            <p className="mx-auto mt-2 max-w-[15rem] text-xs font-semibold leading-5 text-slate-500">
              {getRoleDescription(
                selectedMainRole?.label || profileData.mainRole,
                roleOptions
              )}
            </p>
          </div>

          <div className="mt-3 rounded-[1.6rem] border border-emerald-300/14 bg-emerald-400/10 px-4 py-4">
            <p className="text-2xl font-black tracking-[-0.06em] text-emerald-100">
              DB
            </p>
            <p className="mt-1 text-[0.58rem] font-black uppercase tracking-[0.18em] text-emerald-200/80">
              Aktif Bisa Diubah
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
        <div className="flex items-center gap-4">
          <img
            src={profileData.photoURL}
            alt={profileData.name}
            className="h-16 w-16 rounded-full object-cover drop-shadow-[0_14px_32px_rgba(0,0,0,0.55)]"
          />

          <div className="min-w-0">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
              Akun Kru
            </p>

            <h2 className="mt-1 truncate text-xl font-black tracking-[-0.055em] text-white">
              {profileData.name}
            </h2>

            {profileData.email ? (
              <p className="mt-1 truncate text-sm font-bold text-slate-500">
                {profileData.email}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Pilih Role Utama
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.065em] text-white">
            Peran Anggota
          </h2>
        </div>

        <div className="space-y-3">
          {roleOptions.map((role) => (
            <RoleOptionCard
              key={role.id}
              role={role}
              isSelected={selectedMainRoleId === role.id}
              onSelect={handleSelectMainRole}
              disabled={isSaving}
            />
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
            <DatabaseIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
              Role Tambahan
            </p>

            <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
              Boleh Pilih Lebih Dari Satu
            </h2>

            <p className="mt-2 text-xs font-semibold leading-6 text-slate-500">
              Role utama otomatis ikut tersimpan. Role tambahan bisa dipilih
              sesuai kebutuhan anggota.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          {roleOptions.map((role) => (
            <SecondaryRoleToggle
              key={role.id}
              role={role}
              isChecked={selectedSecondaryRoleIds.includes(role.id)}
              isMainRole={selectedMainRoleId === role.id}
              onToggle={toggleSecondaryRole}
              disabled={isSaving}
            />
          ))}
        </div>
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
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SaveIcon className="h-4 w-4" />
          {isSaving ? "Menyimpan..." : "Simpan Role"}
        </button>

        <Link
          href="/kru-vocalis"
          className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-amber-300/12 bg-black/30 px-5 text-sm font-black text-amber-100 active:scale-[0.985]"
        >
          Kembali ke Profil
        </Link>
      </div>
    </PageContainer>
  );
}