import LogoBrand from "@/components/shared/LogoBrand";

export default function ProfileHero() {
  return (
    <section className="relative isolate -mx-5 overflow-hidden border-b border-amber-300/10 bg-[#030407] px-5 pb-10 pt-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.42)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(245,197,66,0.11),rgba(255,255,255,0.018)_32%,rgba(0,0,0,0.28)_68%,rgba(2,6,23,0.96))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/70" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-100/45 to-transparent opacity-60" />

      <div className="relative z-10 mx-auto max-w-[390px]">
        <div className="relative mx-auto h-[132px] w-[132px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-2xl" />

          <div className="relative z-10 drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)]">
            <LogoBrand size={132} />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            style={{
              WebkitMaskImage: 'url("/logo/khoirunnada-logo.png")',
              maskImage: 'url("/logo/khoirunnada-logo.png")',
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          >
            <div className="absolute -inset-y-8 -left-16 w-12 rotate-[18deg] animate-[logoShine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 mix-blend-screen" />
          </div>
        </div>

        <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-amber-300/75 to-transparent shadow-[0_0_14px_rgba(245,197,66,0.45)]" />

        <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.46em] text-amber-300 drop-shadow-[0_0_12px_rgba(245,197,66,0.18)]">
          Profil
        </p>

        <h1 className="mt-4 text-[2.05rem] font-black leading-[1.08] tracking-[-0.065em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.58)]">
          Khoirunnada
        </h1>

        <p className="mx-auto mt-5 max-w-[340px] text-[0.98rem] font-semibold leading-8 text-slate-300">
          Majelis Sholawat dan Hadroh yang hadir sebagai ruang syiar, sholawat,
          kebersamaan, dan kecintaan kepada Rasulullah ﷺ.
        </p>

        <div className="relative mt-8 overflow-hidden rounded-[1.72rem] p-[1px] shadow-xl shadow-black/25">
          <div className="pointer-events-none absolute -inset-[80%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_62deg,rgba(245,197,66,0.95)_86deg,rgba(255,255,255,0.7)_102deg,rgba(245,197,66,0.35)_122deg,transparent_152deg,transparent_360deg)]" />

          <div className="relative overflow-hidden rounded-[1.65rem] bg-black/55 p-5 text-center backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_42%,rgba(0,0,0,0.22))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/40 to-transparent" />

            <div className="relative z-10">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.3em] text-amber-300">
                Identitas
              </p>

              <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                Website ini menjadi media resmi Khoirunnada untuk informasi
                majelis, jadwal penampilan, lirik qasidah, galeri, dan layanan
                booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}