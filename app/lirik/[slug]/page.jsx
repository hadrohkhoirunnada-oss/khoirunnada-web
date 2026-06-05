import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import LyricsDetail from "@/components/lyrics/LyricsDetail";
import MaulidSectionList from "@/components/lyrics/MaulidSectionList";
import { initialLyrics } from "@/data/initialLyrics";
import { maulidCollections } from "@/data/maulidCollections";

const allLyrics = [...initialLyrics, ...maulidCollections];

export function generateStaticParams() {
  return allLyrics.map((lyric) => ({
    slug: lyric.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lyric = allLyrics.find((item) => item.slug === slug);

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
  const lyric = allLyrics.find((item) => item.slug === slug);

  if (!lyric) {
    notFound();
  }

  const isMaulidCollection = lyric.qasidahCategory === "maulid-lengkap";

  return (
    <PageContainer className="pb-28 pt-4">
      {isMaulidCollection ? (
        <MaulidSectionList maulid={lyric} />
      ) : (
        <LyricsDetail lyric={lyric} />
      )}
    </PageContainer>
  );
}