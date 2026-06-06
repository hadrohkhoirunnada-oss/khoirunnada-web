import Link from "next/link";

const galleryPreview = [
  {
    id: 1,
    title: "Suasana Makkah",
    category: "Makkah",
    image:
      "https://images.unsplash.com/photo-1744711815074-1f12a88cc5d1?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Ka'bah Al-Mukarramah",
    category: "Ka'bah",
    image:
      "https://images.unsplash.com/photo-1710695198971-3abdf7fcc82e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Masjidil Haram",
    category: "Haram",
    image:
      "https://images.unsplash.com/photo-1591604157118-b94e2684f857?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    title: "Masjid Nabawi",
    category: "Nabawi",
    image:
      "https://images.unsplash.com/photo-1768054582993-d60392cab0d9?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    title: "Madinah Munawwarah",
    category: "Madinah",
    image:
      "https://images.unsplash.com/photo-1729931421786-7bbd6c7d78f6?auto=format&fit=crop&w=700&q=80",
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

export default function HomeGalleryPreview() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              Galeri
            </p>

            <h2 className="mt-4 text-[1.45rem] font-black leading-tight tracking-[-0.055em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.72)]">
              Dokumentasi Kegiatan
            </h2>
          </div>

          <Link
            href="/galeri"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-amber-300/16 bg-black/35 px-4 text-sm font-extrabold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.98]"
          >
            Lihat
            <ArrowIcon className="h-4 w-4 text-amber-300" />
          </Link>
        </div>

        <div className="no-scrollbar mt-6 flex gap-3 overflow-x-auto pb-1">
          {galleryPreview.slice(0, 5).map((item) => (
            <article
              key={item.id}
              className="group relative flex h-42 min-w-[128px] overflow-hidden rounded-2xl border border-amber-300/14 bg-black/35 shadow-lg shadow-black/25"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-active:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_48%)]" />
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

              <div className="relative z-10 mt-auto p-3">
                <p className="inline-flex rounded-full border border-amber-300/20 bg-black/50 px-2.5 py-1 text-[0.55rem] font-extrabold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-xl">
                  {item.category}
                </p>

                <h3 className="mt-2 text-[0.82rem] font-extrabold leading-[1.25] tracking-[-0.035em] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
                  {item.title}
                </h3>
              </div>
            </article>
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