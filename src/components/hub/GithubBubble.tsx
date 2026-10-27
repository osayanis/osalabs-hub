"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cursor, Face } from "./Canvas";

/* ---------- Pastille "PAR YANIS" → bulle GitHub (mois en cours) ---------- */

const GH_USER = "osayanis";
const LEVELS = ["#262626", "#0e4429", "#006d32", "#26a641", "#39d353"];

export function GithubBubble() {
  const [open, setOpen] = useState(false);
  // Fermeture un court instant après la sortie : le temps de passer de la pastille à la bulle.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const hide = (delay = 150) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), delay);
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);
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
    <>
    {/* Fond assombri : en dehors de la zone survolée (sinon la souris y serait toujours « dedans »
        et la bulle ne se fermerait qu'en quittant la page). Le toucher ferme aussi la bulle. */}
    <div onClick={() => hide(0)} className={`fixed inset-0 bg-black/80 transition-opacity duration-150 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ zIndex: 30 }} />
    <div className="relative" onMouseEnter={show} onMouseLeave={() => hide()}>

      <AnimatePresence>
        {open && (
          <motion.a
            href={`https://github.com/${GH_USER}`}
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 24 } }}
            exit={{ opacity: 0, y: 10, scale: 0.94, transition: { duration: 0.12, ease: "easeIn" } }}
            className="absolute bottom-full right-0 mb-4 z-40 block w-[272px] rounded-3xl bg-[#0d1117] border border-white/10 p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://github.com/${GH_USER}.png?size=64`} alt="@osayanis" className="w-7 h-7 rounded-full border border-white/10 object-cover" />
                <span className="font-display font-semibold text-white capitalize">{monthName}</span>
              </div>
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
      <div onClick={() => (open ? hide(0) : show())} className="relative z-40 flex items-center gap-2 font-display font-bold text-base sm:text-lg px-5 py-2.5 rounded-full bg-[#4f9dfb] text-white shadow-lg shadow-[#4f9dfb]/30 cursor-pointer">
        PAR YANIS <Face size={22} />
      </div>
      <Cursor color="#4f9dfb" style={{ top: -14, left: -18 }} />
    </div>
    </>
  );
}

