"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight, Laptop } from "lucide-react";
import Mascot, { type Mood } from "@/components/osa/Mascot";
import { Face, Frame, PencilStroke, Spotlight, Sticker, WanderingCursor } from "@/components/hub/Canvas";
import { GithubBubble } from "@/components/hub/GithubBubble";
import { Projects } from "@/components/hub/Projects";
import { NotchShowcase } from "@/components/hub/NotchShowcase";
import { PROJECTS, useStatus, type AppId, type Status } from "@/components/hub/data";

/* ---------- Pastille de statut (vrai ping des sites) ---------- */

const NAMES: Record<string, string> = { osaparty: "OsaParty", osadrop: "OsaDrop", osacast: "OsaCast", osaboard: "OsaBoard", osanotch: "OsaNotch (site)" };

function StatusPill({ status }: { status: Status | null }) {
  const [open, setOpen] = useState(false);
  const list = status ? Object.entries(status) : [];
  const down = list.filter(([, s]) => !s.ok).length;
  const color = !status ? "rgba(255,255,255,0.35)" : down ? "#fbbf24" : "#4ade80";
  const text = !status ? "Vérification…" : down ? `${down} service${down > 1 ? "s" : ""} hors ligne` : "Tous les services en ligne";
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 text-[13px] text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:text-white transition">
        <span className="relative flex w-2 h-2">
          {status && <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: color }} />}
          <span className="relative w-2 h-2 rounded-full" style={{ background: color }} />
        </span>
        <span className="hidden sm:inline">{text}</span>
      </button>
      <AnimatePresence>
        {open && status && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-[#111113] border border-white/10 p-2 shadow-2xl z-50">
            {list.map(([id, s]) => (
              <div key={id} className="flex items-center gap-2.5 px-2.5 py-2 text-[13px]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.ok ? "#4ade80" : "#fbbf24" }} />
                <span className="font-semibold text-white/85">{NAMES[id] || id}</span>
                <span className="ml-auto text-white/35 tabular-nums">{s.ok ? `${s.ms} ms` : "injoignable"}</span>
              </div>
            ))}
            <p className="px-2.5 pt-1 pb-1.5 text-[11px] text-white/30">Vérifié en direct depuis le serveur</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Sous-titre qui change de mot ---------- */

const WORDS = [
  { t: "t’envoyer des fichiers", c: "#7cc4ff" },
  { t: "montrer ton écran", c: "#a5b4fc" },
  { t: "écouter de la musique ensemble", c: "#f9a8d4" },
  { t: "dessiner à plusieurs", c: "#5eead4" },
  { t: "réveiller ton encoche", c: "#b7a5ff" },
];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600); return () => clearInterval(t); }, []);
  return (
    <span className="block sm:inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span key={i} className="inline-block font-semibold" style={{ color: WORDS[i].c }}
          initial={{ y: 14, opacity: 0, filter: "blur(6px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.3 }}>
          {WORDS[i].t}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---------- Ce que raconte la mascotte ---------- */

const HERO_LINES = ["Salut ! 👋", "Bienvenue chez OsaLabs", "Psst… tout se déplace ici", "Attrape un autocollant !", null, "Les projets sont juste en dessous ↓", null];
const BUDDY: Record<AppId, { say: string; mood: Mood; holding?: "file" | "screen" | "note" }> = {
  osadrop: { say: "Envoie tes fichiers en direct 📦", mood: "work", holding: "file" },
  osacast: { say: "Montre ton écran avec un code 🖥️", mood: "happy", holding: "screen" },
  osaparty: { say: "C’est la fête ! 🎶", mood: "dance", holding: "note" },
  osaboard: { say: "On réfléchit à plusieurs ? ✏️", mood: "think" },
};

const JOURNAL = [
  { when: "11 oct.", title: "OsaNotch × OsaDrop", desc: "Un fichier envoyé depuis le site arrive maintenant directement dans l’encoche.", c: "#7cc4ff" },
  { when: "9 oct.", title: "Trois sites redessinés", desc: "OsaParty, OsaDrop et OsaCast prennent l’allure de l’encoche, avec une mascotte qui réagit à tout.", c: "#f9a8d4" },
  { when: "9 oct.", title: "OsaNotch s’installe comme une vraie app", desc: "Presse-papier de fichiers, mode cinéma pour OsaCast et un installateur à glisser dans Applications.", c: "#b7a5ff" },
  { when: "7 oct.", title: "OsaNotch devient natif", desc: "Réécrit en SwiftUI : plus léger, plus fluide, et il passe au-dessus de la barre de menus.", c: "#b7a5ff" },
  { when: "5 oct.", title: "OsaDrop, OsaCast & OsaBoard", desc: "Fichiers, partage d’écran et tableau blanc rejoignent l’écosystème.", c: "#5eead4" },
  { when: "1er oct.", title: "OsaParty", desc: "Le tout premier projet : écouter de la musique ensemble, au même moment.", c: "#f9a8d4" },
];

export default function Hub() {
  const status = useStatus();
  const heroRef = useRef<HTMLElement>(null);
  const notchRef = useRef<HTMLElement>(null);
  const heroVisible = useInView(heroRef, { amount: 0.25 });
  const notchVisible = useInView(notchRef, { amount: 0.4 });
  const [line, setLine] = useState(0);
  const [grab, setGrab] = useState(0);
  const [hovered, setHovered] = useState<AppId | null>(null);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const f = () => setNarrow(mq.matches);
    f(); mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => { const t = setInterval(() => setLine((n) => (n + 1) % HERO_LINES.length), 4200); return () => clearInterval(t); }, []);
  useEffect(() => { if (!grab) return; const t = setTimeout(() => setGrab(0), 2400); return () => clearTimeout(t); }, [grab]);
  const onGrab = () => setGrab(Date.now());

  const heroSay = grab ? "Hé, tu m’as trouvé ! 😄" : HERO_LINES[line];
  const buddy = hovered ? BUDDY[hovered] : notchVisible ? { say: "Et ça, c’est moi dans ton Mac 😄", mood: "happy" as Mood } : null;
  const hoveredColor = PROJECTS.find((p) => p.id === hovered)?.color;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#1a1a1a]">
      <Spotlight />

      <nav className="relative z-40 flex justify-between items-center px-5 sm:px-10 py-5">
        <a href="#" className="flex items-center gap-2.5 font-display font-semibold text-lg tracking-tight">
          <Face size={26} /> OsaLabs
        </a>
        <div className="hidden md:flex items-center gap-1 text-[13px] font-semibold text-white/50 bg-white/[0.04] border border-white/10 rounded-full p-1">
          {[["Projets", "#projets"], ["OsaNotch", "#osanotch"], ["Journal", "#journal"]].map(([t, h]) => (
            <a key={h} href={h} className="px-3.5 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition">{t}</a>
          ))}
        </div>
        <StatusPill status={status} />
      </nav>

      {/* HERO canvas */}
      <section ref={heroRef} className="relative z-10 min-h-[86vh] flex flex-col items-center justify-center px-4 pb-10">
        <WanderingCursor color="#7cc4ff" label="OsaDrop" duration={16} path={[[8, 26], [14, 58], [5, 76], [12, 40], [8, 26]]} />
        <WanderingCursor color="#f9a8d4" label="OsaParty" duration={19} delay={2} path={[[84, 72], [80, 40], [86, 18], [81, 60], [84, 72]]} />

        <div className="relative mt-16">
          <Sticker bounds={heroRef} onGrab={onGrab} float={[5, 0]} className="-top-16 sm:-top-20 -left-1 sm:left-6 z-20 -rotate-3">
            <Frame color="#a78bfa"><span className="block px-5 py-2 font-display font-semibold text-lg sm:text-3xl text-[#a78bfa]">ÉCOSYSTÈME</span></Frame>
          </Sticker>
          <Sticker bounds={heroRef} onGrab={onGrab} float={[6, 0.5]} className="-top-28 right-0 sm:-right-6 z-30 rotate-6">
            <Frame color="#f472b6">
              <div className="p-2 sm:p-3">
                <Mascot size={narrow ? 50 : 72} mood={grab ? "excited" : "idle"} wave={line === 0 && !grab} say={heroVisible ? heroSay : null} bubble="left" glow="#f472b644" />
              </div>
            </Frame>
          </Sticker>
          <Sticker bounds={heroRef} onGrab={onGrab} float={[4.5, 0.2]} className="top-2 -left-24 sm:-left-36 z-20 hidden sm:block">
            <span className="block font-display font-bold text-sm px-4 py-1.5 rounded-full bg-emerald-300 text-[#1a1a1a]">2026</span>
          </Sticker>
          <Sticker bounds={heroRef} onGrab={onGrab} float={[5.5, 0.8]} className="top-24 -right-28 sm:-right-44 z-20 hidden sm:block">
            <span className="block font-display font-bold text-sm px-4 py-1.5 rounded-2xl rounded-tl-sm bg-amber-300 text-[#1a1a1a]">TEMPS RÉEL ⚡</span>
          </Sticker>

          <Frame color="#4f9dfb">
            <motion.h1
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="px-6 sm:px-10 py-4 font-display font-bold tracking-tight text-white text-6xl sm:text-8xl lg:text-9xl leading-none select-none">
              OsaLabs
            </motion.h1>
          </Frame>

          <div className="absolute -bottom-16 right-2 sm:right-8 z-40">
            <GithubBubble />
          </div>
        </div>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-28 text-center text-lg sm:text-2xl text-white/50 max-w-2xl leading-snug">
          Des petits outils temps réel pour <Rotator />
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap justify-center gap-3 mt-9">
          <a href="#projets" className="font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            Voir les projets <ArrowDown className="w-4 h-4" />
          </a>
          <a href="#osanotch" className="font-display font-semibold text-white/80 bg-white/[0.06] border border-white/10 px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition">
            <Laptop className="w-4 h-4" /> OsaNotch pour Mac
          </a>
        </motion.div>
      </section>

      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 pb-16 space-y-28">
        <section id="projets" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40">Projets</h2>
              <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">Quatre apps, directement dans ton navigateur.</p>
            </div>
            <p className="hidden sm:block text-xs text-white/30 pb-2">Survole un projet ✦</p>
          </div>
          <Projects status={status} onActive={setHovered} />
        </section>

        <section id="osanotch" ref={notchRef} className="scroll-mt-24">
          <NotchShowcase />
        </section>

        <section id="journal" className="scroll-mt-24 grid md:grid-cols-[220px_1fr] gap-8">
          <div className="md:sticky md:top-24 self-start">
            <div className="relative inline-block">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40 relative z-10">Journal</h2>
              <PencilStroke className="absolute -bottom-3 -left-2 w-32 h-5 text-white/20" />
            </div>
            <p className="text-sm text-white/35 mt-5 leading-relaxed">Ce qui a bougé récemment dans l’écosystème.</p>
          </div>
          <div className="relative border-l border-white/10 ml-1.5 space-y-7">
            {JOURNAL.map((t, i) => (
              <motion.div key={i} initial={{ x: 14, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }} className="relative pl-7 group">
                <div className="absolute w-3 h-3 rounded-full -left-[6.5px] top-1.5 transition-transform group-hover:scale-150" style={{ background: t.c, boxShadow: `0 0 12px ${t.c}` }} />
                <span className="text-xs font-semibold text-white/35">{t.when}</span>
                <h3 className="font-display text-lg font-semibold mt-0.5">{t.title}</h3>
                <p className="text-sm text-white/45 mt-0.5 leading-relaxed max-w-xl">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] mt-10">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12 flex flex-col sm:flex-row gap-8 sm:items-end justify-between">
          <div className="flex items-center gap-4">
            <Mascot size={54} mood="sleep" tricks={false} />
            <div>
              <p className="font-display text-2xl font-bold">OsaLabs</p>
              <p className="text-sm text-white/35">Fait main par Yanis.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/40">
            {PROJECTS.map((p) => <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">{p.name}</a>)}
            <a href="https://notch.osalabs.fr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">OsaNotch</a>
            <a href="https://github.com/osayanis" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center gap-1">GitHub <ArrowUpRight className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </footer>

      {/* La mascotte qui accompagne la visite une fois le héros passé */}
      <AnimatePresence>
        {!heroVisible && (
          <motion.div initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed right-6 bottom-5 z-50 hidden md:block">
            <Mascot size={64} mood={buddy?.mood ?? "idle"} holding={buddy?.holding ?? null} say={buddy?.say ?? null} bubble="left" glow={hoveredColor ? `${hoveredColor}55` : "#ffffff22"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
