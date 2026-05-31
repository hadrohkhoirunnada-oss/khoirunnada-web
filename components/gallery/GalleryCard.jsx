import GalleryPreview from "@/components/gallery/GalleryPreview";

export default function GalleryCard({ item, index }) {
  return (
    <article className="group space-y-3">
      <GalleryPreview item={item} index={index} />

      <div className="px-1">
        <h2 className="line-clamp-2 text-sm font-black leading-tight tracking-[-0.04em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
          {item.title}
        </h2>

        <div className="mt-2 flex items-center gap-2">
          <span className="h-px flex-1 bg-gradient-to-r from-amber-300/24 to-transparent" />

          <p className="shrink-0 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/85">
            {item.category}
          </p>
        </div>
      </div>
    </article>
  );
}