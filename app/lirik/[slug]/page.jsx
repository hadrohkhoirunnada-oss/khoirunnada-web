import PageContainer from "@/components/layout/PageContainer";
import LyricsDetail from "@/components/lyrics/LyricsDetail";
import MaulidSectionList from "@/components/lyrics/MaulidSectionList";
import DatabaseLyricsDetail from "@/components/lyrics/DatabaseLyricsDetail";
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
      title: "Bacaan Qasidah | Khoirunnada",
      description:
        "Bacaan qasidah, sholawat, maulid, dan wirid Khoirunnada.",
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
    return (
      <PageContainer className="pb-28 pt-4">
        <DatabaseLyricsDetail slug={slug} />
      </PageContainer>
    );
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