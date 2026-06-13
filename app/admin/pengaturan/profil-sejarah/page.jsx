"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import AdminShell from "@/components/admin/AdminShell";
import { getFirebaseDb } from "@/lib/firebase";

const SITE_SETTINGS_COLLECTION = "siteSettings";
const PROFILE_DOCUMENT_ID = "profile";

const DEFAULT_HERO_EYEBROW = "Profil & Sejarah";
const DEFAULT_HERO_TITLE = "Khoirunnada";
const DEFAULT_HERO_DESCRIPTION =
  "Majelis Sholawat dan Hadroh yang hadir sebagai ruang syiar, sholawat, kebersamaan, dan kecintaan kepada Rasulullah ﷺ.";

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
    label: "Inisiator/Pembina",
    value: "Muhammad Ali Mutohar",
  },
  {
    label: "Pendiri/Pemberi Nama",
    value: "Ustaz Sukron Makmur Nawawi",
  },
  {
    label: "Pelatih/Pembina Awal",
    value: "Mbak Dewi",
  },
];

const DEFAULT_SHORT_HISTORY =
  'Majelis Sholawat & Hadroh Khoirunnada resmi berdiri pada tanggal 11 Agustus 2022. Nama "Khoirunnada" diberikan langsung oleh Ustaz Sukron Makmur Nawawi.\n\n' +
  "Berawal dari wadah latihan hadroh bagi anak-anak mengaji, majelis ini terus didukung hingga berkembang dan eksis secara istiqomah sampai sekarang.";

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

const DEFAULT_VALUE_ITEMS = [
  {
    title: "Adab",
    description:
      "Menjaga sikap, tutur kata, dan ketertiban dalam majelis maupun saat tampil di tengah masyarakat.",
  },
  {
    title: "Kebersamaan",
    description:
      "Menguatkan ukhuwah, kekompakan, dan rasa saling mendukung antaranggota.",
  },
  {
    title: "Syiar",
    description:
      "Menghadirkan sholawat dan hadroh sebagai jalan kebaikan yang dekat dengan masyarakat.",
  },
  {
    title: "Amanah",
    description:
      "Menjaga kepercayaan dalam setiap undangan, jadwal, dan kegiatan yang dijalankan.",
  },
];

const DEFAULT_HOPE_TEXT =
  "Sejak resmi berdiri pada Agustus 2022 hingga saat ini, Majelis Sholawat & Hadroh Khoirunnada terus berjalan mensyiarkan sholawat. Semoga ke depannya majelis ini selalu dijaga kelestariannya dan seluruh anggotanya diberikan keistiqomahan.";

function readText(data, key, fallback) {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const value = data[key];

  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim() ? value : fallback;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseMainInfoText(text = "") {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return {
          label: "Informasi",
          value: line,
        };
      }

      return {
        label: line.slice(0, separatorIndex).trim(),
        value: line.slice(separatorIndex + 1).trim(),
      };
    })
    .filter((item) => item.label || item.value);
}

function parseTimelineText(text = "") {
  return String(text || "")
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const rawTitle = lines[0] || `Kronologi ${index + 1}`;
      const title = rawTitle.replace(/^\d+\.\s*/, "").trim();
      const description = lines.slice(1).join(" ").trim();

      return {
        title,
        description,
      };
    })
    .filter((item) => item.title || item.description);
}

function parseValuesText(text = "") {
  return String(text || "")
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const separatorIndex = block.indexOf(":");

      if (separatorIndex === -1) {
        return {
          title: `Nilai ${index + 1}`,
          description: block,
        };
      }

      return {
        title: block.slice(0, separatorIndex).trim(),
        description: block.slice(separatorIndex + 1).trim(),
      };
    })
    .filter((item) => item.title || item.description);
}

function normalizeMainInfoItems(value, fallbackItems = DEFAULT_MAIN_INFO_ITEMS) {
  const sourceItems = Array.isArray(value) ? value : fallbackItems;

  const normalizedItems = sourceItems
    .map((item) => {
      const safeItem = isPlainObject(item) ? item : {};

      return {
        label: String(safeItem.label || "").trim(),
        value: String(safeItem.value || "").trim(),
      };
    })
    .filter((item) => item.label || item.value);

  return normalizedItems.length > 0 ? normalizedItems : fallbackItems;
}

function normalizeTimelineItems(value, fallbackItems = DEFAULT_TIMELINE_ITEMS) {
  const sourceItems = Array.isArray(value) ? value : fallbackItems;

  const normalizedItems = sourceItems
    .map((item) => {
      const safeItem = isPlainObject(item) ? item : {};

      return {
        title: String(safeItem.title || "").trim(),
        description: String(safeItem.description || "").trim(),
      };
    })
    .filter((item) => item.title || item.description);

  return normalizedItems.length > 0 ? normalizedItems : fallbackItems;
}

function normalizeValueItems(value, fallbackItems = DEFAULT_VALUE_ITEMS) {
  const sourceItems = Array.isArray(value) ? value : fallbackItems;

  const normalizedItems = sourceItems
    .map((item) => {
      const safeItem = isPlainObject(item) ? item : {};

      return {
        title: String(safeItem.title || "").trim(),
        description: String(safeItem.description || "").trim(),
      };
    })
    .filter((item) => item.title || item.description);

  return normalizedItems.length > 0 ? normalizedItems : fallbackItems;
}

function buildMainInfoText(items = []) {
  return normalizeMainInfoItems(items, [])
    .map((item) => {
      if (!item.label) {
        return item.value;
      }

      if (!item.value) {
        return item.label;
      }

      return `${item.label}: ${item.value}`;
    })
    .join("\n");
}

function buildTimelineText(items = []) {
  return normalizeTimelineItems(items, [])
    .map((item, index) => {
      const title = item.title || `Kronologi ${index + 1}`;
      const description = item.description || "";

      return `${index + 1}. ${title}\n${description}`.trim();
    })
    .join("\n\n");
}

function buildValuesText(items = []) {
  return normalizeValueItems(items, [])
    .map((item) => {
      if (!item.title) {
        return item.description;
      }

      if (!item.description) {
        return item.title;
      }

      return `${item.title}: ${item.description}`;
    })
    .join("\n\n");
}

function BackIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.25 5.75 8.75 12l6.5 6.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaveIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.75 4.75h10.8l1.7 1.7v12.8H5.75V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 4.75v5.1h7.5v-5.1M8.5 19.25v-5.1h7v5.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionCard({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden rounded-[1.8rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.1),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="relative z-10">
        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.045em] text-white">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 text-sm font-medium leading-6 text-slate-400">
            {description}
          </p>
        ) : null}

        <div className="mt-5 space-y-4">{children}</div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-amber-200/80">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/35 focus:bg-black/50"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 6,
}) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-amber-200/80">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full resize-y rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/35 focus:bg-black/50"
      />
    </label>
  );
}

function SmallButton({ children, onClick, variant = "default" }) {
  const className =
    variant === "danger"
      ? "border-red-400/20 bg-red-500/10 text-red-200"
      : "border-amber-300/16 bg-amber-300/10 text-amber-200";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition active:scale-[0.99] ${className}`}
    >
      {children}
    </button>
  );
}

function MainInfoEditor({ items, onChange }) {
  const safeItems = Array.isArray(items) ? items : [];

  function updateItem(index, field, value) {
    const nextItems = [...safeItems];
    nextItems[index] = {
      ...nextItems[index],
      [field]: value,
    };

    onChange(nextItems);
  }

  function addItem() {
    onChange([
      ...safeItems,
      {
        label: "",
        value: "",
      },
    ]);
  }

  function removeItem(index) {
    onChange(safeItems.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div>
      <div className="space-y-3">
        {safeItems.map((item, index) => (
          <div
            key={`main-info-${index}`}
            className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/26 p-4"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)_45%,rgba(0,0,0,0.18))]" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-amber-300">
                  Card Informasi {index + 1}
                </p>

                <SmallButton
                  variant="danger"
                  onClick={() => removeItem(index)}
                >
                  Hapus
                </SmallButton>
              </div>

              <div className="space-y-3">
                <Field
                  label="Nama Label Card"
                  value={item.label || ""}
                  onChange={(value) => updateItem(index, "label", value)}
                  placeholder="Contoh: Nama Majelis"
                />

                <TextareaField
                  label="Isi Card"
                  value={item.value || ""}
                  onChange={(value) => updateItem(index, "value", value)}
                  placeholder="Contoh: Majelis Sholawat & Hadroh Khoirunnada"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SmallButton onClick={addItem}>Tambah Card Informasi</SmallButton>
      </div>
    </div>
  );
}

function TimelineEditor({ items, onChange }) {
  const safeItems = Array.isArray(items) ? items : [];

  function updateItem(index, field, value) {
    const nextItems = [...safeItems];
    nextItems[index] = {
      ...nextItems[index],
      [field]: value,
    };

    onChange(nextItems);
  }

  function addItem() {
    onChange([
      ...safeItems,
      {
        title: "",
        description: "",
      },
    ]);
  }

  function removeItem(index) {
    onChange(safeItems.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div>
      <div className="space-y-3">
        {safeItems.map((item, index) => (
          <div
            key={`timeline-${index}`}
            className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/26 p-4"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)_45%,rgba(0,0,0,0.18))]" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-amber-300">
                  Card Kronologi {index + 1}
                </p>

                <SmallButton
                  variant="danger"
                  onClick={() => removeItem(index)}
                >
                  Hapus
                </SmallButton>
              </div>

              <div className="space-y-3">
                <Field
                  label="Judul Kronologi"
                  value={item.title || ""}
                  onChange={(value) => updateItem(index, "title", value)}
                  placeholder="Contoh: Niat Awal dan Sowan yang Tertunda"
                />

                <TextareaField
                  label="Isi Kronologi"
                  value={item.description || ""}
                  onChange={(value) =>
                    updateItem(index, "description", value)
                  }
                  placeholder="Tulis cerita kronologi di sini..."
                  rows={7}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SmallButton onClick={addItem}>Tambah Card Kronologi</SmallButton>
      </div>
    </div>
  );
}

function ValuesEditor({ items, onChange }) {
  const safeItems = Array.isArray(items) ? items : [];

  function updateItem(index, field, value) {
    const nextItems = [...safeItems];
    nextItems[index] = {
      ...nextItems[index],
      [field]: value,
    };

    onChange(nextItems);
  }

  function addItem() {
    onChange([
      ...safeItems,
      {
        title: "",
        description: "",
      },
    ]);
  }

  function removeItem(index) {
    onChange(safeItems.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div>
      <div className="space-y-3">
        {safeItems.map((item, index) => (
          <div
            key={`value-${index}`}
            className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/26 p-4"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)_45%,rgba(0,0,0,0.18))]" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-amber-300">
                  Card Nilai {index + 1}
                </p>

                <SmallButton
                  variant="danger"
                  onClick={() => removeItem(index)}
                >
                  Hapus
                </SmallButton>
              </div>

              <div className="space-y-3">
                <Field
                  label="Judul Nilai"
                  value={item.title || ""}
                  onChange={(value) => updateItem(index, "title", value)}
                  placeholder="Contoh: Adab"
                />

                <TextareaField
                  label="Isi Nilai"
                  value={item.description || ""}
                  onChange={(value) =>
                    updateItem(index, "description", value)
                  }
                  placeholder="Tulis penjelasan nilai di sini..."
                  rows={5}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SmallButton onClick={addItem}>Tambah Card Nilai</SmallButton>
      </div>
    </div>
  );
}

export default function Page() {
  const [heroEyebrow, setHeroEyebrow] = useState(DEFAULT_HERO_EYEBROW);
  const [heroTitle, setHeroTitle] = useState(DEFAULT_HERO_TITLE);
  const [heroDescription, setHeroDescription] = useState(
    DEFAULT_HERO_DESCRIPTION
  );
  const [mainInfoItems, setMainInfoItems] = useState(DEFAULT_MAIN_INFO_ITEMS);
  const [shortHistory, setShortHistory] = useState(DEFAULT_SHORT_HISTORY);
  const [timelineItems, setTimelineItems] = useState(DEFAULT_TIMELINE_ITEMS);
  const [hopeText, setHopeText] = useState(DEFAULT_HOPE_TEXT);
  const [valueItems, setValueItems] = useState(DEFAULT_VALUE_ITEMS);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfileSettings() {
      try {
        setIsLoading(true);
        setMessage("");
        setErrorMessage("");

        const db = getFirebaseDb();

        if (!db) {
          if (isMounted) {
            setErrorMessage(
              "Firestore belum siap. Data default tetap ditampilkan."
            );
          }

          return;
        }

        const profileRef = doc(
          db,
          SITE_SETTINGS_COLLECTION,
          PROFILE_DOCUMENT_ID
        );

        const snapshot = await getDoc(profileRef);

        if (!isMounted || !snapshot.exists()) {
          return;
        }

        const data = snapshot.data();

        const parsedMainInfoItems = parseMainInfoText(data.mainInfoText);
        const parsedTimelineItems = parseTimelineText(data.timelineText);
        const parsedValueItems = parseValuesText(data.valuesText);

        setHeroEyebrow(readText(data, "heroEyebrow", DEFAULT_HERO_EYEBROW));
        setHeroTitle(readText(data, "heroTitle", DEFAULT_HERO_TITLE));
        setHeroDescription(
          readText(data, "heroDescription", DEFAULT_HERO_DESCRIPTION)
        );

        setMainInfoItems(
          normalizeMainInfoItems(
            data.mainInfoItems,
            parsedMainInfoItems.length > 0
              ? parsedMainInfoItems
              : DEFAULT_MAIN_INFO_ITEMS
          )
        );

        setShortHistory(readText(data, "shortHistory", DEFAULT_SHORT_HISTORY));

        setTimelineItems(
          normalizeTimelineItems(
            data.timelineItems,
            parsedTimelineItems.length > 0
              ? parsedTimelineItems
              : DEFAULT_TIMELINE_ITEMS
          )
        );

        setHopeText(readText(data, "hopeText", DEFAULT_HOPE_TEXT));

        setValueItems(
          normalizeValueItems(
            data.valuesItems,
            parsedValueItems.length > 0 ? parsedValueItems : DEFAULT_VALUE_ITEMS
          )
        );
      } catch (error) {
        console.error("Gagal memuat Pengaturan Profil & Sejarah:", error);

        if (isMounted) {
          setErrorMessage(
            "Gagal memuat data dari Firestore. Data default tetap ditampilkan."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfileSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage("");
      setErrorMessage("");

      const db = getFirebaseDb();

      if (!db) {
        throw new Error("Firestore belum siap. Periksa konfigurasi Firebase.");
      }

      const cleanMainInfoItems = normalizeMainInfoItems(mainInfoItems, []);
      const cleanTimelineItems = normalizeTimelineItems(timelineItems, []);
      const cleanValueItems = normalizeValueItems(valueItems, []);

      const profileRef = doc(
        db,
        SITE_SETTINGS_COLLECTION,
        PROFILE_DOCUMENT_ID
      );

      await setDoc(
        profileRef,
        {
          heroEyebrow,
          heroTitle,
          heroDescription,
          mainInfoItems: cleanMainInfoItems,
          mainInfoText: buildMainInfoText(cleanMainInfoItems),
          shortHistory,
          timelineItems: cleanTimelineItems,
          timelineText: buildTimelineText(cleanTimelineItems),
          hopeText,
          valuesItems: cleanValueItems,
          valuesText: buildValuesText(cleanValueItems),
          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      setMainInfoItems(cleanMainInfoItems);
      setTimelineItems(cleanTimelineItems);
      setValueItems(cleanValueItems);
      setMessage("Pengaturan Profil & Sejarah berhasil disimpan.");
    } catch (error) {
      console.error("Gagal menyimpan Pengaturan Profil & Sejarah:", error);

      setErrorMessage(
        error?.message ||
          "Gagal menyimpan data. Periksa koneksi atau izin Firestore."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleResetDefault() {
    setHeroEyebrow(DEFAULT_HERO_EYEBROW);
    setHeroTitle(DEFAULT_HERO_TITLE);
    setHeroDescription(DEFAULT_HERO_DESCRIPTION);
    setMainInfoItems(DEFAULT_MAIN_INFO_ITEMS);
    setShortHistory(DEFAULT_SHORT_HISTORY);
    setTimelineItems(DEFAULT_TIMELINE_ITEMS);
    setHopeText(DEFAULT_HOPE_TEXT);
    setValueItems(DEFAULT_VALUE_ITEMS);
    setMessage("");
    setErrorMessage("");
  }

  return (
    <AdminShell>
      <form onSubmit={handleSubmit} className="space-y-5 pb-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.1),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="relative z-10">
            <Link
              href="/admin/pengaturan"
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-300/14 bg-black/35 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200 transition active:scale-[0.99]"
            >
              <BackIcon className="h-4 w-4" />
              Kembali
            </Link>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.32em] text-amber-300">
              Pengaturan Website
            </p>

            <h1 className="mt-2 text-2xl font-black leading-tight tracking-[-0.055em] text-white">
              Profil & Sejarah
            </h1>

            <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
              Kelola konten profil publik Khoirunnada. Informasi utama,
              kronologi, dan nilai majelis bisa diatur dalam bentuk card seperti
              tampilan publik.
            </p>

            {isLoading ? (
              <p className="mt-4 rounded-2xl border border-amber-300/12 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100">
                Memuat data profil...
              </p>
            ) : null}

            {message ? (
              <p className="mt-4 rounded-2xl border border-emerald-400/16 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100">
                {message}
              </p>
            ) : null}

            {errorMessage ? (
              <p className="mt-4 rounded-2xl border border-red-400/16 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </div>

        <SectionCard
          eyebrow="Hero"
          title="Tampilan Awal Profil"
          description="Bagian paling atas halaman profil publik."
        >
          <Field
            label="Label Hero"
            value={heroEyebrow}
            onChange={setHeroEyebrow}
          />

          <Field label="Judul Hero" value={heroTitle} onChange={setHeroTitle} />

          <TextareaField
            label="Deskripsi Hero"
            value={heroDescription}
            onChange={setHeroDescription}
            rows={4}
          />
        </SectionCard>

        <SectionCard
          eyebrow="Informasi"
          title="Card Informasi Utama"
          description="Atur card yang tampil di bagian Informasi Utama pada halaman profil publik."
        >
          <MainInfoEditor items={mainInfoItems} onChange={setMainInfoItems} />
        </SectionCard>

        <SectionCard
          eyebrow="Sejarah"
          title="Sejarah Singkat"
          description="Narasi utama sejarah berdirinya Khoirunnada."
        >
          <TextareaField
            label="Sejarah Singkat"
            value={shortHistory}
            onChange={setShortHistory}
            rows={9}
          />
        </SectionCard>

        <SectionCard
          eyebrow="Kronologi"
          title="Card Kronologi Berdirinya"
          description="Atur setiap card kronologi yang tampil di halaman profil publik. Bisa tambah card kelima dan seterusnya."
        >
          <TimelineEditor items={timelineItems} onChange={setTimelineItems} />
        </SectionCard>

        <SectionCard
          eyebrow="Doa"
          title="Harapan dan Doa"
          description="Kalimat penutup untuk halaman profil."
        >
          <TextareaField
            label="Harapan dan Doa"
            value={hopeText}
            onChange={setHopeText}
            rows={5}
          />
        </SectionCard>

        <SectionCard
          eyebrow="Nilai"
          title="Card Nilai Majelis"
          description="Atur setiap card nilai yang tampil di halaman profil publik. Bisa tambah nilai baru sesuai kebutuhan."
        >
          <ValuesEditor items={valueItems} onChange={setValueItems} />
        </SectionCard>

        <div className="sticky bottom-4 z-20 rounded-[1.7rem] border border-amber-300/14 bg-black/75 p-3 shadow-[0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <button
              type="button"
              onClick={handleResetDefault}
              disabled={isSaving}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-300 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Default
            </button>

            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200/30 bg-amber-300 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black shadow-lg shadow-amber-300/15 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <SaveIcon className="h-4 w-4" />
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </form>
    </AdminShell>
  );
}