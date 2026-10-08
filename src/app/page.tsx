"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Rocket, ArrowUpRight, MonitorUp, PenLine, Music, CircleDot } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

// Carte avec une légère inclinaison 3D au survol.
const TiltCard = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 300, damping: 30 });
  const my = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-6deg", "6deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const card = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-card rounded-2xl p-6 h-full transition-colors hover:border-white/15"
    >
      <div style={{ transform: "translateZ(24px)" }}>{children}</div>
    </motion.div>
  );

  return href ? (
    <Link href={href} target="_blank" style={{ perspective: "1000px" }} className="block">{card}</Link>
  ) : (
    <div style={{ perspective: "1000px" }}>{card}</div>
  );
};

const projects = [
  { name: "OsaParty", href: "https://osaparty.osalabs.fr", logo: "/osaparty_logo.jpg", icon: Music,
    desc: "Écoute synchronisée : lancez le même morceau, à la seconde, entre amis." },
  { name: "OsaDrop", href: "https://osadrop.osalabs.fr", icon: Rocket,
    desc: "Transfert de fichiers P2P via WebRTC. Aucun stockage serveur." },
  { name: "OsaCast", href: "https://osacast.osalabs.fr", icon: MonitorUp,
    desc: "Partage d'écran instantané en P2P. Un clic, rien à installer." },
  { name: "OsaBoard", href: "https://osaboard.osalabs.fr", icon: PenLine,
    desc: "Tableau blanc collaboratif en temps réel, sans latence." },
];

const timeline = [
  { when: "Aujourd'hui", title: "OsaCast & OsaBoard", desc: "Partage d'écran WebRTC et tableau blanc collaboratif." },
  { when: "Cette semaine", title: "OsaDrop", desc: "Transfert de fichiers P2P sans serveur." },
  { when: "À venir", title: "OsaNotch", desc: "L'app compagnon macOS : encoche vivante, pont Apple Music.", soon: true },
];

export default function Hub() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center px-6 py-10 sm:py-16">
      {/* Halo unique, discret */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(120,80,220,0.14)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Barre du haut */}
      <nav className="w-full max-w-3xl flex justify-between items-center relative z-10 mb-24">
        <span className="font-semibold text-[15px] tracking-tight">OsaLabs</span>
        <div className="flex items-center gap-2 text-[13px] text-white/50">
          <CircleDot className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tous les services en ligne</span>
        </div>
      </nav>

      <main className="w-full max-w-3xl relative z-10 space-y-24 pb-24">
        {/* Hero */}
        <section className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <span className="text-lg font-semibold tracking-tight">Osa</span>
          </motion.div>

          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-5xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]"
          >
            Le labo de Yanis
          </motion.h1>
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 text-lg text-white/45 max-w-md mx-auto leading-relaxed"
          >
            Un écosystème d'outils temps réel, pensés avec soin.
          </motion.p>
        </section>

        {/* Projets */}
        <section>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/35 mb-6">Projets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <TiltCard key={p.name} href={p.href}>
                <div className="flex items-center gap-3 mb-4">
                  {p.logo ? (
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                      <Image src={p.logo} alt={p.name} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                      <p.icon className="w-5 h-5" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                  <ArrowUpRight className="w-4 h-4 text-white/30 ml-auto" />
                </div>
                <p className="text-sm text-white/45 leading-relaxed">{p.desc}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Journal */}
        <section>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/35 mb-6">Journal</h2>
          <div className="relative border-l border-white/10 ml-1.5 space-y-8">
            {timeline.map((t, i) => (
              <div key={i} className="relative pl-6">
                <div className={`absolute w-2 h-2 rounded-full -left-[4.5px] top-2 ${t.soon ? "bg-white/25" : "bg-white"}`} />
                <span className="text-xs text-white/35">{t.when}</span>
                <h4 className={`text-[15px] font-medium mt-0.5 ${t.soon ? "text-white/60" : "text-white"}`}>{t.title}</h4>
                <p className="text-sm text-white/40 mt-0.5 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 text-[13px] text-white/25">
        OsaLabs · Yanis
      </footer>
    </div>
  );
}
