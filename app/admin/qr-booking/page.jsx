import AdminShell from "@/components/admin/AdminShell";

const BOOKING_URL = "https://www.khoirunnada.my.id/booking";

const QR_IMAGE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=18&data=${encodeURIComponent(
  BOOKING_URL
)}`;

function QrIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 5.25h5.5v5.5h-5.5v-5.5ZM13.25 5.25h5.5v5.5h-5.5v-5.5ZM5.25 13.25h5.5v5.5h-5.5v-5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 14h2.25v2.25H18.5M18.5 18.5h-4.5v-2.25M16.25 13.25h2.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 14.5 14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.75 7.25 12 6a4.25 4.25 0 0 1 6 6l-1.25 1.25M13.25 16.75 12 18a4.25 4.25 0 0 1-6-6l1.25-1.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.75v9.5M8.25 10.75 12 14.5l3.75-3.75M5.75 19.25h12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
                <QrIcon className="h-6 w-6" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                  QR Booking
                </p>

                <h1 className="mt-2 text-[1.7rem] font-black leading-tight tracking-[-0.06em] text-white">
                  Kode Booking
                </h1>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                  Gunakan QR ini untuk memudahkan jamaah atau tamu membuka
                  halaman booking Khoirunnada secara cepat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.11),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

          <div className="relative z-10">
            <div className="mx-auto max-w-[250px] overflow-hidden rounded-[1.5rem] border border-amber-300/18 bg-white p-3 shadow-2xl shadow-black/30">
              <img
                src={QR_IMAGE_URL}
                alt="QR Booking Khoirunnada"
                className="aspect-square w-full rounded-[1rem] object-cover"
              />
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Scan Untuk Booking
            </p>

            <p className="mx-auto mt-3 max-w-[310px] text-sm font-medium leading-7 text-slate-300">
              Arahkan kamera HP ke QR ini untuk membuka halaman booking resmi
              Khoirunnada.
            </p>

            <div className="mt-5 rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
              <p className="break-all text-xs font-semibold leading-6 text-slate-400">
                {BOOKING_URL}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300/14 bg-black/35 px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.98]"
              >
                <LinkIcon className="h-4 w-4" />
                Buka
              </a>

              <a
                href={QR_IMAGE_URL}
                download="qr-booking-khoirunnada.png"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-amber-300/10 px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.98]"
              >
                <DownloadIcon className="h-4 w-4" />
                Unduh
              </a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

          <div className="relative z-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Catatan
            </p>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
              QR ini bisa dicetak pada banner, pamflet, undangan, atau dibagikan
              ke WhatsApp agar calon pengundang lebih mudah mengakses halaman
              booking.
            </p>
          </div>
        </section>
      </section>
    </AdminShell>
  );
}