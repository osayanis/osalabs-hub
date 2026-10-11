"use client";

// Mini-aperçus animés de chaque app (dessinés en CSS, pas de captures).
// `active` = la carte est survolée : l'animation s'emballe un peu.
import { motion } from "framer-motion";
import { FileArchive, Laptop, Music, Smartphone } from "lucide-react";
import type { AppId } from "./data";

type P = { active: boolean; c: string };

function DropMock({ active, c }: P) {
  const d = active ? 1.6 : 2.8;
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-6 gap-4">
      <div className="relative flex items-center justify-between">
        {[{ I: Laptop, t: "Mac" }, { I: Smartphone, t: "iPhone" }].map(({ I, t }) => (
          <div key={t} className="relative z-10 flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 grid place-items-center"><I className="w-5 h-5 text-white/75" /></div>
            <span className="text-[10px] font-semibold text-white/40">{t}</span>
          </div>
        ))}
        <div className="absolute left-14 right-14 top-6 border-t-[1.5px] border-dashed border-white/15" />
        <motion.div
          className="absolute top-[9px] w-8 h-8 rounded-xl grid place-items-center text-black shadow-lg"
          style={{ background: c }}
          animate={{ left: ["16%", "74%"], opacity: [0, 1, 1, 0], rotate: [-8, 6] }}
          transition={{
            left: { duration: d, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: d, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: d, repeat: Infinity, times: [0, 0.15, 0.85, 1] },
          }}
        >
          <FileArchive className="w-4 h-4" />
        </motion.div>
      </div>
      <div>
        <div className="flex justify-between text-[10px] font-semibold text-white/45 mb-1.5"><span>vacances.zip</span><span style={{ color: c }}>{active ? "18,2 Mo/s" : "12,4 Mo/s"}</span></div>
        <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: c }} animate={{ width: ["0%", "100%"] }} transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </div>
    </div>
  );
}

function CastMock({ active, c }: P) {
  return (
    <div className="absolute inset-0 p-4">
      <div className="relative h-full rounded-xl bg-[#111216] border border-white/10 overflow-hidden">
        <div className="h-5 flex items-center gap-1 px-2 border-b border-white/[0.06]">
          {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
        </div>
        <div className="p-3 flex gap-2.5">
          <div className="w-16 h-[62px] rounded-lg" style={{ background: `linear-gradient(135deg, ${c}88, ${c}22)` }} />
          <div className="flex-1 space-y-1.5 pt-1">
            <div className="h-2 rounded-full bg-white/25 w-4/5" />
            <div className="h-2 rounded-full bg-white/10 w-full" />
            <div className="h-2 rounded-full bg-white/10 w-3/5" />
            <motion.div className="h-2 rounded-full w-2/5" style={{ background: `${c}66` }} animate={{ width: ["20%", "55%", "20%"] }} transition={{ duration: 3, repeat: Infinity }} />
          </div>
        </div>
        <motion.div className="absolute" animate={{ left: ["30%", "62%", "48%", "30%"], top: ["55%", "38%", "70%", "55%"] }} transition={{ duration: active ? 2.4 : 4.5, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 3l5 15 2.5-6.5L19 9 5 3z" fill="#fff" stroke="#111" strokeWidth="1.5" /></svg>
        </motion.div>
        <div className="absolute left-2 bottom-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 text-[9px] font-bold">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: c }} />
            <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          </span>
          EN DIRECT · 02:14
        </div>
        <div className="absolute right-2 bottom-2 flex -space-x-1.5">
          {["#f9a8d4", "#7cc4ff", "#fcd34d"].map((b, i) => (
            <motion.span key={b} className="w-5 h-5 rounded-full border-2 border-[#111216]" style={{ background: b }}
              animate={active ? { y: [0, -3, 0] } : { y: 0 }} transition={{ duration: 0.6, repeat: active ? Infinity : 0, delay: i * 0.12 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PartyMock({ active, c }: P) {
  return (
    <div className="absolute inset-0 px-5 flex items-center gap-4">
      <motion.div className="relative w-[84px] h-[84px] flex-none rounded-2xl grid place-items-center shadow-xl"
        style={{ background: `linear-gradient(135deg, ${c}, #c4b5fd 60%, #7c3aed)` }}
        animate={active ? { rotate: [-3, 3, -3], scale: 1.04 } : { rotate: 0, scale: 1 }} transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}>
        <Music className="w-8 h-8 text-white/90" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="flex items-end gap-[3px] h-4 mb-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span key={i} className="w-[3px] rounded-full" style={{ background: c }}
              animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }} transition={{ duration: active ? 0.6 : 1.1, repeat: Infinity, delay: i * 0.11 }} />
          ))}
        </div>
        <p className="text-[13px] font-bold truncate">Nuit d’été</p>
        <p className="text-[11px] text-white/40 truncate">En écoute à 4</p>
        <div className="mt-2.5 space-y-1 text-[11px] font-semibold leading-tight">
          <p className="text-white/25 truncate">On danse sous les étoiles</p>
          <p className="truncate" style={{ color: c }}>Et la nuit ne finit jamais ♪</p>
        </div>
      </div>
      {["🔥", "💜", "🎉"].map((e, i) => (
        <motion.span key={e} className="absolute text-base" style={{ right: 18 + i * 22, bottom: 10 }}
          animate={{ y: [0, -70], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}>{e}</motion.span>
      ))}
    </div>
  );
}

function BoardMock({ active, c }: P) {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
        <motion.path d="M78 46 C130 46, 130 98, 182 98" stroke={c} strokeWidth="1.6" fill="none" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M78 46 C150 30, 190 40, 232 40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" fill="none" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
      </svg>
      <div className="absolute left-[8%] top-[20%] w-[22%] h-[22%] rounded-lg bg-white/[0.08] border border-white/15 flex items-center px-2 text-[10px] font-bold text-white/70">Idée</div>
      <div className="absolute left-[72%] top-[16%] w-[20%] h-[22%] rounded-lg bg-white/[0.08] border border-white/15 flex items-center px-2 text-[10px] font-bold text-white/70">Plan</div>
      <motion.div className="absolute w-[24%] h-[24%] rounded-lg border flex items-center px-2 text-[10px] font-bold text-black"
        style={{ background: c, borderColor: c }}
        animate={{ left: ["58%", "52%", "58%"], top: ["56%", "62%", "56%"] }} transition={{ duration: active ? 1.6 : 3, repeat: Infinity, ease: "easeInOut" }}>
        Go !
        <span className="absolute -right-4 -bottom-4 flex items-start gap-0.5">
          <svg width="13" height="13" viewBox="0 0 24 24"><path d="M5 3l5 15 2.5-6.5L19 9 5 3z" fill="#fcd34d" stroke="#111" strokeWidth="1.5" /></svg>
          <span className="mt-2 rounded-full bg-[#fcd34d] px-1.5 text-[8px] font-bold text-black">Tom</span>
        </span>
      </motion.div>
    </div>
  );
}

export function Mockup({ id, active, c }: { id: AppId } & P) {
  if (id === "osadrop") return <DropMock active={active} c={c} />;
  if (id === "osacast") return <CastMock active={active} c={c} />;
  if (id === "osaparty") return <PartyMock active={active} c={c} />;
  return <BoardMock active={active} c={c} />;
}
