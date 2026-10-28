"use client";

// Vitrine OsaBoot sur l'accueil : la vraie capture de l'app en train de flasher,
// qui s'incline doucement vers la souris, et un lien vers sa page.
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { BOOT_DMG } from "@/components/boot/BootPage";

const PINK = "#f472b6", LILAC = "#a78bfa";

export function BootShowcase() {
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
      style={{ background: `radial-gradient(circle at 100% 100%, ${PINK}44, transparent 55%), radial-gradient(circle at 0% 0%, ${LILAC}33, transparent 50%), rgba(255,255,255,0.03)` }}>
      <div className="relative">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: PINK }}>Nouveau · app macOS · bêta</span>
        <div className="flex items-center gap-3 mt-3">
          <img src="/boot/icon.png" alt="" width={52} height={52} className="w-12 h-12" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">OsaBoot</h2>
        </div>
        <p className="text-white/55 mt-4 leading-relaxed max-w-md">
          Une image, une clé USB, et ça démarre. Linux et Raspberry Pi copiés puis vérifiés, comme balenaEtcher.
          Et en plus, une vraie clé d’installation Windows 10 / 11 depuis ton Mac, avec une mascotte qui fait le travail avec toi.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a href="/boot" className="font-display font-bold text-[#1a1a1a] bg-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
            Découvrir <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href={BOOT_DMG} className="font-display font-semibold text-white/80 bg-white/[0.06] border border-white/10 px-5 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition">
            <Download className="w-4 h-4" /> Télécharger
          </a>
        </div>
        <p className="text-xs text-white/30 mt-4">Mac Apple Silicon · macOS 14 ou plus récent · gratuit, code source public</p>
      </div>

      <div ref={ref} onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0); }} style={{ perspective: 1200 }}>
        <motion.a href="/boot" style={{ rotateX: rx, rotateY: ry }} className="block">
          <img src="/boot/working.webp" alt="OsaBoot en train de préparer une clé Windows 11 : le disque tourne, la mascotte travaille, la clé se remplit" width={1400} height={1026} loading="lazy"
            className="w-full h-auto block" />
        </motion.a>
      </div>
    </div>
  );
}
