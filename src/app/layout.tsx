import type { Metadata, Viewport } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osalabs.fr"),
  title: "OsaLabs — Le Hub",
  description: "OsaDrop, OsaCast, OsaParty, OsaBoard, OsaNotch et OsaWallpaper : de petits outils temps réel faits main par Yanis.",
  openGraph: {
    title: "OsaLabs",
    description: "De petits outils temps réel : fichiers, écran, musique, tableau blanc… et une encoche de Mac vivante.",
    url: "https://osalabs.fr",
    siteName: "OsaLabs",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fredoka.variable}`}>
      <body className="antialiased bg-[#1a1a1a] text-white">
        {children}
      </body>
    </html>
  );
}
