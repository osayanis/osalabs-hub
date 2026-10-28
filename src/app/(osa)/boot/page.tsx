import type { Metadata } from "next";
import { BootPage } from "@/components/boot/BootPage";

export const metadata: Metadata = {
  title: "OsaBoot — une clé USB qui démarre, même Windows",
  description: "App macOS gratuite pour créer une clé USB de démarrage : Linux, Raspberry Pi et outils copiés puis vérifiés (SHA-256), et une vraie clé d’installation Windows 10 / 11 depuis ton Mac (FAT32, install.wim découpé, Windows 11 sans TPM en option).",
  openGraph: {
    title: "OsaBoot",
    description: "Une image, une clé, et ça démarre. Même Windows.",
    url: "https://osalabs.fr/boot",
    siteName: "OsaLabs",
    locale: "fr_FR",
    type: "website",
    images: ["/boot/working.webp"],
  },
};

export default function Page() {
  return <BootPage />;
}
