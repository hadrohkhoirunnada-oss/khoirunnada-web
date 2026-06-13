"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import PageContainer from "@/components/layout/PageContainer";
import ProfileHero from "@/components/profile/ProfileHero";
import HistorySection from "@/components/profile/HistorySection";
import VisionMissionSection from "@/components/profile/VisionMissionSection";
import ValuesSection from "@/components/profile/ValuesSection";
import { getFirebaseDb } from "@/lib/firebase";

const DEFAULT_MAIN_INFO_ITEMS = [
  {
    label: "Nama Majelis",
    value: "Majelis Sholawat & Hadroh Khoirunnada",
  },
  {
    label: "Harlah",
    value: "11 Agustus 2022",
  },
  {
    label: "Inisiator/Pendiri",
    value: "Bro Toniman",
  },
  {
    label: "Pemberi Nama",
    value: "Ustaz Sukron Makmur Nawawi (Gus Syukron Nawawi)",
  },
  {
    label: "Pelatih/Pembina Awal",
    value: "Mbak Dewi",
  },
];

const DEFAULT_TIMELINE_ITEMS = [
  {
    title: "Niat Awal dan Sowan yang Tertunda",
    description:
      "Perjalanan majelis ini dimulai pada tanggal 11 Agustus 2022. Bro Toniman memiliki niat mulia untuk membentuk sebuah majelis sholawat. Untuk memulai langkah tersebut, ia pergi sowan ke pondok Ustaz Sukron Makmur Nawawi demi meminta petunjuk dan restu. Namun, saat itu Ustaz Sukron sedang tidak berada di tempat karena ada agenda kegiatan di Marisa Kota.",
  },
  {
    title: "Menitipkan Amanah Lewat Ustaz Jupri",
    description:
      "Karena tidak bisa bertemu langsung, Bro Toniman akhirnya meminta bantuan kepada Ustaz Jupri. Beliau menitipkan salam sekaligus menyampaikan amanah terkait niat dan rencana pembentukan majelis sholawat tersebut.",
  },
  {
    title: 'Restu dan Lahirnya Nama "Khoirunnada"',
    description:
      "Ustaz Jupri kemudian meneruskan pesan tersebut kepada Ustaz Sukron Makmur Nawawi melalui pesan WhatsApp. Niat baik ini disambut dengan tangan terbuka. Melalui balasan pesan tersebut, Ustaz Sukron memberikan restunya sekaligus memberikan nama resmi bagi majelis ini, yaitu Khoirunnada.",
  },
  {
    title: "Cikal Bakal dari Anak Ngaji",
    description:
      "Cikal bakal dari tim hadroh majelis ini sebenarnya berasal dari santri anak-anak mengaji yang dilatih oleh Mbak Dewi. Melihat potensi dan semangat mereka, Bro Toniman mengambil peran untuk terus mendorong, memotivasi, dan memberikan support penuh agar mereka rajin latihan. Tujuannya satu: agar majelis ini bisa terus berkembang dan tetap eksis.",
  },
];

const DEFAULT_PROFILE = {
  heroEyebrow: "Profil & Sejarah",
  heroTitle: "Khoirunnada",
  heroDescription:
    "Majelis Sholawat dan Hadroh yang hadir sebagai ruang syiar, sholawat, kebersamaan, dan kecintaan kepada Rasulullah ﷺ.",
  mainInfoItems: DEFAULT_MAIN_INFO_ITEMS,
  mainInfoText:
    "Nama Majelis: Majelis Sholawat & Hadroh Khoirunnada\nHarlah: 11 Agustus 2022\nInisiator/Pendiri: Bro Toniman\nPemberi Nama: Ustaz Sukron Makmur Nawawi (Gus Syukron Nawawi)\nPelatih/Pembina Awal: Mbak Dewi",
  shortHistory:
    'Majelis Sholawat & Hadroh Khoirunnada resmi berdiri pada tanggal 11 Agustus 2022. Nama "Khoirunnada" diberikan langsung oleh Ustaz Sukron Makmur Nawawi.\n\nBerawal dari wadah latihan hadroh bagi anak-anak mengaji, majelis ini terus didukung hingga berkembang dan eksis secara istiqomah sampai sekarang.',
  timelineItems: DEFAULT_TIMELINE_ITEMS,
  timelineText:
    '1. Niat Awal dan Sowan yang Tertunda\nPerjalanan majelis ini dimulai pada tanggal 11 Agustus 2022. Bro Toniman memiliki niat mulia untuk membentuk sebuah majelis sholawat. Untuk memulai langkah tersebut, ia pergi sowan ke pondok Ustaz Sukron Makmur Nawawi demi meminta petunjuk dan restu. Namun, saat itu Ustaz Sukron sedang tidak berada di tempat karena ada agenda kegiatan di Marisa Kota.\n\n2. Menitipkan Amanah Lewat Ustaz Jupri\nKarena tidak bisa bertemu langsung, Bro Toniman akhirnya meminta bantuan kepada Ustaz Jupri. Beliau menitipkan salam sekaligus menyampaikan amanah terkait niat dan rencana pembentukan majelis sholawat tersebut.\n\n3. Restu dan Lahirnya Nama "Khoirunnada"\nUstaz Jupri kemudian meneruskan pesan tersebut kepada Ustaz Sukron Makmur Nawawi melalui pesan WhatsApp. Niat baik ini disambut dengan tangan terbuka. Melalui balasan pesan tersebut, Ustaz Sukron memberikan restunya sekaligus memberikan nama resmi bagi majelis ini, yaitu Khoirunnada.\n\n4. Cikal Bakal dari Anak Ngaji\nCikal bakal dari tim hadroh majelis ini sebenarnya berasal dari santri anak-anak mengaji yang dilatih oleh Mbak Dewi. Melihat potensi dan semangat mereka, Bro Toniman mengambil peran untuk terus mendorong, memotivasi, dan memberikan support penuh agar mereka rajin latihan. Tujuannya satu: agar majelis ini bisa terus berkembang dan tetap eksis.',
  hopeText:
    "Sejak resmi berdiri pada Agustus 2022 hingga saat ini, Majelis Sholawat & Hadroh Khoirunnada terus berjalan mensyiarkan sholawat. Semoga ke depannya majelis ini selalu dijaga kelestariannya dan seluruh anggotanya diberikan keistiqomahan.",
  valuesText:
    "Adab: Menjaga sikap, tutur kata, dan ketertiban dalam majelis maupun saat tampil di tengah masyarakat.\n\nKebersamaan: Menguatkan ukhuwah, kekompakan, dan rasa saling mendukung antaranggota.\n\nSyiar: Menghadirkan sholawat dan hadroh sebagai jalan kebaikan yang dekat dengan masyarakat.\n\nAmanah: Menjaga kepercayaan dalam setiap undangan, jadwal, dan kegiatan yang dijalankan.",
};

function readText(data, key, fallback) {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const value = data[key];

  return typeof value === "string" && value.trim() ? value : fallback;
}

function normalizeMainInfoItems(value, fallback = DEFAULT_MAIN_INFO_ITEMS) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .map((item) => ({
      label: String(item?.label || "").trim(),
      value: String(item?.value || "").trim(),
    }))
    .filter((item) => item.label && item.value);

  return items.length > 0 ? items : fallback;
}

function normalizeTimelineItems(value, fallback = DEFAULT_TIMELINE_ITEMS) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .map((item) => ({
      title: String(item?.title || "").trim(),
      description: String(item?.description || "").trim(),
    }))
    .filter((item) => item.title && item.description);

  return items.length > 0 ? items : fallback;
}

function normalizeProfile(data) {
  return {
    heroEyebrow: readText(data, "heroEyebrow", DEFAULT_PROFILE.heroEyebrow),
    heroTitle: readText(data, "heroTitle", DEFAULT_PROFILE.heroTitle),
    heroDescription: readText(
      data,
      "heroDescription",
      DEFAULT_PROFILE.heroDescription
    ),
    mainInfoItems: normalizeMainInfoItems(
      data?.mainInfoItems,
      DEFAULT_PROFILE.mainInfoItems
    ),
    mainInfoText: readText(data, "mainInfoText", DEFAULT_PROFILE.mainInfoText),
    shortHistory: readText(data, "shortHistory", DEFAULT_PROFILE.shortHistory),
    timelineItems: normalizeTimelineItems(
      data?.timelineItems,
      DEFAULT_PROFILE.timelineItems
    ),
    timelineText: readText(data, "timelineText", DEFAULT_PROFILE.timelineText),
    hopeText: readText(data, "hopeText", DEFAULT_PROFILE.hopeText),
    valuesText: readText(data, "valuesText", DEFAULT_PROFILE.valuesText),
  };
}

export default function Page() {
  const [profile, setProfile] = useState(() =>
    normalizeProfile(DEFAULT_PROFILE)
  );

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const db = getFirebaseDb();

        if (!db) {
          return;
        }

        const profileRef = doc(db, "siteSettings", "profile");
        const snapshot = await getDoc(profileRef);

        if (!isMounted || !snapshot.exists()) {
          return;
        }

        setProfile(normalizeProfile(snapshot.data()));
      } catch (error) {
        console.error("Gagal memuat profil publik:", error);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageContainer className="space-y-6 pb-28 pt-0">
      <ProfileHero profile={profile} />
      <HistorySection profile={profile} />
      <VisionMissionSection profile={profile} />
      <ValuesSection profile={profile} />
    </PageContainer>
  );
}