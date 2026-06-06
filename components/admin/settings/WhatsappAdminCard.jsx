"use client";

import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  WhatsAppIcon,
} from "@/components/admin/settings/WhatsappAdminIcons";
import {
  DEFAULT_SITE_CONTACT_SETTINGS,
  getWhatsappUrl,
  normalizeWhatsappNumber,
} from "@/services/siteSettingsService";

export default function WhatsappAdminCard({
  admin,
  index,
  saving,
  onChange,
  onToggleActive,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const normalizedNumber = normalizeWhatsappNumber(admin.whatsappNumber);

  const previewUrl = getWhatsappUrl(
    normalizedNumber,
    DEFAULT_SITE_CONTACT_SETTINGS.whatsappMessage
  );

  return (
    <div className="relative overflow-hidden rounded-[1.65rem] border border-amber-300/14 bg-black/34 p-4 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/14 bg-emerald-400/10 text-[#25D366]">
            <WhatsAppIcon className="h-7 w-7" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Admin {index + 1}
            </p>

            <p className="mt-1 truncate text-sm font-black text-white">
              {admin.name || "Nama admin belum diisi"}
            </p>

            <p className="mt-1 break-all text-sm font-black text-amber-100">
              {normalizedNumber || "Nomor belum diisi"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing((current) => !current)}
              disabled={saving}
              aria-label="Edit admin"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/16 bg-amber-300/10 text-amber-200 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PencilIcon className="h-4.5 w-4.5" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(admin.id)}
              disabled={saving}
              aria-label="Hapus admin"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-400/18 bg-red-500/10 text-red-100 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <TrashIcon className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="mt-4 space-y-3 border-t border-amber-300/10 pt-4">
            <div>
              <label className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-amber-300/80">
                Nama
              </label>

              <input
                type="text"
                value={admin.name}
                onChange={(event) =>
                  onChange(admin.id, "name", event.target.value)
                }
                disabled={saving}
                className="mt-2 min-h-12 w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 text-sm font-black text-white outline-none transition focus:border-amber-300/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-amber-300/80">
                Nomor
              </label>

              <input
                type="tel"
                value={admin.whatsappNumber}
                onChange={(event) =>
                  onChange(admin.id, "whatsappNumber", event.target.value)
                }
                disabled={saving}
                className="mt-2 min-h-12 w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 text-sm font-black text-amber-100 outline-none transition focus:border-amber-300/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onToggleActive(admin.id)}
                disabled={saving}
                className={`min-h-10 rounded-2xl border px-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  admin.isActive
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                    : "border-slate-500/14 bg-white/[0.035] text-slate-400"
                }`}
              >
                {admin.isActive ? "Aktif" : "Nonaktif"}
              </button>

              {previewUrl ? (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-amber-300/18 bg-amber-300/10 px-3 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-amber-200 active:scale-[0.98]"
                >
                  Tes Link
                </a>
              ) : (
                <span className="min-h-10 rounded-2xl border border-slate-500/10 bg-white/[0.025]" />
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="min-h-10 w-full rounded-2xl border border-amber-300/14 bg-black/35 px-3 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-100 transition active:scale-[0.98]"
            >
              Selesai Edit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}