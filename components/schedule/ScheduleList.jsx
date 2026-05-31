import ScheduleCard from "@/components/schedule/ScheduleCard";

export default function ScheduleList({ schedules }) {
  if (!schedules || schedules.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-amber-300/15 bg-white/[0.035] p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Belum Ada Jadwal
        </p>

        <h2 className="mt-3 text-xl font-bold text-white">
          Jadwal akan diumumkan
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Jadwal resmi Khoirunnada akan tampil di sini setelah data acara
          tersedia.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-[1.5rem] border border-amber-300/15 bg-gradient-to-b from-amber-300/10 to-white/[0.035] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Informasi Jadwal
        </p>

        <h2 className="mt-3 text-xl font-bold leading-tight text-white">
          Jadwal resmi akan diperbarui secara berkala
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Untuk undangan dan informasi ketersediaan jadwal, silakan gunakan
          halaman booking.
        </p>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
    </section>
  );
}