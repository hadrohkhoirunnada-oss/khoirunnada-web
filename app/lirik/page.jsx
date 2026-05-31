import PageContainer from "@/components/layout/PageContainer";
import LyricsHero from "@/components/lyrics/LyricsHero";
import LyricsList from "@/components/lyrics/LyricsList";
import { initialLyrics } from "@/data/initialLyrics";

export default function Page() {
  return (
    <PageContainer className="space-y-6 pb-28 pt-0">
      <LyricsHero />
      <LyricsList lyrics={initialLyrics} />
    </PageContainer>
  );
}