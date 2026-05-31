import PageContainer from "@/components/layout/PageContainer";
import ProfileHero from "@/components/profile/ProfileHero";
import HistorySection from "@/components/profile/HistorySection";
import VisionMissionSection from "@/components/profile/VisionMissionSection";
import ValuesSection from "@/components/profile/ValuesSection";

export default function Page() {
  return (
    <PageContainer className="space-y-6 pb-28 pt-0">
      <ProfileHero />
      <HistorySection />
      <VisionMissionSection />
      <ValuesSection />
    </PageContainer>
  );
}