"use client";

// Page d'OsaHUB (osalabs.fr/osahub) : l'app Mac qui installe et met à jour toute la suite Osa.
// Les captures sont de vraies captures de la fenêtre de l'app.
import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight, Command, Cpu, Download, Globe, Keyboard, MousePointerClick, RefreshCw, ScrollText,
  ShieldCheck, Smile, Sparkles, Wifi,
} from "lucide-react";
import Mascot, { type Mood } from "@/components/osa/Mascot";
import { Island, OsaBox, Pill, Shell, useNotices } from "@/components/osa/Kit";
import { OSAHUB_DMG, OSAHUB_RELEASES, OSAHUB_REPO } from "@/components/osahub/links";

const ACCENT = "#b9bcff";   // le lilas doux de l'icône
const ACCENT2 = "#f4f4f0";  // le blanc de la mascotte

const FEATURES = [
  { I: Download, t: "Installe en un clic", d: "Coche une app : OsaHUB la télécharge depuis GitHub et la range dans Applications." },
  { I: RefreshCw, t: "Tout reste à jour", d: "Une nouvelle version ? Il te le dit, ou l’installe tout seul si tu actives la mise à jour automatique." },
  { I: Sparkles, t: "Lui aussi se met à jour", d: "Dès que sa fenêtre est fermée, sans te déranger, puis il se relance discrètement." },
  { I: Smile, t: "Une seule mascotte", d: "Dans la barre des menus. OsaWallpaper y range son menu au lieu d’ajouter une icône de plus." },
  { I: Command, t: "⌘K pour tout trouver", d: "Une app, une mise à jour, une action : tape quelques lettres, sans lâcher le clavier." },
  { I: Keyboard, t: "⌘1 à ⌘9", d: "Lance chaque app d’un raccourci, depuis la fenêtre d’OsaHUB." },
  { I: ScrollText, t: "Journal des versions", d: "Les nouveautés de chaque app, au même endroit, dès qu’elles sortent." },
  { I: Globe, t: "Les sites en ligne ?", d: "osalabs.fr, OsaDrop, OsaCast et OsaParty, vérifiés toutes les 5 minutes." },
];

const SUITE = [
  { name: "OsaNotch", icon: "/osahub/osanotch.png", d: "Ton notch devient une Dynamic Island, avec une mascotte.", href: "https://notch.osalabs.fr" },
  { name: "OsaWallpaper", icon: "/wallpaper/icon.png", d: "Ton écran verrouillé prend les couleurs de ta musique.", href: "/wallpaper" },
  { name: "OsaBoot", icon: "/boot/icon.png", d: "Une clé USB qui démarre, même Windows. Et EraseKEY.", href: "/boot" },
  { name: "OsaWeight", icon: "/osahub/osaweight.png", d: "Une balance de cuisine dans le trackpad.", href: null },
];

const WELCOME = [
  { src: "/osahub/bienvenue.webp", t: "Bienvenue", d: "La mascotte t’accueille au premier lancement." },
  { src: "/osahub/suite-osa.webp", t: "La suite", d: "Ce que font les apps, et comment elles se parlent." },
  { src: "/osahub/prepare.webp", t: "Prépare ton Mac", d: "Coche les apps à installer. Tu pourras changer d’avis." },
];

type Zone = null | "shot" | "features" | "suite" | "welcome" | "install" | "get";
const SAY: Record<Exclude<Zone, null>, [string, Mood]> = {
  shot: ["Tout est à jour, promis", "happy"],
  features: ["Je m’occupe de tout", "work"],
  suite: ["Je les installe pour toi", "excited"],
  welcome: ["Je t’explique tout au début", "wow"],
  install: ["Clic droit, Ouvrir, et c’est parti", "think"],
  get: ["On installe la suite ?", "love"],
};

export function OsaHubPage() {
  const { notice, notify } = useNotices();
  const [zone, setZone] = useState<Zone>(null);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const lines: [string, string][] = [["OsaNotch 1.0.8 installée", "⬇️"], ["OsaWallpaper est à jour", "✅"], ["OsaBoot · nouvelle version", "✨"], ["Tout est à jour", "😊"]];
    let i = 0;
    const t = setInterval(() => { const [text, icon] = lines[i % lines.length]; notify(text, icon, "good"); i++; }, 4200);
    return () => clearInterval(t);
  }, [notify]);

  const [say, mood] = zone ? SAY[zone] : ["Toute la suite, dans une seule app !", "happy" as Mood];
  const enter = (z: Zone) => (p: { x: number; y: number } | null) => { setHover(p); setZone(p ? z : null); };
  const zoneProps = (z: Zone) => ({ onMouseEnter: () => setZone(z), onMouseLeave: () => setZone(null) });

  return (
    <Shell
      app="osahub" accent={ACCENT} accent2={ACCENT2}
      island={<Island title="OsaHUB" status="app macOS" accent={ACCENT} live notice={notice} />}
      right={<Pill href={OSAHUB_REPO}><span className="hidden sm:inline">GitHub</span> <ArrowUpRight className="w-4 h-4" /></Pill>}
    >
      <div className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col items-center">
        {/* ───────── Accroche ───────── */}
        <div className="relative mt-4">
          <Mascot size={104} mood={mood} say={say} lookAt={hover} glow={`${ACCENT}55`} bubble="right" />
        </div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="osa-display text-center font-extrabold leading-[0.95] mt-6" style={{ fontSize: "clamp(40px, 7.4vw, 84px)" }}>
          Toute la suite Osa,<br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, #ffffff, ${ACCENT} 55%, #f9a8d4)` }}>en une seule app.</span>
        </motion.h1>
        <p className="text-white/60 text-center mt-5 max-w-[640px] text-lg leading-relaxed">
          OsaHUB installe <b className="text-white/85 font-semibold">OsaNotch, OsaWallpaper et OsaBoot</b> en un clic, les garde à jour et se met à jour tout seul.
          Une seule mascotte dans ta barre des menus.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-7" {...zoneProps("get")}>
          <a href={OSAHUB_DMG} className="h-14 px-7 rounded-full bg-[#fdfcf7] text-black text-[17px] font-bold flex items-center gap-2.5 hover:scale-[1.03] active:scale-95 transition shadow-[0_10px_40px_-10px_rgba(185,188,255,0.8)]">
            <Download className="w-5 h-5" /> Télécharger OsaHUB
          </a>
          <a href={OSAHUB_REPO} target="_blank" rel="noreferrer" className="h-14 px-5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] font-semibold flex items-center gap-2 transition">
            Code source <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-[11px] text-white/35 mt-3 flex items-center gap-1.5 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Gratuit, code public · Mac Apple Silicon · macOS 14 ou plus récent · toujours la dernière version
        </p>
        <p className="text-[11px] text-white/30 mt-1 text-center">Première ouverture : si macOS bloque l’app, fais clic droit sur OsaHUB → Ouvrir.</p>

        {/* ───────── Capture ───────── */}
        <div className="w-full mt-12" {...zoneProps("shot")}>
          <Tilt>
            <div className="relative w-full max-w-[960px] mx-auto">
              <div className="absolute inset-[12%] rounded-full blur-3xl opacity-40" style={{ background: `radial-gradient(circle, ${ACCENT}66, transparent 70%)` }} />
              <img src="/osahub/accueil.webp" alt="OsaHUB : « Bonjour, tout est à jour », le lancement rapide des apps et leurs fiches" width={1600} height={1126}
                className="relative w-full h-auto block drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
            </div>
          </Tilt>
          <p className="text-[11px] text-white/30 mt-3 text-center">Vraie capture de l’app.</p>
        </div>

        {/* ───────── Ce qu'il fait ───────── */}
        <Section kicker="Ce qu’il fait" title={<>Installer, mettre à jour,<br /><span className="text-white/40">et c’est tout.</span></>}
          intro="Tu n’as plus à chercher les liens de téléchargement, ni à vérifier si une app a une nouvelle version." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">
          {FEATURES.map(({ I, t, d }) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("features")}>
              <div className="p-5 h-full">
                <span className="w-10 h-10 rounded-full bg-white/[0.08] grid place-items-center"><I className="w-5 h-5" /></span>
                <p className="osa-display text-lg font-bold mt-3.5 leading-tight">{t}</p>
                <p className="text-[13px] text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </div>
            </OsaBox>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 w-full mt-5">
          <OsaBox accent={ACCENT} onHover={enter("features")}>
            <div className="p-2 sm:p-3 h-full flex flex-col">
              <img src="/osahub/fiche.webp" alt="La fiche d’OsaNotch dans OsaHUB : version installée, Ouvrir, Quitter, Relancer et mise à jour automatique" width={1600} height={1126} loading="lazy" className="w-full h-auto block" />
              <p className="text-sm text-white/50 px-3 pt-3 pb-1 leading-relaxed"><b className="text-white/80">Une fiche par app.</b> Ouvrir, quitter, relancer, et la mise à jour automatique app par app.</p>
            </div>
          </OsaBox>
          <OsaBox accent={ACCENT} onHover={enter("features")}>
            <div className="p-2 sm:p-3 h-full flex flex-col">
              <div className="flex-1 grid place-items-center">
                <img src="/osahub/suite.webp" alt="Le journal de la suite, une astuce et l’état des sites OsaLabs dans OsaHUB" width={1600} height={711} loading="lazy" className="w-full h-auto block" />
              </div>
              <p className="text-sm text-white/50 px-3 pt-3 pb-1 leading-relaxed"><b className="text-white/80">Le journal de la suite.</b> Les dernières versions, une astuce, et l’état des sites OsaLabs.</p>
            </div>
          </OsaBox>
        </div>

        {/* ───────── Les apps ───────── */}
        <Section kicker="Les apps qu’il installe" title={<>Quatre apps Mac,<br /><span className="text-white/40">un seul endroit.</span></>}
          intro="Chaque app reste une vraie app, que tu peux aussi télécharger seule. OsaHUB te fait juste gagner du temps." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">
          {SUITE.map(({ name, icon, d, href }) => {
            const body = (
              <div className="p-5 h-full flex flex-col">
                <img src={icon} alt="" width={56} height={56} className="w-14 h-14" />
                <p className="osa-display text-xl font-bold mt-3 flex items-center gap-1.5">
                  {name}
                  {href ? <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition" /> : <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/60">Bientôt</span>}
                </p>
                <p className="text-[13px] text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </div>
            );
            return (
              <OsaBox key={name} accent={ACCENT} onHover={enter("suite")}>
                {href ? <a href={href} className="block h-full">{body}</a> : body}
              </OsaBox>
            );
          })}
        </div>

        {/* ───────── Premier lancement ───────── */}
        <Section kicker="Premier lancement" title={<>Nouveau ?<br /><span className="text-white/40">Il t’accueille.</span></>}
          intro="Trois écrans pour découvrir la suite et choisir tes apps. Ensuite, OsaHUB s’occupe du reste." />
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 w-full mt-8">
          {WELCOME.map(({ src, t, d }, i) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("welcome")} active={zone === "welcome"}>
              <div className="p-2 sm:p-3 h-full flex flex-col">
                <img src={src} alt={`Écran d’accueil d’OsaHUB : ${t}`} width={1600} height={1126} loading="lazy" className="w-full h-auto block" />
                <div className="px-3 pt-3 pb-2 flex gap-3">
                  <span className="w-7 h-7 flex-none rounded-full bg-[#fdfcf7] text-black grid place-items-center text-sm font-bold">{i + 1}</span>
                  <div><p className="font-semibold text-[15px]">{t}</p><p className="text-sm text-white/45">{d}</p></div>
                </div>
              </div>
            </OsaBox>
          ))}
        </div>

        {/* ───────── Installation + prérequis ───────── */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 w-full mt-20">
          <OsaBox accent={ACCENT} onHover={enter("install")} active={zone === "install"}>
            <div className="p-7 h-full flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Installation</p>
              <p className="osa-display text-3xl font-extrabold mt-3 leading-tight">Prêt en<br /><span className="text-white/40">une minute.</span></p>
              <ol className="mt-5 space-y-3.5">
                {[
                  ["Télécharge", "Ouvre OsaHUB.dmg et glisse l’app dans Applications."],
                  ["Ouvre-la", "Si macOS bloque la première ouverture : clic droit sur OsaHUB → Ouvrir. L’app est signée, mais pas encore notarisée par Apple."],
                  ["Coche tes apps", "L’écran d’accueil te propose la suite. Tu pourras en ajouter ou en retirer quand tu veux."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-7 h-7 flex-none rounded-full bg-[#fdfcf7] text-black grid place-items-center text-sm font-bold">{i + 1}</span>
                    <div><p className="font-semibold text-[15px]">{t}</p><p className="text-sm text-white/45">{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </OsaBox>
          <OsaBox accent={ACCENT} onHover={enter("install")} active={zone === "install"}>
            <div className="p-7 h-full flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Ce qu’il te faut</p>
              <p className="osa-display text-3xl font-extrabold mt-3 leading-tight">Un Mac récent,<br /><span className="text-white/40">c’est tout.</span></p>
              <ul className="mt-5 space-y-3.5">
                {[
                  { I: Cpu, t: "Un Mac Apple Silicon", d: "Puce M1 ou plus récente." },
                  { I: MousePointerClick, t: "macOS 14 Sonoma ou plus récent", d: "Comme toutes les apps de la suite." },
                  { I: Wifi, t: "Une connexion internet", d: "Les apps sont téléchargées depuis leurs pages GitHub." },
                ].map(({ I, t, d }) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-7 h-7 flex-none rounded-full bg-white/[0.08] grid place-items-center"><I className="w-4 h-4" /></span>
                    <div><p className="font-semibold text-[15px]">{t}</p><p className="text-sm text-white/45">{d}</p></div>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-xs text-white/45">Gratuit, sans compte, code source public.</p>
            </div>
          </OsaBox>
        </div>

        {/* ───────── Dernier appel ───────── */}
        <div className="w-full mt-16 rounded-[36px] overflow-hidden relative border border-white/10" {...zoneProps("get")}
          style={{ background: `radial-gradient(circle at 15% 100%, ${ACCENT}44, transparent 55%), radial-gradient(circle at 90% 0%, #f9a8d433, transparent 50%), #111114` }}>
          <div className="relative px-6 py-16 sm:py-20 flex flex-col items-center text-center">
            <img src="/osahub/icon.png" alt="" width={96} height={96} className="w-24 h-24" />
            <p className="osa-display font-extrabold leading-[0.95] mt-5" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Une app pour<br />les installer toutes.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <a href={OSAHUB_DMG} className="h-14 px-7 rounded-full bg-[#fdfcf7] text-black text-[17px] font-bold flex items-center gap-2.5 hover:scale-[1.03] active:scale-95 transition">
                <Download className="w-5 h-5" /> Télécharger OsaHUB
              </a>
              <a href={OSAHUB_RELEASES} target="_blank" rel="noreferrer" className="h-14 px-5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] font-semibold flex items-center gap-2 transition">
                Toutes les versions <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-white/50 mt-3">Gratuit · Mac Apple Silicon · macOS 14 ou plus récent · le lien donne toujours la dernière version</p>
            <p className="text-[11px] text-white/35 mt-1">Si macOS bloque la première ouverture : clic droit sur OsaHUB → Ouvrir.</p>
          </div>
        </div>

        <p className="text-[11px] text-white/30 text-center max-w-[720px] mt-10 leading-relaxed">
          OsaHUB télécharge les apps depuis leurs versions publiées sur GitHub. OsaWeight arrive bientôt dans la suite.
          Captures : la vraie fenêtre de l’app.
        </p>
      </div>
    </Shell>
  );
}

function Section({ kicker, title, intro }: { kicker: string; title: ReactNode; intro: string }) {
  return (
    <div className="text-center mt-24 max-w-[640px]">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{kicker}</p>
      <h2 className="osa-display font-extrabold leading-[0.98] mt-3" style={{ fontSize: "clamp(32px, 5vw, 54px)" }}>{title}</h2>
      <p className="text-white/55 mt-4 leading-relaxed">{intro}</p>
    </div>
  );
}

/** Incline doucement son contenu vers la souris. */
function Tilt({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 18 });
  return (
    <div className="w-full" style={{ perspective: 1400 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={{ rotateX: rx, rotateY: ry }}>{children}</motion.div>
    </div>
  );
}
