export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-amber-300/15 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 ${className}`}>
      {children}
    </div>
  );
}
