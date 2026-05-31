function InfoIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 10.75v5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 7.75h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M20.25 12A8.25 8.25 0 1 1 3.75 12a8.25 8.25 0 0 1 16.5 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function BookingSuccessHint() {
  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-amber-300/16 bg-white/[0.05] p-5 shadow-xl shadow-black/25 backdrop-blur-[10px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.022)_40%,rgba(0,0,0,0.18)_78%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.13),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.11),inset_0_-1px_0_rgba(245,197,66,0.08)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl">
          <InfoIcon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Catatan
          </p>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            Setelah menekan tombol WhatsApp, pastikan pesan sudah terkirim ke
            admin. Admin akan membantu konfirmasi jadwal, lokasi, dan kebutuhan
            acara.
          </p>
        </div>
      </div>
    </div>
  );
}