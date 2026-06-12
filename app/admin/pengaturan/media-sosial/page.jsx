"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import {
  DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS,
  getSiteSocialMediaSettings,
  updateSiteSocialMediaSettings,
} from "@/services/siteSettingsService";

function ArrowLeftIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.25 6.75 9.75 12l5.5 5.25M10.25 12h9"
        stroke="currentColor"
        strokeWidth="1.9"
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
        d="M5.75 4.75h10.1l2.4 2.4v12.1H5.75V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 4.75v5h7.5v-5M8.5 19.25v-5h7v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 12a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM15.25 18.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m11.45 10.25 1.1 1.5M11.95 15.9l-1.7-1.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8.75 18.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  helper = "",
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-amber-300">
        {label}
      </span>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 min-h-[3.1rem] w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 text-sm font-semibold text-white outline-none shadow-inner shadow-black/25 transition placeholder:text-slate-600 focus:border-amber-300/35"
      />

      {helper ? (
        <span className="mt-2 block text-xs font-medium leading-5 text-slate-500">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  helper = "",
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-amber-300">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="mt-2 w-full resize-none rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold leading-6 text-white outline-none shadow-inner shadow-black/25 transition placeholder:text-slate-600 focus:border-amber-300/35"
      />

      {helper ? (
        <span className="mt-2 block text-xs font-medium leading-5 text-slate-500">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

export default function Page() {
  const [formData, setFormData] = useState(DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const settings = await getSiteSocialMediaSettings();

        if (!isMounted) {
          return;
        }

        setFormData({
          ...DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS,
          ...settings,
        });
      } catch (error) {
        console.error("Gagal memuat media sosial:", error);

        if (isMounted) {
          setErrorMessage(
            error?.message || "Gagal memuat pengaturan media sosial."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const updatedSettings = await updateSiteSocialMediaSettings(formData);

      setFormData({
        ...DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS,
        ...updatedSettings,
      });

      setSuccessMessage("Pengaturan media sosial dan copyright berhasil disimpan.");
    } catch (error) {
      console.error("Gagal menyimpan media sosial:", error);

      setErrorMessage(
        error?.message || "Gagal menyimpan pengaturan media sosial."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AdminShell>
      <section className="space-y-5 pb-8">
        <Link
          href="/admin/pengaturan"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-amber-300/14 bg-black/30 px-4 text-sm font-extrabold text-slate-200 shadow-lg shadow-black/20 transition active:scale-[0.98]"
        >
          <ArrowLeftIcon className="h-4 w-4 text-amber-300" />
          Kembali
        </Link>

        <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.1),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/18 bg-emerald-400/10 text-[#25D366] shadow-inner shadow-black/25">
                <SocialIcon className="h-7 w-7" />
              </span>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-amber-300">
                  Pengaturan
                </p>

                <h1 className="mt-2 text-2xl font-black leading-tight tracking-[-0.055em] text-white">
                  Media Sosial & Copyright
                </h1>
              </div>
            </div>

            <p className="mt-5 text-sm font-medium leading-7 text-slate-300">
              Atur tautan media sosial yang tampil di footer website, serta
              teks copyright di bagian paling bawah halaman.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.24))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

          <div className="relative z-10 space-y-5">
            {isLoading ? (
              <div className="rounded-2xl border border-amber-300/12 bg-black/30 p-4 text-sm font-semibold leading-6 text-slate-300">
                Memuat pengaturan media sosial...
              </div>
            ) : null}

            {successMessage ? (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm font-semibold leading-6 text-emerald-200">
                {successMessage}
              </div>
            ) : null}

            {errorMessage ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm font-semibold leading-6 text-red-200">
                {errorMessage}
              </div>
            ) : null}

            <FormField
              label="Facebook"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              helper="Kosongkan jika belum ingin mengaktifkan link Facebook."
            />

            <FormField
              label="Instagram"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              helper="Masukkan link profil Instagram resmi Khoirunnada."
            />

            <FormField
              label="YouTube"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              helper="Kosongkan jika channel YouTube belum tersedia."
            />

            <FormField
              label="TikTok"
              name="tiktokUrl"
              value={formData.tiktokUrl}
              onChange={handleChange}
              placeholder="https://tiktok.com/@..."
              helper="Kosongkan jika akun TikTok belum tersedia."
            />

            <TextareaField
              label="Copyright Footer"
              name="copyrightText"
              value={formData.copyrightText}
              onChange={handleChange}
              placeholder="© 2026 Hadroh Khoirunnada."
              helper="Teks ini akan tampil di bagian paling bawah footer."
            />

            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="group relative flex min-h-[3.35rem] w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-amber-300/18 bg-amber-300/12 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/25 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.18),rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.16))]" />
              <SaveIcon className="relative h-5 w-5 text-amber-200" />
              <span className="relative">
                {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
              </span>
            </button>
          </div>
        </form>
      </section>
    </AdminShell>
  );
}