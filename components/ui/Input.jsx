export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`min-h-11 w-full rounded-2xl border border-amber-300/15 bg-slate-900 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50 ${className}`}
      {...props}
    />
  );
}
