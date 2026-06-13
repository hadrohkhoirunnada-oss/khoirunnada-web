function parseTimelineText(text = "") {
  return String(text)
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const rawTitle = lines[0] || `Kronologi ${index + 1}`;
      const title = rawTitle.replace(/^\d+\.\s*/, "").trim();
      const description = lines.slice(1).join(" ").trim();

      return {
        title,
        description,
      };
    })
    .filter((item) => item.title && item.description);
}

function getTimelineItems(profile = {}) {
  if (Array.isArray(profile.timelineItems)) {
    const items = profile.timelineItems
      .map((item) => ({
        title: String(item?.title || "").trim(),
        description: String(item?.description || "").trim(),
      }))
      .filter((item) => item.title && item.description);

    if (items.length > 0) {
      return items;
    }
  }

  return parseTimelineText(profile.timelineText);
}

function PremiumCard({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.9rem] border border-amber-300/18 bg-white/[0.055] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-[10px] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.105),rgba(255,255,255,0.025)_34%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.24))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.14),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(245,197,66,0.08)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 top-px h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function VisionMissionSection({ profile = {} }) {
  const timelineItems = getTimelineItems(profile);
  const hopeText =
    profile.hopeText ||
    "Semoga Majelis Sholawat & Hadroh Khoirunnada selalu dijaga kelestariannya dan seluruh anggotanya diberikan keistiqomahan.";

  return (
    <section className="space-y-4">
      <PremiumCard>
        <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
          Kronologi Sejarah
        </p>

        <h2 className="mt-4 text-[1.4rem] font-extrabold leading-tight tracking-[-0.045em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.78)]">
          Perjalanan lahirnya nama Khoirunnada
        </h2>

        <div className="mt-6 space-y-4">
          {timelineItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="relative overflow-hidden rounded-2xl border border-amber-300/14 bg-black/28 p-4 shadow-lg shadow-black/20 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_48%,rgba(0,0,0,0.14))]" />
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

              <div className="relative z-10 flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/15 text-xs font-extrabold text-amber-200 shadow-inner shadow-black/25">
                  {index + 1}
                </span>

                <div>
                  <h3 className="text-[0.98rem] font-extrabold leading-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-100/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PremiumCard>

      <PremiumCard>
        <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
          Harapan dan Doa
        </p>

        <h2 className="mt-4 text-[1.4rem] font-extrabold leading-tight tracking-[-0.045em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.78)]">
          Semoga terus istiqomah dalam syiar sholawat
        </h2>

        <p className="mt-5 text-[0.95rem] font-medium leading-8 text-slate-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.72)]">
          {hopeText}
        </p>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />

        <p className="mt-4 text-center text-[0.68rem] font-bold uppercase tracking-[0.28em] text-amber-300/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Allahumma Sholli Ala Sayyidina Muhammad ﷺ
        </p>
      </PremiumCard>
    </section>
  );
}