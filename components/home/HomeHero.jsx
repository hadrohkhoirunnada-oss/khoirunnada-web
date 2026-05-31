import Link from "next/link";

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

function CalendarIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 4.75v2.5M16.75 4.75v2.5M5.75 9.25h12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.75 6.25h10.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 12.25h.01M12 12.25h.01M15.75 12.25h.01M8.25 15.75h.01M12 15.75h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

function HeroAction({ href, eyebrow, label, icon }) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[3.65rem] w-full items-center justify-between overflow-hidden rounded-2xl border border-amber-300/16 bg-black/42 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/25 backdrop-blur-2xl transition active:scale-[0.98]"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.11),rgba(255,255,255,0.025)_40%,rgba(0,0,0,0.24))]" />
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/42 to-transparent" />

      <span className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/18 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
          {icon}
        </span>

        <span>
          <span className="block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-amber-300/85">
            {eyebrow}
          </span>
          <span className="mt-0.5 block text-[0.96rem] tracking-[-0.025em] text-white">
            {label}
          </span>
        </span>
      </span>

      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/16 bg-black/30 text-amber-200 transition group-active:translate-x-0.5">
        <ArrowRightIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function HomeHero() {
  return (
    <section className="relative isolate px-1 pb-12 pt-1 text-left">
      <div className="relative z-10">
        <div className="inline-flex items-center rounded-full border border-amber-300/20 bg-black/45 px-4 py-2 shadow-lg shadow-black/25 backdrop-blur-xl">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.34em] text-amber-300">
            Khoirunnada
          </p>
        </div>

        <h1 className="mt-5 max-w-[390px] text-[2.38rem] font-black leading-[1.14] tracking-[-0.075em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
          Majelis Sholawat dan Hadroh.
        </h1>

        <p className="mt-7 max-w-[360px] text-[1rem] font-semibold leading-[2.05] text-slate-300">
          Website resmi Khoirunnada sebagai pusat informasi, lirik qasidah,
          jadwal penampilan, galeri kegiatan, dan layanan booking.
        </p>

        <div className="mt-9 space-y-3.5">
          <HeroAction
            href="/booking"
            eyebrow="Undangan"
            label="Booking Majelis"
            icon={<CalendarIcon className="h-4.5 w-4.5" />}
          />

          <HeroAction
            href="/lirik"
            eyebrow="Qasidah"
            label="Buka Lirik"
            icon={<BookIcon className="h-4.5 w-4.5" />}
          />
        </div>
      </div>
    </section>
  );
}