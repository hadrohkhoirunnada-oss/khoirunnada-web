"use client";

import { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import { INITIAL_KRU_PROFILE } from "@/data/initialKruVocalis";

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

function BellIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.25 16.25H5.75c1.1-1.1 1.55-2.5 1.55-4.25V9.75a4.7 4.7 0 0 1 9.4 0V12c0 1.75.45 3.15 1.55 4.25Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.25a2.15 2.15 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.75 18.25 6v5.35c0 3.92-2.48 7.42-6.25 8.9-3.77-1.48-6.25-4.98-6.25-8.9V6L12 3.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9.25 12.15 1.75 1.7 3.75-4.05"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        d="M10.75 5.25h-4.5v13.5h4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.25 8.25 17 12l-3.75 3.75M17 12H9.25"
        stroke="currentColor"
        strokeWidth="1.75"
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

function ToggleItem({ icon: Icon, title, description, enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 rounded-[1.55rem] border border-amber-300/10 bg-black/30 px-4 py-4 text-left shadow-lg shadow-black/20 active:scale-[0.99]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/12 bg-[#121009] text-amber-200">
          <Icon className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <h3 className="text-[0.95rem] font-black tracking-[-0.04em] text-white">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <span
        className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
          enabled
            ? "border-amber-300/30 bg-amber-300/20"
            : "border-amber-300/10 bg-black/40"
        }`}
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition ${
            enabled
              ? "left-[1.55rem] bg-amber-300"
              : "left-1 bg-slate-700"
          }`}
        />
      </span>
    </button>
  );
}

export default function KruVocalisAccountSettingsPage() {
  const [settings, setSettings] = useState({
    notification: true,
    privateProfile: false,
    saveActivity: true,
  });

  const [message, setMessage] = useState("");

  function toggleSetting(settingName) {
    setSettings((current) => ({
      ...current,
      [settingName]: !current[settingName],
    }));

    setMessage("");
  }

  function handleSave() {
    setMessage(
      "Pengaturan akun sudah tertampung di frontend. Penyimpanan permanen akan aktif setelah backend Kru/Vocalis disambungkan."
    );
  }

  function handleLogout() {
    setMessage(
      "Logout akun Kru/Vocalis akan aktif setelah sistem login internal disambungkan."
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
            <SettingsIcon className="h-8 w-8" />
          </span>

          <p className="mt-6 text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Pengaturan Kru
          </p>

          <h1 className="mt-3 text-[1.95rem] font-black leading-none tracking-[-0.07em] text-white">
            Pengaturan Akun
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            Kelola preferensi akun internal Kru/Vocalis Khoirunnada.
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
        <div className="flex items-center gap-4">
          <img
            src={INITIAL_KRU_PROFILE.avatarUrl}
            alt={INITIAL_KRU_PROFILE.name}
            className="h-16 w-16 rounded-full object-contain drop-shadow-[0_14px_32px_rgba(0,0,0,0.55)]"
          />

          <div className="min-w-0">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
              Akun Aktif
            </p>

            <h2 className="mt-1 truncate text-xl font-black tracking-[-0.055em] text-white">
              {INITIAL_KRU_PROFILE.name}
            </h2>

            <p className="mt-1 truncate text-sm font-bold text-slate-500">
              @{INITIAL_KRU_PROFILE.username}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-300/12 bg-emerald-400/10 px-4 py-3">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-emerald-200">
            Status Akun
          </p>
          <p className="mt-2 text-sm font-black text-white">
            {INITIAL_KRU_PROFILE.status}
          </p>
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Preferensi
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.065em] text-white">
            Pengaturan
          </h2>
        </div>

        <div className="space-y-3">
          <ToggleItem
            icon={BellIcon}
            title="Notifikasi Internal"
            description="Aktifkan informasi seputar latihan, bacaan, dan kebutuhan kru."
            enabled={settings.notification}
            onToggle={() => toggleSetting("notification")}
          />

          <ToggleItem
            icon={ShieldIcon}
            title="Profil Privat"
            description="Batasi tampilan profil dari anggota lain jika fitur komunitas aktif."
            enabled={settings.privateProfile}
            onToggle={() => toggleSetting("privateProfile")}
          />

          <ToggleItem
            icon={SettingsIcon}
            title="Simpan Aktivitas"
            description="Simpan riwayat bacaan favorit, catatan, dan aktivitas latihan."
            enabled={settings.saveActivity}
            onToggle={() => toggleSetting("saveActivity")}
          />
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
          className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985]"
        >
          <SaveIcon className="h-4 w-4" />
          Simpan Pengaturan
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl border border-red-300/12 bg-red-500/10 px-5 text-sm font-black text-red-100 active:scale-[0.985]"
        >
          <LogoutIcon className="h-4 w-4" />
          Logout Akun
        </button>

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