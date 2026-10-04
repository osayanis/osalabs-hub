"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Music, Rocket, ArrowRight, Activity, Terminal, Github, Twitter, CircleDot, Server } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// 3D Tilt Card Component
const TiltCard = ({ children, href, className = "" }: { children: React.ReactNode, href?: string, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`glass-card rounded-2xl p-6 relative group ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {children}
      </div>
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
        style={{ transform: "translateZ(10px)" }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block perspective-1000" style={{ perspective: "1000px" }}>
        {content}
      </Link>
    );
  }

  return <div style={{ perspective: "1000px" }}>{content}</div>;
};

export default function Hub() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const haloX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const haloY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const [stats, setStats] = useState({ users: 0, rooms: 0, commits: 0, ping: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const start = Date.now();
        const res = await fetch('/api/stats');
        const data = await res.json();
        const latency = Date.now() - start;
        
        setStats({
          users: data.activeUsers,
          rooms: data.activeRooms,
          commits: data.commits,
          ping: latency
        });
      } catch (err) {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center p-6 sm:p-10">
      
      {/* Interactive Halos */}
      <motion.div 
        style={{ x: haloX, y: haloY }}
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full pointer-events-none z-0"
      />
      <div className="fixed bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Top Navbar */}
      <div className="w-full max-w-4xl flex justify-between items-center relative z-10 mb-16">
        <div className="font-bold text-xl tracking-tighter">OsaLabs</div>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
          <CircleDot className="w-4 h-4 text-green-400 animate-pulse" />
          <span className="text-sm font-medium text-white/80">All Systems Operational</span>
        </div>
      </div>

      <div className="w-full max-w-4xl relative z-10 space-y-16 pb-20">
        
        {/* Header Section */}
        <section className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-[2rem] p-1 shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]"
          >
            <div className="w-full h-full bg-[#0a0a0a] rounded-[1.8rem] flex items-center justify-center">
              <span className="text-3xl font-black bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">Osa</span>
            </div>
          </motion.div>
          
          <h1 className="text-5xl font-extrabold tracking-tight">Le Labo de Yanis</h1>
          <p className="text-white/50 text-xl font-medium max-w-xl mx-auto">
            Design premium. Code exigeant. Découvrez l'écosystème OsaLabs.
          </p>
        </section>

        {/* Live Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Utilisateurs Actifs", value: stats.users || "...", icon: Activity, color: "text-green-400" },
            { label: "Salons Ouverts", value: stats.rooms || "...", icon: Music, color: "text-pink-400" },
            { label: "Commits", value: stats.commits || "...", icon: Terminal, color: "text-purple-400" },
            { label: "Ping", value: stats.ping ? `${stats.ping}ms` : "...", icon: Server, color: "text-blue-400" },
          ].map((stat, i) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center"
            >
              <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase font-bold tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        {/* Projects Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight border-b border-white/10 pb-4">Projets en production</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltCard href="https://listenparty.osalabs.fr" className="hover:bg-white/5 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 text-pink-500">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">ListenParty</h3>
              <p className="text-white/50 text-sm font-medium leading-relaxed">
                Écoutez Spotify ou Apple Music en temps réel avec vos amis, synchronisé à la seconde près.
              </p>
              <div className="mt-4 flex items-center gap-2 text-pink-400 text-sm font-bold">
                Lancer l'App <ArrowRight className="w-4 h-4" />
              </div>
            </TiltCard>

            <TiltCard className="opacity-60">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-white/40">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Projet Secret</h3>
              <p className="text-white/40 text-sm font-medium leading-relaxed">
                En cours de développement dans les laboratoires OsaLabs. Retournez ici bientôt.
              </p>
              <div className="mt-4 flex items-center gap-2 text-white/30 text-sm font-bold">
                Bientôt disponible
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Roadmap */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight border-b border-white/10 pb-4">Roadmap & Journal</h2>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="relative border-l-2 border-white/10 ml-3 space-y-8">
              
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-pink-500 rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                <span className="text-xs font-bold text-pink-400 mb-1 block">Aujourd'hui</span>
                <h4 className="text-lg font-bold mb-1">Refonte OsaLabs Hub v2</h4>
                <p className="text-white/50 text-sm">Déploiement de la nouvelle architecture Next.js avec effets 3D et Glassmorphism.</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[7px] top-1.5" />
                <span className="text-xs font-bold text-white/40 mb-1 block">T4 2026</span>
                <h4 className="text-lg font-bold mb-1 text-white/70">ListenParty Mac Bridge</h4>
                <p className="text-white/40 text-sm">Sortie de l'application compagnon Mac OS pour le pilotage d'Apple Music local.</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[7px] top-1.5" />
                <span className="text-xs font-bold text-white/40 mb-1 block">2027</span>
                <h4 className="text-lg font-bold mb-1 text-white/70">API Publique OsaLabs</h4>
                <p className="text-white/40 text-sm">Ouverture des endpoints temps réel pour les développeurs tiers.</p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
