import { Plus_Jakarta_Sans, Noto_Naskh_Arabic } from "next/font/google";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  title: "Khoirunnada",
  description:
    "Website resmi Majelis Sholawat Khoirunnada. Pusat informasi, lirik qasidah, jadwal, galeri, dan booking.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${notoNaskhArabic.variable}`}
    >
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}