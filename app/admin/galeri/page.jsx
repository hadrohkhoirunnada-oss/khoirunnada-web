import AdminShell from "@/components/admin/AdminShell";
import GalleryForm from "@/components/admin/galeri/GalleryForm";
import GalleryTable from "@/components/admin/galeri/GalleryTable";
import { getGalleryItems } from "@/services/galleryService";

export const dynamic = "force-dynamic";

function GalleryIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5.75 5.25h12.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m4.75 16 3.5-3.25 2.25 2.1 3.75-4.1 5 5.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.75h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function Page() {
  const galleryItems = await getGalleryItems();

  return (
    <AdminShell>
      <section className="space-y-5">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,66,0.1),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
                <GalleryIcon className="h-6 w-6" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                  Admin Galeri
                </p>

                <h1 className="mt-2 text-[1.7rem] font-black leading-tight tracking-[-0.06em] text-white">
                  Kelola Galeri
                </h1>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                  Atur dokumentasi kegiatan, foto majelis, penampilan hadroh,
                  dan momen kebersamaan Khoirunnada.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Total Foto
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {galleryItems.length}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Storage
                </p>
                <p className="mt-2 text-sm font-black text-white">
                  Supabase
                </p>
              </div>
            </div>
          </div>
        </section>

        <GalleryForm />

        <GalleryTable items={galleryItems} />
      </section>
    </AdminShell>
  );
}