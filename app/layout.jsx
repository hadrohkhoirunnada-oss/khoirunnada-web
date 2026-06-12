import { Plus_Jakarta_Sans, Noto_Naskh_Arabic } from "next/font/google";
import AppShell from "@/components/layout/AppShell";
import PwaRegister from "@/components/shared/PwaRegister";
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
  metadataBase: new URL("https://www.khoirunnada.my.id"),
  title: "Khoirunnada",
  description:
    "Website resmi Majelis Sholawat Khoirunnada. Pusat informasi, lirik qasidah, shop, katalog, galeri, dan booking.",
  applicationName: "Khoirunnada",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo/khoirunnada-logo.png",
    shortcut: "/logo/khoirunnada-logo.png",
    apple: "/logo/khoirunnada-logo.png",
  },
  appleWebApp: {
    capable: true,
    title: "Khoirunnada",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
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
        <PwaRegister />
      </body>
    </html>
  );
}