export default function ArabicTextBlock({ lines }) {
  return (
    <div className="rounded-[1.75rem] border border-amber-300/15 bg-black/25 px-5 py-6">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
        Arab
      </p>

      <div className="space-y-5 text-right" dir="rtl" lang="ar">
        {lines.map((line, index) => (
          <p
            key={`${line}-${index}`}
            className="font-serif text-[1.75rem] leading-[2.8rem] text-white"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}