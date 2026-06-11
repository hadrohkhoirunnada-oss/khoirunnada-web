import KruVocalisFavoritePage from "@/components/kru-vocalis/KruVocalisFavoritePage";

export const metadata = {
  title: "Maulid Favorit | Khoirunnada",
  description: "Halaman maulid favorit Kru/Vocalis Khoirunnada.",
};

export default function MaulidFavoritKruVocalisPage() {
  return (
    <KruVocalisFavoritePage
      eyebrow="Favorit Kru"
      title="Maulid Favorit"
      description="Simpan dan kelola daftar maulid favorit untuk latihan, pembacaan rutin, dan kebutuhan majelis."
      emptyTitle="Belum Ada Maulid Favorit"
      emptyDescription="Maulid yang disimpan sebagai favorit nanti akan tampil di halaman ini."
      searchPlaceholder="Cari maulid favorit..."
      publicBrowseHref="/lirik"
      publicBrowseLabel="Cari Maulid"
    />
  );
}