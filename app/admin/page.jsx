import AdminShell from "@/components/admin/AdminShell";
import AdminStatCard from "@/components/admin/AdminStatCard";

function BookingIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7.25 4.75v2.5M16.75 4.75v2.5M5.25 9.25h13.5M6.75 6h10.5a2 2 0 0 1 2 2v9.25a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LyricsIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.75 4.75h7.5a3 3 0 0 1 3 3v11.5H9.75a3 3 0 0 0-3 3V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 18.25h10.5M10 8.25h4M10 11.25h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GalleryIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5.75 5.25h12.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m4.75 16 3.5-3.25 2.25 2.1 3.75-4.1 5 5.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.75h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShopIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.75 9.25h10.5l-.75 10H7.5l-.75-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.25V7.75a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.25 9.25h13.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ADMIN_WHATSAPP_URL =
  "https://wa.me/6285173057576?text=Assalamu%27alaikum%20admin%2C%20saya%20ingin%20bertanya%20tentang%20cara%20menggunakan%20halaman%20admin%20Khoirunnada.";

const stats = [
  {
    title: "Booking",
    value: "0",
    description: "Booking masuk",
    icon: BookingIcon,
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Qasidah",
    value: "0",
    description: "Data lirik",
    icon: LyricsIcon,
    imageUrl:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Galeri",
    value: "0",
    description: "Dokumentasi",
    icon: GalleryIcon,
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Shop & Katalog",
    value: "0",
    description: "Produk katalog",
    icon: ShopIcon,
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Page() {
  return (
    <AdminShell>
      <section className="space-y-5">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 px-5 py-6 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_48%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

          <div className="relative z-10" dir="rtl" lang="ar">
            <p className="font-arabic text-[1.38rem] font-semibold leading-[2.45rem] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>

            <p className="mt-2 font-arabic text-[1.05rem] font-semibold leading-8 text-amber-300/85 drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
              أَهْلًا وَسَهْلًا
            </p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <AdminStatCard key={stat.title} {...stat} />
          ))}
        </div>

        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

          <div className="relative z-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Panduan Admin
            </p>

            <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              Gunakan panel ini dengan teliti
            </h2>

            <div className="mt-4 space-y-3 text-sm font-medium leading-7 text-slate-300">
              <p>
                Pilih menu admin melalui tombol garis tiga di bagian header untuk
                mengelola data qasidah, shop & katalog, galeri, QR booking,
                pengaturan website, dan kebutuhan admin lainnya.
              </p>

              <p>
                Setiap perubahan data yang dimasukkan akan menjadi acuan tampilan
                website, jadi pastikan judul, tanggal, lokasi, teks, dan gambar
                sudah benar sebelum disimpan.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-300/12 bg-amber-300/[0.06] px-4 py-3">
              <p className="text-xs font-bold leading-6 text-amber-100">
                Catatan: selalu periksa ulang data sebelum publikasi agar
                informasi yang tampil tetap rapi, akurat, dan tidak
                membingungkan pengunjung.
              </p>
            </div>

            <p className="mt-4 text-xs font-semibold leading-6 text-slate-400">
              Kalo Belum Faham, Silahkan{" "}
              <a
                href={ADMIN_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#f5c542" }}
                className="font-extrabold decoration-[#f5c542]/35 underline-offset-4 transition hover:opacity-90"
              >
                Hubungi Admin
              </a>
              .
            </p>
          </div>
        </section>
      </section>
    </AdminShell>
  );
}