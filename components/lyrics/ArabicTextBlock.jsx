export default function ArabicTextBlock({
  arabicLines = [],
  latinLines = [],
  arabOnly = false,
}) {
  const groupedLines = [];

  for (let index = 0; index < arabicLines.length; index += 2) {
    groupedLines.push({
      arabic: arabicLines.slice(index, index + 2),
      latin: latinLines.slice(index, index + 2),
    });
  }

  return (
    <section className="relative overflow-hidden rounded-[1.9rem] border border-amber-300/15 bg-black/38 px-5 py-6 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              {arabOnly ? "Arab Saja" : "Arab & Latin"}
            </p>
            <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-500">
              {arabOnly ? "Mode fokus bacaan Arab" : "Teks qasidah per bait"}
            </p>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            ع
          </span>
        </div>

        <div className={arabOnly ? "space-y-7" : "space-y-8"}>
          {groupedLines.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="relative">
              {groupIndex > 0 ? (
                <div className="mb-7 h-px w-full bg-gradient-to-r from-transparent via-amber-300/18 to-transparent" />
              ) : null}

              <div
                className={`font-arabic space-y-4 text-right ${
                  arabOnly ? "px-1" : ""
                }`}
                dir="rtl"
                lang="ar"
              >
                {group.arabic.map((line, index) => (
                  <p
                    key={`${line}-${index}`}
                    className={`font-semibold text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)] ${
                      arabOnly
                        ? "text-[1.92rem] leading-[3.35rem]"
                        : "text-[1.78rem] leading-[3rem]"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {!arabOnly && group.latin.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {group.latin.map((line, index) => (
                    <p
                      key={`${line}-${index}`}
                      className="text-[0.95rem] font-semibold leading-7 text-emerald-300/90"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}