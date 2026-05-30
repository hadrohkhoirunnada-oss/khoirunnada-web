export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`min-h-11 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition active:scale-[0.98] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
