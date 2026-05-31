"use client";

export default function LyricsActions({ lyric }) {
  const plainText = [
    lyric.title,
    "",
    "Arab:",
    ...lyric.arabicText,
    "",
    "Latin:",
    ...lyric.latinText,
    "",
    "Terjemahan:",
    ...lyric.translation,
  ].join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      alert("Lirik berhasil disalin.");
    } catch {
      alert("Maaf, lirik belum bisa disalin di perangkat ini.");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: lyric.title,
          text: plainText,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      alert("Link lirik berhasil disalin.");
    } catch {
      alert("Maaf, fitur bagikan belum tersedia di perangkat ini.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="min-h-12 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 text-sm font-bold text-amber-100 transition active:scale-[0.98]"
      >
        Salin Lirik
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="min-h-12 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 px-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-950/30 transition active:scale-[0.98]"
      >
        Bagikan
      </button>
    </div>
  );
}