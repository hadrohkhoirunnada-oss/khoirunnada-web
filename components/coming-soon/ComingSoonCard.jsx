import LogoBrand from "@/components/shared/LogoBrand";
import { SITE_CONFIG } from "@/constants/site";

function buildWhatsAppUrl() {
  const message = `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Halo Admin Khoirunnada, saya ingin bertanya terkait informasi Majelis Sholawat Khoirunnada.

Mohon informasinya, terima kasih.`;

  return `https://wa.me/${SITE_CONFIG.whatsappAdmin}?text=${encodeURIComponent(
    message
  )}`;
}

export default function ComingSoonCard() {
  return (
    <section className="relative z-10 w-full rounded-[2rem] border border-amber-300/20 bg-white/[0.045] px-6 py-8 text-center shadow-2xl shadow-black/40 backdrop-blur">
      <LogoBrand size={94} />

      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.45em] text-amber-300">
        Khoirunnada
      </p>

      <h1 className="mt-5 text-[1.7rem] font-bold leading-[1.18] tracking-[-0.03em] text-white">
        Website Resmi Khoirunnada Sedang Dalam Pengerjaan
      </h1>

      <p className="mx-auto mt-5 max-w-[330px] text-[0.95rem] leading-7 text-slate-300">
        InsyaAllah segera hadir sebagai pusat informasi, lirik qasidah, jadwal
        penampilan, galeri, dan layanan booking Majelis Sholawat Khoirunnada.
      </p>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-b from-amber-200 to-amber-400 px-7 text-sm font-bold text-slate-950 shadow-lg shadow-amber-950/30 transition active:scale-[0.98]"
      >
        Hubungi Admin
      </a>
    </section>
  );
}