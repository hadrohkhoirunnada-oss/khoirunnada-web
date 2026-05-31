function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.25a7.58 7.58 0 0 0-6.5 11.47l-.72 3.5 3.58-.83A7.58 7.58 0 1 0 12 4.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35 8.85c.18-.4.36-.42.58-.42h.45c.15 0 .36.05.55.43.2.38.65 1.3.7 1.4.05.1.08.23.02.36-.07.14-.1.22-.22.35l-.33.38c-.1.12-.22.24-.1.45.12.22.55.9 1.18 1.45.82.73 1.48.96 1.7 1.07.22.1.35.08.48-.05.15-.17.55-.65.7-.88.15-.22.3-.18.5-.1.22.08 1.36.64 1.6.76.23.12.38.18.43.28.05.1.05.58-.13 1.13-.18.55-1.05 1.05-1.45 1.1-.38.05-.88.08-2.84-.75-2.4-1.02-3.92-3.5-4.04-3.66-.12-.15-.96-1.27-.96-2.42 0-1.15.6-1.72.82-1.95.2-.23.45-.3.6-.3"
        fill="currentColor"
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
    </svg>
  );
}

const steps = ["Isi data", "Cek jadwal", "Kirim WA"];

export default function BookingHero() {
  return (
    <section className="relative isolate -mx-5 overflow-hidden border-b border-amber-300/10 bg-[#030407] px-5 pb-8 pt-7 shadow-[0_18px_55px_rgba(0,0,0,0.42)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_10%,rgba(245,197,66,0.18),transparent_18rem),radial-gradient(circle_at_10%_0%,rgba(245,197,66,0.09),transparent_14rem),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(0,0,0,0.28)_58%,rgba(2,6,23,0.98))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/45" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-100/45 to-transparent opacity-60" />

      <div className="relative z-10 mx-auto max-w-[390px]">
        <div className="flex items-start justify-between gap-5">
          <div className="max-w-[260px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/18 bg-black/35 px-3.5 py-2 shadow-lg shadow-black/25 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,197,66,0.75)]" />
              <span className="text-[0.66rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
                Booking Resmi
              </span>
            </div>

            <h1 className="mt-5 text-[2.1rem] font-black leading-[1.08] tracking-[-0.075em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
              Undangan Majelis Khoirunnada
            </h1>
          </div>

          <div className="relative mt-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-amber-300/18 bg-black/35 text-amber-200 shadow-xl shadow-black/35 backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] bg-[linear-gradient(145deg,rgba(245,197,66,0.16),rgba(255,255,255,0.035),rgba(0,0,0,0.18))]" />
            <WhatsAppIcon className="relative z-10 h-8 w-8" />
          </div>
        </div>

        <p className="mt-5 max-w-[350px] text-[0.98rem] font-semibold leading-8 text-slate-300">
          Isi data undangan, lalu sistem akan menyusun pesan WhatsApp otomatis
          untuk dikirim ke admin.
        </p>

        <div className="mt-7 grid grid-cols-3 gap-2.5">
          {steps.map((step, index) => (
            <div
              key={step}
              className="relative overflow-hidden rounded-2xl border border-amber-300/13 bg-white/[0.04] px-3 py-3 shadow-lg shadow-black/20 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.018)_44%,rgba(0,0,0,0.2))]" />
              <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

              <div className="relative z-10">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-300/18 bg-black/30 text-[0.65rem] font-extrabold text-amber-200">
                  {index + 1}
                </span>
                <p className="mt-2 text-[0.72rem] font-bold leading-4 text-slate-200">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-7 overflow-hidden rounded-[1.65rem] border border-amber-300/14 bg-black/38 p-4 shadow-xl shadow-black/25 backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.11),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_48%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="relative z-10 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200">
              <CalendarIcon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
                Konfirmasi Admin
              </p>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-300">
                Jadwal, lokasi, dan kebutuhan acara akan dikonfirmasi langsung
                melalui WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}