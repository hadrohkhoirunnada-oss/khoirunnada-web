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
        d="M6.75 4.75h7.5a3 3 0 0 1 3 3v11.5H9.75a3 3 0 0 0-3 3V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 18.25h10.5M10 8.25h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 6.75L15.25 12L9.75 17.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LyricsCard({ lyric }) {
  return (
    <Link
      href={`/lirik/${lyric.slug}`}
      className="group relative block overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl transition active:scale-[0.99]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <BookIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              {lyric.category}
            </p>

            <h2 className="mt-3 text-[1.2rem] font-black leading-tight tracking-[-0.045em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
              {lyric.title}
            </h2>
          </div>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-300/16 bg-black/30 text-amber-200 shadow-lg shadow-black/20 transition group-active:translate-x-0.5">
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>

      <p className="relative z-10 mt-4 text-sm font-medium leading-7 text-slate-100/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
        {lyric.shortDescription}
      </p>
    </Link>
  );
}