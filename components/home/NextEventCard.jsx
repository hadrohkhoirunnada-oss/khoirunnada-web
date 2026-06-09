import Link from "next/link";

const featuredProduct = {
  title: "Shop & Katalog Khoirunnada",
  description:
    "Katalog produk, perlengkapan majelis, dan merchandise Khoirunnada akan ditampilkan di sini.",
  status: "Segera Hadir",
};

function ShopIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 9.25h10.5l-.75 10H7.5l-.75-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.25V7.75a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.25 9.25h13.5"
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
        d="M5 12h13M13 6.75 18.25 12 13 17.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NextEventCard() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <ShopIcon className="h-5 w-5" />
          </span>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-amber-300">
              Shop & Katalog
            </p>
            <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              {featuredProduct.status}
            </p>
          </div>
        </div>

        <h2 className="mt-5 text-[1.55rem] font-black leading-tight tracking-[-0.06em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.72)]">
          {featuredProduct.title}
        </h2>

        <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
          {featuredProduct.description}
        </p>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-amber-300/28 to-transparent" />

        <Link
          href="/shop"
          className="group relative mt-5 flex min-h-[3.35rem] w-full items-center justify-between overflow-hidden rounded-2xl border border-amber-300/18 bg-black/38 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/25 backdrop-blur-2xl transition active:scale-[0.98]"
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.14),rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.22))]" />
          <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <span className="relative flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <ShopIcon className="h-5 w-5" />
            </span>
            Buka Katalog
          </span>

          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 transition group-active:translate-x-0.5">
            <ArrowIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}