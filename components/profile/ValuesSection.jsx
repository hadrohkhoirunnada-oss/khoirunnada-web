function parseValuesText(text = "") {
  return String(text)
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const separatorIndex = block.indexOf(":");

      if (separatorIndex === -1) {
        return {
          title: `Nilai ${index + 1}`,
          description: block,
        };
      }

      return {
        title: block.slice(0, separatorIndex).trim(),
        description: block.slice(separatorIndex + 1).trim(),
      };
    })
    .filter((item) => item.title && item.description);
}

function getValues(profile = {}) {
  if (Array.isArray(profile.valuesItems)) {
    const items = profile.valuesItems
      .map((item) => ({
        title: String(item?.title || "").trim(),
        description: String(item?.description || "").trim(),
      }))
      .filter((item) => item.title && item.description);

    if (items.length > 0) {
      return items;
    }
  }

  return parseValuesText(profile.valuesText);
}

function ValueIcon({ index }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-amber-300/18 bg-black/35 text-xs font-extrabold text-amber-200 shadow-inner shadow-black/25">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

export default function ValuesSection({ profile = {} }) {
  const values = getValues(profile);

  return (
    <section className="relative overflow-hidden rounded-[1.9rem] border border-amber-300/18 bg-white/[0.055] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-[10px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.105),rgba(255,255,255,0.025)_34%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.24))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.14),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(245,197,66,0.08)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 top-px h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
          Nilai Majelis
        </p>

        <h2 className="mt-4 text-[1.4rem] font-extrabold leading-tight tracking-[-0.045em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.78)]">
          Nilai yang dijaga dalam setiap langkah
        </h2>

        <div className="mt-5 grid gap-3.5">
          {values.map((value, index) => (
            <div
              key={`${value.title}-${index}`}
              className="relative overflow-hidden rounded-2xl border border-amber-300/14 bg-black/28 p-4 shadow-lg shadow-black/20 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_48%,rgba(0,0,0,0.14))]" />
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

              <div className="relative z-10 flex gap-3">
                <ValueIcon index={index} />

                <div>
                  <h3 className="text-base font-extrabold tracking-[-0.03em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-100/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />

        <p className="mt-4 text-center text-[0.68rem] font-bold uppercase tracking-[0.28em] text-amber-300/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Adab • Amanah • Syiar
        </p>
      </div>
    </section>
  );
}