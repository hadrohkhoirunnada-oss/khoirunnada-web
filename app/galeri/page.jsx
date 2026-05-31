import PageContainer from "@/components/layout/PageContainer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import LogoBrand from "@/components/shared/LogoBrand";
import { initialGallery } from "@/data/initialGallery";

const heroPhotoStack = [
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80",
];

function CameraIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 7.25 8.7 5.3a1.4 1.4 0 0 1 1.12-.55h4.36a1.4 1.4 0 0 1 1.12.55l1.45 1.95h1.5a2.5 2.5 0 0 1 2.5 2.5v6.5a2.5 2.5 0 0 1-2.5 2.5H5.75a2.5 2.5 0 0 1-2.5-2.5v-6.5a2.5 2.5 0 0 1 2.5-2.5h1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.75a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M17.75 10h.01"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <PageContainer className="space-y-6 pb-28 pt-0">
      <section className="relative isolate -mx-5 overflow-hidden px-5 pb-8 pt-7">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(245,197,66,0.075)_0%,rgba(245,197,66,0.035)_24%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.16)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-7rem] -z-10 h-80 w-[140%] -translate-x-1/2 rounded-full bg-amber-300/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute right-[-8rem] top-14 -z-10 h-64 w-64 rounded-full bg-amber-300/[0.045] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/24 to-transparent" />

        <div className="pointer-events-none absolute right-3 top-20 z-0 h-40 w-[7.5rem] overflow-visible">
          <div className="absolute right-0 top-0 h-28 w-20 rotate-[7deg] overflow-hidden rounded-[1.4rem] border border-amber-300/16 bg-black/24 shadow-xl shadow-black/30 backdrop-blur-xl">
            <img
              src={heroPhotoStack[0]}
              alt=""
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-300/10 via-black/18 to-black/55" />
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

            <span className="absolute -left-20 -top-14 h-52 w-12 rotate-[32deg] bg-gradient-to-b from-transparent via-white/85 to-transparent opacity-90 blur-[0.5px] mix-blend-screen animate-[galleryShine_3.8s_ease-in-out_infinite]" />
          </div>

          <div className="absolute right-9 top-10 h-28 w-20 -rotate-[8deg] overflow-hidden rounded-[1.4rem] border border-amber-300/14 bg-black/18 shadow-xl shadow-black/30 backdrop-blur-xl">
            <img
              src={heroPhotoStack[1]}
              alt=""
              className="h-full w-full object-cover opacity-62"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-300/10 via-black/22 to-black/60" />

            <span className="absolute -left-16 -top-10 h-44 w-8 rotate-[32deg] bg-gradient-to-b from-transparent via-white/38 to-transparent blur-[1px] animate-[galleryShine_4.2s_ease-in-out_infinite]" />
          </div>

          <div className="absolute right-3 top-[5.8rem] flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/18 bg-black/45 shadow-lg shadow-black/30 backdrop-blur-xl">
            <LogoBrand size={34} />

            <span className="absolute -left-14 -top-10 h-36 w-9 rotate-[32deg] bg-gradient-to-b from-transparent via-white/80 to-transparent opacity-90 blur-[0.5px] mix-blend-screen animate-[galleryShine_3.8s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex max-w-[255px] items-center gap-3 rounded-2xl border border-amber-300/14 bg-black/30 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <CameraIcon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
                Album Visual
              </p>
              <p className="mt-0.5 truncate text-xs font-bold text-slate-300">
                Dokumentasi Majelis
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.44em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Khoirunnada
          </p>

          <h1 className="mt-5 max-w-[300px] text-[2.2rem] font-black leading-[1.04] tracking-[-0.085em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
            Galeri Kegiatan
          </h1>

          <p className="mt-5 max-w-[315px] text-[0.98rem] font-semibold leading-8 text-slate-300">
            Dokumentasi kegiatan, penampilan hadroh, majelis sholawat, dan
            momen kebersamaan Khoirunnada.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border border-amber-300/12 bg-black/28 px-3 py-3 text-center shadow-lg shadow-black/15 backdrop-blur-xl">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                Majelis
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/12 bg-black/28 px-3 py-3 text-center shadow-lg shadow-black/15 backdrop-blur-xl">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                Hadroh
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/12 bg-black/28 px-3 py-3 text-center shadow-lg shadow-black/15 backdrop-blur-xl">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                Momen
              </p>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
            <p className="shrink-0 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-amber-300/80">
              Lihat • Kenang • Syukuri
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
          </div>
        </div>
      </section>

      <GalleryGrid items={initialGallery} />
    </PageContainer>
  );
}