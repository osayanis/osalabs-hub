import type { Metadata } from "next";
import { WallpaperPage } from "@/components/wallpaper/WallpaperPage";

export const metadata: Metadata = {
  title: "OsaWallpaper — ton écran verrouillé, enfin à toi",
  description: "App macOS gratuite pour l’écran verrouillé : la pochette du morceau en cours, des milliers de photos 4K, une vidéo YouTube ou les vues aériennes d’Apple, avec l’heure, le lecteur en verre et les paroles. Et partout, des pastilles AirPods, charge, volume et luminosité.",
  openGraph: {
    title: "OsaWallpaper",
    description: "Ta musique, tes photos, tes vidéos : ton écran verrouillé, enfin à toi.",
    url: "https://osalabs.fr/wallpaper",
    siteName: "OsaLabs",
    locale: "fr_FR",
    type: "website",
    images: ["/wallpaper/shots/lock-both.jpg"],
  },
};

export default function Page() {
  return <WallpaperPage />;
}
