"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import HomeHero from "@/components/home/HomeHero";
import NextEventCard from "@/components/home/NextEventCard";
import QuickLyricsAccess from "@/components/home/QuickLyricsAccess";
import HomeGalleryPreview from "@/components/home/HomeGalleryPreview";
import HomeBookingCTA from "@/components/home/HomeBookingCTA";
import { getPublishedQasidahItems } from "@/services/qasidahService";
import { getGalleryItems } from "@/services/galleryService";
import { getPublishedShopProducts } from "@/services/shopProductService";

const INITIAL_HOME_DATA = {
  qasidahItems: [],
  galleryItems: [],
  shopProducts: [],
};

function getFulfilledArray(result) {
  if (result?.status !== "fulfilled") {
    return [];
  }

  if (!Array.isArray(result.value)) {
    return [];
  }

  return result.value;
}

export default function Page() {
  const [homeData, setHomeData] = useState(INITIAL_HOME_DATA);
  const [isLoadingHomeData, setIsLoadingHomeData] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        setIsLoadingHomeData(true);

        const [qasidahResult, galleryResult, shopResult] =
          await Promise.allSettled([
            getPublishedQasidahItems(),
            getGalleryItems(),
            getPublishedShopProducts(),
          ]);

        if (!isMounted) {
          return;
        }

        setHomeData({
          qasidahItems: getFulfilledArray(qasidahResult),
          galleryItems: getFulfilledArray(galleryResult),
          shopProducts: getFulfilledArray(shopResult),
        });
      } catch (error) {
        console.error("Gagal memuat data beranda:", error);

        if (isMounted) {
          setHomeData(INITIAL_HOME_DATA);
        }
      } finally {
        if (isMounted) {
          setIsLoadingHomeData(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageContainer className="space-y-6 pb-28 pt-7">
      <HomeHero />

      <NextEventCard
        products={homeData.shopProducts}
        isLoading={isLoadingHomeData}
      />

      <QuickLyricsAccess
        qasidahItems={homeData.qasidahItems}
        isLoading={isLoadingHomeData}
      />

      <HomeGalleryPreview
        items={homeData.galleryItems}
        isLoading={isLoadingHomeData}
      />

      <HomeBookingCTA />
    </PageContainer>
  );
}