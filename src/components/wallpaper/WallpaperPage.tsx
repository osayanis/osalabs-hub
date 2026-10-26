"use client";

// Page d'OsaWallpaper (osalabs.fr/wallpaper), au style des apps OsaLabs (OsaDrop, OsaCast…).
// Les grandes images sont de vraies captures de l'app (mode démo, photos libres de droits CC0) ;
// la section « Essaie » est un aperçu interactif fait en HTML avec les mêmes photos.
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight, Clapperboard, Download, Film, Image as ImageIcon, Link2, Lock, Mic2, Music2,
  Play, RefreshCw, ShieldCheck, SlidersHorizontal, Sparkles, User, Volume2,
} from "lucide-react";
import Mascot, { type Mood } from "@/components/osa/Mascot";
import { Island, OsaBox, Pill, Shell, useNotices } from "@/components/osa/Kit";

export const DMG = "https://github.com/osayanis/osawallpaper/releases/latest/download/OsaWallpaper.dmg";
export const REPO = "https://github.com/osayanis/osawallpaper";
const ACCENT = "#f0876a";
const ACCENT2 = "#b06ab3";

// Vraies captures de l'écran verrouillé (une fenêtre de l'app, posée sur un écran de connexion macOS)
const SHOTS = [
  { id: "music", label: "Ta musique", icon: Music2, src: "/wallpaper/shots/lock-music.jpg",
    text: "La pochette devient le fond, avec l’heure, les paroles et un lecteur en verre." },
  { id: "photo", label: "Ta photo", icon: ImageIcon, src: "/wallpaper/shots/lock-photo.jpg",
    text: "Sans musique : ta photo, l’heure, la date, la météo et la batterie." },
  { id: "both", label: "Les deux", icon: Sparkles, src: "/wallpaper/shots/lock-both.jpg",
    text: "Ton fond reste, le lecteur et les paroles viennent par-dessus." },
] as const;

const PILLS = ["airpods", "charge", "volume", "brightness"] as const;
const PILL_TEXT: Record<(typeof PILLS)[number], [string, string]> = {
  airpods: ["AirPods Pro · 82 %", "🎧"], charge: ["En charge · 64 %", "⚡"],
  volume: ["Volume · 56", "🔊"], brightness: ["Luminosité · 72", "☀️"],
};

// Photos d'exemple : CC0 (Unsplash, via Wikimedia Commons)
const PHOTOS = [
  { slug: "lofoten", name: "Aurore boréale, Lofoten", by: "Johannes Groll" },
  { slug: "matterhorn", name: "Cervin au crépuscule", by: "Sam Ferrara" },
  { slug: "milkyway", name: "Voie lactée, Colorado", by: "Nathan Anderson" },
  { slug: "lake", name: "Lac de montagne", by: "Greg Shield" },
  { slug: "namib", name: "Désert du Namib", by: "Keith Hardy" },
  { slug: "canyon", name: "Antelope Canyon", by: "Joe Gardner" },
  { slug: "bay", name: "Baie sur l’océan", by: "Chor Hung Tsang" },
  { slug: "frozen", name: "Forêt givrée", by: "invisiblepower" },
  { slug: "mistforest", name: "Forêt dans la brume", by: "Jon Flobrant" },
];

const SOURCES = [
  { I: ImageIcon, t: "Des milliers de photos HD", d: "Souvent en 4K, chacune avec son nom et son photographe. Cherche en français : « montagne enneigée », « Tokyo », « aurore boréale »." },
  { I: Film, t: "Les vidéos d’Apple", d: "Les vues aériennes de l’Apple TV : la Terre depuis l’espace, les villes, les fonds marins. En boucle, sans le son." },
  { I: Play, t: "Une vidéo YouTube", d: "Colle un lien : elle est lue en direct par le lecteur officiel, en sourdine, seulement quand ton Mac est verrouillé." },
  { I: Link2, t: "Tes fichiers, tes liens", d: "Une image ou une vidéo de ton Mac (glisser-déposer) ou un lien direct .mp4, .jpg, .png." },
];

const FEATURES = [
  { I: Clapperboard, t: "Pochettes animées", d: "Quand l’artiste a fait une pochette animée pour Apple Music, comme sur l’iPhone, elle remplit tout l’écran." },
  { I: Mic2, t: "Paroles synchronisées", d: "Ligne par ligne, sous l’heure. Favori, précédent, lecture et suivant d’un clic, sans déverrouiller." },
  { I: Lock, t: "Seulement verrouillé", d: "Tu déverrouilles : ton bureau est exactement comme avant. Rien ne tourne en fond, la vidéo est mise en pause." },
  { I: Volume2, t: "Fini les indicateurs gris", d: "Son et luminosité : les gros carrés de macOS laissent place à une pastille discrète sous la barre de menus." },
];

type Zone = null | "lock" | "gallery" | "try" | "pills" | "install" | "download";
const SAY: Record<Exclude<Zone, null>, [string, Mood]> = {
  lock: ["Verrouille, et c’est la fête 🎶", "dance"],
  gallery: ["J’hésite entre les dunes et l’aurore…", "think"],
  try: ["Clique sur une photo !", "excited"],
  pills: ["Monte le son pour voir !", "excited"],
  install: ["Une minute, promis", "think"],
  download: ["Allez, on l’installe ?", "love"],
};

export function WallpaperPage() {
  const { notice, notify } = useNotices();
  const [zone, setZone] = useState<Zone>(null);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { const [text, icon] = PILL_TEXT[PILLS[i % PILLS.length]]; notify(text, icon, "good"); i++; }, 4600);
    return () => clearInterval(t);
  }, [notify]);

  const [say, mood] = zone ? SAY[zone] : ["Ton écran verrouillé, enfin à toi !", "happy" as Mood];
  const enter = (z: Zone) => (p: { x: number; y: number } | null) => { setHover(p); setZone(p ? z : null); };

  return (
    <Shell
      app="osawallpaper" accent={ACCENT} accent2={ACCENT2}
      island={<Island title="OsaWallpaper" status="app macOS" accent={ACCENT} live notice={notice} />}
      right={<Pill href={REPO}><span className="hidden sm:inline">GitHub</span> <ArrowUpRight className="w-4 h-4" /></Pill>}
    >
      <div className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col items-center">
        {/* ───────── Accroche ───────── */}
        <div className="relative mt-4">
          <Mascot size={104} mood={mood} say={say} holding={zone === "pills" ? null : "screen"} lookAt={hover} glow={`${ACCENT}55`} bubble="right" />
        </div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="osa-display text-center font-extrabold leading-[0.95] mt-6" style={{ fontSize: "clamp(40px, 7.4vw, 84px)" }}>
          Ton écran verrouillé,<br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, #f5c26b 45%, ${ACCENT2})` }}>enfin à toi.</span>
        </motion.h1>
        <p className="text-white/60 text-center mt-5 max-w-[600px] text-lg leading-relaxed">
          La pochette du morceau en cours, une photo 4K, une vidéo YouTube ou les vues aériennes d’Apple : ton Mac verrouillé devient beau.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-7" onMouseEnter={() => setZone("download")} onMouseLeave={() => setZone(null)}>
          <a href={DMG} className="h-12 px-6 rounded-full bg-[#fdfcf7] text-black font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition shadow-[0_10px_40px_-10px_rgba(240,135,106,0.8)]">
            <Download className="w-4 h-4" /> Télécharger pour Mac
          </a>
          <a href={REPO} target="_blank" rel="noreferrer" className="h-12 px-5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] font-semibold flex items-center gap-2 transition">
            Code source <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-[11px] text-white/35 mt-3 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Gratuit, code public · macOS 14 ou plus récent · Music ou Spotify
        </p>

        <div className="w-full mt-12" onMouseEnter={() => setZone("lock")} onMouseLeave={() => setZone(null)}>
          <HeroShots />
        </div>

        {/* ───────── Galerie ───────── */}
        <Section kicker="Nouveau · la galerie" title={<>Choisis ton fond.<br /><span className="text-white/40">Parmi des milliers.</span></>}
          intro="Une fenêtre pour tout trouver, avec l’aperçu de ton écran verrouillé à côté. Double-clic : c’est en place." />
        <OsaBox accent={ACCENT} active={zone === "gallery"} onHover={enter("gallery")} className="w-full mt-8">
          <div className="p-2 sm:p-3">
            <Tilt>
              <Window src="/wallpaper/shots/gallery.jpg" alt="La fenêtre « Fonds d’écran » d’OsaWallpaper : une grille de photos nommées et l’aperçu de l’écran verrouillé" />
            </Tilt>
            <p className="text-center text-[11px] text-white/35 mt-3 mb-1">Capture de l’app (photos d’exemple libres de droits).</p>
          </div>
        </OsaBox>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5">
          {SOURCES.map(({ I, t, d }) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("gallery")}>
              <div className="p-5 h-full">
                <span className="w-10 h-10 rounded-full grid place-items-center" style={{ background: `${ACCENT}22`, color: ACCENT }}><I className="w-5 h-5" /></span>
                <p className="osa-display text-lg font-bold mt-3.5 leading-tight">{t}</p>
                <p className="text-[13px] text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </div>
            </OsaBox>
          ))}
        </div>

        {/* ───────── Essaie ───────── */}
        <Section kicker="Essaie" title={<>À toi de jouer.<br /><span className="text-white/40">Clique sur une photo.</span></>}
          intro="Un aperçu dans ton navigateur, avec l’heure qu’il est chez toi. Sur ton Mac, c’est exactement ça, en plein écran." />
        <div className="w-full mt-8" onMouseEnter={() => setZone("try")} onMouseLeave={() => setZone(null)}>
          <TryIt />
        </div>

        {/* ───────── Ce que ça fait ───────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-20">
          {FEATURES.map(({ I, t, d }) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("lock")}>
              <div className="p-5 h-full">
                <span className="w-10 h-10 rounded-full bg-white/[0.08] grid place-items-center"><I className="w-5 h-5" /></span>
                <p className="osa-display text-lg font-bold mt-3.5">{t}</p>
                <p className="text-[13px] text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </div>
            </OsaBox>
          ))}
        </div>

        {/* ───────── Partout + installation ───────── */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 w-full mt-5">
          <OsaBox accent={ACCENT} onHover={enter("pills")} active={zone === "pills"}>
            <div className="p-7 h-full flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Partout, tout le temps</p>
              <p className="osa-display text-3xl font-extrabold mt-3 leading-tight">Des pastilles,<br /><span className="text-white/40">pas des fenêtres.</span></p>
              <p className="text-sm text-white/50 mt-3 leading-relaxed">
                AirPods connectés, chargeur branché, son ou luminosité : une petite pastille sous la barre de menus, au-dessus de toutes tes apps.
              </p>
              <PillStack />
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
                  ["Choisis ton fond", "Menu OsaWallpaper → Choisir un fond d’écran… puis verrouille avec ⌃ ⌘ Q."],
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
            <img src="/wallpaper/shots/onboarding.png" alt="La fenêtre de bienvenue d’OsaWallpaper en trois étapes" width={1668} height={628} loading="lazy" className="w-full h-auto block px-2 pt-3" />
            <p className="text-center text-[11px] text-white/35 mt-3 mb-1">Au premier lancement, une fenêtre te guide pour l’unique autorisation nécessaire.</p>
          </div>
        </OsaBox>

        {/* ───────── Dernier appel ───────── */}
        <div className="w-full mt-16 rounded-[36px] overflow-hidden relative border border-white/10" onMouseEnter={() => setZone("download")} onMouseLeave={() => setZone(null)}>
          <img src="/wallpaper/photos/matterhorn.jpg" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          <div className="relative px-6 py-16 sm:py-20 flex flex-col items-center text-center">
            <p className="osa-display font-extrabold leading-[0.95]" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Verrouille ton Mac.<br />Il est plus beau comme ça.</p>
            <a href={DMG} className="mt-8 h-12 px-6 rounded-full bg-[#fdfcf7] text-black font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
              <Download className="w-4 h-4" /> Télécharger OsaWallpaper
            </a>
            <p className="text-[11px] text-white/50 mt-3">Gratuit · macOS 14 ou plus récent · 1 Mo</p>
          </div>
        </div>

        <p className="text-[11px] text-white/30 text-center max-w-[720px] mt-10 leading-relaxed">
          L’affichage sur l’écran verrouillé et les pochettes animées reposent sur des méthodes non officielles : une future version de macOS
          ou d’Apple Music peut les casser. Paroles : LRCLIB. Photos de l’app : Wallhaven (elles appartiennent à leurs auteurs).
          Photos d’exemple de cette page : licence CC0, Unsplash via Wikimedia Commons ({PHOTOS.map((p) => p.by).join(", ")}).
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

/** Les 3 vraies captures dans un MacBook, avec les vraies pastilles qui passent en haut. */
function HeroShots() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [pill, setPill] = useState<number | null>(null);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((v) => (v + 1) % SHOTS.length), 5200);
    return () => clearInterval(t);
  }, [auto]);
  useEffect(() => {
    let k = 0;
    const show = () => { setPill(k % PILLS.length); k++; setTimeout(() => setPill(null), 2600); };
    const first = setTimeout(show, 1800);
    const t = setInterval(show, 6400);
    return () => { clearTimeout(first); clearInterval(t); };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <MacBook>
        <AnimatePresence initial={false}>
          <motion.img key={SHOTS[i].id} src={SHOTS[i].src} alt={`OsaWallpaper sur l’écran verrouillé : ${SHOTS[i].label.toLowerCase()}`}
            initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover" />
        </AnimatePresence>
        <AnimatePresence>
          {pill !== null && (
            <motion.img key={PILLS[pill]} src={`/wallpaper/shots/pill-${PILLS[pill]}.png`} alt=""
              initial={{ opacity: 0, y: -14, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="absolute left-1/2 top-[1.2%] w-[19%] h-auto pointer-events-none z-10" style={{ x: "-50%" }} />
          )}
        </AnimatePresence>
      </MacBook>
      <div className="mt-6 flex p-1 rounded-full bg-white/[0.06] border border-white/10">
        {SHOTS.map((s, k) => (
          <button key={s.id} onClick={() => { setI(k); setAuto(false); }}
            className={`relative h-10 px-3.5 sm:px-5 rounded-full text-[13px] sm:text-sm font-semibold whitespace-nowrap flex items-center gap-2 transition-colors ${i === k ? "text-black" : "text-white/65 hover:text-white"}`}>
            {i === k && <motion.span layoutId="shot-tab" className="absolute inset-0 rounded-full bg-[#fdfcf7]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <s.icon className="relative w-4 h-4 hidden sm:block" /><span className="relative">{s.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={SHOTS[i].id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          className="text-sm text-white/50 mt-3 text-center px-4">{SHOTS[i].text}</motion.p>
      </AnimatePresence>
      <p className="text-[11px] text-white/30 mt-1">Vraies captures de l’app, sur l’écran de connexion de macOS.</p>
    </div>
  );
}

/** Un MacBook en CSS : écran 1470 × 956, encoche, charnière. */
function MacBook({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[1040px] mx-auto px-[4%]">
      <div className="relative rounded-[22px] sm:rounded-[30px] p-[1.6%] bg-gradient-to-b from-[#3a3a40] to-[#1b1b1f] shadow-[0_50px_120px_-40px_rgba(176,106,179,0.65),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative overflow-hidden rounded-[12px] sm:rounded-[16px] bg-black" style={{ aspectRatio: "1470 / 956" }}>
          {children}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[13%] h-[3.4%] bg-black rounded-b-[10px] z-20" />
        </div>
      </div>
      <div className="relative mx-auto h-[10px] sm:h-[16px] w-[108%] -ml-[4%] rounded-b-[18px] bg-gradient-to-b from-[#c9c9ce] to-[#6f6f76]">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[14%] h-[45%] rounded-b-[10px] bg-[#2a2a2e]/60" />
      </div>
    </div>
  );
}

/** Capture de fenêtre macOS, avec ombre. */
function Window({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-[16px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
      <img src={src} alt={alt} width={1620} height={1050} loading="lazy" className="w-full h-auto block" />
    </div>
  );
}

/** Incline doucement son contenu vers la souris. */
function Tilt({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), { stiffness: 120, damping: 18 });
  return (
    <div style={{ perspective: 1400 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={{ rotateX: rx, rotateY: ry }}>{children}</motion.div>
    </div>
  );
}

/** Aperçu interactif : la photo choisie, l'heure réelle, et le lecteur si « musique en cours ». */
function TryIt() {
  const [p, setP] = useState(0);
  const [music, setMusic] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 10_000); return () => clearInterval(t); }, []);
  const photo = PHOTOS[p];
  const time = now ? now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";
  const date = now ? now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "";

  return (
    <div className="grid lg:grid-cols-[1fr_290px] gap-5 items-center">
      <MacBook>
        {/* ton fond macOS habituel, visible en bas */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #2d3a8c 0%, #5b3a9e 55%, #9b4fb0 100%)" }} />
        <AnimatePresence initial={false}>
          <motion.img key={photo.slug} src={`/wallpaper/photos/${photo.slug}.jpg`} alt={photo.name}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ maskImage: "linear-gradient(to bottom, black 70%, transparent 98%)", WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 98%)" }} />
        </AnimatePresence>
        <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center text-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, system-ui, sans-serif" }}>
          <p className="mt-[5.5%] font-semibold capitalize drop-shadow" style={{ fontSize: "clamp(9px, 1.45vw, 17px)" }}>{date}</p>
          <p className="font-bold leading-none tracking-[-0.03em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.25)]" style={{ fontSize: "clamp(40px, 10.5vw, 124px)", opacity: 0.92 }}>{time}</p>
          <AnimatePresence>
            {music && (
              <motion.div initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-[21%] w-[26%] min-w-[150px] flex flex-col items-center">
                <p className="font-semibold drop-shadow mb-[6%]" style={{ fontSize: "clamp(8px, 1.15vw, 14px)" }}>Et la nuit ne finit jamais</p>
                <div className="w-full rounded-[18px] px-[6%] py-[5%] border border-white/25 bg-white/[0.12] backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <div className="flex items-center gap-[6%]">
                    <img src="/wallpaper/photos/cover.jpg" alt="" className="w-[18%] aspect-square rounded-[6px] object-cover" />
                    <div className="min-w-0 leading-tight">
                      <p className="font-semibold truncate" style={{ fontSize: "clamp(8px, 1.05vw, 13px)" }}>Nuit d’été</p>
                      <p className="text-white/60 truncate" style={{ fontSize: "clamp(7px, 0.9vw, 11px)" }}>Les Osa</p>
                    </div>
                  </div>
                  <div className="mt-[6%] h-[3px] rounded-full bg-white/25 overflow-hidden">
                    <motion.div className="h-full bg-white" initial={{ width: "30%" }} animate={{ width: "70%" }} transition={{ duration: 40, ease: "linear" }} />
                  </div>
                  <div className="mt-[5%] flex justify-around" style={{ fontSize: "clamp(9px, 1.2vw, 15px)" }}>
                    <span>♡</span><span>⏮</span><span>⏸</span><span>⏭</span><span>🔈</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* l'écran de connexion de macOS reste visible en bas */}
          <div className="absolute bottom-[5%] flex flex-col items-center">
            <div className="w-[clamp(22px,4vw,48px)] aspect-square rounded-full bg-gradient-to-b from-[#d7dae2] to-[#b9bdc8] grid place-items-center overflow-hidden">
              <User className="w-[62%] h-[62%] text-[#8a90a0] translate-y-[12%]" fill="currentColor" strokeWidth={0} />
            </div>
            <div className="mt-[8px] h-[clamp(12px,1.9vw,24px)] w-[clamp(90px,13vw,170px)] rounded-full bg-white/25 grid place-items-center text-white/70" style={{ fontSize: "clamp(6px, 0.8vw, 10px)" }}>Saisir le mot de passe</div>
          </div>
        </div>
      </MacBook>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {PHOTOS.map((ph, k) => (
            <button key={ph.slug} onClick={() => setP(k)} title={`${ph.name} — photo de ${ph.by}`}
              className={`relative rounded-xl overflow-hidden aspect-[16/10] ring-2 transition ${k === p ? "ring-white scale-[1.02]" : "ring-transparent hover:ring-white/40"}`}>
              <img src={`/wallpaper/photos/${ph.slug}-s.jpg`} alt={ph.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-4">
          <p className="font-bold">{photo.name}</p>
          <p className="text-xs text-white/45 mt-0.5">Photo de {photo.by}</p>
          <button onClick={() => setMusic((m) => !m)}
            className={`mt-4 w-full h-10 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition ${music ? "bg-[#fdfcf7] text-black" : "bg-white/[0.08] hover:bg-white/[0.12]"}`}>
            <Music2 className="w-4 h-4" /> {music ? "Musique en cours" : "Lancer un morceau"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Les vraies pastilles de l'app, qui arrivent l'une après l'autre. */
function PillStack() {
  const [n, setN] = useState(0);
  useEffect(() => { const t = setInterval(() => setN((v) => (v + 1) % (PILLS.length + 2)), 1100); return () => clearInterval(t); }, []);
  return (
    <div className="mt-6 rounded-2xl bg-gradient-to-b from-[#2b2f5c] to-[#4a2d5f] p-4 pb-5 h-[290px] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-6 bg-black/35 backdrop-blur flex items-center justify-end gap-3 px-3 text-[10px] text-white/70">
        <span>🔋</span><span>Wi-Fi</span><span>lun. 15:36</span>
      </div>
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <AnimatePresence>
          {PILLS.slice(0, Math.min(n, PILLS.length)).map((p) => (
            <motion.img key={p} src={`/wallpaper/shots/pill-${p}.png`} alt={PILL_TEXT[p][0]} layout
              initial={{ opacity: 0, y: -12, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }} className="w-[70%] max-w-[270px] h-auto" />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
