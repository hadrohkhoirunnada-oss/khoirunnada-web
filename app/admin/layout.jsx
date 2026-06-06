"use client";

import PageContainer from "@/components/layout/PageContainer";
import useAuthGuard from "@/hooks/useAuthGuard";

function AdminAccessState({ title, message }) {
  return (
    <PageContainer className="flex min-h-[calc(100dvh-5.5rem)] items-center justify-center px-5 py-8">
      <section className="relative w-full max-w-[350px] overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/42 p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.014)_42%,rgba(0,0,0,0.22)_100%)]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

        <div className="relative z-10">
          <img
            src="/logo/khoirunnada-logo.png"
            alt="Khoirunnada"
            className="mx-auto h-[4.25rem] w-[4.25rem] rounded-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
          />

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
            Admin Khoirunnada
          </p>

          <h1 className="mt-4 text-xl font-black leading-tight tracking-[-0.04em] text-white">
            {title}
          </h1>

          <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">
            {message}
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

export default function AdminLayout({ children }) {
  const { loading, isAllowed, isRejected } = useAuthGuard();

  if (loading) {
    return (
      <AdminAccessState
        title="Memeriksa akses..."
        message="Mohon tunggu sebentar, sistem sedang memeriksa akun admin."
      />
    );
  }

  if (!isAllowed) {
    return (
      <AdminAccessState
        title={isRejected ? "Akses ditolak" : "Login diperlukan"}
        message={
          isRejected
            ? "Akun Google ini belum terdaftar sebagai admin Khoirunnada."
            : "Silakan login terlebih dahulu untuk masuk ke dashboard admin."
        }
      />
    );
  }

  return <>{children}</>;
}