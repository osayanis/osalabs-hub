import type { Metadata } from "next";
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
  title: "OsaLabs — Le Hub",
  description: "L'écosystème OsaLabs par Yanis",
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
