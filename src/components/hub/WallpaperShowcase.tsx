"use client";

// Vitrine OsaWallpaper sur l'accueil : la vraie capture de l'écran verrouillé,
// qui s'incline doucement vers la souris, et un lien vers sa page.
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { DMG } from "@/components/wallpaper/WallpaperPage";

const SUNSET = "#f0876a", PLUM = "#7b2d5f";

export function WallpaperShowcase() {
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
      style={{ background: `radial-gradient(circle at 0% 100%, ${PLUM}66, transparent 55%), radial-gradient(circle at 100% 0%, ${SUNSET}33, transparent 50%), rgba(255,255,255,0.03)` }}>
      <div ref={ref} onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0); }} className="order-2 lg:order-1" style={{ perspective: 1200 }}>
        <motion.a href="/wallpaper" style={{ rotateX: rx, rotateY: ry }}
          className="block rounded-[18px] p-1.5 bg-gradient-to-b from-white/20 to-white/[0.04] shadow-[0_40px_80px_-30px_rgba(123,45,95,0.9)]">
          <img src="/wallpaper/lockscreen.jpg" alt="OsaWallpaper sur l’écran verrouillé d’un Mac" width={1600} height={1040} loading="lazy"
            className="w-full h-auto rounded-[13px] block" />
        </motion.a>
      </div>

      <div className="relative order-1 lg:order-2">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: SUNSET }}>Nouveau · app macOS</span>
        <div className="flex items-center gap-3 mt-3">
          <img src="/wallpaper/icon.png" alt="" width={52} height={52} className="w-12 h-12" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">OsaWallpaper</h2>
        </div>
        <p className="text-white/55 mt-4 leading-relaxed max-w-md">
          Ton écran verrouillé prend les couleurs de ta musique : la pochette en fond, l’heure en grand, un lecteur en verre et les paroles.
          Et partout, des pastilles AirPods, charge, volume et luminosité.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a href="/wallpaper" className="font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            Découvrir <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href={DMG} className="font-display font-semibold text-white/80 bg-white/[0.06] border border-white/10 px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition">
            <Download className="w-4 h-4" /> Télécharger
          </a>
        </div>
        <p className="text-xs text-white/30 mt-4">macOS 14 ou plus récent · gratuit, code source public</p>
      </div>
    </div>
  );
}
