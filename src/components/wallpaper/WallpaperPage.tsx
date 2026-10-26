"use client";

// Page de présentation d'OsaWallpaper (osalabs.fr/wallpaper).
// Les visuels sont de vraies captures de l'app (mode démo).
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BatteryCharging, CloudSun, Download, Headphones, Lock, Mic2, MonitorSmartphone, RefreshCw, ShieldCheck, Sun, Volume2 } from "lucide-react";
import { Face } from "@/components/hub/Canvas";

export const DMG = "https://github.com/osayanis/osawallpaper/releases/latest/download/OsaWallpaper.dmg";
export const REPO = "https://github.com/osayanis/osawallpaper";
const SUNSET = "#f0876a", PLUM = "#7b2d5f", NIGHT = "#2a1b4a";

/* ---------- Pastilles animées (comme dans l'app) ---------- */

type Pill = { id: string; icon: React.ReactNode; label?: string; value: number; right?: string; ring?: boolean };
const PILLS: Pill[] = [
  { id: "airpods", icon: <Headphones className="w-4 h-4" />, label: "AirPods Pro", value: 0.6, ring: true },
  { id: "charge", icon: <BatteryCharging className="w-4 h-4 text-yellow-300" />, label: "En charge", value: 0.64, right: "64 %", ring: true },
  { id: "volume", icon: <Volume2 className="w-4 h-4" />, value: 0.56 },
  { id: "brightness", icon: <Sun className="w-4 h-4 text-yellow-300" />, value: 0.72 },
];

function Ring({ v }: { v: number }) {
  const c = 2 * Math.PI * 7;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="-rotate-90 flex-none">
      <circle cx="9" cy="9" r="7" fill="none" stroke="#4ade8040" strokeWidth="3" />
      <motion.circle cx="9" cy="9" r="7" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - v) }} transition={{ duration: 0.9, delay: 0.15 }} />
    </svg>
  );
}

function PillView({ p }: { p: Pill }) {
  return (
    <div className="w-[236px] h-10 rounded-full bg-black flex items-center gap-2.5 pl-3.5 pr-2.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] text-white">
      <span className="w-[22px] grid place-items-center">{p.icon}</span>
      {p.label ? (
        <>
          <span className="text-[12.5px] font-semibold truncate">{p.label}</span>
          <span className="ml-auto" />
          {p.right ? <span className="text-[12.5px] font-semibold tabular-nums text-green-400">{p.right}</span>
            : <span className="w-[38px] h-1 rounded-full bg-white/20 overflow-hidden"><span className="block h-full bg-white rounded-full" style={{ width: `${p.value * 100}%` }} /></span>}
          {p.ring && <Ring v={p.value} />}
        </>
      ) : (
        <>
          <span className="flex-1 h-[5px] rounded-full bg-white/20 overflow-hidden">
            <motion.span className="block h-full bg-white rounded-full" initial={{ width: "20%" }} animate={{ width: `${p.value * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 22 }} />
          </span>
          <span className="w-[26px] text-right text-[12px] font-semibold tabular-nums text-white/70">{Math.round(p.value * 100)}</span>
        </>
      )}
    </div>
  );
}

function PillDemo() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % PILLS.length), 2400); return () => clearInterval(t); }, []);
  return (
    <div className="relative h-14 flex justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div key={PILLS[i].id} className="absolute top-0"
          initial={{ y: -24, scale: 0.6, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}>
          <PillView p={PILLS[i]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Page ---------- */

const FEATURES = [
  { icon: Lock, title: "Seulement verrouillé", desc: "Le fond n’apparaît que sur l’écran verrouillé. Dès que tu déverrouilles, ton bureau est exactement comme avant.", c: SUNSET },
  { icon: Mic2, title: "Paroles synchronisées", desc: "Ligne par ligne, sous la pochette. L’app ne se réveille qu’au début de chaque ligne.", c: "#f9a8d4" },
  { icon: CloudSun, title: "Météo", desc: "La température et le ciel sur l’écran verrouillé et dans la barre de menus. Sans compte, sans clé.", c: "#7cc4ff" },
  { icon: MonitorSmartphone, title: "Tous tes écrans", desc: "Écran du Mac et écrans externes, chacun avec sa pochette.", c: "#b7a5ff" },
  { icon: RefreshCw, title: "Se met à jour tout seul", desc: "Une nouvelle version ? L’app te la propose, vérifie sa signature et se relance.", c: "#5eead4" },
  { icon: ShieldCheck, title: "Rien ne sort de ton Mac", desc: "Pas de caméra, pas de micro, pas de localisation précise. Une seule autorisation : lire ton lecteur de musique.", c: "#4ade80" },
];

const STEPS = [
  { n: "1", t: "Télécharge", d: "Ouvre OsaWallpaper.dmg et glisse l’app dans Applications." },
  { n: "2", t: "Ouvre-la", d: "Première fois : clic droit → Ouvrir (l’app n’est pas notarisée par Apple)." },
  { n: "3", t: "Verrouille", d: "Lance un morceau dans Music ou Spotify, puis ⌃ ⌘ Q." },
];

export function WallpaperPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#141016]">
      {/* lueurs aux couleurs de la pochette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] opacity-60"
        style={{ background: `radial-gradient(600px 380px at 20% 10%, ${SUNSET}55, transparent 70%), radial-gradient(700px 420px at 85% 30%, ${PLUM}88, transparent 70%), radial-gradient(800px 500px at 50% 80%, ${NIGHT}, transparent 70%)` }} />

      <nav className="relative z-20 flex justify-between items-center px-5 sm:px-10 py-5">
        <a href="/" className="flex items-center gap-2.5 font-display font-semibold text-lg tracking-tight group">
          <ArrowLeft className="w-4 h-4 text-white/40 group-hover:-translate-x-0.5 transition" /> <Face size={24} /> OsaLabs
        </a>
        <a href={REPO} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-white/60 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 hover:text-white transition inline-flex items-center gap-1.5">
          GitHub <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </nav>

      {/* HÉROS */}
      <header className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 text-center">
        <motion.img src="/wallpaper/icon.png" alt="" width={112} height={112}
          className="mx-auto w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_20px_40px_rgba(240,135,106,0.35)]"
          initial={{ y: 16, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="font-display text-xs font-semibold uppercase tracking-[0.18em] mt-6" style={{ color: SUNSET }}>
          App macOS · gratuite · open source
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 14, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display font-bold tracking-tight text-4xl sm:text-6xl leading-[1.05] mt-4">
          Ton écran verrouillé prend<br className="hidden sm:block" /> les couleurs de ta musique.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="text-white/55 text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
          Quand ton Mac est verrouillé et qu’un morceau joue, sa pochette devient le fond : l’heure en grand, un lecteur en verre et les paroles.
          Et partout ailleurs, tes AirPods, ta charge, le volume et la luminosité, en un coup d’œil.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex flex-wrap justify-center gap-3 mt-8">
          <a href={DMG} className="font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            <Download className="w-4 h-4" /> Télécharger pour Mac
          </a>
          <a href={REPO} target="_blank" rel="noopener noreferrer"
            className="font-display font-semibold text-white/80 bg-white/[0.06] border border-white/10 px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition">
            Code source <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
        <p className="text-xs text-white/30 mt-4">macOS 14 ou plus récent · Music ou Spotify · environ 1 Mo</p>
      </header>

      {/* CAPTURE */}
      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mt-14">
        <div className="relative rounded-[22px] sm:rounded-[28px] p-1.5 sm:p-2 bg-gradient-to-b from-white/20 to-white/[0.04] shadow-[0_60px_120px_-40px_rgba(123,45,95,0.9)]">
          <img src="/wallpaper/lockscreen.jpg" alt="L’écran verrouillé avec OsaWallpaper : l’heure, la pochette, les paroles et le lecteur" width={1600} height={1040}
            className="w-full h-auto rounded-[16px] sm:rounded-[22px] block" />
        </div>
        <p className="text-center text-xs text-white/35 mt-4">
          Capture de l’app en mode démo. En bas, le fond se fond dans ton fond d’écran : ta photo et le mot de passe restent visibles.
        </p>
      </motion.section>

      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 pb-20 space-y-24 mt-24">
        {/* PARTOUT */}
        <section className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40">Partout, tout le temps</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">De petites pastilles, juste sous la barre de menus.</p>
            <p className="text-white/50 mt-4 leading-relaxed">
              Connecte tes AirPods, branche le chargeur, monte le son ou la luminosité : une pastille apparaît en haut de l’écran où se trouve ta souris,
              au-dessus de toutes tes apps, même en plein écran.
            </p>
          </div>
          <div className="relative rounded-[32px] border border-white/10 overflow-hidden p-8 sm:p-10"
            style={{ background: `radial-gradient(circle at 30% 0%, ${SUNSET}44, transparent 60%), radial-gradient(circle at 90% 100%, ${PLUM}aa, transparent 60%), #1b1320` }}>
            <div className="h-6 -mx-8 sm:-mx-10 -mt-8 sm:-mt-10 mb-8 bg-black/25 backdrop-blur flex items-center justify-between px-5 text-[10px] font-semibold text-white/70">
              <span>Finder</span><span>lun. 10:27</span>
            </div>
            <PillDemo />
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { I: Headphones, t: "AirPods", d: "batterie et volume" },
                { I: BatteryCharging, t: "Charge", d: "pourcentage" },
                { I: Volume2, t: "Volume", d: "et sourdine" },
                { I: Sun, t: "Luminosité", d: "touches F1 / F2" },
              ].map(({ I, t, d }) => (
                <div key={t} className="rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 flex items-center gap-3">
                  <I className="w-4 h-4 text-white/80 flex-none" />
                  <div className="min-w-0"><p className="text-sm font-semibold">{t}</p><p className="text-xs text-white/40">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FONCTIONS */}
        <section>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40">Et aussi</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {FEATURES.map(({ icon: I, title, desc, c }, i) => (
              <motion.div key={title} initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition">
                <span className="w-10 h-10 rounded-2xl grid place-items-center" style={{ background: `${c}22`, color: c }}><I className="w-5 h-5" /></span>
                <h3 className="font-display text-lg font-semibold mt-4">{title}</h3>
                <p className="text-sm text-white/45 mt-1 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INSTALLATION */}
        <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] p-6 sm:p-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40">Installation</h2>
              <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">Prêt en une minute.</p>
              <ol className="mt-6 space-y-4">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="w-8 h-8 flex-none rounded-full grid place-items-center font-display font-bold text-[#1a1a1a]" style={{ background: SUNSET }}>{s.n}</span>
                    <div><p className="font-semibold">{s.t}</p><p className="text-sm text-white/45">{s.d}</p></div>
                  </li>
                ))}
              </ol>
              <a href={DMG} className="mt-8 font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
                <Download className="w-4 h-4" /> Télécharger
              </a>
            </div>
            <figure>
              <img src="/wallpaper/onboarding.jpg" alt="La fenêtre de bienvenue d’OsaWallpaper en trois étapes" width={1400} height={554}
                className="w-full h-auto rounded-2xl border border-white/10" />
              <figcaption className="text-xs text-white/35 mt-3 text-center">Une fenêtre de bienvenue te guide pour l’unique autorisation.</figcaption>
            </figure>
          </div>
        </section>

        <p className="text-xs text-white/30 leading-relaxed max-w-2xl">
          Bon à savoir : l’affichage sur l’écran verrouillé utilise une API privée de macOS, qu’une future version du système pourrait casser.
          Les paroles viennent de LRCLIB, une base communautaire : les titres très confidentiels n’y sont pas toujours.
        </p>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-sm text-white/40">
          <a href="/" className="flex items-center gap-2.5 font-display font-semibold text-white/70 hover:text-white transition"><Face size={22} /> Un projet OsaLabs</a>
          <span>Fait main par Yanis · <a href={REPO} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a></span>
        </div>
      </footer>
    </div>
  );
}
