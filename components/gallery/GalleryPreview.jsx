const fallbackImages = [
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
];

export default function GalleryPreview({ item, index }) {
  const image = item.image || fallbackImages[index % fallbackImages.length];

  return (
    <article className="group relative flex aspect-[4/5] overflow-hidden rounded-[1.65rem] border border-amber-300/14 bg-black/40 shadow-xl shadow-black/25">
      <img
        src={image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-active:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/14 via-black/32 to-black/88" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-4">
        <div className="flex items-start">
          <span className="rounded-full border border-amber-300/22 bg-black/45 px-3 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl">
            {item.category}
          </span>
        </div>

        <div>
          <p className="text-[1.06rem] font-black leading-tight tracking-[-0.05em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]">
            {item.title}
          </p>
        </div>
      </div>
    </article>
  );
}