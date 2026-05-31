import GalleryPreview from "@/components/gallery/GalleryPreview";

export default function GalleryCard({ item, index }) {
  return (
    <article className="space-y-3">
      <GalleryPreview item={item} index={index} />

      <div className="px-1">
        <h2 className="text-sm font-bold leading-tight text-white">
          {item.title}
        </h2>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          {item.category}
        </p>
      </div>
    </article>
  );
}