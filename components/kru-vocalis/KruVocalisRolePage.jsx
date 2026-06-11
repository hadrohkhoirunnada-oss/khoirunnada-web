"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import { INITIAL_KRU_PROFILE, KRU_ROLE_OPTIONS } from "@/data/initialKruVocalis";

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

function RoleOptionCard({ role, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className={`relative w-full overflow-hidden rounded-[1.55rem] border p-4 text-left shadow-lg shadow-black/20 transition active:scale-[0.99] ${
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
              {isSelected ? "Role Dipilih" : "Pilih Role"}
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

export default function KruVocalisRolePage() {
  const roleOptions = useMemo(
    () => [...KRU_ROLE_OPTIONS, ...EXTRA_ROLE_OPTIONS],
    []
  );

  const defaultRole =
    roleOptions.find((role) => INITIAL_KRU_PROFILE.role.includes(role.label)) ||
    roleOptions[0];

  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [secondaryRoles, setSecondaryRoles] = useState([]);
  const [message, setMessage] = useState("");

  function toggleSecondaryRole(roleId) {
    setSecondaryRoles((current) => {
      if (current.includes(roleId)) {
        return current.filter((id) => id !== roleId);
      }

      return [...current, roleId];
    });

    setMessage("");
  }

  function handleSave() {
    setMessage(
      "Role Kru/Vocalis sudah tertampung di frontend. Penyimpanan permanen akan aktif setelah backend Kru/Vocalis disambungkan."
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
            <RoleIcon className="h-8 w-8" />
          </span>

          <p className="mt-6 text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Role Kru
          </p>

          <h1 className="mt-3 text-[1.95rem] font-black leading-none tracking-[-0.07em] text-white">
            Role Kru/Vocalis
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            Pilih peran utama dan tambahan untuk kebutuhan internal anggota
            Khoirunnada.
          </p>

          <div className="mt-6 rounded-[1.6rem] border border-amber-300/12 bg-black/30 px-4 py-4">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-amber-300/80">
              Role Utama Saat Ini
            </p>

            <p className="mt-2 text-xl font-black tracking-[-0.055em] text-white">
              {selectedRole.label}
            </p>

            <p className="mx-auto mt-2 max-w-[15rem] text-xs font-semibold leading-5 text-slate-500">
              {selectedRole.description}
            </p>
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
              isSelected={selectedRole.id === role.id}
              onSelect={(nextRole) => {
                setSelectedRole(nextRole);
                setMessage("");
              }}
            />
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
            <StarIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
              Role Tambahan
            </p>
            <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
              Boleh Pilih Lebih Dari Satu
            </h2>
          </div>
        </div>

        <div className="grid gap-2">
          {roleOptions.map((role) => {
            const isChecked = secondaryRoles.includes(role.id);

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => toggleSecondaryRole(role.id)}
                className={`flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 text-left active:scale-[0.99] ${
                  isChecked
                    ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
                    : "border-amber-300/10 bg-black/28 text-slate-300"
                }`}
              >
                <span className="min-w-0 truncate text-sm font-black">
                  {role.label}
                </span>

                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    isChecked
                      ? "border-amber-300/30 bg-[#4a3b08] text-amber-200"
                      : "border-amber-300/10 bg-[#070706] text-slate-700"
                  }`}
                >
                  {isChecked ? <CheckIcon className="h-3.5 w-3.5" /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {message ? (
        <p className="mt-5 rounded-2xl border border-amber-300/16 bg-amber-300/10 px-4 py-3 text-center text-xs font-bold leading-6 text-amber-100">
          {message}
        </p>
      ) : null}

      <div className="mt-5 grid gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985]"
        >
          <SaveIcon className="h-4 w-4" />
          Simpan Role
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