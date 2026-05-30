import "./globals.css";

export const metadata = {
  title: "Khoirunnada",
  description:
    "Website resmi Majelis Sholawat Khoirunnada. Pusat informasi, lirik qasidah, jadwal, galeri, dan booking.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}