import ScheduleCard from "@/components/schedule/ScheduleCard";

function InfoIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 10.75v5M12 7.75h.01"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ScheduleList({ schedules }) {
  if (!schedules || schedules.length === 0) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <div className="relative z-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
            Belum Ada Jadwal
          </p>

          <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em] text-white">
            Jadwal akan diumumkan
          </h2>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
            Jadwal resmi Khoirunnada akan tampil di sini setelah data acara
            tersedia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

        <div className="relative z-10 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <InfoIcon className="h-6 w-6" />
          </span>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
              Informasi Jadwal
            </p>

            <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              Jadwal resmi diperbarui berkala
            </h2>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
              Untuk undangan dan informasi ketersediaan jadwal, silakan gunakan
              halaman booking.
            </p>
          </div>
        </div>
      </div>

      <div className="relative space-y-4">
        <div className="pointer-events-none absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-transparent via-amber-300/20 to-transparent" />

        {schedules.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
    </section>
  );
}