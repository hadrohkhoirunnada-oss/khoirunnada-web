export default function Badge({ children }) {
  return (
    <span className="inline-flex rounded-full border border-amber-300/20 px-3 py-1 text-xs text-amber-200">
      {children}
    </span>
  );
}
