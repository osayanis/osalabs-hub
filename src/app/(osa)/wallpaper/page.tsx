import type { Metadata } from "next";
import { WallpaperPage } from "@/components/wallpaper/WallpaperPage";

export const metadata: Metadata = {
  title: "OsaWallpaper — ton écran verrouillé aux couleurs de ta musique",
  description: "App macOS gratuite : la pochette du morceau en cours devient le fond de ton écran verrouillé, avec l’heure, le lecteur et les paroles. Et partout, des pastilles AirPods, charge, volume et luminosité.",
  openGraph: {
    title: "OsaWallpaper",
    description: "Ton écran verrouillé prend les couleurs de ta musique.",
    url: "https://osalabs.fr/wallpaper",
    siteName: "OsaLabs",
    locale: "fr_FR",
    type: "website",
    images: ["/wallpaper/lockscreen.jpg"],
  },
};

export default function Page() {
  return <WallpaperPage />;
}
