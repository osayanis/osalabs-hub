import { Bricolage_Grotesque, Inter } from "next/font/google";

// Pages au style des apps (OsaDrop, OsaCast…) : mêmes polices, chargées seulement ici.
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-osa-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-osa-sans" });

export default function OsaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${sans.variable}`}>{children}</div>;
}
