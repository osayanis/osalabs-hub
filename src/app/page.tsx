"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, ArrowUpRight, MonitorUp, PenLine, Music } from "lucide-react";
import Link from "next/link";

/* ---------- Petits composants "canvas" façon Figma ---------- */

// Cadre de sélection avec poignées aux coins.
function Frame({ color, children, className = "", style }: { color: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const handle = "absolute w-3 h-3 rounded-[3px] bg-[#1a1a1a] border-2";
  return (
    <div className={`relative inline-block ${className}`} style={{ ...style }}>
      <div className="absolute inset-0 rounded-[6px] border-2 pointer-events-none" style={{ borderColor: color }} />
      <div className={handle} style={{ top: -6, left: -6, borderColor: color }} />
      <div className={handle} style={{ top: -6, right: -6, borderColor: color }} />
      <div className={handle} style={{ bottom: -6, left: -6, borderColor: color }} />
      <div className={handle} style={{ bottom: -6, right: -6, borderColor: color }} />
      {children}
    </div>
  );
}

// Curseur multijoueur (flèche + étiquette).
function Cursor({ color, label, className = "", style }: { color: string; label?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute flex items-start gap-1 ${className}`} style={style}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))" }}>
        <path d="M5 3l5 15 2.5-6.5L19 9 5 3z" fill={color} stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {label && (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-[#1a1a1a] font-display" style={{ background: color }}>{label}</span>
      )}
    </div>
  );
}

// Mascotte Osa (fantôme crème, clin d'œil au Notch).
function Mascot({ size = 40 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-[42%] bg-[#fdfcf7] shadow-inner" />
      <div className="absolute rounded-full bg-[#2a2a2a]" style={{ width: size * 0.16, height: size * 0.2, top: size * 0.36, left: size * 0.3 }} />
      <div className="absolute rounded-full bg-[#2a2a2a]" style={{ width: size * 0.16, height: size * 0.2, top: size * 0.36, left: size * 0.56 }} />
    </div>
  );
}

const float = (d: number, delay = 0) => ({
  animate: { y: [0, -9, 0] },
  transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/* ---------- Cartes projets ---------- */

const projects = [
  { name: "OsaParty", href: "https://osaparty.osalabs.fr", logo: "/osaparty_logo.jpg", icon: Music, color: "#ec4899",
    desc: "Écoute synchronisée : lancez le même morceau, à la seconde, entre amis." },
  { name: "OsaDrop", href: "https://osadrop.osalabs.fr", icon: Rocket, color: "#3b82f6",
    desc: "Transfert de fichiers P2P via WebRTC. Aucun stockage serveur." },
  { name: "OsaCast", href: "https://osacast.osalabs.fr", icon: MonitorUp, color: "#6366f1",
    desc: "Partage d'écran instantané en P2P. Un clic, rien à installer." },
  { name: "OsaBoard", href: "https://osaboard.osalabs.fr", icon: PenLine, color: "#14b8a6",
    desc: "Tableau blanc collaboratif en temps réel, sans latence." },
];

function ProjectCard({ p, i }: { p: typeof projects[number]; i: number }) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      whileHover={{ y: -5, rotate: i % 2 ? 0.6 : -0.6 }}
    >
      <Link href={p.href} target="_blank"
        className="group block rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-white/25 transition-colors relative overflow-hidden">
        <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity" style={{ background: p.color }} />
        <div className="relative flex items-center gap-3 mb-4">
          {p.logo ? (
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2" style={{ borderColor: p.color }}>
              <Image src={p.logo} alt={p.name} fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#1a1a1a]" style={{ background: p.color }}>
              <p.icon className="w-5 h-5" />
            </div>
          )}
          <h3 className="text-xl font-display font-semibold tracking-tight">{p.name}</h3>
          <div className="ml-auto w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#1a1a1a] transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <p className="relative text-sm text-white/50 leading-relaxed">{p.desc}</p>
      </Link>
    </motion.div>
  );
}

export default function Hub() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1a1a]">
      {/* léger quadrillage de "canvas" */}
      <div className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

      {/* Barre du haut */}
      <nav className="relative z-20 flex justify-between items-center px-6 sm:px-10 py-6">
        <span className="font-display font-semibold text-lg tracking-tight">OsaLabs</span>
        <div className="flex items-center gap-2 text-[13px] text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Tous les services en ligne</span>
        </div>
      </nav>

      {/* HERO canvas */}
      <section className="relative z-10 min-h-[82vh] flex flex-col items-center justify-center px-4">
        <div className="relative">
          {/* Tag écosystème (violet) */}
          <motion.div {...float(5)} className="absolute -top-20 left-2 sm:left-6 z-20 -rotate-3">
            <Frame color="#a78bfa">
              <span className="block px-5 py-2 font-display font-semibold text-2xl sm:text-3xl text-[#a78bfa]">ÉCOSYSTÈME</span>
            </Frame>
          </motion.div>

          {/* Mascotte (rose) */}
          <motion.div {...float(6, 0.5)} className="absolute -top-24 right-0 sm:-right-4 z-20 rotate-6">
            <Frame color="#f472b6">
              <div className="p-3"><Mascot size={44} /></div>
            </Frame>
          </motion.div>

          {/* Pastille année (verte) + curseur */}
          <motion.div {...float(4.5, 0.2)} className="absolute top-2 -left-24 sm:-left-36 z-20 hidden sm:block">
            <span className="font-display font-bold text-sm px-4 py-1.5 rounded-full bg-emerald-300 text-[#1a1a1a]">2026</span>
            <Cursor color="#6ee7b7" style={{ top: -6, right: -22 }} />
          </motion.div>

          {/* Bulle HI (jaune) */}
          <motion.div {...float(5.5, 0.8)} className="absolute -top-16 -right-28 sm:-right-40 z-20 hidden sm:block">
            <span className="font-display font-bold text-sm px-4 py-1.5 rounded-2xl rounded-bl-sm bg-amber-300 text-[#1a1a1a]">SALUT !</span>
          </motion.div>

          {/* Titre principal (bleu) */}
          <Frame color="#4f9dfb">
            <h1 className="px-6 sm:px-10 py-4 font-display font-bold tracking-tight text-white text-6xl sm:text-8xl lg:text-9xl leading-none select-none">
              OsaLabs
            </h1>
          </Frame>

          {/* Pastille nom (bleu) + curseur */}
          <motion.div {...float(5, 0.4)} className="absolute -bottom-16 right-2 sm:right-8 z-20">
            <div className="flex items-center gap-2 font-display font-bold text-base sm:text-lg px-5 py-2.5 rounded-full bg-[#4f9dfb] text-white shadow-lg shadow-[#4f9dfb]/30">
              PAR YANIS <Mascot size={22} />
            </div>
            <Cursor color="#4f9dfb" style={{ top: -14, left: -18 }} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-28 text-center text-lg sm:text-xl text-white/45 max-w-lg"
        >
          Un écosystème d'outils temps réel, pensés avec soin.
        </motion.p>
      </section>

      {/* Contenu */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-28 space-y-20">
        <section id="projets" className="scroll-mt-24">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-8">Projets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
          </div>
        </section>

        <section>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-8">Journal</h2>
          <div className="relative border-l border-white/10 ml-1.5 space-y-8">
            {[
              { when: "Aujourd'hui", title: "OsaCast & OsaBoard", desc: "Partage d'écran WebRTC et tableau blanc collaboratif.", c: "#14b8a6" },
              { when: "Cette semaine", title: "OsaDrop", desc: "Transfert de fichiers P2P sans serveur.", c: "#3b82f6" },
              { when: "À venir", title: "OsaNotch", desc: "L'app compagnon macOS : encoche vivante, pont Apple Music.", soon: true, c: "#ffffff" },
            ].map((t, i) => (
              <motion.div key={i} initial={{ x: 14, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.07 }} className="relative pl-6">
                <div className="absolute w-3 h-3 rounded-full -left-[6.5px] top-1.5" style={{ background: t.soon ? "rgba(255,255,255,0.25)" : t.c, boxShadow: t.soon ? "none" : `0 0 10px ${t.c}` }} />
                <span className="text-xs text-white/35">{t.when}</span>
                <h4 className={`font-display text-base font-medium mt-0.5 ${t.soon ? "text-white/60" : "text-white"}`}>{t.title}</h4>
                <p className="text-sm text-white/40 mt-0.5 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="text-center text-[13px] text-white/25 pt-8 font-display">OsaLabs · Yanis</footer>
      </main>
    </div>
  );
}
