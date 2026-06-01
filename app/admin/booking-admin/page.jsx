import AdminShell from "@/components/admin/AdminShell";
import BookingAdminForm from "@/components/admin/booking-admin/BookingAdminForm";
import BookingAdminTable from "@/components/admin/booking-admin/BookingAdminTable";

function BookingIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7.25 4.75v2.5M16.75 4.75v2.5M5.25 9.25h13.5M6.75 6h10.5a2 2 0 0 1 2 2v9.25a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 13h3.5M8.25 16h5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const bookingItems = [];

export default function Page() {
  return (
    <AdminShell>
      <section className="space-y-5">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,66,0.1),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
                <BookingIcon className="h-6 w-6" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                  Admin Booking
                </p>

                <h1 className="mt-2 text-[1.7rem] font-black leading-tight tracking-[-0.06em] text-white">
                  Kelola Booking
                </h1>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                  Pantau permintaan booking, data pengundang, jadwal acara,
                  lokasi, dan status konfirmasi layanan Khoirunnada.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Total Booking
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {bookingItems.length}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Status
                </p>
                <p className="mt-2 text-sm font-black text-white">
                  Menunggu Data
                </p>
              </div>
            </div>
          </div>
        </section>

        <BookingAdminForm />

        <BookingAdminTable items={bookingItems} />
      </section>
    </AdminShell>
  );
}