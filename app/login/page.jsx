import PageContainer from "@/components/layout/PageContainer";

function AdminLockIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 10.25V8.1a3.75 3.75 0 0 1 7.5 0v2.15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.25 10.25h9.5a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2h-9.5a2 2 0 0 1-2-2v-5.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.2v1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <PageContainer className="flex min-h-[calc(100dvh-5.5rem)] items-center justify-center px-5 pb-24 pt-8">
      <section className="relative w-full max-w-[360px] overflow-hidden rounded-[1.9rem] border border-amber-300/18 bg-white/[0.055] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-[10px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.105),rgba(255,255,255,0.025)_34%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.24))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.14),transparent_44%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(245,197,66,0.08)]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-10 top-px h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <div className="relative z-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/18 bg-black/35 text-amber-200 shadow-lg shadow-black/25 backdrop-blur-xl">
            <AdminLockIcon className="h-7 w-7" />
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.4em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Khoirunnada
          </p>

          <h1 className="mt-4 text-[1.75rem] font-black leading-tight tracking-[-0.055em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.72)]">
            Login Admin
          </h1>

          <p className="mx-auto mt-4 max-w-[285px] text-sm font-medium leading-7 text-slate-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            Halaman admin sedang disiapkan. Mohon bersabar, insyaAllah akan
            selesai dalam waktu dekat.
          </p>

          <div className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-amber-300/45 to-transparent" />

          <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-amber-300/75">
            Coming Soon
          </p>
        </div>
      </section>
    </PageContainer>
  );
}