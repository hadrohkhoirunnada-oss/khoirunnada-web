"use client";

import Link from "next/link";
import {
  BackIcon,
  WhatsAppIcon,
} from "@/components/admin/settings/WhatsappAdminIcons";

export default function WhatsappAdminHeader({ totalAdmins, maxAdmins }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,211,102,0.09),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/admin/pengaturan"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-amber-300/14 bg-black/30 px-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-200 shadow-lg shadow-black/20 transition active:scale-[0.98]"
          >
            <BackIcon className="h-4 w-4" />
            Kembali
          </Link>

          <span className="inline-flex min-h-10 items-center rounded-full border border-emerald-400/16 bg-emerald-400/10 px-3.5 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-emerald-200">
            {totalAdmins}/{maxAdmins} Admin
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/14 bg-emerald-400/10 text-[#25D366] shadow-inner shadow-black/25">
            <WhatsAppIcon className="h-8 w-8" />
          </span>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-amber-300">
              Nomor Admin
            </p>

            <h1 className="mt-2 text-2xl font-black leading-tight tracking-[-0.055em] text-white">
              Atur WhatsApp Admin
            </h1>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium leading-7 text-slate-300">
          Tambahkan sampai {maxAdmins} admin WhatsApp. Nomor yang sama tidak
          bisa didaftarkan ulang.
        </p>
      </div>
    </div>
  );
}