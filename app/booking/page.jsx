import PageContainer from "@/components/layout/PageContainer";
import BookingHero from "@/components/booking/BookingHero";
import BookingForm from "@/components/booking/BookingForm";

export default function Page() {
  return (
    <PageContainer className="space-y-6 pb-10 pt-0">
      <BookingHero />
      <BookingForm />
    </PageContainer>
  );
}