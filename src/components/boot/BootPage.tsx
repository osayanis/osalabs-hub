"use client";

// Page d'OsaBoot (osalabs.fr/boot), au style des apps OsaLabs (OsaDrop, OsaWallpaper…).
// Les captures sont de vraies captures de l'app en mode démo (fausse ISO, fausse clé).
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight, BatteryCharging, Check, CircleAlert, Download, HardDrive, KeyRound, MousePointerClick,
  PartyPopper, Scissors, ShieldCheck, Terminal, Usb, Zap,
} from "lucide-react";
import Mascot, { type Mood } from "@/components/osa/Mascot";
import { Island, OsaBox, Pill, Shell, useNotices } from "@/components/osa/Kit";

export const BOOT_DMG = "https://github.com/osayanis/osaboot/releases/latest/download/OsaBoot.dmg";
export const BOOT_REPO = "https://github.com/osayanis/osaboot";
const ACCENT = "#f472b6";
const ACCENT2 = "#a78bfa";

// Les étapes, avec la vraie capture de chaque état de l'app
const STEPS = [
  { id: "empty", label: "Salut", icon: MousePointerClick, text: "La mascotte t’accueille : glisse une image sur la fenêtre, ou clique sur le disque." },
  { id: "ready", label: "Prêt", icon: Usb, text: "Ta clé apparaît toute seule. OsaBoot a reconnu Windows 11 et sait déjà qu’il faudra découper install.wim." },
  { id: "confirm", label: "Sûr ?", icon: CircleAlert, text: "Une dernière question, qui nomme la clé et ce qu’elle contient. Jamais le disque de ton Mac." },
  { id: "working", label: "Ça flashe", icon: Zap, text: "Le disque tourne, les données voyagent, la clé se remplit. Vitesse et temps restant en direct." },
  { id: "done", label: "C’est prêt", icon: PartyPopper, text: "Confettis. La mascotte te dit quelle touche presser au démarrage du PC." },
] as const;

// « Essaie » : ce qu'OsaBoot fait selon l'image choisie
const IMAGES = [
  { id: "ubuntu", name: "Ubuntu 24.04", file: "ubuntu-24.04-desktop-amd64.iso", size: "6,1 Go", key: "8 Go", kind: "Image hybride",
    steps: ["Copie octet par octet sur la clé", "Relecture complète de la clé", "Empreinte SHA-256 comparée à l’image", "Éjection : tu peux la débrancher"] },
  { id: "pi", name: "Raspberry Pi OS", file: "raspios-bookworm-arm64.img (décompressée)", size: "5,4 Go", key: "8 Go", kind: "Image disque",
    steps: ["Copie octet par octet sur la clé", "Relecture complète", "Empreinte SHA-256 comparée à l’image", "Éjection : prête pour le Pi"] },
  { id: "win", name: "Windows 11", file: "Win11_25H2_French_x64.iso", size: "7,3 Go", key: "8 Go", kind: "Installateur Windows",
    steps: ["Clé formatée en FAT32, lisible par tous les PC en UEFI", "Copie des fichiers de l’ISO", "install.wim (6,2 Go) coupé en morceaux de moins de 4 Go", "En option : Windows 11 sans TPM ni Secure Boot", "Éjection : démarre le PC sur la clé"] },
] as const;

const FEATURES = [
  { I: ShieldCheck, t: "Jamais le mauvais disque", d: "Ni le disque du Mac, ni un disque de démarrage, ni une image montée. Et la clé est relue juste avant d’effacer." },
  { I: Check, t: "Vérifié", d: "Après l’écriture, toute la clé est relue et son empreinte SHA-256 comparée à celle de l’image." },
  { I: KeyRound, t: "Ton mot de passe reste chez macOS", d: "L’app ne tourne jamais en administrateur : macOS te demande le mot de passe dans sa propre fenêtre." },
  { I: BatteryCharging, t: "Pas de veille", d: "Le Mac reste éveillé pendant l’écriture, même longue. Et tu peux annuler à tout moment." },
];

type Zone = null | "steps" | "try" | "linux" | "windows" | "safe" | "install" | "download";
const SAY: Record<Exclude<Zone, null>, [string, Mood]> = {
  steps: ["C’est moi, là, au milieu !", "excited"],
  try: ["Choisis une image, je t’explique", "think"],
  linux: ["Celle-là, je la copie telle quelle", "work"],
  windows: ["Windows ? Pas de souci 💪", "cheer"],
  safe: ["Je vérifie tout deux fois", "search"],
  install: ["Une minute, promis", "think"],
  download: ["Allez, on flashe ?", "love"],
};

export function BootPage() {
  const { notice, notify } = useNotices();
  const [zone, setZone] = useState<Zone>(null);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const lines: [string, string][] = [["Clé SanDisk branchée", "🔌"], ["Écriture · 62 %", "⚡"], ["Vérifiée · SHA-256 identique", "✅"], ["Clé prête à démarrer", "🎉"]];
    let i = 0;
    const t = setInterval(() => { const [text, icon] = lines[i % lines.length]; notify(text, icon, "good"); i++; }, 4200);
    return () => clearInterval(t);
  }, [notify]);

  const [say, mood] = zone ? SAY[zone] : ["Une clé USB qui démarre, même Windows !", "happy" as Mood];
  const enter = (z: Zone) => (p: { x: number; y: number } | null) => { setHover(p); setZone(p ? z : null); };

  return (
    <Shell
      app="osaboot" accent={ACCENT} accent2={ACCENT2}
      island={<Island title="OsaBoot" status="app macOS · bêta" accent={ACCENT} live notice={notice} />}
      right={<Pill href={BOOT_REPO}><span className="hidden sm:inline">GitHub</span> <ArrowUpRight className="w-4 h-4" /></Pill>}
    >
      <div className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col items-center">
        {/* ───────── Accroche ───────── */}
        <div className="relative mt-4">
          <Mascot size={104} mood={mood} say={say} holding={zone === "try" ? "file" : null} lookAt={hover} glow={`${ACCENT}55`} bubble="right" />
        </div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="osa-display text-center font-extrabold leading-[0.95] mt-6" style={{ fontSize: "clamp(40px, 7.4vw, 84px)" }}>
          Une image, une clé,<br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, #fbcfe8 45%, ${ACCENT2})` }}>et ça démarre.</span>
        </motion.h1>
        <p className="text-white/60 text-center mt-5 max-w-[620px] text-lg leading-relaxed">
          Comme balenaEtcher pour Linux et Raspberry Pi. Et en plus, une vraie clé d’installation <b className="text-white/85 font-semibold">Windows 10 / 11</b> depuis ton Mac, ce qu’Etcher ne sait pas faire.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-7" onMouseEnter={() => setZone("download")} onMouseLeave={() => setZone(null)}>
          <a href={BOOT_DMG} className="h-12 px-6 rounded-full bg-[#fdfcf7] text-black font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition shadow-[0_10px_40px_-10px_rgba(244,114,182,0.8)]">
            <Download className="w-4 h-4" /> Télécharger pour Mac
          </a>
          <a href={BOOT_REPO} target="_blank" rel="noreferrer" className="h-12 px-5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] font-semibold flex items-center gap-2 transition">
            Code source <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-[11px] text-white/35 mt-3 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Gratuit, code public · Mac Apple Silicon · macOS 14 ou plus récent · bêta
        </p>

        <div className="w-full mt-12" onMouseEnter={() => setZone("steps")} onMouseLeave={() => setZone(null)}>
          <Steps />
        </div>

        {/* ───────── Deux familles d'images ───────── */}
        <Section kicker="Ce qu’il sait faire" title={<>Linux, Raspberry Pi…<br /><span className="text-white/40">et Windows.</span></>}
          intro="Deux familles d’images, deux façons de faire. OsaBoot reconnaît tout seul laquelle tu lui donnes." />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 w-full mt-8">
          <OsaBox accent={ACCENT} onHover={enter("linux")} active={zone === "linux"}>
            <div className="p-7 h-full">
              <span className="w-11 h-11 rounded-full grid place-items-center" style={{ background: `${ACCENT2}22`, color: ACCENT2 }}><Terminal className="w-5 h-5" /></span>
              <p className="osa-display text-2xl font-extrabold mt-4 leading-tight">Linux, Raspberry Pi, outils</p>
              <p className="text-sm text-white/50 mt-2 leading-relaxed">
                L’image est copiée octet par octet sur la clé, comme le fait Etcher, puis <b className="text-white/80">relue et comparée</b> par empreinte SHA-256. Si un seul octet diffère, tu le sais.
              </p>
              <p className="text-xs text-white/35 mt-4">.iso · .img · .raw · .bin</p>
            </div>
          </OsaBox>
          <OsaBox accent={ACCENT} onHover={enter("windows")} active={zone === "windows"}>
            <div className="p-7 h-full">
              <span className="w-11 h-11 rounded-full grid place-items-center" style={{ background: "#5cb8ff22", color: "#5cb8ff" }}><WinLogo /></span>
              <p className="osa-display text-2xl font-extrabold mt-4 leading-tight">Windows 10 / 11</p>
              <p className="text-sm text-white/50 mt-2 leading-relaxed">
                Copiée telle quelle, une ISO Windows ne démarre pas. OsaBoot formate la clé en <b className="text-white/80">FAT32</b>, y copie les fichiers et <b className="text-white/80">découpe install.wim</b> s’il dépasse 4 Go.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 text-xs text-white/55">
                <span className="px-3 py-1 rounded-full bg-white/[0.06] flex items-center gap-1.5"><Scissors className="w-3.5 h-3.5" /> install.wim découpé</span>
                <span className="px-3 py-1 rounded-full bg-white/[0.06]">Windows 11 sans TPM (option)</span>
              </div>
            </div>
          </OsaBox>
        </div>

        {/* ───────── Essaie ───────── */}
        <Section kicker="Essaie" title={<>Qu’est-ce que tu flashes ?<br /><span className="text-white/40">Choisis, je t’explique.</span></>}
          intro="Ce qu’OsaBoot fera, étape par étape, selon l’image que tu lui donnes." />
        <div className="w-full mt-8" onMouseEnter={() => setZone("try")} onMouseLeave={() => setZone(null)}>
          <TryIt />
        </div>

        {/* ───────── Sécurité ───────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-20">
          {FEATURES.map(({ I, t, d }) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("safe")}>
              <div className="p-5 h-full">
                <span className="w-10 h-10 rounded-full bg-white/[0.08] grid place-items-center"><I className="w-5 h-5" /></span>
                <p className="osa-display text-lg font-bold mt-3.5 leading-tight">{t}</p>
                <p className="text-[13px] text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </div>
            </OsaBox>
          ))}
        </div>

        {/* ───────── Installation + cas d'erreur ───────── */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 w-full mt-5">
          <OsaBox accent={ACCENT} onHover={enter("install")} active={zone === "install"}>
            <div className="p-7 h-full flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Installation</p>
              <p className="osa-display text-3xl font-extrabold mt-3 leading-tight">Prêt en<br /><span className="text-white/40">une minute.</span></p>
              <ol className="mt-5 space-y-3.5">
                {[
                  ["Télécharge", "Ouvre OsaBoot.dmg et glisse l’app dans Applications."],
                  ["Ouvre-la", "La première fois : clic droit → Ouvrir (l’app n’est pas notarisée)."],
                  ["Flashe", "Glisse une image, branche une clé, clique sur Flasher (ou ⌘ ↩)."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-7 h-7 flex-none rounded-full bg-[#fdfcf7] text-black grid place-items-center text-sm font-bold">{i + 1}</span>
                    <div><p className="font-semibold text-[15px]">{t}</p><p className="text-sm text-white/45">{d}</p></div>
                  </li>
                ))}
              </ol>
              <p className="mt-auto pt-6 text-xs text-white/45">Il te propose lui-même ses mises à jour, jamais pendant une écriture.</p>
            </div>
          </OsaBox>
          <OsaBox accent={ACCENT} onHover={enter("safe")} active={zone === "safe"}>
            <div className="p-2 sm:p-3 h-full flex flex-col">
              <img src="/boot/failed.webp" alt="OsaBoot quand la vérification échoue : la mascotte est triste et explique le problème" width={1400} height={1026} loading="lazy" className="w-full h-auto block" />
              <p className="text-sm text-white/50 px-4 pb-4 -mt-1 leading-relaxed">
                <b className="text-white/80">Et si ça rate ?</b> Pas de code d’erreur : la mascotte te dit ce qui ne va pas, en français, et ce que tu peux faire.
              </p>
            </div>
          </OsaBox>
        </div>

        {/* ───────── Dernier appel ───────── */}
        <div className="w-full mt-16 rounded-[36px] overflow-hidden relative border border-white/10" onMouseEnter={() => setZone("download")} onMouseLeave={() => setZone(null)}
          style={{ background: `radial-gradient(circle at 15% 100%, ${ACCENT}55, transparent 55%), radial-gradient(circle at 90% 0%, ${ACCENT2}44, transparent 50%), #111114` }}>
          <div className="relative px-6 py-16 sm:py-20 flex flex-col items-center text-center">
            <img src="/boot/icon.png" alt="" width={96} height={96} className="w-20 h-20" />
            <p className="osa-display font-extrabold leading-[0.95] mt-5" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Une clé qui traîne ?<br />Fais-en une clé qui démarre.</p>
            <a href={BOOT_DMG} className="mt-8 h-12 px-6 rounded-full bg-[#fdfcf7] text-black font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
              <Download className="w-4 h-4" /> Télécharger OsaBoot
            </a>
            <p className="text-[11px] text-white/50 mt-3">Gratuit · Mac Apple Silicon · macOS 14 ou plus récent · 1,3 Mo</p>
          </div>
        </div>

        <p className="text-[11px] text-white/30 text-center max-w-[720px] mt-10 leading-relaxed">
          Version bêta : l’écriture et la préparation d’une clé Windows ont été testées sur une vraie clé USB, mais pas encore le démarrage d’un vrai PC sur une ISO Windows 11.
          Windows : PC en UEFI seulement. La découpe d’install.wim utilise wimlib (GPLv3), embarqué dans l’app. Captures : mode démo de l’app (fausse ISO, fausse clé).
        </p>
      </div>
    </Shell>
  );
}

function Section({ kicker, title, intro }: { kicker: string; title: ReactNode; intro: string }) {
  return (
    <div className="text-center mt-24 max-w-[640px]">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{kicker}</p>
      <h2 className="osa-display font-extrabold leading-[0.98] mt-3" style={{ fontSize: "clamp(32px, 5vw, 54px)" }}>{title}</h2>
      <p className="text-white/55 mt-4 leading-relaxed">{intro}</p>
    </div>
  );
}

function WinLogo() {
  return (
    <span className="grid grid-cols-2 gap-[2px] w-[18px] h-[18px]">
      {[0, 1, 2, 3].map((i) => <span key={i} className="bg-current rounded-[1px]" />)}
    </span>
  );
}

/** Les vraies captures de l'app, étape par étape, qui défilent toutes seules. */
function Steps() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((v) => (v + 1) % STEPS.length), 4600);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <div className="flex flex-col items-center">
      <Tilt>
        <div className="relative w-full max-w-[900px] mx-auto" style={{ aspectRatio: "1400 / 1026" }}>
          <div className="absolute inset-[8%] rounded-full blur-3xl opacity-50" style={{ background: `radial-gradient(circle, ${ACCENT}66, transparent 70%)` }} />
          <AnimatePresence initial={false}>
            <motion.img key={STEPS[i].id} src={`/boot/${STEPS[i].id}.webp`} alt={`OsaBoot : ${STEPS[i].text}`} width={1400} height={1026}
              initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-contain" />
          </AnimatePresence>
        </div>
      </Tilt>
      <div className="mt-2 flex p-1 rounded-full bg-white/[0.06] border border-white/10 max-w-full overflow-x-auto">
        {STEPS.map((s, k) => (
          <button key={s.id} onClick={() => { setI(k); setAuto(false); }}
            className={`relative h-10 px-3 sm:px-4 rounded-full text-[13px] sm:text-sm font-semibold whitespace-nowrap flex items-center gap-2 transition-colors ${i === k ? "text-black" : "text-white/65 hover:text-white"}`}>
            {i === k && <motion.span layoutId="boot-step" className="absolute inset-0 rounded-full bg-[#fdfcf7]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <s.icon className="relative w-4 h-4 hidden sm:block" /><span className="relative">{s.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={STEPS[i].id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          className="text-sm text-white/50 mt-3 text-center px-4 max-w-[560px]">{STEPS[i].text}</motion.p>
      </AnimatePresence>
      <p className="text-[11px] text-white/30 mt-1">Vraies captures de l’app (mode démo : rien n’est écrit).</p>
    </div>
  );
}

/** Choisis une image : OsaBoot dit ce qu'il va faire, étape par étape. */
function TryIt() {
  const [k, setK] = useState(2);
  const img = IMAGES[k];
  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-5 items-stretch">
      <div className="flex flex-col gap-2">
        {IMAGES.map((m, j) => (
          <button key={m.id} onClick={() => setK(j)}
            className={`text-left rounded-2xl p-4 border transition ${j === k ? "bg-[#fdfcf7] text-black border-transparent" : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]"}`}>
            <p className="font-bold flex items-center gap-2">{m.id === "win" ? <WinLogo /> : <HardDrive className="w-4 h-4" />} {m.name}</p>
            <p className={`text-xs mt-1 truncate ${j === k ? "text-black/55" : "text-white/40"}`}>{m.file} · {m.size}</p>
          </button>
        ))}
      </div>
      <div className="rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full blur-3xl opacity-40" style={{ background: img.id === "win" ? "#5cb8ff" : ACCENT2 }} />
        <AnimatePresence mode="wait">
          <motion.div key={img.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: img.id === "win" ? "#5cb8ff" : ACCENT2 }}>{img.kind}</p>
            <p className="osa-display text-3xl font-extrabold mt-2">{img.name}</p>
            <p className="text-sm text-white/45 mt-1">Il te faut une clé d’au moins {img.key}.</p>
            <ol className="mt-6 space-y-3">
              {img.steps.map((s, j) => (
                <motion.li key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + j * 0.12 }}
                  className="flex items-center gap-3">
                  <span className="w-7 h-7 flex-none rounded-full grid place-items-center text-xs font-bold" style={{ background: `${ACCENT}22`, color: ACCENT }}>{j + 1}</span>
                  <span className="text-[15px] text-white/80">{s}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Incline doucement son contenu vers la souris. */
function Tilt({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), { stiffness: 120, damping: 18 });
  return (
    <div className="w-full" style={{ perspective: 1400 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={{ rotateX: rx, rotateY: ry }}>{children}</motion.div>
    </div>
  );
}
