export default function AdminStatCard({
  title,
  value,
  description,
  imageUrl,
}) {
  return (
    <article className="group relative aspect-square overflow-hidden rounded-[1.35rem] border border-amber-300/14 bg-black/35 shadow-xl shadow-black/25 backdrop-blur-xl">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-active:scale-105"
        />
      ) : null}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.56)_46%,rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.16),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-amber-300 drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)]">
          {title}
        </p>

        <div>
          <p className="text-[2rem] font-black leading-none tracking-[-0.08em] text-white drop-shadow-[0_8px_22px_rgba(0,0,0,0.8)]">
            {value}
          </p>

          <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-slate-200/85 drop-shadow-[0_4px_14px_rgba(0,0,0,0.75)]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}