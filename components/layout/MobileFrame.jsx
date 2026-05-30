export default function MobileFrame({ children }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] bg-slate-950 text-white">
      {children}
    </div>
  );
}
