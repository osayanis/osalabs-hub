"use client";

// Vitrine EraseKEY sur l'accueil : la vraie capture de la console, dans un écran de PC
// qui s'incline vers la souris, et un lien vers sa page.
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Eraser } from "lucide-react";

const GREEN = "#4ade80";

export function EraseKeyShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 16 });
  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center rounded-[36px] p-6 sm:p-10 border border-white/10 overflow-hidden"
      style={{ background: `radial-gradient(circle at 0% 100%, #ffffff1f, transparent 55%), radial-gradient(circle at 100% 0%, ${GREEN}22, transparent 50%), rgba(255,255,255,0.03)` }}>
      <div ref={ref} onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0); }} style={{ perspective: 1200 }} className="order-2 lg:order-1">
        <motion.a href="/erasekey" style={{ rotateX: rx, rotateY: ry }} className="block rounded-[20px] bg-[#161618] p-2.5 border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <img src="/erasekey/disques-deux.webp" alt="EraseKEY : la liste des disques du PC, la clé et le disque système grisés, la mascotte explique quoi faire" width={1600} height={900} loading="lazy"
            className="w-full h-auto block rounded-[11px]" />
        </motion.a>
      </div>

      <div className="relative order-1 lg:order-2">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Nouveau · clé USB · par OsaBoot</span>
        <div className="flex items-center gap-3 mt-3">
          <span className="w-12 h-12 rounded-2xl bg-black border border-white/15 grid place-items-center"><Eraser className="w-6 h-6" /></span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">EraseKEY</h2>
        </div>
        <p className="text-white/55 mt-4 leading-relaxed max-w-md">
          Une clé USB qui démarre un PC et efface vraiment ses disques, puis les relit pour le vérifier.
          En français, en cinq écrans : la clé et le système sont protégés, il faut taper EFFACER, et un rapport PDF reste sur la clé.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a href="/erasekey" className="font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            Découvrir <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="https://github.com/osayanis/erasekey" target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-white/80 bg-white/[0.06] border border-white/10 px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition">
            Code source
          </a>
        </div>
        <p className="text-xs text-white/30 mt-4">Créée avec OsaBoot (Mac) · efface les PC x86-64, UEFI ou BIOS · basée sur ShredOS et nwipe</p>
      </div>
    </div>
  );
}
