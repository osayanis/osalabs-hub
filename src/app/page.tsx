"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, ArrowUpRight, MonitorUp, PenLine, Music,
  Clock, Headphones, MessageCircle, Zap, Infinity as InfinityIcon, QrCode,
  MousePointerClick, Gauge, Globe, Users, Activity, Share2,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ---------- Composants "canvas" façon Figma ---------- */

function Frame({ color, children, className = "", style }: { color: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const handle = "absolute w-3 h-3 rounded-[3px] bg-[#1a1a1a] border-2";
  return (
    <div className={`relative inline-block ${className}`} style={style}>
      <div className="absolute inset-0 rounded-[6px] border-2 pointer-events-none" style={{ borderColor: color }} />
      <div className={handle} style={{ top: -6, left: -6, borderColor: color }} />
      <div className={handle} style={{ top: -6, right: -6, borderColor: color }} />
      <div className={handle} style={{ bottom: -6, left: -6, borderColor: color }} />
      <div className={handle} style={{ bottom: -6, right: -6, borderColor: color }} />
      {children}
    </div>
  );
}

function Cursor({ color, label, className = "", style }: { color: string; label?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute flex items-start gap-1 ${className}`} style={style}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))" }}>
        <path d="M5 3l5 15 2.5-6.5L19 9 5 3z" fill={color} stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {label && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-[#1a1a1a] font-display" style={{ background: color }}>{label}</span>}
    </div>
  );
}

function Mascot({ size = 40 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-[42%] bg-[#fdfcf7]" />
      <div className="absolute rounded-full bg-[#2a2a2a]" style={{ width: size * 0.16, height: size * 0.2, top: size * 0.36, left: size * 0.3 }} />
      <div className="absolute rounded-full bg-[#2a2a2a]" style={{ width: size * 0.16, height: size * 0.2, top: size * 0.36, left: size * 0.56 }} />
    </div>
  );
}

// Coup de crayon : trait tracé à la main, faible opacité.
function PencilStroke({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 36" fill="none" className={className} preserveAspectRatio="none" aria-hidden>
      <path d="M6 24C56 12 110 10 160 16c40 5 84 2 134-8" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity="0.5" />
      <path d="M12 30C70 22 128 26 182 22c36-3 72-6 104-14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

const float = (d: number, delay = 0) => ({
  animate: { y: [0, -9, 0] },
  transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/* ---------- Pastille "PAR YANIS" → bulle GitHub (mois en cours) ---------- */

const GH_USER = "osayanis";
const LEVELS = ["#262626", "#0e4429", "#006d32", "#26a641", "#39d353"];

function GithubBubble() {
  const [open, setOpen] = useState(false);
  const [levelByDate, setLevelByDate] = useState<Record<string, number>>({});

  useEffect(() => {
    const y = new Date().getFullYear();
    fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=${y}`)
      .then((r) => r.json())
      .then((d) => {
        const map: Record<string, number> = {};
        (d?.contributions || []).forEach((c: { date: string; level: number }) => { map[c.date] = c.level; });
        setLevelByDate(map);
      })
      .catch(() => {});
  }, []);

  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const monthName = now.toLocaleDateString("fr-FR", { month: "long" });
  const startW = new Date(y, m, 1).getDay(); // 0 = dimanche
  const lastDay = new Date(y, m + 1, 0).getDate();
  const today = now.getDate();

  const cells: ({ day: number; level: number } | null)[] = [];
  for (let i = 0; i < startW; i++) cells.push(null);
  for (let d = 1; d <= lastDay; d++) {
    const ds = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, level: d <= today ? (levelByDate[ds] ?? 0) : 0 });
  }
  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {/* Fond assombri */}
      <div className={`fixed inset-0 bg-black/80 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ zIndex: 30 }} />

      <AnimatePresence>
        {open && (
          <motion.a
            href={`https://github.com/${GH_USER}`}
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute bottom-full right-0 mb-4 z-40 block w-[272px] rounded-3xl bg-[#0d1117] border border-white/10 p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-semibold text-white capitalize">{monthName}</span>
              <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                GitHub
              </span>
            </div>
            <div className="flex gap-[3px] justify-center">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, di) => {
                    const c = week[di];
                    return <div key={di} className="w-[14px] h-[14px] rounded-[3px]" style={{ background: c ? LEVELS[c.level] : "transparent" }} title={c ? `${c.day} ${monthName}` : ""} />;
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-[11px] text-white/35">
              Moins
              {LEVELS.map((c, i) => <span key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: c }} />)}
              Plus
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      {/* La pastille */}
      <div className="relative z-40 flex items-center gap-2 font-display font-bold text-base sm:text-lg px-5 py-2.5 rounded-full bg-[#4f9dfb] text-white shadow-lg shadow-[#4f9dfb]/30 cursor-pointer">
        PAR YANIS <Mascot size={22} />
      </div>
      <Cursor color="#4f9dfb" style={{ top: -14, left: -18 }} />
    </div>
  );
}

/* ---------- Projets + fonctionnalités ---------- */

const projects = [
  { name: "OsaParty", href: "https://osaparty.osalabs.fr", logo: "/osaparty_logo.jpg", icon: Music, color: "#ec4899",
    desc: "Écoute synchronisée : lancez le même morceau, à la seconde, entre amis." },
  { name: "OsaDrop", href: "https://osadrop.osalabs.fr", icon: Rocket, color: "#3b82f6",
    desc: "Transfert de fichiers P2P via WebRTC. Aucun stockage serveur." },
  { name: "OsaCast", href: "https://osacast.osalabs.fr", icon: MonitorUp, color: "#6366f1",
    desc: "Partage d'écran instantané en P2P. Un clic, rien à installer." },
  { name: "OsaBoard", href: "https://osaboard.osalabs.fr", icon: PenLine, color: "#14b8a6",
    desc: "Tableau blanc collaboratif en temps réel, sans latence." },
];

type Feat = { icon: React.ElementType; title: string; desc: string };
const FEATURES: Record<string, Feat[]> = {
  OsaParty: [
    { icon: Clock, title: "À la seconde", desc: "Lecture alignée pour tout le monde." },
    { icon: Headphones, title: "Spotify & Apple Music", desc: "Ton app, ton compte." },
    { icon: MessageCircle, title: "Chat & réactions", desc: "L'ambiance en direct." },
  ],
  OsaDrop: [
    { icon: Zap, title: "P2P WebRTC", desc: "Direct, sans serveur." },
    { icon: InfinityIcon, title: "Taille illimitée", desc: "Envoi par morceaux." },
    { icon: QrCode, title: "Code ou QR", desc: "Partage en 2 secondes." },
  ],
  OsaCast: [
    { icon: MousePointerClick, title: "Écran en 1 clic", desc: "Capture native." },
    { icon: Gauge, title: "Latence minime", desc: "Flux pair-à-pair." },
    { icon: Globe, title: "Zéro install", desc: "Tout dans le navigateur." },
  ],
  OsaBoard: [
    { icon: Users, title: "Collaboratif", desc: "Dessinez à plusieurs." },
    { icon: Activity, title: "Temps réel", desc: "Sans latence perceptible." },
    { icon: Share2, title: "Nœuds & liens", desc: "Basé sur React Flow." },
  ],
};

const expel = [
  { x: -140, y: -70, r: -14 },
  { x: 140, y: -70, r: 14 },
  { x: -140, y: 70, r: 14 },
  { x: 140, y: 70, r: -12 },
];
const tilt = [-6, 5, -4];

function FeatureCard({ f, color, angle }: { f: Feat; color: string; angle: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: angle }}
      exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="h-full rounded-3xl p-5 bg-white/[0.06] border border-white/15 backdrop-blur-sm shadow-xl flex flex-col"
    >
      <div className="w-full h-20 rounded-2xl mb-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}, ${color}66)` }}>
        <f.icon className="w-8 h-8 text-white" />
      </div>
      <h4 className="font-display font-semibold text-[15px]">{f.title}</h4>
      <p className="text-xs text-white/55 mt-1 leading-relaxed">{f.desc}</p>
    </motion.div>
  );
}

function ProjectsShowcase() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative grid grid-cols-1 sm:grid-cols-2 gap-5"
      style={{ perspective: 1200 }}
      onMouseLeave={() => setActive(null)}
    >
      {projects.map((p, i) => {
        const isActive = active === p.name;
        const feats = active ? FEATURES[active] : null;
        // index de ce créneau parmi les non-survolés → quelle fonctionnalité afficher
        const featIdx = active ? projects.filter((x) => x.name !== active).findIndex((x) => x.name === p.name) : -1;

        return (
          <div key={p.name} className="relative min-h-[150px]" onMouseEnter={() => setActive(p.name)}>
            <AnimatePresence mode="popLayout">
              {active && !isActive && feats ? (
                <motion.div key="feat" className="absolute inset-0">
                  <FeatureCard f={feats[featIdx] ?? feats[0]} color={projects.find((x) => x.name === active)!.color} angle={tilt[featIdx] ?? 0} />
                </motion.div>
              ) : (
                <motion.div
                  key="card"
                  layout
                  animate={isActive ? { scale: 1.04, y: -4 } : { scale: 1, x: 0, y: 0, rotate: 0 }}
                  exit={{ x: expel[i].x, y: expel[i].y, rotate: expel[i].r, opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="absolute inset-0"
                >
                  <Link href={p.href} target="_blank"
                    className="group block h-full rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-white/25 transition-colors relative overflow-hidden">
                    <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity" style={{ background: p.color }} />
                    <div className="relative flex items-center gap-3 mb-4">
                      {p.logo ? (
                        <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2" style={{ borderColor: p.color }}>
                          <Image src={p.logo} alt={p.name} fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white" style={{ background: p.color }}>
                          <p.icon className="w-5 h-5" />
                        </div>
                      )}
                      <h3 className="text-xl font-display font-semibold tracking-tight">{p.name}</h3>
                      <div className="ml-auto w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#1a1a1a] transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="relative text-sm text-white/50 leading-relaxed">{p.desc}</p>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Hub() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1a1a]">
      <div className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

      <nav className="relative z-20 flex justify-between items-center px-6 sm:px-10 py-6">
        <span className="font-display font-semibold text-lg tracking-tight">OsaLabs</span>
        <div className="flex items-center gap-2 text-[13px] text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Tous les services en ligne</span>
        </div>
      </nav>

      {/* HERO canvas */}
      <section className="relative z-10 min-h-[82vh] flex flex-col items-center justify-center px-4">
        <div className="relative">
          <motion.div {...float(5)} className="absolute -top-20 left-2 sm:left-6 z-20 -rotate-3">
            <Frame color="#a78bfa"><span className="block px-5 py-2 font-display font-semibold text-2xl sm:text-3xl text-[#a78bfa]">ÉCOSYSTÈME</span></Frame>
          </motion.div>
          <motion.div {...float(6, 0.5)} className="absolute -top-24 right-0 sm:-right-4 z-20 rotate-6">
            <Frame color="#f472b6"><div className="p-3"><Mascot size={44} /></div></Frame>
          </motion.div>
          <motion.div {...float(4.5, 0.2)} className="absolute top-2 -left-24 sm:-left-36 z-20 hidden sm:block">
            <span className="font-display font-bold text-sm px-4 py-1.5 rounded-full bg-emerald-300 text-[#1a1a1a]">2026</span>
            <Cursor color="#6ee7b7" style={{ top: -6, right: -22 }} />
          </motion.div>
          <motion.div {...float(5.5, 0.8)} className="absolute -top-16 -right-28 sm:-right-40 z-20 hidden sm:block">
            <span className="font-display font-bold text-sm px-4 py-1.5 rounded-2xl rounded-bl-sm bg-amber-300 text-[#1a1a1a]">SALUT !</span>
          </motion.div>

          <Frame color="#4f9dfb">
            <h1 className="px-6 sm:px-10 py-4 font-display font-bold tracking-tight text-white text-6xl sm:text-8xl lg:text-9xl leading-none select-none">OsaLabs</h1>
          </Frame>

          <div className="absolute -bottom-16 right-2 sm:right-8 z-40">
            <GithubBubble />
          </div>
        </div>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-28 text-center text-lg sm:text-xl text-white/45 max-w-lg">
          Un écosystème d'outils temps réel, pensés avec soin.
        </motion.p>
      </section>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-28 space-y-20">
        <section id="projets" className="scroll-mt-24">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-8">Projets</h2>
          <ProjectsShowcase />
          <p className="text-center text-xs text-white/25 mt-5">Survole un projet pour découvrir ce qu'il fait ✦</p>
        </section>

        <section>
          <div className="relative inline-block mb-8">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40 relative z-10">Journal</h2>
            <PencilStroke className="absolute -bottom-3 -left-2 w-32 h-5 text-white/20" />
          </div>
          <div className="relative border-l border-white/10 ml-1.5 space-y-8">
            {[
              { when: "Aujourd'hui", title: "OsaCast & OsaBoard", desc: "Partage d'écran WebRTC et tableau blanc collaboratif.", c: "#14b8a6" },
              { when: "Cette semaine", title: "OsaDrop", desc: "Transfert de fichiers P2P sans serveur.", c: "#3b82f6" },
              { when: "À venir", title: "OsaNotch", desc: "L'app compagnon macOS : encoche vivante, pont Apple Music.", soon: true, c: "#ffffff" },
            ].map((t, i) => (
              <motion.div key={i} initial={{ x: 14, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.07 }} className="relative pl-6">
                <div className="absolute w-3 h-3 rounded-full -left-[6.5px] top-1.5" style={{ background: t.soon ? "rgba(255,255,255,0.25)" : t.c, boxShadow: t.soon ? "none" : `0 0 10px ${t.c}` }} />
                <span className="text-xs text-white/35">{t.when}</span>
                <h4 className={`font-display text-base font-medium mt-0.5 ${t.soon ? "text-white/60" : "text-white"}`}>{t.title}</h4>
                <p className="text-sm text-white/40 mt-0.5 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="text-center text-[13px] text-white/25 pt-8 font-display">OsaLabs · Yanis</footer>
      </main>
    </div>
  );
}
