"use client";

// Page d'OsaWallpaper (osalabs.fr/wallpaper), au style des apps OsaLabs (OsaDrop, OsaCast…) :
// île en haut, mascotte qui commente, boîtes en pointillés. La capture est une vraie capture de l'app.
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clapperboard, Download, Lock, Mic2, RefreshCw, ShieldCheck, SlidersHorizontal } from "lucide-react";
import Mascot, { type Mood } from "@/components/osa/Mascot";
import { Island, OsaBox, Pill, Shell, useNotices } from "@/components/osa/Kit";

export const DMG = "https://github.com/osayanis/osawallpaper/releases/latest/download/OsaWallpaper.dmg";
export const REPO = "https://github.com/osayanis/osawallpaper";
const ACCENT = "#f0876a";
const ACCENT2 = "#b06ab3";

// L'île rejoue les pastilles de l'app, comme si elles arrivaient sur ton Mac.
const PILLS: [string, string, "good" | "info"][] = [
  ["AirPods Pro · 82 %", "🎧", "good"],
  ["En charge · 64 %", "⚡", "good"],
  ["Volume · 56", "🔊", "info"],
  ["Luminosité · 72", "☀️", "info"],
];

type Zone = null | "lock" | "pills" | "install" | "download";
const SAY: Record<Exclude<Zone, null>, [string, Mood]> = {
  lock: ["Verrouille, et c’est la fête 🎶", "dance"],
  pills: ["Monte le son pour voir !", "excited"],
  install: ["Une minute, promis", "think"],
  download: ["Allez, on l’installe ?", "love"],
};

const LOCK = [
  { I: Clapperboard, t: "Pochettes animées", d: "Quand l’artiste a fait une pochette animée pour Apple Music, comme sur l’iPhone, elle devient tout ton fond d’écran." },
  { I: Lock, t: "Seulement verrouillé", d: "Le fond n’apparaît que sur l’écran verrouillé. Tu déverrouilles : ton bureau est exactement comme avant." },
  { I: Mic2, t: "Paroles synchronisées", d: "Ligne par ligne, sous l’heure, avec un lecteur en verre : favori, précédent, lecture, suivant." },
];

export function WallpaperPage() {
  const { notice, notify } = useNotices();
  const [zone, setZone] = useState<Zone>(null);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { const [text, icon, tone] = PILLS[i % PILLS.length]; notify(text, icon, tone); i++; }, 4200);
    return () => clearInterval(t);
  }, [notify]);

  const [say, mood] = zone ? SAY[zone] : ["Ton écran verrouillé, en musique !", "happy" as Mood];
  const enter = (z: Zone) => (p: { x: number; y: number } | null) => { setHover(p); setZone(p ? z : null); };

  return (
    <Shell
      app="osawallpaper" accent={ACCENT} accent2={ACCENT2}
      island={<Island title="OsaWallpaper" status="app macOS" accent={ACCENT} live notice={notice} />}
      right={<Pill href={REPO}><span className="hidden sm:inline">GitHub</span> <ArrowUpRight className="w-4 h-4" /></Pill>}
    >
      <div className="flex-1 w-full max-w-[980px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col items-center">
        <div className="relative mt-6">
          <Mascot size={120} mood={mood} say={say} holding={zone === "pills" ? null : "screen"} lookAt={hover} glow={`${ACCENT}55`} bubble="right" />
        </div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="osa-display text-center font-extrabold leading-[0.95] mt-6" style={{ fontSize: "clamp(40px, 7vw, 76px)" }}>
          Ton écran verrouillé.<br /><span className="text-white/40">En musique.</span>
        </motion.h1>
        <p className="text-white/55 text-center mt-5 max-w-[560px] text-lg">
          La pochette du morceau en cours devient ton fond d’écran, avec l’heure, les paroles et un lecteur en verre.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Pochettes animées", "Paroles synchronisées", "Mises à jour auto", "Gratuit, code public"].map((c) => (
            <span key={c} className="text-xs font-semibold text-white/60 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5 flex items-center gap-1.5">
              {c === "Gratuit, code public" && <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />}{c}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-8" onMouseEnter={() => setZone("download")} onMouseLeave={() => setZone(null)}>
          <a href={DMG} className="h-12 px-6 rounded-full bg-[#fdfcf7] text-black font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            <Download className="w-4 h-4" /> Télécharger pour Mac
          </a>
          <a href={REPO} target="_blank" rel="noreferrer" className="h-12 px-5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] font-semibold flex items-center gap-2 transition">
            Code source <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-[11px] text-white/35 mt-3">macOS 14 ou plus récent · Music ou Spotify · 1 Mo</p>

        {/* la capture, dans une boîte du notch */}
        <OsaBox accent={ACCENT} active={zone === "lock"} onHover={enter("lock")} className="w-full mt-12">
          <div className="p-2 sm:p-3">
            <img src="/wallpaper/lockscreen.jpg" alt="L’écran verrouillé avec OsaWallpaper : l’heure, la pochette, les paroles et le lecteur"
              width={1600} height={1040} className="w-full h-auto rounded-[18px] block" />
            <p className="text-center text-[11px] text-white/35 mt-3 mb-1">Capture de l’app. En bas, le fond se fond dans ton fond d’écran : ta photo et le mot de passe restent visibles.</p>
          </div>
        </OsaBox>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 w-full mt-5">
          {LOCK.map(({ I, t, d }) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("lock")}>
              <div className="p-6 h-full">
                <span className="w-11 h-11 rounded-full bg-white/[0.08] grid place-items-center"><I className="w-5 h-5" /></span>
                <p className="osa-display text-xl font-bold mt-4">{t}</p>
                <p className="text-sm text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </div>
            </OsaBox>
          ))}
        </div>

        {/* partout */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-4 sm:gap-5 w-full mt-5">
          <OsaBox accent={ACCENT} onHover={enter("pills")} active={zone === "pills"}>
            <div className="p-7 h-full flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Partout</p>
              <p className="osa-display text-3xl font-extrabold mt-3 leading-tight">Des pastilles,<br /><span className="text-white/40">pas des fenêtres.</span></p>
              <p className="text-sm text-white/50 mt-3 leading-relaxed">
                AirPods connectés, chargeur branché, son ou luminosité : une petite pastille noire sous la barre de menus,
                au-dessus de toutes tes apps. Elle remplace même les indicateurs de macOS.
              </p>
              <div className="mt-6 space-y-2">
                {PILLS.map(([text, icon]) => (
                  <div key={text} className="h-10 rounded-full bg-black border border-white/10 flex items-center gap-2.5 px-3 w-fit pr-5">
                    <span className="w-6 h-6 rounded-full grid place-items-center text-[13px] bg-white/[0.08]">{icon}</span>
                    <span className="text-[13px] font-semibold">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </OsaBox>
          <OsaBox accent={ACCENT} onHover={enter("install")} active={zone === "install"}>
            <div className="p-7 h-full flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Installation</p>
              <p className="osa-display text-3xl font-extrabold mt-3 leading-tight">Prêt en<br /><span className="text-white/40">une minute.</span></p>
              <ol className="mt-5 space-y-3.5">
                {[
                  ["Télécharge", "Ouvre OsaWallpaper.dmg et glisse l’app dans Applications."],
                  ["Ouvre-la", "La première fois : clic droit → Ouvrir (l’app n’est pas notarisée)."],
                  ["Verrouille", "Lance un morceau dans Music ou Spotify, puis ⌃ ⌘ Q."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-7 h-7 flex-none rounded-full bg-[#fdfcf7] text-black grid place-items-center text-sm font-bold">{i + 1}</span>
                    <div><p className="font-semibold text-[15px]">{t}</p><p className="text-sm text-white/45">{d}</p></div>
                  </li>
                ))}
              </ol>
              <div className="mt-auto pt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/45">
                <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Se met à jour tout seul</span>
                <span className="flex items-center gap-1.5"><SlidersHorizontal className="w-3.5 h-3.5" /> Tout se règle dans le menu</span>
              </div>
            </div>
          </OsaBox>
        </div>

        <OsaBox accent={ACCENT} className="w-full mt-5" onHover={enter("install")}>
          <div className="p-2 sm:p-3">
            <img src="/wallpaper/onboarding.jpg" alt="La fenêtre de bienvenue d’OsaWallpaper en trois étapes" width={1400} height={554} className="w-full h-auto rounded-[18px] block" />
            <p className="text-center text-[11px] text-white/35 mt-3 mb-1">Au premier lancement, une fenêtre te guide pour l’unique autorisation nécessaire.</p>
          </div>
        </OsaBox>

        <p className="text-[11px] text-white/30 text-center max-w-[640px] mt-10 leading-relaxed">
          L’affichage sur l’écran verrouillé et les pochettes animées reposent sur des méthodes non officielles : une future version de macOS
          ou d’Apple Music peut les casser. Les paroles viennent de LRCLIB, une base communautaire.
        </p>
      </div>
    </Shell>
  );
}
