"use client";

// Les 4 projets. Au survol d'une carte, les 3 autres s'envolent et laissent
// place à des cartes « fonctionnalités » du projet survolé.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowUpRight, Camera, Files, MicVocal, MonitorUp, PictureInPicture2,
  QrCode, Share2, Sparkles, Target, Users, Zap,
} from "lucide-react";
import { Mockup } from "./Mockups";
import { PROJECTS, type AppId, type Status } from "./data";

type Feat = { icon: React.ElementType; title: string; desc: string };
const FEATURES: Record<AppId, Feat[]> = {
  osadrop: [
    { icon: Zap, title: "Pair-à-pair", desc: "Le fichier va directement d'un appareil à l'autre." },
    { icon: Files, title: "Plusieurs fichiers", desc: "Une file d'envoi, avec la vitesse et le temps restant." },
    { icon: QrCode, title: "Code ou QR", desc: "6 caractères ou un scan, et c'est parti." },
  ],
  osacast: [
    { icon: MonitorUp, title: "En un clic", desc: "Tout l'écran ou une seule fenêtre, au choix." },
    { icon: PictureInPicture2, title: "Plein écran & PiP", desc: "Regarde en grand, ou dans un coin pendant que tu fais autre chose." },
    { icon: Camera, title: "Capture", desc: "Une image du stream en PNG, d'un clic." },
  ],
  osaparty: [
    { icon: MicVocal, title: "Paroles synchronisées", desc: "Elles défilent en rythme avec la musique." },
    { icon: Target, title: "Blind test", desc: "Le plus rapide à trouver marque le plus de points." },
    { icon: Sparkles, title: "Réactions & récap", desc: "Le chat en direct, et un récap de la soirée à la fin." },
  ],
  osaboard: [
    { icon: Users, title: "À plusieurs", desc: "Tu vois les autres bouger sur le tableau." },
    { icon: Share2, title: "Nœuds & liens", desc: "Relie tes idées entre elles." },
    { icon: Activity, title: "Temps réel", desc: "Chaque changement apparaît chez tout le monde." },
  ],
};

const expel = [
  { x: -140, y: -70, r: -14 },
  { x: 140, y: -70, r: 14 },
  { x: -140, y: 70, r: 14 },
  { x: 140, y: 70, r: -12 },
];
const tilt = [-5, 4, -3];

function FeatureCard({ f, color, angle, i }: { f: Feat; color: string; angle: number; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, rotate: angle, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.04 }}
      className="h-full rounded-[28px] p-6 bg-[#202022] border border-white/15 shadow-2xl flex flex-col justify-end relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-30" style={{ background: color }} />
      <f.icon className="absolute -right-6 top-10 w-44 h-44 opacity-[0.06]" strokeWidth={1.2} />
      <div className="relative flex items-center justify-between mb-auto">
        <div className="w-14 h-14 rounded-2xl grid place-items-center text-black" style={{ background: color }}>
          <f.icon className="w-6 h-6" />
        </div>
        <span className="font-display text-sm font-semibold text-white/30 tabular-nums">0{i + 1} / 03</span>
      </div>
      <h4 className="relative font-display font-semibold text-2xl mt-6">{f.title}</h4>
      <p className="relative text-[15px] text-white/55 mt-1.5 leading-relaxed max-w-[90%]">{f.desc}</p>
    </motion.div>
  );
}

function StatusDot({ s }: { s?: { ok: boolean; ms: number | null } }) {
  const color = !s ? "rgba(255,255,255,0.3)" : s.ok ? "#4ade80" : "#fbbf24";
  const label = !s ? "…" : s.ok ? "en ligne" : "hors ligne";
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/45">
      <span className="relative flex w-1.5 h-1.5">
        {s?.ok && <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: color }} />}
        <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      </span>
      {label}
    </span>
  );
}

export function Projects({ status, onActive }: { status: Status | null; onActive?: (id: AppId | null) => void }) {
  const [active, setActive] = useState<AppId | null>(null);
  // Sur écran tactile, pas de survol : un tap ouvre directement le site.
  const canHover = useRef(true);
  useEffect(() => { canHover.current = window.matchMedia("(hover: hover)").matches; }, []);
  const set = (id: AppId | null) => { if (id && !canHover.current) return; setActive(id); onActive?.(id); };
  const activeP = PROJECTS.find((p) => p.id === active);

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5" onMouseLeave={() => set(null)}>
      {PROJECTS.map((p, i) => {
        const isActive = active === p.id;
        const featIdx = active ? PROJECTS.filter((x) => x.id !== active).findIndex((x) => x.id === p.id) : -1;
        const showFeat = activeP && !isActive;

        return (
          <div key={p.id} className="relative h-[310px]" onMouseEnter={() => set(p.id)}>
            <AnimatePresence mode="popLayout">
              {showFeat ? (
                <motion.div key="feat" className="absolute inset-0">
                  <FeatureCard f={FEATURES[activeP.id][featIdx] ?? FEATURES[activeP.id][0]} color={activeP.color} angle={tilt[featIdx] ?? 0} i={featIdx} />
                </motion.div>
              ) : (
                <motion.div
                  key="card"
                  animate={isActive ? { scale: 1.03, y: -4 } : { scale: 1, x: 0, y: 0, rotate: 0 }}
                  exit={{ x: expel[i].x, y: expel[i].y, rotate: expel[i].r, opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="absolute inset-0"
                >
                  <a href={p.href} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col h-full rounded-[28px] p-2 bg-white/[0.035] border border-white/10 hover:border-white/25 transition-colors relative overflow-hidden"
                    style={{ boxShadow: isActive ? `0 30px 80px -40px ${p.color}` : undefined }}>
                    <div className="relative flex-1 rounded-[22px] bg-black/45 border border-white/[0.06] overflow-hidden">
                      <div className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}26, transparent 70%)` }} />
                      <Mockup id={p.id} active={isActive} c={p.color} />
                    </div>
                    <div className="px-4 pt-4 pb-3">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl font-display font-semibold tracking-tight">{p.name}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-black" style={{ background: p.color }}>{p.tag}</span>
                        <span className="ml-auto"><StatusDot s={status?.[p.id]} /></span>
                        <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items-center group-hover:bg-white group-hover:text-[#1a1a1a] transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed mt-1.5 line-clamp-2">{p.desc}</p>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
