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

function BookingIcon({ className = "" }) {
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
        d="M8.25 13.25h7.5M8.25 16h4.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HomeBookingCTA() {
  return (
    <section className="relative overflow-hidden rounded-[1.8rem] border border-amber-300/14 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_46%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300">
          Booking
        </p>

        <h2 className="mt-4 text-[1.45rem] font-extrabold leading-tight tracking-[-0.045em] text-white">
          Undang Khoirunnada untuk acara Anda
        </h2>

        <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
          Untuk informasi jadwal, ketersediaan, dan administrasi undangan,
          silakan masuk ke halaman booking.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3 shadow-lg shadow-black/15 backdrop-blur-xl">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
              Layanan
            </p>
            <p className="mt-1 text-sm font-bold leading-5 text-white">
              Hadroh
            </p>
          </div>

          <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3 shadow-lg shadow-black/15 backdrop-blur-xl">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
              Acara
            </p>
            <p className="mt-1 text-sm font-bold leading-5 text-white">
              Undangan
            </p>
          </div>
        </div>

        <Link
          href="/booking"
          className="group mt-6 flex min-h-[3.25rem] w-full items-center justify-between rounded-2xl border border-amber-300/16 bg-black/35 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <BookingIcon className="h-4 w-4" />
            </span>
            Booking Sekarang
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 transition group-active:translate-x-0.5">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}