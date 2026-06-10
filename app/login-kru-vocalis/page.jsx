import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";

export const metadata = {
  title: "Login Kru/Vocalis | Khoirunnada",
  description: "Halaman login kru dan vocalis Khoirunnada.",
};

function VocalistIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13.25a3.25 3.25 0 0 0 3.25-3.25V6.75a3.25 3.25 0 0 0-6.5 0V10A3.25 3.25 0 0 0 12 13.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6.75 10.25a5.25 5.25 0 0 0 10.5 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 15.5v3.75M9.25 19.25h5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 10.25V8.5a4.25 4.25 0 0 1 8.5 0v1.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.25 10.25h9.5a2 2 0 0 1 2 2v5.25a2 2 0 0 1-2 2h-9.5a2 2 0 0 1-2-2v-5.25a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 14v1.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/36 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,66,0.12),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.24))]" />
        <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
                <VocalistIcon className="h-7 w-7" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                  Kru & Vocalis
                </p>
                <h1 className="mt-2 text-[1.65rem] font-black leading-tight tracking-[-0.06em] text-white">
                  Login Kru/Vocalis
                </h1>
              </div>
            </div>

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
              <LockIcon className="h-5 w-5" />
            </span>
          </div>

          <div className="mt-7 rounded-[1.55rem] border border-amber-300/12 bg-black/30 p-5">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Sedang Disiapkan
            </p>

            <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
              Halaman login kru dan vocalis sudah tersedia untuk kebutuhan
              pengembangan, namun aksesnya masih dikunci sementara dari sidebar
              publik.
            </p>

            <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
              Nantinya halaman ini bisa dipakai untuk akses khusus kru,
              vocalis, jadwal internal, materi latihan, atau kebutuhan tim
              Khoirunnada.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-amber-300/12 bg-black/26 px-4 py-3">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                Status
              </p>
              <p className="mt-2 text-sm font-black text-white">
                Akses dikunci sementara
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/12 bg-black/26 px-4 py-3">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                Akses Manual
              </p>
              <p className="mt-2 text-sm font-black text-white">
                /login-kru-vocalis
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="mt-6 flex min-h-12 w-full items-center justify-center rounded-2xl border border-amber-300/16 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_52%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985]"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}