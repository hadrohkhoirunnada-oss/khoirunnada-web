import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryHighlightCarousel from "@/components/gallery/GalleryHighlightCarousel";

export default function GalleryGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <div className="relative z-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
            Belum Ada Galeri
          </p>

          <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em] text-white">
            Dokumentasi akan ditampilkan
          </h2>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
            Galeri kegiatan Khoirunnada akan tampil di sini setelah dokumentasi
            resmi tersedia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <GalleryHighlightCarousel items={items} />

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}