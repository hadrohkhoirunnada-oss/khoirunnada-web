import MapsButton from "@/components/schedule/MapsButton";

export default function ScheduleCard({ schedule }) {
  return (
    <article className="rounded-[1.75rem] border border-amber-300/15 bg-white/[0.035] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            {schedule.eventType}
          </p>

          <h2 className="mt-3 text-xl font-bold leading-tight text-white">
            {schedule.title}
          </h2>
        </div>

        <span className="shrink-0 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
          {schedule.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-amber-300/10 bg-black/20 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
            Tanggal
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {schedule.date}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300/10 bg-black/20 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
            Waktu
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {schedule.time}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300/10 bg-black/20 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
            Lokasi
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {schedule.location}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {schedule.address}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <MapsButton mapsUrl={schedule.mapsUrl} />
      </div>
    </article>
  );
}