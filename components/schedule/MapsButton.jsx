export default function MapsButton({ mapsUrl }) {
  if (!mapsUrl) {
    return (
      <button
        type="button"
        disabled
        className="min-h-11 w-full rounded-full border border-amber-300/10 bg-white/[0.025] px-5 text-sm font-semibold text-slate-500"
      >
        Lokasi Belum Tersedia
      </button>
    );
  }

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 px-5 text-sm font-bold text-amber-100 transition active:scale-[0.98]"
    >
      Buka Lokasi
    </a>
  );
}