import type { Metadata } from "next";
import { OsaHubPage } from "@/components/osahub/OsaHubPage";

export const metadata: Metadata = {
  title: "OsaHUB — toute la suite Osa en une seule app Mac",
  description: "OsaHUB installe OsaNotch, OsaWallpaper et OsaBoot en un clic, les garde à jour et se met à jour tout seul. Une seule mascotte dans la barre des menus, ⌘K, lancement rapide et journal des versions. Gratuit, pour Mac Apple Silicon et macOS 14.",
  openGraph: {
    title: "OsaHUB",
    description: "Toute la suite Osa, en une seule app.",
    url: "https://osalabs.fr/osahub",
    siteName: "OsaLabs",
    locale: "fr_FR",
    type: "website",
    images: ["/osahub/og.png"],
  },
};

export default function Page() {
  return <OsaHubPage />;
}
