import KruVocalisFavoritePage from "@/components/kru-vocalis/KruVocalisFavoritePage";

export const metadata = {
  title: "Qosidah Favorit | Khoirunnada",
  description: "Halaman qosidah favorit Kru/Vocalis Khoirunnada.",
};

export default function QosidahFavoritKruVocalisPage() {
  return (
    <KruVocalisFavoritePage
      favoriteType="qosidah"
      eyebrow="Favorit Kru"
      title="Qosidah Favorit"
      description="Simpan dan kelola daftar qosidah favorit yang sering dibuka saat latihan maupun majelis."
      emptyTitle="Belum Ada Qosidah Favorit"
      emptyDescription="Qosidah yang disimpan sebagai favorit nanti akan tampil di halaman ini."
      searchPlaceholder="Cari qosidah favorit..."
      publicBrowseHref="/lirik"
      publicBrowseLabel="Cari Qosidah"
    />
  );
}