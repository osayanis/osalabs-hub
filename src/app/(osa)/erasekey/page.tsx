import type { Metadata } from "next";
import { EraseKeyPage } from "@/components/erasekey/EraseKeyPage";

export const metadata: Metadata = {
  title: "EraseKEY — une clé USB qui efface vraiment un disque",
  description: "Une clé USB qui démarre un PC et efface complètement ses disques, en français et en cinq écrans : la clé et le système protégés, il faut taper EFFACER, relecture complète et rapport PDF. Basée sur ShredOS et nwipe, créée gratuitement avec OsaBoot.",
  openGraph: {
    title: "EraseKEY",
    description: "Un disque à donner ? Efface-le vraiment.",
    url: "https://osalabs.fr/erasekey",
    siteName: "OsaLabs",
    locale: "fr_FR",
    type: "website",
    images: ["/erasekey/og.png"],
  },
};

export default function Page() {
  return <EraseKeyPage />;
}
