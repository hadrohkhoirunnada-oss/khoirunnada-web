"use client";

function CopyIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 8.25h8.5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8.5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 15.75h-.5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h8.5a2 2 0 0 1 2 2v.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M18 21.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m8.42 10.65 7.16-4.3M8.42 13.35l7.16 4.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
        className="group relative flex min-h-13 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/18 bg-black/38 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/25 backdrop-blur-2xl transition active:scale-[0.98]"
      >
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.13),rgba(255,255,255,0.028)_42%,rgba(0,0,0,0.22))]" />
        <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <span className="relative z-10 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/14 bg-black/35 text-amber-200">
            <CopyIcon className="h-4 w-4" />
          </span>
          Salin
        </span>
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="group relative flex min-h-13 items-center justify-center overflow-hidden rounded-2xl border border-amber-200/25 bg-gradient-to-b from-amber-200 to-amber-400 px-4 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-950/30 transition active:scale-[0.98]"
      >
        <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        <span className="relative z-10 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-950/10 bg-white/25 text-slate-950">
            <ShareIcon className="h-4 w-4" />
          </span>
          Bagikan
        </span>
      </button>
    </div>
  );
}