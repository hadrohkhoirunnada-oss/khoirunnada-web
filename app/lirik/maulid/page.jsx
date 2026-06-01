import PageContainer from "@/components/layout/PageContainer";
import MaulidCollectionList from "@/components/lyrics/MaulidCollectionList";
import { maulidCollections } from "@/data/maulidCollections";

export const metadata = {
  title: "Maulid Lengkap | Khoirunnada",
  description:
    "Daftar bacaan Maulid lengkap Khoirunnada yang disusun per bagian agar nyaman dibaca.",
};

export default function Page() {
  return (
    <PageContainer className="pb-28 pt-0">
      <MaulidCollectionList collections={maulidCollections} />
    </PageContainer>
  );
}