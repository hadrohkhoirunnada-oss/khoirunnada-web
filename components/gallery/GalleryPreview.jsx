export default function GalleryPreview({ item, index }) {
  return (
    <div className="relative flex aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-amber-300/15 bg-gradient-to-b from-amber-300/20 via-slate-950 to-black">
      <div className="pointer-events-none absolute -top-14 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-amber-300/25 bg-black/30 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
            {item.category}
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/20 bg-black/30 text-xs font-bold text-amber-200">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <p className="text-lg font-bold leading-tight text-white">
            {item.title}
          </p>
          <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-300">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}