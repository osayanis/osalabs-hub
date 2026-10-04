import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OsaLabs - Le Hub",
  description: "L'écosystème OsaLabs par Yanis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
