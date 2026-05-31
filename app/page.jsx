import PageContainer from "@/components/layout/PageContainer";
import HomeHero from "@/components/home/HomeHero";
import NextEventCard from "@/components/home/NextEventCard";
import QuickLyricsAccess from "@/components/home/QuickLyricsAccess";
import HomeGalleryPreview from "@/components/home/HomeGalleryPreview";
import HomeBookingCTA from "@/components/home/HomeBookingCTA";

export default function Page() {
  return (
    <PageContainer className="space-y-6 pb-28 pt-7">
      <HomeHero />
      <NextEventCard />
      <QuickLyricsAccess />
      <HomeGalleryPreview />
      <HomeBookingCTA />
    </PageContainer>
  );
}