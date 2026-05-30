import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[480px] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-amber-300">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-white">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        Maaf, halaman yang Anda cari belum tersedia atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full border border-amber-300/40 px-5 py-3 text-sm font-medium text-amber-200"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
