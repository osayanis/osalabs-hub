"use client";

// Éléments « canvas façon Figma » du hub : cadres de sélection, curseurs,
// autocollants déplaçables, curseurs « multijoueur » qui se baladent.
import { useEffect, type CSSProperties, type ReactNode, type RefObject } from "react";
import { motion } from "framer-motion";

export function Frame({ color, children, className = "", style }: { color: string; children: ReactNode; className?: string; style?: CSSProperties }) {
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

export function Cursor({ color, label, className = "", style }: { color: string; label?: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`absolute flex items-start gap-1 pointer-events-none ${className}`} style={style}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))" }}>
        <path d="M5 3l5 15 2.5-6.5L19 9 5 3z" fill={color} stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {label && <span className="mt-3 text-[11px] font-bold px-2 py-0.5 rounded-full text-[#1a1a1a] font-display whitespace-nowrap" style={{ background: color }}>{label}</span>}
    </div>
  );
}

// Petite tête de mascotte statique (logos, pastilles).
export function Face({ size = 40 }: { size?: number }) {
  return (
    <div className="relative flex-none" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-[42%] bg-[#fdfcf7]" />
      <div className="absolute rounded-full bg-[#2a2a2a]" style={{ width: size * 0.16, height: size * 0.2, top: size * 0.36, left: size * 0.3 }} />
      <div className="absolute rounded-full bg-[#2a2a2a]" style={{ width: size * 0.16, height: size * 0.2, top: size * 0.36, left: size * 0.56 }} />
    </div>
  );
}

// Coup de crayon : trait tracé à la main, faible opacité.
export function PencilStroke({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 36" fill="none" className={className} preserveAspectRatio="none" aria-hidden>
      <path d="M6 24C56 12 110 10 160 16c40 5 84 2 134-8" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity="0.5" />
      <path d="M12 30C70 22 128 26 182 22c36-3 72-6 104-14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

// Autocollant qui flotte doucement et qu'on peut attraper à la souris.
export function Sticker({ children, className = "", float = [5, 0], bounds, onGrab }: {
  children: ReactNode; className?: string; float?: [number, number];
  bounds: RefObject<HTMLElement | null>; onGrab?: () => void;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: float[0], repeat: Infinity, ease: "easeInOut", delay: float[1] }}
    >
      <motion.div
        drag
        dragConstraints={bounds}
        dragElastic={0.12}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
        onDragStart={onGrab}
        whileHover={{ scale: 1.04 }}
        whileDrag={{ scale: 1.1, rotate: -3, zIndex: 60, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.45))" }}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Curseur « d'un collègue » qui se promène sur le canvas.
export function WanderingCursor({ color, label, path, duration, delay = 0 }: {
  color: string; label: string; path: [number, number][]; duration: number; delay?: number;
}) {
  return (
    <motion.div
      className="absolute z-10 pointer-events-none hidden md:block"
      initial={{ left: `${path[0][0]}%`, top: `${path[0][1]}%`, opacity: 0 }}
      animate={{ left: path.map((p) => `${p[0]}%`), top: path.map((p) => `${p[1]}%`), opacity: 1 }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay, opacity: { duration: 0.6, delay } }}
    >
      <Cursor color={color} label={label} style={{ position: "relative" }} />
    </motion.div>
  );
}

// La grille s'éclaire autour de la souris (variables CSS, sans re-rendu React).
export function Spotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none osa-grid opacity-[0.045]" />
      <div className="fixed inset-0 z-0 pointer-events-none osa-grid opacity-[0.22] osa-spot" />
    </>
  );
}
