function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.25a7.58 7.58 0 0 0-6.5 11.47l-.72 3.5 3.58-.83A7.58 7.58 0 1 0 12 4.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35 8.85c.18-.4.36-.42.58-.42h.45c.15 0 .36.05.55.43.2.38.65 1.3.7 1.4.05.1.08.23.02.36-.07.14-.1.22-.22.35l-.33.38c-.1.12-.22.24-.1.45.12.22.55.9 1.18 1.45.82.73 1.48.96 1.7 1.07.22.1.35.08.48-.05.15-.17.55-.65.7-.88.15-.22.3-.18.5-.1.22.08 1.36.64 1.6.76.23.12.38.18.43.28.05.1.05.58-.13 1.13-.18.55-1.05 1.05-1.45 1.1-.38.05-.88.08-2.84-.75-2.4-1.02-3.92-3.5-4.04-3.66-.12-.15-.96-1.27-.96-2.42 0-1.15.6-1.72.82-1.95.2-.23.45-.3.6-.3"
        fill="currentColor"
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

export default function ShopActionButton({
  actionUrl,
  actionLabel = "Hubungi Admin",
}) {
  if (!actionUrl) {
    return (
      <button
        type="button"
        disabled
        className="relative flex min-h-13 w-full items-center justify-center overflow-hidden rounded-2xl border border-amber-300/10 bg-white/[0.025] px-5 text-sm font-extrabold text-slate-500"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/8 bg-black/20">
            <WhatsAppIcon className="h-4 w-4" />
          </span>
          Kontak Belum Tersedia
        </span>
      </button>
    );
  }

  return (
    <a
      href={actionUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative flex min-h-13 w-full items-center justify-between overflow-hidden rounded-2xl border border-emerald-400/18 bg-emerald-400/10 px-4 text-sm font-extrabold text-emerald-50 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(255,255,255,0.026)_42%,rgba(0,0,0,0.22))]" />
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />

      <span className="relative z-10 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-300/14 bg-black/35 text-emerald-300 shadow-inner shadow-black/25">
          <WhatsAppIcon className="h-4.5 w-4.5" />
        </span>

        {actionLabel}
      </span>

      <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/14 bg-black/28 text-emerald-200 transition group-active:translate-x-0.5">
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
  );
}