import PageContainer from "@/components/layout/PageContainer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { initialGallery } from "@/data/initialGallery";

export default function Page() {
  return (
    <PageContainer className="space-y-6 pb-28 pt-7">
      <section className="rounded-[2rem] border border-amber-300/20 bg-white/[0.045] px-6 py-7 text-center shadow-2xl shadow-black/30">
        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-amber-300">
          Khoirunnada
        </p>

        <h1 className="mt-4 text-[1.8rem] font-bold leading-tight tracking-[-0.04em] text-white">
          Galeri Kegiatan
        </h1>

        <p className="mx-auto mt-4 max-w-[330px] text-sm leading-7 text-slate-300">
          Dokumentasi kegiatan, penampilan hadroh, majelis sholawat, dan momen
          kebersamaan Khoirunnada.
        </p>
      </section>

      <GalleryGrid items={initialGallery} />
    </PageContainer>
  );
}