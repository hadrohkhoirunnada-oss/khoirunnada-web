import ComingSoonCard from "@/components/coming-soon/ComingSoonCard";

export default function ComingSoonPage() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[480px] items-center justify-center overflow-hidden bg-khoirunnada-dark px-5 py-10 text-white">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-amber-500/5 blur-3xl" />

      <ComingSoonCard />
    </main>
  );
}