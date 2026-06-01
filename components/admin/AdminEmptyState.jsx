export default function AdminEmptyState({
  title = "Data Belum Tersedia",
  description = "Data akan tampil di sini setelah ditambahkan.",
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-amber-300/12 bg-black/30 p-5 text-center shadow-lg shadow-black/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_44%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
          Kosong
        </p>

        <h2 className="mt-3 text-lg font-black tracking-[-0.04em] text-white">
          {title}
        </h2>

        <p className="mt-2 text-sm font-medium leading-7 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}