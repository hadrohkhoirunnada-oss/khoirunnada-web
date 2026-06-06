"use client";

import { useState } from "react";
import {
    AdminIcon,
    CloseIcon,
    InfoIcon,
    PlusIcon,
    WhatsAppIcon,
} from "@/components/admin/settings/WhatsappAdminIcons";

const adminHelpMessage = encodeURIComponent(
    "Assalamu'alaikum, saya ingin bertanya tentang format nomor WhatsApp untuk pengaturan admin Khoirunnada."
);

const adminHelpUrl = `https://wa.me/6285173057576?text=${adminHelpMessage}`;

export default function WhatsappAdminCreateForm({
    newAdmin,
    loading,
    saving,
    canAddMoreAdmins,
    maxAdmins,
    onChange,
    onAdd,
}) {
    const [isFormatPopupOpen, setIsFormatPopupOpen] = useState(false);

    return (
        <>
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

                <div className="relative z-10 space-y-5">
                    <div>
                        <label
                            htmlFor="new-admin-name"
                            className="text-xs font-extrabold uppercase tracking-[0.24em] text-amber-300"
                        >
                            Nama Admin
                        </label>

                        <div className="mt-3 flex min-h-14 items-center gap-3 rounded-2xl border border-amber-300/14 bg-black/35 px-4 transition focus-within:border-amber-300/45">
                            <AdminIcon className="h-5 w-5 shrink-0 text-amber-200" />

                            <input
                                id="new-admin-name"
                                type="text"
                                value={newAdmin.name}
                                onChange={onChange("name")}
                                placeholder="Contoh: Admin Utama"
                                disabled={loading || saving || !canAddMoreAdmins}
                                className="min-h-14 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="new-admin-whatsapp"
                            className="text-xs font-extrabold uppercase tracking-[0.24em] text-amber-300"
                        >
                            Nomor WhatsApp
                        </label>

                        <div className="mt-3 flex min-h-14 items-center gap-3 rounded-2xl border border-amber-300/14 bg-black/35 px-4 transition focus-within:border-amber-300/45">
                            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />

                            <input
                                id="new-admin-whatsapp"
                                type="tel"
                                value={newAdmin.whatsappNumber}
                                onChange={onChange("whatsappNumber")}
                                placeholder="Contoh: 6281234567890"
                                disabled={loading || saving || !canAddMoreAdmins}
                                className="min-h-14 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </div>

                        <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                            Untuk format nomor{" "}
                            <button
                                type="button"
                                onClick={() => setIsFormatPopupOpen(true)}
                                className="font-extrabold text-amber-300 underline decoration-amber-300/35 underline-offset-4 active:scale-[0.98]"
                            >
                                Cek Disini
                            </button>
                            , dan jika belum faham{" "}
                            <a
                                href={adminHelpUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-extrabold text-amber-300 underline decoration-amber-300/35 underline-offset-4"
                            >
                                Hubungi Admin
                            </a>
                            .
                        </p>
                    </div>

                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={onAdd}
                            disabled={loading || saving || !canAddMoreAdmins}
                            className="flex min-h-13 w-full items-center justify-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 text-sm font-black text-emerald-100 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <PlusIcon className="h-5 w-5" />
                            {canAddMoreAdmins
                                ? "Tambah Admin"
                                : `Maksimal ${maxAdmins} Admin Tercapai`}
                        </button>

                        <p className="px-1 text-center text-[0.7rem] font-bold leading-5 text-slate-500">
                            Klik tombol di atas sebelum klik tombol{" "}
                            <span className="text-amber-300">Simpan Perubahan</span>.
                        </p>
                    </div>
                </div>
            </div>

            {isFormatPopupOpen ? (
                <div className="fixed inset-0 z-[80] flex items-end justify-center px-4 pb-6 pt-20">
                    <button
                        type="button"
                        aria-label="Tutup keterangan format nomor"
                        onClick={() => setIsFormatPopupOpen(false)}
                        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
                    />

                    <section className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-amber-300/16 bg-[#05070d]/96 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.58)] backdrop-blur-2xl">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.12),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.24))]" />
                        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
                                        Format Nomor
                                    </p>

                                    <h2 className="mt-2 text-xl font-black tracking-[-0.045em] text-white">
                                        Format WhatsApp Admin
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsFormatPopupOpen(false)}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-100 active:scale-[0.96]"
                                >
                                    <CloseIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-5 space-y-3 text-sm font-semibold leading-7 text-slate-300">
                                <p>
                                    Sistem akan otomatis merapikan nomor ke format Indonesia
                                    dengan awalan <span className="font-black text-amber-200">62</span>.
                                </p>

                                <div className="rounded-2xl border border-amber-300/12 bg-black/30 p-4">
                                    <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                                        Contoh yang boleh
                                    </p>

                                    <div className="mt-3 space-y-2 text-amber-50">
                                        <p>085173057576 → 6285173057576</p>
                                        <p>6285173057576 → 6285173057576</p>
                                        <p>+6285173057576 → 6285173057576</p>
                                    </div>
                                </div>

                                <p className="text-xs leading-6 text-slate-500">
                                    Jangan isi spasi, tanda minus, atau angka yang bukan nomor
                                    WhatsApp aktif. Jika ragu, klik Hubungi Admin.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsFormatPopupOpen(false)}
                                className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-amber-300/10 px-4 text-sm font-black text-amber-100 active:scale-[0.98]"
                            >
                                <InfoIcon className="h-5 w-5" />
                                Saya Mengerti
                            </button>
                        </div>
                    </section>
                </div>
            ) : null}
        </>
    );
}