import Link from "next/link";
import { initialSchedules } from "@/data/initialSchedules";

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

export default function NextEventCard() {
  const nextEvent = initialSchedules[0];

  return (
    <section className="relative overflow-hidden rounded-[1.8rem] border border-amber-300/14 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.105),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300">
              Jadwal Terdekat
            </p>

            <h2 className="mt-4 text-[1.35rem] font-extrabold leading-tight tracking-[-0.04em] text-white">
              {nextEvent?.title || "Jadwal Penampilan Berikutnya"}
            </h2>
          </div>

          <span className="shrink-0 rounded-full border border-amber-300/18 bg-black/30 px-3 py-1 text-xs font-bold text-amber-200 shadow-inner shadow-black/20">
            Info
          </span>
        </div>

        {nextEvent ? (
          <div className="mt-5 space-y-3 text-sm font-medium leading-6 text-slate-300">
            <div className="flex items-start gap-3">
              <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p>{nextEvent.date}</p>
            </div>

            <p className="pl-7">{nextEvent.location}</p>
          </div>
        ) : (
          <p className="mt-5 text-sm font-medium leading-7 text-slate-300">
            Jadwal resmi akan diumumkan setelah data acara dan konfirmasi admin
            tersedia.
          </p>
        )}

        <Link
          href="/jadwal"
          className="group mt-6 flex min-h-[3.25rem] w-full items-center justify-between rounded-2xl border border-amber-300/16 bg-black/35 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <CalendarIcon className="h-4 w-4" />
            </span>
            Lihat Jadwal
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 transition group-active:translate-x-0.5">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}