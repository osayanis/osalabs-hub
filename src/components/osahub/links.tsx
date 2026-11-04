// OsaHUB : liens d'installation, et le petit lien « ou installe-la avec OsaHUB »
// affiché à côté de chaque bouton de téléchargement d'une app de la suite.

/** Toujours la dernière version publiée (lien stable des releases GitHub). */
export const OSAHUB_DMG = "https://github.com/osayanis/osahub/releases/latest/download/OsaHUB.dmg";
export const OSAHUB_REPO = "https://github.com/osayanis/osahub";
export const OSAHUB_RELEASES = "https://github.com/osayanis/osahub/releases";

/** Lien secondaire vers OsaHUB, à placer sous un bouton « Télécharger ». */
export function ViaHub({ label = "ou installe-la avec OsaHUB", className = "" }: { label?: string; className?: string }) {
  return (
    <p className={`text-[12px] text-white/45 flex flex-wrap items-center gap-x-1.5 gap-y-1 ${className}`}>
      <img src="/osahub/icon.png" alt="" width={16} height={16} className="w-4 h-4" />
      <a href={OSAHUB_DMG} className="font-semibold text-white/70 underline decoration-white/25 underline-offset-2 hover:text-white hover:decoration-white transition">{label}</a>
      <span className="text-white/25">·</span>
      <a href="/osahub" className="hover:text-white transition">c’est quoi ?</a>
    </p>
  );
}
