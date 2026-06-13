"use client";

import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";

function GearIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M19.15 13.2c.08-.39.1-.79.1-1.2s-.02-.81-.1-1.2l2.05-1.58-2-3.46-2.42.98a8.08 8.08 0 0 0-2.08-1.2L14.35 3h-4.7l-.35 2.54a8.08 8.08 0 0 0-2.08 1.2L4.8 5.76l-2 3.46 2.05 1.58c-.08.39-.1.79-.1 1.2s.02.81.1 1.2L2.8 14.78l2 3.46 2.42-.98c.63.5 1.33.9 2.08 1.2l.35 2.54h4.7l.35-2.54c.75-.3 1.45-.7 2.08-1.2l2.42.98 2-3.46-2.05-1.58Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M16.03 3.25c-6.94 0-12.6 5.58-12.6 12.45 0 2.2.58 4.34 1.68 6.22L3.3 28.75l7-1.78a12.74 12.74 0 0 0 5.73 1.36c6.94 0 12.6-5.58 12.6-12.45S22.97 3.25 16.03 3.25Zm0 22.95c-1.8 0-3.56-.46-5.1-1.34l-.36-.2-4.15 1.06 1.1-4.02-.24-.38a10.23 10.23 0 0 1-1.58-5.62c0-5.7 4.63-10.33 10.33-10.33S26.36 10 26.36 15.7 21.73 26.2 16.03 26.2Z"
      />
      <path
        fill="currentColor"
        d="M21.72 18.58c-.3-.15-1.78-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.88-.78-1.48-1.75-1.65-2.05-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.25-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48 0 1.46 1.08 2.88 1.23 3.08.15.2 2.1 3.2 5.1 4.5.71.3 1.27.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"
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
        d="M7.75 10.25V8.1a4.25 4.25 0 0 1 8.5 0v2.15"
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
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.25 12A8.25 8.25 0 1 1 3.75 12a8.25 8.25 0 0 1 16.5 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4.25 12h15.5M12 3.75c2.1 2.15 3.1 4.9 3.1 8.25s-1 6.1-3.1 8.25c-2.1-2.15-3.1-4.9-3.1-8.25s1-6.1 3.1-8.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
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
        d="M12 3.75 18.75 6v5.25c0 4.25-2.65 7.35-6.75 9-4.1-1.65-6.75-4.75-6.75-9V6L12 3.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9.25 12.1 1.85 1.85 3.9-4.05"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaletteIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.25a7.75 7.75 0 0 0 0 15.5h1.2c.95 0 1.45-1.12.83-1.84-.55-.65-.1-1.66.76-1.66h1.1A4.86 4.86 0 0 0 20.75 11.4 7.15 7.15 0 0 0 13.6 4.25H12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 10.25h.01M11.25 8.25h.01M14.75 8.75h.01M7.75 13.5h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
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

const settingMenus = [
  {
    title: "Atur Nomor Admin",
    description:
      "Kelola maksimal 5 nomor WhatsApp admin untuk booking dan floating WhatsApp.",
    href: "/admin/pengaturan/nomor-admin",
    icon: WhatsAppIcon,
    status: "Aktif",
    isReady: true,
  },
  {
    title: "Media Sosial & Copyright",
    description:
      "Kelola tautan Facebook, Instagram, YouTube, TikTok, dan teks copyright footer.",
    href: "/admin/pengaturan/media-sosial",
    icon: SocialIcon,
    status: "Aktif",
    isReady: true,
  },
  {
    title: "Pengaturan Profil & Sejarah",
    description:
      "Atur profil majelis, informasi utama, sejarah singkat, kronologi berdiri, harapan, doa, dan nilai majelis.",
    href: "/admin/pengaturan/profil-sejarah",
    icon: GlobeIcon,
    status: "Aktif",
    isReady: true,
  },
  {
    title: "Tampilan Website",
    description:
      "Atur gaya visual, warna, banner, dan elemen tampilan website.",
    icon: PaletteIcon,
    status: "Terkunci",
    isReady: false,
  },
  {
    title: "Keamanan Admin",
    description:
      "Kelola akses admin, verifikasi, dan pengamanan halaman dashboard.",
    icon: ShieldIcon,
    status: "Terkunci",
    isReady: false,
  },
];

function SettingMenuCard({ item }) {
  const Icon = item.icon;

  const content = (
    <div
      className={`group relative flex min-h-[8.5rem] overflow-hidden rounded-[1.7rem] border p-4 text-left shadow-xl shadow-black/25 transition active:scale-[0.99] ${
        item.isReady
          ? "border-amber-300/16 bg-black/34 hover:border-amber-300/30"
          : "border-white/8 bg-black/22 opacity-75"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.24))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10 flex w-full items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-inner shadow-black/25 ${
            item.isReady
              ? "border-emerald-400/18 bg-emerald-400/10 text-[#25D366]"
              : "border-slate-500/14 bg-white/[0.035] text-slate-500"
          }`}
        >
          <Icon className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={`text-[0.62rem] font-extrabold uppercase tracking-[0.22em] ${
                  item.isReady ? "text-amber-300" : "text-slate-500"
                }`}
              >
                {item.status}
              </p>

              <h2 className="mt-2 text-lg font-black leading-tight tracking-[-0.04em] text-white">
                {item.title}
              </h2>
            </div>

            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border ${
                item.isReady
                  ? "border-amber-300/16 bg-black/35 text-amber-200 group-active:translate-x-0.5"
                  : "border-slate-500/12 bg-black/25 text-slate-500"
              }`}
            >
              {item.isReady ? (
                <ArrowIcon className="h-5 w-5" />
              ) : (
                <LockIcon className="h-5 w-5" />
              )}
            </span>
          </div>

          <p className="mt-3 text-sm font-medium leading-6 text-slate-400">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );

  if (!item.isReady) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link href={item.href} className="block">
      {content}
    </Link>
  );
}

export default function Page() {
  return (
    <AdminShell>
      <section className="space-y-5 pb-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.1),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-300 shadow-inner shadow-black/25">
                <GearIcon className="h-7 w-7" />
              </span>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-amber-300">
                  Pengaturan
                </p>

                <h1 className="mt-2 text-2xl font-black leading-tight tracking-[-0.055em] text-white">
                  Pusat Pengaturan
                </h1>
              </div>
            </div>

            <p className="mt-5 text-sm font-medium leading-7 text-slate-300">
              Kelola konfigurasi website Khoirunnada. Menu yang sudah aktif
              adalah nomor admin WhatsApp, media sosial, copyright footer, dan
              pengaturan profil serta sejarah.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {settingMenus.map((item) => (
            <SettingMenuCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </AdminShell>
  );
}