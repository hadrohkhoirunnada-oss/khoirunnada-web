"use client";

import WhatsappAdminCard from "@/components/admin/settings/WhatsappAdminCard";

export default function WhatsappAdminList({
  admins,
  loading,
  saving,
  activeAdminsCount,
  onChange,
  onToggleActive,
  onDelete,
}) {
  return (
    <section className="space-y-4">
      <div className="px-1">
        <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
          Admin Terdaftar
        </p>

        <p className="mt-2 text-xs font-semibold text-slate-500">
          {activeAdminsCount} admin aktif dari {admins.length} admin.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-amber-300/12 bg-black/25 p-4 text-sm font-bold text-slate-400">
          Memuat daftar admin...
        </div>
      ) : admins.length > 0 ? (
        <div className="space-y-3">
          {admins.map((admin, index) => (
            <WhatsappAdminCard
              key={admin.id}
              admin={admin}
              index={index}
              saving={saving}
              onChange={onChange}
              onToggleActive={onToggleActive}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-red-400/18 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-100">
          Belum ada nomor admin. Tambahkan minimal 1 nomor admin untuk layanan
          booking.
        </div>
      )}
    </section>
  );
}