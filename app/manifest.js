export default function manifest() {
  return {
    name: "Khoirunnada",
    short_name: "Khoirunnada",
    description:
      "Website resmi Majelis Sholawat Khoirunnada. Pusat informasi, lirik qasidah, shop, katalog, galeri, dan booking.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#02040a",
    theme_color: "#050505",
    lang: "id",
    categories: ["music", "lifestyle", "religion"],
    icons: [
      {
        src: "/logo/khoirunnada-logo.png",
        sizes: "1500x1500",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo/khoirunnada-logo.png",
        sizes: "1500x1500",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}