import KruVocalisFavoritePage from "@/components/kru-vocalis/KruVocalisFavoritePage";

export const metadata = {
  title: "Wirid Favorit | Khoirunnada",
  description: "Halaman wirid favorit Kru/Vocalis Khoirunnada.",
};

export default function WiridFavoritKruVocalisPage() {
  return (
    <KruVocalisFavoritePage
      favoriteType="wirid"
      eyebrow="Favorit Kru"
      title="Wirid Favorit"
      description="Simpan dan kelola daftar wirid favorit untuk latihan, amalan rutin, dan kebutuhan majelis."
      emptyTitle="Belum Ada Wirid Favorit"
      emptyDescription="Wirid yang disimpan sebagai favorit nanti akan tampil di halaman ini."
      searchPlaceholder="Cari wirid favorit..."
      publicBrowseHref="/lirik"
      publicBrowseLabel="Cari Wirid"
    />
  );
}