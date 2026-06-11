import GalleryPreview from "@/components/gallery/GalleryPreview";

export default function GalleryCard({ item, index, onOpenPreview }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenPreview?.();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpenPreview}
      onKeyDown={handleKeyDown}
      className="group cursor-pointer space-y-3 outline-none transition active:scale-[0.985]"
      aria-label={`Buka detail ${item.title || "galeri"}`}
    >
      <GalleryPreview item={item} index={index} />

      <div className="px-1">
        <div className="flex items-center gap-2">
          <span className="h-px flex-1 bg-gradient-to-r from-amber-300/24 to-transparent" />

          <p className="shrink-0 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/85">
            {item.category}
          </p>
        </div>
      </div>
    </article>
  );
}