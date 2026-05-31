function MapIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m8.25 4.75 7.5 2.5M8.25 4.75v14.5M8.25 4.75 3.75 7v14.25l4.5-2m7.5-12v14.5m0-14.5 4.5-2v14.25l-4.5 2m0 0-7.5-2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10.25h.01M12 14h.01"
        stroke="currentColor"
        strokeWidth="2.4"
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
        d="M9.75 6.75 15.25 12l-5.5 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MapsButton({ mapsUrl }) {
  if (!mapsUrl) {
    return (
      <button
        type="button"
        disabled
        className="relative flex min-h-13 w-full items-center justify-center overflow-hidden rounded-2xl border border-amber-300/10 bg-white/[0.025] px-5 text-sm font-extrabold text-slate-500"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/8 bg-black/20">
            <MapIcon className="h-4 w-4" />
          </span>
          Lokasi Belum Tersedia
        </span>
      </button>
    );
  }

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative flex min-h-13 w-full items-center justify-between overflow-hidden rounded-2xl border border-amber-300/18 bg-black/35 px-4 text-sm font-extrabold text-amber-100 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.13),rgba(255,255,255,0.026)_42%,rgba(0,0,0,0.22))]" />
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <span className="relative z-10 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
          <MapIcon className="h-4.5 w-4.5" />
        </span>

        Buka Lokasi
      </span>

      <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/14 bg-black/28 text-amber-200 transition group-active:translate-x-0.5">
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
  );
}