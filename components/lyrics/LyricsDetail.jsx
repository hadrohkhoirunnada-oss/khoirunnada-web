import Link from "next/link";
import ArabicTextBlock from "@/components/lyrics/ArabicTextBlock";
import LyricsActions from "@/components/lyrics/LyricsActions";

export default function LyricsDetail({ lyric }) {
  return (
    <article className="space-y-5">
      <section className="rounded-[2rem] border border-amber-300/20 bg-white/[0.045] px-6 py-7 text-center shadow-2xl shadow-black/30">
        <p className="text-xs font-semibold uppercase tracking-[0.36em] text-amber-300">
          {lyric.category}
        </p>

        <h1 className="mt-4 text-[1.75rem] font-bold leading-tight tracking-[-0.04em] text-white">
          {lyric.title}
        </h1>

        <p className="mx-auto mt-4 max-w-[330px] text-sm leading-7 text-slate-300">
          {lyric.shortDescription}
        </p>
      </section>

      <LyricsActions lyric={lyric} />

      <ArabicTextBlock lines={lyric.arabicText} />

      <section className="rounded-[1.75rem] border border-amber-300/15 bg-white/[0.035] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Latin
        </p>

        <div className="mt-4 space-y-3">
          {lyric.latinText.map((line, index) => (
            <p key={`${line}-${index}`} className="text-base leading-7 text-white">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-amber-300/15 bg-white/[0.035] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Terjemahan
        </p>

        <div className="mt-4 space-y-3">
          {lyric.translation.map((line, index) => (
            <p
              key={`${line}-${index}`}
              className="text-sm leading-7 text-slate-300"
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      <Link
        href="/lirik"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-amber-300/25 bg-white/[0.035] px-5 text-sm font-bold text-amber-100 transition active:scale-[0.98]"
      >
        Kembali ke Daftar Lirik
      </Link>
    </article>
  );
}