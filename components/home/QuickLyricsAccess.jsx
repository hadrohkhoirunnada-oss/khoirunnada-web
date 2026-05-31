import Link from "next/link";

function BookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 5.25h8.25a3.25 3.25 0 0 1 3.25 3.25v10.25H9.5a3.25 3.25 0 0 0-3.25 3.25V5.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 18.75h11.5M9.25 9h5.25M9.25 12h4.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h13M13 6.75 18.25 12 13 17.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QuickLyricsAccess() {
  return (
    <section className="relative overflow-hidden rounded-[1.8rem] border border-amber-300/14 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.105),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300">
          Pusat Lirik
        </p>

        <h2 className="mt-4 text-[1.35rem] font-extrabold leading-tight tracking-[-0.04em] text-white">
          Buka lirik qasidah dengan cepat saat majelis
        </h2>

        <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
          Nantinya halaman ini berisi kumpulan lirik Arab, latin, dan terjemahan
          yang nyaman dibaca dari HP.
        </p>

        <Link
          href="/lirik"
          className="group mt-6 flex min-h-[3.25rem] w-full items-center justify-between rounded-2xl border border-amber-300/16 bg-black/35 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <BookIcon className="h-4 w-4" />
            </span>
            Masuk ke Lirik
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 transition group-active:translate-x-0.5">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}