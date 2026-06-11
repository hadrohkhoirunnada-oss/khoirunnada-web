export const INITIAL_KRU_PROFILE = {
  name: "Kru Khoirunnada",
  username: "kru.khoirunnada",
  role: "Vocalis / Kru",
  status: "Anggota Aktif",
  location: "Khoirunnada Majelis Sholawat",
  avatarUrl: "/logo/khoirunnada-logo.png",
  greeting: "Assalamu'alaikum",
  note: "Data profil akan disambungkan setelah sistem login Kru/Vocalis aktif.",
};

export const KRU_ROLE_OPTIONS = [
  {
    id: "vocalis",
    label: "Vocalis",
    description: "Membawakan qosidah, sholawat, dan bacaan utama.",
  },
  {
    id: "terbang",
    label: "Pemain Terbang",
    description: "Mengiringi majelis dengan tabuhan terbang.",
  },
  {
    id: "bass",
    label: "Pemain Bass",
    description: "Menjaga ritme dasar dan hentakan hadroh.",
  },
  {
    id: "hadroh",
    label: "Kru Hadroh",
    description: "Bagian pengiring dan pendukung penampilan.",
  },
  {
    id: "multimedia",
    label: "Multimedia",
    description: "Dokumentasi, publikasi, dan kebutuhan media.",
  },
  {
    id: "perlengkapan",
    label: "Perlengkapan",
    description: "Membantu persiapan alat dan kebutuhan lapangan.",
  },
];

export const KRU_FAVORITE_SECTIONS = [
  {
    id: "qosidah",
    title: "Qosidah Favorit",
    subtitle: "Bacaan qosidah yang sering dibuka atau disimpan.",
    countLabel: "0 Bacaan",
    href: "/lirik",
  },
  {
    id: "wirid",
    title: "Wirid Favorit",
    subtitle: "Wirid pilihan untuk latihan dan amalan rutin.",
    countLabel: "0 Bacaan",
    href: "/lirik",
  },
  {
    id: "maulid",
    title: "Maulid Favorit",
    subtitle: "Bacaan maulid yang ingin disimpan anggota.",
    countLabel: "0 Bacaan",
    href: "/lirik",
  },
];

export const KRU_QUICK_MENUS = [
  {
    id: "profil",
    title: "Profil Saya",
    description: "Lihat dan lengkapi identitas anggota.",
    status: "Disiapkan",
  },
  {
    id: "role",
    title: "Role Kru",
    description: "Pilih peran seperti vocalis, terbang, bass, dan lainnya.",
    status: "Disiapkan",
  },
  {
    id: "favorit",
    title: "Bacaan Favorit",
    description: "Simpan qosidah, wirid, dan maulid favorit.",
    status: "Disiapkan",
  },
  {
    id: "catatan",
    title: "Catatan Latihan",
    description: "Catatan pribadi untuk nada, irama, atau tugas latihan.",
    status: "Segera",
  },
];

export const KRU_ACTIVITY_PREVIEW = [
  "Simpan qosidah favorit",
  "Simpan wirid favorit",
  "Atur role kru/vocalis",
  "Catat kebutuhan latihan",
];