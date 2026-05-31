import MapsButton from "@/components/schedule/MapsButton";

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
        d="M3.75 9.25h16.5M8 13.25h.01M12 13.25h.01M16 13.25h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "" }) {
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
        d="M12 7.75v4.65l3.1 2.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.25 10.25c0 5.75-7.25 10.5-7.25 10.5s-7.25-4.75-7.25-10.5a7.25 7.25 0 0 1 14.5 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.75a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function DetailItem({ icon, label, value, children }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-300/10 bg-black/24 p-4 shadow-inner shadow-black/20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)_48%,rgba(0,0,0,0.16))]" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/24 to-transparent" />

      <div className="relative z-10 flex gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-300/12 bg-black/32 text-amber-200">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
            {label}
          </p>

          <p className="mt-2 text-sm font-bold leading-6 text-white">
            {value}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}

export default function ScheduleCard({ schedule }) {
  return (
    <article className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.085),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
              <CalendarIcon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
                {schedule.eventType}
              </p>

              <h2 className="mt-3 text-[1.35rem] font-black leading-tight tracking-[-0.055em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.68)]">
                {schedule.title}
              </h2>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-1.5 text-[0.68rem] font-extrabold text-amber-100 shadow-lg shadow-black/15 backdrop-blur-xl">
            {schedule.status}
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          <DetailItem
            icon={<CalendarIcon className="h-4.5 w-4.5" />}
            label="Tanggal"
            value={schedule.date}
          />

          <DetailItem
            icon={<ClockIcon className="h-4.5 w-4.5" />}
            label="Waktu"
            value={schedule.time}
          />

          <DetailItem
            icon={<LocationIcon className="h-4.5 w-4.5" />}
            label="Lokasi"
            value={schedule.location}
          >
            <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
              {schedule.address}
            </p>
          </DetailItem>
        </div>

        <div className="mt-5">
          <MapsButton mapsUrl={schedule.mapsUrl} />
        </div>
      </div>
    </article>
  );
}