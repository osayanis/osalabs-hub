"use client";

// Vitrine OsaHUB sur l'accueil : la vraie capture de l'app, qui s'incline vers la souris,
// le bouton d'installation et un lien vers sa page.
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { OSAHUB_DMG } from "@/components/osahub/links";

const LILAC = "#b9bcff", PINK = "#f9a8d4";

export function OsaHubShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 16 });
  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="relative grid lg:grid-cols-[1fr_1.15fr] gap-10 items-center rounded-[36px] p-6 sm:p-10 border border-white/10 overflow-hidden"
      style={{ background: `radial-gradient(circle at 100% 100%, ${LILAC}33, transparent 55%), radial-gradient(circle at 0% 0%, ${PINK}22, transparent 50%), rgba(255,255,255,0.03)` }}>
      <div className="relative">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LILAC }}>Nouveau · app macOS · toute la suite</span>
        <div className="flex items-center gap-3 mt-3">
          <img src="/osahub/icon.png" alt="" width={52} height={52} className="w-12 h-12" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">OsaHUB</h2>
        </div>
        <p className="text-white/55 mt-4 leading-relaxed max-w-md">
          Toutes les apps Mac d’OsaLabs, en une seule. OsaHUB installe OsaNotch, OsaWallpaper et OsaBoot en un clic,
          les garde à jour et se met à jour tout seul. Une seule mascotte dans ta barre des menus.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a href={OSAHUB_DMG} className="font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            <Download className="w-4 h-4" /> Télécharger OsaHUB
          </a>
          <a href="/osahub" className="font-display font-semibold text-white/80 bg-white/[0.06] border border-white/10 px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition">
            Découvrir <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-white/30 mt-4">Mac Apple Silicon · macOS 14 ou plus récent · gratuit · si macOS bloque : clic droit → Ouvrir</p>
      </div>

      <div ref={ref} onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0); }} style={{ perspective: 1200 }}>
        <motion.a href="/osahub" style={{ rotateX: rx, rotateY: ry }} className="block">
          <img src="/osahub/accueil.webp" alt="OsaHUB : « Bonjour, tout est à jour », le lancement rapide et les fiches d’OsaNotch et OsaWallpaper" width={1600} height={1126} loading="lazy"
            className="w-full h-auto block drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]" />
        </motion.a>
      </div>
    </div>
  );
}
