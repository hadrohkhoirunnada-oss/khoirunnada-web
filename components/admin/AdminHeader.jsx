function MenuIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 7.25h13.5M5.25 12h13.5M5.25 16.75h13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-amber-300/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="/logo/khoirunnada-logo.png"
            alt="Khoirunnada"
            className="h-10 w-10 rounded-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-black leading-tight text-white">
              Khoirunnada Admin
            </p>
            <p className="mt-1 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
              Majelis Sholawat
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            className="hidden min-h-10 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 px-4 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.98] sm:inline-flex"
          >
            Lihat Website
          </a>

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Buka menu admin"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.96] lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}