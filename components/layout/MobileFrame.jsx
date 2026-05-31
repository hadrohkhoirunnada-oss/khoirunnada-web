export default function MobileFrame({ children }) {
  return (
    <div className="no-scrollbar khoirunnada-mobile-shell relative mx-auto min-h-dvh w-full max-w-[480px] overflow-x-hidden shadow-[0_0_100px_rgba(0,0,0,0.78)] sm:border-x sm:border-amber-300/10">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[-1] mx-auto h-40 max-w-[480px] bg-gradient-to-b from-amber-300/10 to-transparent" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}