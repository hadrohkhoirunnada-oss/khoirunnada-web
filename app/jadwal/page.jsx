import PageContainer from "@/components/layout/PageContainer";
import ScheduleList from "@/components/schedule/ScheduleList";
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
        d="M7.25 3.75v3M16.75 3.75v3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.75 5.25h12.5a2.5 2.5 0 0 1 2.5 2.5v10.5a2.5 2.5 0 0 1-2.5 2.5H5.75a2.5 2.5 0 0 1-2.5-2.5V7.75a2.5 2.5 0 0 1 2.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 9.25h16.5M7.25 13h.01M12 13h.01M16.75 13h.01M7.25 16.75h.01M12 16.75h.01"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <PageContainer className="space-y-6 pb-28 pt-0">
      <section className="relative isolate -mx-5 overflow-hidden px-5 pb-8 pt-7">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(245,197,66,0.075)_0%,rgba(245,197,66,0.03)_25%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.18)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-7rem] -z-10 h-80 w-[140%] -translate-x-1/2 rounded-full bg-amber-300/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute right-[-7rem] top-20 -z-10 h-64 w-64 rounded-full bg-amber-300/[0.045] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/24 to-transparent" />

        <div className="relative z-10">
          <div className="inline-flex max-w-[255px] items-center gap-3 rounded-2xl border border-amber-300/14 bg-black/30 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <CalendarIcon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
                Agenda Resmi
              </p>
              <p className="mt-0.5 truncate text-xs font-bold text-slate-300">
                Jadwal Majelis
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.44em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Khoirunnada
          </p>

          <h1 className="mt-5 max-w-[340px] text-[2.15rem] font-black leading-[1.04] tracking-[-0.085em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
            Jadwal Penampilan
          </h1>

          <p className="mt-5 max-w-[345px] text-[0.98rem] font-semibold leading-8 text-slate-300">
            Informasi jadwal resmi Majelis Sholawat dan Hadroh Khoirunnada akan
            ditampilkan di halaman ini.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border border-amber-300/12 bg-black/28 px-3 py-3 text-center shadow-lg shadow-black/15 backdrop-blur-xl">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                Tanggal
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/12 bg-black/28 px-3 py-3 text-center shadow-lg shadow-black/15 backdrop-blur-xl">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                Lokasi
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/12 bg-black/28 px-3 py-3 text-center shadow-lg shadow-black/15 backdrop-blur-xl">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                Info
              </p>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
            <p className="shrink-0 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-amber-300/80">
              Hadir • Tertib • Berkah
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
          </div>
        </div>
      </section>

      <ScheduleList schedules={initialSchedules} />
    </PageContainer>
  );
}