"use client";

import { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import { INITIAL_KRU_PROFILE, KRU_ROLE_OPTIONS } from "@/data/initialKruVocalis";

const STATUS_OPTIONS = [
  "Anggota Aktif",
  "Kru Latihan",
  "Vocalis",
  "Kru Hadroh",
  "Nonaktif Sementara",
];

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

function CameraIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 7.25 9.1 5.5h5.8l1.35 1.75h1.5a2.5 2.5 0 0 1 2.5 2.5v6.5a2.5 2.5 0 0 1-2.5 2.5H6.25a2.5 2.5 0 0 1-2.5-2.5v-6.5a2.5 2.5 0 0 1 2.5-2.5h1.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.75a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
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

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.64rem] font-black uppercase tracking-[0.24em] text-amber-300/90">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  "min-h-[3.25rem] w-full rounded-2xl border border-amber-300/12 bg-black/34 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/42 focus:bg-black/50";

export default function KruVocalisEditProfilePage() {
  const [formData, setFormData] = useState({
    name: INITIAL_KRU_PROFILE.name,
    username: INITIAL_KRU_PROFILE.username,
    role: INITIAL_KRU_PROFILE.role,
    status: INITIAL_KRU_PROFILE.status,
    whatsapp: "",
    bio: "",
  });

  const [message, setMessage] = useState("");

  function updateField(fieldName, value) {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setMessage("Nama anggota wajib diisi.");
      return;
    }

    if (!formData.username.trim()) {
      setMessage("Username wajib diisi.");
      return;
    }

    setMessage(
      "Perubahan profil sudah tertampung di frontend. Penyimpanan permanen akan aktif setelah backend Kru/Vocalis disambungkan."
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
            Akun Kru
          </p>

          <h1 className="mt-3 text-[1.95rem] font-black leading-none tracking-[-0.07em] text-white">
            Edit Profil
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            Lengkapi identitas anggota Kru/Vocalis Khoirunnada.
          </p>

          <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border border-amber-300/20 bg-black/34 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <img
              src={INITIAL_KRU_PROFILE.avatarUrl}
              alt={formData.name}
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setMessage(
                "Upload foto profil akan diaktifkan setelah storage/backend Kru/Vocalis siap."
              )
            }
            className="mx-auto mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300/14 bg-black/30 px-4 text-xs font-black uppercase tracking-[0.16em] text-amber-200 active:scale-[0.98]"
          >
            <CameraIcon className="h-4 w-4" />
            Ganti Foto
          </button>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <section className="rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
              <UserIcon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
                Data Anggota
              </p>
              <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
                Identitas Profil
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <Field label="Nama Lengkap">
              <input
                type="text"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Nama anggota"
                className={inputClassName}
              />
            </Field>

            <Field label="Username">
              <input
                type="text"
                value={formData.username}
                onChange={(event) =>
                  updateField(
                    "username",
                    event.target.value.replace(/\s+/g, "").toLowerCase()
                  )
                }
                placeholder="username"
                className={inputClassName}
              />
            </Field>

            <Field label="Role Utama">
              <select
                value={formData.role}
                onChange={(event) => updateField("role", event.target.value)}
                className={`${inputClassName} appearance-none`}
              >
                <option value="Vocalis / Kru">Vocalis / Kru</option>
                {KRU_ROLE_OPTIONS.map((role) => (
                  <option key={role.id} value={role.label}>
                    {role.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Status Anggota">
              <select
                value={formData.status}
                onChange={(event) => updateField("status", event.target.value)}
                className={`${inputClassName} appearance-none`}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Nomor WhatsApp">
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(event) =>
                  updateField("whatsapp", event.target.value)
                }
                placeholder="Contoh: 62812xxxx"
                className={inputClassName}
              />
            </Field>

            <Field label="Catatan Singkat">
              <textarea
                value={formData.bio}
                onChange={(event) => updateField("bio", event.target.value)}
                placeholder="Contoh: Vocalis qosidah, aktif latihan malam Jumat."
                rows={4}
                className={`${inputClassName} resize-none py-4 leading-6`}
              />
            </Field>
          </div>
        </section>

        {message ? (
          <p className="rounded-2xl border border-amber-300/16 bg-amber-300/10 px-4 py-3 text-center text-xs font-bold leading-6 text-amber-100">
            {message}
          </p>
        ) : null}

        <div className="grid gap-3">
          <button
            type="submit"
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985]"
          >
            <SaveIcon className="h-4 w-4" />
            Simpan Perubahan
          </button>

          <Link
            href="/kru-vocalis"
            className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-amber-300/12 bg-black/30 px-5 text-sm font-black text-amber-100 active:scale-[0.985]"
          >
            Kembali ke Profil
          </Link>
        </div>
      </form>
    </PageContainer>
  );
}