"use client";

import { SaveIcon } from "@/components/admin/settings/WhatsappAdminIcons";

export default function WhatsappAdminSaveButton({ loading, saving, onSave }) {
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={loading || saving}
      className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border border-amber-300/20 bg-gradient-to-b from-amber-200 to-amber-500 px-5 text-sm font-black text-slate-950 shadow-lg shadow-amber-950/25 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <SaveIcon className="h-5 w-5" />
      {saving ? "Menyimpan..." : "Simpan Perubahan"}
    </button>
  );
}