import Link from "next/link";

const fallbackGalleryPreview = [
  {
    id: 1,
    title: "Suasana Makkah",
    category: "Makkah",
    image:
      "https://images.unsplash.com/photo-1744711815074-1f12a88cc5d1?auto=format&fit=crop&w=700&q=80",
    isFallback: true,
  },
  {
    id: 2,
    title: "Ka'bah Al-Mukarramah",
    category: "Ka'bah",
    image:
      "https://images.unsplash.com/photo-1710695198971-3abdf7fcc82e?auto=format&fit=crop&w=700&q=80",
    isFallback: true,
  },
  {
    id: 3,
    title: "Masjidil Haram",
    category: "Haram",
    image:
      "https://images.unsplash.com/photo-1591604157118-b94e2684f857?auto=format&fit=crop&w=700&q=80",
    isFallback: true,
  },
  {
    id: 4,
    title: "Masjid Nabawi",
    category: "Nabawi",
    image:
      "https://images.unsplash.com/photo-1768054582993-d60392cab0d9?auto=format&fit=crop&w=700&q=80",
    isFallback: true,
  },
  {
    id: 5,
    title: "Madinah Munawwarah",
    category: "Madinah",
    image:
      "https://images.unsplash.com/photo-1729931421786-7bbd6c7d78f6?auto=format&fit=crop&w=700&q=80",
    isFallback: true,
  },
];

function GalleryIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 5.75h10.5a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m7.25 16.25 3.1-3.1a1.2 1.2 0 0 1 1.7 0l1.2 1.2 1.85-1.85a1.2 1.2 0 0 1 1.7 0l1.95 1.95"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 9.25h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h13M13 6.75 18.25 12 13 17.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function normalizeGalleryPreviewItems(items = []) {
  const cleanItems = Array.isArray(items)
    ? items
        .map((item, index) => {
          const image = item?.imageUrl || item?.image || "";

          return {
            id: item?.id || `gallery-${index}`,
            title: item?.title || "Dokumentasi Khoirunnada",
            category: item?.category || "Dokumentasi",
            image,
            isHighlight: Boolean(item?.isHighlight),
            isFallback: false,
          };
        })
        .filter((item) => item.image)
    : [];

  const highlightItems = cleanItems.filter((item) => item.isHighlight);
  const sourceItems = highlightItems.length > 0 ? highlightItems : cleanItems;

  return sourceItems.slice(0, 6);
}

function GalleryMiniCard({ item }) {
  return (
    <article className="group relative min-w-[118px] max-w-[118px] overflow-hidden rounded-2xl border border-amber-300/14 bg-black/35 shadow-lg shadow-black/25">
      <div className="relative h-[82px] overflow-hidden bg-black/45">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover opacity-80 transition duration-500 group-active:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(245,197,66,0.16),rgba(0,0,0,0.65)_60%)] text-amber-200">
            <GalleryIcon className="h-7 w-7" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60" />
      </div>

      <div className="p-3">
        <p className="line-clamp-1 text-[0.55rem] font-extrabold uppercase tracking-[0.16em] text-amber-300">
          {item.category}
        </p>

        <h3 className="mt-1.5 line-clamp-2 min-h-[2rem] text-[0.76rem] font-extrabold leading-[1.25] tracking-[-0.035em] text-white">
          {item.title}
        </h3>
      </div>
    </article>
  );
}

export default function HomeGalleryPreview({ items = [], isLoading = false }) {
  const databasePreviewItems = normalizeGalleryPreviewItems(items);
  const visibleItems =
    databasePreviewItems.length > 0
      ? databasePreviewItems
      : fallbackGalleryPreview;

  const isUsingDatabase = databasePreviewItems.length > 0;
  const itemCount = visibleItems.length;

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <GalleryIcon className="h-5 w-5" />
          </span>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-amber-300">
              Galeri
            </p>
            <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              {isLoading
                ? "Memuat Data"
                : isUsingDatabase
                ? "Tersedia"
                : "Preview"}
            </p>
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-amber-300/28 to-transparent" />

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-slate-400">
            Dokumentasi Pilihan
          </p>

          <p className="text-[0.68rem] font-bold text-amber-200/80">
            {itemCount} item
          </p>
        </div>

        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {visibleItems.map((item) => (
            <GalleryMiniCard key={item.id} item={item} />
          ))}
        </div>

        <Link
          href="/galeri"
          className="group relative mt-5 flex min-h-[3.35rem] w-full items-center justify-between overflow-hidden rounded-2xl border border-amber-300/18 bg-black/38 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/25 backdrop-blur-2xl transition active:scale-[0.98]"
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.14),rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.22))]" />
          <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <span className="relative flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <GalleryIcon className="h-5 w-5" />
            </span>
            Buka Galeri
          </span>

          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 transition group-active:translate-x-0.5">
            <ArrowIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}