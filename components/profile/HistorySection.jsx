export default function HistorySection() {
  return (
    <section className="relative overflow-hidden rounded-[1.9rem] border border-amber-300/18 bg-white/[0.055] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-[10px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.105),rgba(255,255,255,0.025)_34%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.24))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.14),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(245,197,66,0.08)]" />

      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 top-px h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
          Sejarah Singkat
        </p>

        <h2 className="mt-4 text-[1.4rem] font-extrabold leading-tight tracking-[-0.045em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.78)]">
          Ruang sholawat, syiar, dan kebersamaan
        </h2>

        <div className="mt-5 space-y-5 text-[0.95rem] font-medium leading-8 text-slate-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.72)]">
          <p>
            Khoirunnada merupakan majelis sholawat dan hadroh yang dibangun
            dengan semangat kebersamaan, kecintaan kepada Rasulullah ﷺ, serta
            keinginan untuk menghadirkan suasana majelis yang menenangkan dan
            penuh nilai kebaikan.
          </p>

          <p>
            Melalui lantunan sholawat, qasidah, dan hadroh, Khoirunnada
            berupaya menjadi bagian dari syiar Islam yang dekat dengan
            masyarakat, mudah diterima, dan tetap menjaga adab dalam setiap
            kegiatan.
          </p>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />

        <p className="mt-4 text-center text-[0.68rem] font-bold uppercase tracking-[0.28em] text-amber-300/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Sholawat • Syiar • Kebersamaan
        </p>
      </div>
    </section>
  );
}