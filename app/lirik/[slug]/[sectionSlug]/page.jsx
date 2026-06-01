import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import MaulidSectionDetail from "@/components/lyrics/MaulidSectionDetail";
import { maulidCollections } from "@/data/maulidCollections";

export function generateStaticParams() {
  return maulidCollections.flatMap((maulid) => {
    const sections = Array.isArray(maulid.sections) ? maulid.sections : [];

    return sections.map((section) => ({
      slug: maulid.slug,
      sectionSlug: section.slug,
    }));
  });
}

export async function generateMetadata({ params }) {
  const { slug, sectionSlug } = await params;

  const maulid = maulidCollections.find((item) => item.slug === slug);
  const section = maulid?.sections?.find(
    (item) => item.slug === sectionSlug
  );

  if (!maulid || !section) {
    return {
      title: "Bagian Maulid Tidak Ditemukan | Khoirunnada",
    };
  }

  return {
    title: `${section.title} | ${maulid.title} | Khoirunnada`,
    description:
      section.shortTitle ||
      `Bacaan bagian ${section.title} dari ${maulid.title}.`,
  };
}

export default async function Page({ params }) {
  const { slug, sectionSlug } = await params;

  const maulid = maulidCollections.find((item) => item.slug === slug);

  if (!maulid) {
    notFound();
  }

  const sections = Array.isArray(maulid.sections) ? maulid.sections : [];
  const sectionIndex = sections.findIndex(
    (item) => item.slug === sectionSlug
  );

  if (sectionIndex < 0) {
    notFound();
  }

  const section = sections[sectionIndex];
  const previousSection = sections[sectionIndex - 1] || null;
  const nextSection = sections[sectionIndex + 1] || null;

  return (
    <PageContainer className="pb-28 pt-0">
      <MaulidSectionDetail
        maulid={maulid}
        section={section}
        sectionIndex={sectionIndex}
        totalSections={sections.length}
        previousSection={previousSection}
        nextSection={nextSection}
      />
    </PageContainer>
  );
}