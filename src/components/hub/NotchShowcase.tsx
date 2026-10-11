"use client";

// Vitrine OsaNotch : un écran de Mac miniature dont l'encoche change d'état
// toute seule (ou au clic sur les onglets), comme la vraie app.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, FileText, Image as ImageIcon, FileArchive, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import Mascot from "../osa/Mascot";

type State = "repos" | "musique" | "lecteur" | "fichiers" | "volume";
const STATES: { id: State; label: string }[] = [
  { id: "repos", label: "Repos" },
  { id: "musique", label: "Musique" },
  { id: "lecteur", label: "Lecteur" },
  { id: "fichiers", label: "Fichiers" },
  { id: "volume", label: "Volume" },
];
const SIZE: Record<State, { w: number; h: number; r: number }> = {
  repos: { w: 190, h: 30, r: 14 },
  musique: { w: 270, h: 30, r: 14 },
  lecteur: { w: 430, h: 158, r: 34 },
  fichiers: { w: 410, h: 150, r: 34 },
  volume: { w: 190, h: 62, r: 18 },
};
const PINK = "#f9a8d4";
const STAGE_W = 560, STAGE_H = 300;

function Bars({ n = 4, h = 12 }: { n?: number; h?: number }) {
  return (
    <div className="flex items-end gap-[2px]" style={{ height: h }}>
      {Array.from({ length: n }).map((_, i) => (
        <motion.span key={i} className="w-[2.5px] rounded-full" style={{ background: PINK }}
          animate={{ height: ["30%", "100%", "50%", "85%", "30%"] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.13 }} />
      ))}
    </div>
  );
}

const Art = ({ s }: { s: number }) => (
  <div className="flex-none rounded-[22%]" style={{ width: s, height: s, background: `linear-gradient(135deg, ${PINK}, #c4b5fd 55%, #6d28d9)` }} />
);

function NotchContent({ state }: { state: State }) {
  const fade = { initial: { opacity: 0, filter: "blur(6px)" }, animate: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(6px)" }, transition: { duration: 0.25 } };
  if (state === "repos")
    return <motion.div {...fade} className="absolute inset-0 flex items-center justify-between px-3"><span className="w-4 h-4 rounded-[40%] bg-[#fdfcf7]" /><span className="w-5 h-2.5 rounded-[3px] border border-white/50 relative"><span className="absolute inset-[1.5px] right-[30%] rounded-[1px] bg-[#4ade80]" /></span></motion.div>;
  if (state === "musique")
    return <motion.div {...fade} className="absolute inset-0 flex items-center justify-between px-2.5"><Art s={18} /><Bars /></motion.div>;
  if (state === "volume")
    return (
      <motion.div {...fade} className="absolute inset-x-0 bottom-0 h-8 flex items-center gap-2 px-3.5">
        <Volume2 className="w-3 h-3 text-white flex-none" />
        <div className="flex-1 h-1 rounded-full bg-white/15 overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: "35%" }} animate={{ width: ["35%", "70%", "60%"] }} transition={{ duration: 1.6 }} />
        </div>
      </motion.div>
    );
  if (state === "lecteur")
    return (
      <motion.div {...fade} className="absolute inset-0 pt-9 px-6 flex gap-4">
        <Art s={92} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[14px] font-bold truncate">Nuit d’été</p>
              <p className="text-[11px] text-white/45 truncate">Apple Music</p>
            </div>
            <Bars n={5} h={14} />
          </div>
          <p className="mt-2 text-[12px] font-bold" style={{ color: PINK }}>Et la nuit ne finit jamais ♪</p>
          <div className="mt-2.5 h-1 rounded-full bg-white/15 overflow-hidden">
            <motion.div className="h-full bg-white rounded-full" initial={{ width: "32%" }} animate={{ width: "48%" }} transition={{ duration: 3.4, ease: "linear" }} />
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-5 text-white/85">
            <SkipBack className="w-3.5 h-3.5" fill="currentColor" /><Pause className="w-4 h-4" fill="currentColor" /><SkipForward className="w-3.5 h-3.5" fill="currentColor" />
          </div>
        </div>
      </motion.div>
    );
  // presse-papier de fichiers
  const files = [{ I: FileText, n: "rapport.pdf", c: "#fca5a5" }, { I: ImageIcon, n: "photo.jpg", c: "#7cc4ff" }, { I: FileArchive, n: "projet.zip", c: "#fcd34d" }];
  return (
    <motion.div {...fade} className="absolute inset-0 pt-9 px-5 flex gap-3">
      <div className="flex-1 rounded-2xl border-[1.5px] border-dashed border-white/20 p-2.5">
        <p className="text-[10px] font-bold text-white/45 mb-2">Presse-papier · 3 fichiers</p>
        <div className="flex gap-2">
          {files.map(({ I, n, c }, i) => (
            <motion.div key={n} className="flex-1 rounded-xl bg-white/[0.07] p-2 flex flex-col items-center gap-1"
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.08 }}>
              <span className="w-7 h-7 rounded-lg grid place-items-center text-black" style={{ background: c }}><I className="w-3.5 h-3.5" /></span>
              <span className="text-[8.5px] font-semibold text-white/60 truncate max-w-full">{n}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-[88px] rounded-2xl border-[1.5px] border-dashed border-white/20 grid place-items-center text-center">
        <span className="text-[10px] font-bold text-white/45 leading-tight">AirDrop<br />OsaDrop</span>
      </div>
    </motion.div>
  );
}

export function NotchShowcase() {
  const [state, setState] = useState<State>("repos");
  const pausedUntil = useRef(0);
  const box = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  const [clock, setClock] = useState("");
  useEffect(() => {
    const f = () => setClock(new Date().toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).replace(",", ""));
    f();
    const t = setInterval(f, 30_000);
    return () => clearInterval(t);
  }, []);

  // L'écran miniature est dessiné à taille fixe puis mis à l'échelle.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setK(Math.min(1, el.clientWidth / STAGE_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setState((s) => STATES[(STATES.findIndex((x) => x.id === s) + 1) % STATES.length].id);
    }, 3400);
    return () => clearInterval(t);
  }, []);

  const pick = (s: State) => { pausedUntil.current = Date.now() + 10_000; setState(s); };
  const sz = SIZE[state];

  return (
    <div className="relative grid lg:grid-cols-[1fr_1.15fr] gap-10 items-center rounded-[36px] p-6 sm:p-10 border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] overflow-hidden">
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: "radial-gradient(circle,#b7a5ff,transparent 70%)" }} />

      <div className="relative">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#b7a5ff]">App macOS · gratuite</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mt-3">Ton encoche,<br />mais vivante.</h2>
        <p className="text-white/55 mt-4 leading-relaxed max-w-md">
          OsaNotch transforme l’encoche du Mac en petit compagnon : la mascotte qui te suit des yeux, ta musique avec les paroles,
          un presse-papier de fichiers, et OsaDrop, OsaCast et OsaParty à portée de souris.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a href="https://notch.osalabs.fr" target="_blank" rel="noopener noreferrer"
            className="font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            <Download className="w-4 h-4" /> Télécharger
          </a>
          <a href="https://github.com/osayanis/osanotch-native" target="_blank" rel="noopener noreferrer"
            className="font-display font-semibold text-white/80 bg-white/[0.06] border border-white/10 px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition">
            Code source <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-white/30 mt-4">macOS 14 ou plus récent</p>
      </div>

      <div className="relative">
        <div ref={box} className="relative w-full" style={{ height: STAGE_H * k }}>
          <div className="absolute top-0 left-1/2 rounded-[22px] overflow-hidden border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
            style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${k})`, transformOrigin: "50% 0" }}>
            {/* fond d'écran */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 110%, #f9a8d4 0%, transparent 45%), radial-gradient(circle at 90% 90%, #7cc4ff 0%, transparent 45%), radial-gradient(circle at 60% 20%, #6d28d9 0%, transparent 55%), #1e1b2e" }} />
            {/* barre de menus */}
            <div className="absolute inset-x-0 top-0 h-[30px] bg-black/25 backdrop-blur-md flex items-center justify-between px-4 text-[11px] font-semibold text-white/85">
              <span className="flex gap-3.5"><span className="font-bold">Finder</span><span className="text-white/60">Fichier</span><span className="text-white/60">Édition</span></span>
              <span className="text-white/70">{clock}</span>
            </div>
            {/* l'encoche */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-black overflow-hidden text-white z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              initial={false}
              animate={{ width: sz.w, height: sz.h, borderBottomLeftRadius: sz.r, borderBottomRightRadius: sz.r }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              <AnimatePresence mode="popLayout">
                <NotchContent key={state} state={state} />
              </AnimatePresence>
            </motion.div>
            {/* la mascotte sur le bureau */}
            <div className="absolute right-6 bottom-5">
              <Mascot size={70} mood={state === "lecteur" || state === "musique" ? "dance" : state === "fichiers" ? "work" : "idle"} holding={state === "fichiers" ? "file" : state === "lecteur" ? "note" : null} glow="#b7a5ff55" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 mt-5">
          {STATES.map((s) => (
            <button key={s.id} onClick={() => pick(s.id)}
              className={`relative text-xs font-semibold px-3 py-1.5 rounded-full transition ${state === s.id ? "text-black" : "text-white/50 hover:text-white"}`}>
              {state === s.id && <motion.span layoutId="notch-tab" className="absolute inset-0 rounded-full bg-[#fdfcf7]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
