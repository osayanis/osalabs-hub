"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Rocket, ArrowUpRight, MonitorUp, PenLine, Music, CircleDot, ChevronDown } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

// Carte avec légère inclinaison 3D + lueur colorée au survol.
const TiltCard = ({ children, href, glow }: { children: React.ReactNode; href?: string; glow: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 300, damping: 30 });
  const my = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-7deg", "7deg"]);

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
      whileHover={{ y: -4 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-card rounded-2xl p-6 h-full relative group transition-colors hover:border-white/20"
    >
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" style={{ background: glow }} />
      <div style={{ transform: "translateZ(28px)" }} className="relative">{children}</div>
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
    desc: "Écoute synchronisée : lancez le même morceau, à la seconde, entre amis.", glow: "radial-gradient(circle at 30% 0%, rgba(236,72,153,0.35), transparent 70%)" },
  { name: "OsaDrop", href: "https://osadrop.osalabs.fr", icon: Rocket,
    desc: "Transfert de fichiers P2P via WebRTC. Aucun stockage serveur.", glow: "radial-gradient(circle at 30% 0%, rgba(59,130,246,0.35), transparent 70%)" },
  { name: "OsaCast", href: "https://osacast.osalabs.fr", icon: MonitorUp,
    desc: "Partage d'écran instantané en P2P. Un clic, rien à installer.", glow: "radial-gradient(circle at 30% 0%, rgba(99,102,241,0.35), transparent 70%)" },
  { name: "OsaBoard", href: "https://osaboard.osalabs.fr", icon: PenLine,
    desc: "Tableau blanc collaboratif en temps réel, sans latence.", glow: "radial-gradient(circle at 30% 0%, rgba(20,184,166,0.35), transparent 70%)" },
];

const timeline = [
  { when: "Aujourd'hui", title: "OsaCast & OsaBoard", desc: "Partage d'écran WebRTC et tableau blanc collaboratif." },
  { when: "Cette semaine", title: "OsaDrop", desc: "Transfert de fichiers P2P sans serveur." },
  { when: "À venir", title: "OsaNotch", desc: "L'app compagnon macOS : encoche vivante, pont Apple Music.", soon: true },
];

const blob = (duration: number) => ({
  animate: { x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] },
  transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
});

export default function Hub() {
  return (
    <div className="relative overflow-hidden">
      {/* Aurore animée en fond */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div {...blob(22)} className="absolute top-[-10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-violet-600/25 blur-[130px]" />
        <motion.div {...blob(28)} className="absolute top-[5%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/20 blur-[140px]" />
        <motion.div {...blob(25)} className="absolute top-[20%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-fuchsia-600/15 blur-[150px]" />
      </div>
      {/* Grain/vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

      {/* Barre du haut */}
      <nav className="fixed top-0 inset-x-0 z-20 flex justify-between items-center px-6 sm:px-10 py-6 backdrop-blur-sm">
        <span className="font-semibold text-[15px] tracking-tight">OsaLabs</span>
        <div className="flex items-center gap-2 text-[13px] text-white/60">
          <CircleDot className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tous les services en ligne</span>
        </div>
      </nav>

      {/* HERO plein écran */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="w-24 h-24 mb-10 rounded-[1.7rem] bg-gradient-to-br from-violet-500 to-fuchsia-500 p-[1.5px] shadow-[0_0_60px_-10px_rgba(167,90,255,0.55)]"
        >
          <div className="w-full h-full rounded-[1.6rem] bg-[#0a0a0a] flex items-center justify-center">
            <span className="text-2xl font-semibold tracking-tight">Osa</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl sm:text-8xl font-semibold tracking-[-0.045em] leading-[0.95] bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent"
        >
          Le labo de Yanis
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-7 text-xl sm:text-2xl text-white/50 max-w-xl leading-relaxed"
        >
          Un écosystème d'outils temps réel, pensés avec soin.
        </motion.p>

        <motion.a
          href="#projets"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-10 text-white/30 hover:text-white/60 transition-colors"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.a>
      </section>

      {/* Contenu */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-28 space-y-24">
        {/* Projets */}
        <section id="projets" className="scroll-mt-24">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/40 mb-8">Projets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TiltCard href={p.href} glow={p.glow}>
                  <div className="flex items-center gap-3 mb-4">
                    {p.logo ? (
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/10">
                        <Image src={p.logo} alt={p.name} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                        <p.icon className="w-5 h-5" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                    <ArrowUpRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Journal */}
        <section>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/40 mb-8">Journal</h2>
          <div className="relative border-l border-white/10 ml-1.5 space-y-8">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ x: 16, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-6"
              >
                <div className={`absolute w-2.5 h-2.5 rounded-full -left-[5.5px] top-1.5 ${t.soon ? "bg-white/25" : "bg-gradient-to-br from-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(167,90,255,0.6)]"}`} />
                <span className="text-xs text-white/35">{t.when}</span>
                <h4 className={`text-[15px] font-medium mt-0.5 ${t.soon ? "text-white/60" : "text-white"}`}>{t.title}</h4>
                <p className="text-sm text-white/40 mt-0.5 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="text-center text-[13px] text-white/25 pt-8">OsaLabs · Yanis</footer>
      </main>
    </div>
  );
}
