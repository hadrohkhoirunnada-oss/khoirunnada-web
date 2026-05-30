export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`min-h-28 w-full rounded-2xl border border-amber-300/15 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50 ${className}`}
      {...props}
    />
  );
}
