import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import LyricsDetail from "@/components/lyrics/LyricsDetail";
import { initialLyrics } from "@/data/initialLyrics";

export function generateStaticParams() {
  return initialLyrics.map((lyric) => ({
    slug: lyric.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lyric = initialLyrics.find((item) => item.slug === slug);

  if (!lyric) {
    return {
      title: "Lirik Tidak Ditemukan | Khoirunnada",
    };
  }

  return {
    title: `${lyric.title} | Khoirunnada`,
    description: lyric.shortDescription,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const lyric = initialLyrics.find((item) => item.slug === slug);

  if (!lyric) {
    notFound();
  }

  return (
    <PageContainer className="pb-28 pt-7">
      <LyricsDetail lyric={lyric} />
    </PageContainer>
  );
}