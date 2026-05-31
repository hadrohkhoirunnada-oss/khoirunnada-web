import GalleryCard from "@/components/gallery/GalleryCard";

export default function GalleryGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-amber-300/15 bg-white/[0.035] p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Belum Ada Galeri
        </p>

        <h2 className="mt-3 text-xl font-bold text-white">
          Dokumentasi akan ditampilkan
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Galeri kegiatan Khoirunnada akan tampil di sini setelah dokumentasi
          resmi tersedia.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-[1.75rem] border border-amber-300/15 bg-gradient-to-b from-amber-300/10 to-white/[0.035] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Dokumentasi
        </p>

        <h2 className="mt-3 text-xl font-bold leading-tight text-white">
          Momen kegiatan Khoirunnada
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Foto asli kegiatan akan ditambahkan bertahap. Untuk sementara, galeri
          ini memakai placeholder elegan agar struktur halaman siap.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}