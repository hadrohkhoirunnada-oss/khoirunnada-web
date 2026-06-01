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

function SmallGearIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m18.4 13.2 1.65 1.25-1.5 2.6-1.95-.78a6.5 6.5 0 0 1-1.55.9L14.75 19.2h-5.5l-.3-2.03a6.5 6.5 0 0 1-1.55-.9l-1.95.78-1.5-2.6L5.6 13.2a6.4 6.4 0 0 1 0-2.4L3.95 9.55l1.5-2.6 1.95.78a6.5 6.5 0 0 1 1.55-.9l.3-2.03h5.5l.3 2.03c.56.23 1.08.53 1.55.9l1.95-.78 1.5 2.6-1.65 1.25a6.4 6.4 0 0 1 0 2.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <AdminShell>
      <section className="flex min-h-[calc(100dvh-8rem)] items-center justify-center">
        <div className="relative w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 px-6 py-8 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.12),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

          <div className="relative z-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.8rem] border border-amber-300/14 bg-black/35 shadow-xl shadow-black/25">
              <div className="relative h-16 w-16">
                <GearIcon className="absolute inset-0 h-16 w-16 animate-spin text-amber-300 [animation-duration:6s]" />
                <SmallGearIcon className="absolute -bottom-1 -right-2 h-8 w-8 animate-spin text-amber-100/85 [animation-direction:reverse] [animation-duration:4s]" />
              </div>
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300">
              Pengaturan
            </p>

            <h1 className="mt-3 text-[1.85rem] font-black leading-tight tracking-[-0.065em] text-white drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)]">
              Maintenance
            </h1>

            <p className="mx-auto mt-4 max-w-[320px] text-sm font-medium leading-7 text-slate-300">
              Halaman pengaturan admin sedang dalam proses penyiapan.
              InsyaAllah akan selesai dan bisa digunakan dalam waktu dekat.
            </p>

            <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-amber-300/45 to-transparent" />

            <p className="mt-4 text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-amber-300/80">
              Coming Soon
            </p>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}