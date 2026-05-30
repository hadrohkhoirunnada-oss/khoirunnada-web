export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-5">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
