"use client";

// Page d'EraseKEY (osalabs.fr/erasekey) : la clé USB qui efface un disque, fabriquée par OsaBoot.
// Les captures sont de vraies captures de l'interface en mode démo (machine virtuelle 1920×1080).
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight, Check, Cpu, Download, Eraser, FileText, HardDrive, Keyboard, Lock, Monitor, Power,
  ShieldCheck, Terminal, Usb,
} from "lucide-react";
import Mascot, { type Mood } from "@/components/osa/Mascot";
import { Island, OsaBox, Pill, Shell, useNotices } from "@/components/osa/Kit";
import { BOOT_DMG, BOOT_REPO } from "@/components/boot/BootPage";
import { ViaHub } from "@/components/osahub/links";

export const ERASE_REPO = "https://github.com/osayanis/erasekey";
const ACCENT = "#f4f4f0";   // le blanc de la console
const GREEN = "#4ade80";    // le « réussi » de la console

// Les cinq écrans, avec la vraie capture de chacun
const SCREENS = [
  { id: "disques-deux", label: "Disques", key: "1", text: "La liste des disques du PC. Ta clé et les disques utilisés par le système sont grisés : impossible de les cocher." },
  { id: "methode", label: "Méthode", key: "2", text: "Conseillée, Rapide ou Renforcée. La mascotte te dit laquelle suffit pour un disque qu’on donne ou qu’on vend." },
  { id: "confirmation", label: "EFFACER", key: "3", text: "Modèle, numéro de série, partitions : tout est rappelé. Rien ne démarre tant que tu n’as pas tapé EFFACER." },
  { id: "effacement", label: "Ça efface", key: "4", text: "Une barre par disque, le débit et le temps restant. Tu peux aller boire un café." },
  { id: "fin", label: "Terminé", key: "5", text: "Le résultat de chaque disque. Le journal et un rapport PDF par disque sont enregistrés sur la clé." },
] as const;

// Les méthodes, passe par passe (r = aléatoire, z = zéros, d = motif DoD, v = relecture)
const METHODS = [
  { id: "conseillee", name: "Conseillée", when: "Pour un disque qu’on donne ou qu’on vend.", passes: ["r", "z", "v"] },
  { id: "rapide", name: "Rapide", when: "Quand le temps compte : une seule passe.", passes: ["z", "v"] },
  { id: "renforcee", name: "Renforcée", when: "La norme DoD 5220.22-M en version courte.", passes: ["d", "d", "d", "z", "v"] },
] as const;
const PASS: Record<string, { label: string; fill: string }> = {
  r: { label: "Données aléatoires", fill: "repeating-linear-gradient(90deg, #fff 0 3px, #777 3px 5px, #fff 5px 6px, #333 6px 9px)" },
  z: { label: "Que des zéros", fill: "#2a2a2e" },
  d: { label: "Motif DoD", fill: "repeating-linear-gradient(90deg, #d4d4d8 0 6px, #52525b 6px 12px)" },
  v: { label: "Relecture", fill: `linear-gradient(90deg, ${GREEN}55, ${GREEN})` },
};

const SAFE = [
  { I: Usb, t: "La clé ne s’efface jamais", d: "Exclue de la liste par ShredOS, puis une deuxième fois par l’interface." },
  { I: Lock, t: "Le système non plus", d: "Les disques en cours d’utilisation sont grisés, impossibles à cocher." },
  { I: Keyboard, t: "Tape EFFACER", d: "Pas un simple « Oui » : il faut taper le mot, après avoir relu le modèle et le numéro de série." },
  { I: FileText, t: "Une preuve", d: "nwipe écrit un rapport PDF par disque, enregistré sur la clé avec le journal." },
];

const UNDER = [
  { I: Terminal, t: "ShredOS", d: "Un mini Linux qui démarre depuis une clé, sur n’importe quel PC x86-64, en UEFI comme en BIOS.", href: "https://github.com/PartialVolume/shredos.x86_64" },
  { I: HardDrive, t: "nwipe", d: "Le moteur d’effacement, héritier de DBAN. C’est lui qui écrit, relit et signe les rapports.", href: "https://github.com/martijnvanbrummelen/nwipe" },
  { I: Cpu, t: "L’interface Osa", d: "Un programme Go (Bubble Tea) de 3,5 Mo qui remplace l’écran de nwipe. Code public.", href: ERASE_REPO },
];

type Zone = null | "screens" | "methods" | "safe" | "how" | "under" | "story" | "get";
const SAY: Record<Exclude<Zone, null>, [string, Mood]> = {
  screens: ["Cinq écrans, c’est tout", "excited"],
  methods: ["La conseillée suffit, promis", "think"],
  safe: ["Je ne touche pas à ta clé", "search"],
  how: ["Trois minutes de préparation", "work"],
  under: ["Je ne réinvente rien, je rends ça simple", "happy"],
  story: ["Il y a eu des clés pas fiables…", "sad"],
  get: ["On efface ce vieux PC ?", "love"],
};

export function EraseKeyPage() {
  const { notice, notify } = useNotices();
  const [zone, setZone] = useState<Zone>(null);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const lines: [string, string, "good" | "info"][] = [
      ["2 disques trouvés · clé protégée", "🔒", "info"], ["Effacement · 35 % · 412 Mo/s", "🧽", "info"],
      ["Relecture : que des zéros", "🔍", "info"], ["Réussi · rapport PDF sur la clé", "✅", "good"],
    ];
    let i = 0;
    const t = setInterval(() => { const [text, icon, tone] = lines[i % lines.length]; notify(text, icon, tone); i++; }, 4200);
    return () => clearInterval(t);
  }, [notify]);

  const [say, mood] = zone ? SAY[zone] : ["Un disque à donner ? Je l’efface pour de bon.", "happy" as Mood];
  const enter = (z: Zone) => (p: { x: number; y: number } | null) => { setHover(p); setZone(p ? z : null); };
  const zoneProps = (z: Zone) => ({ onMouseEnter: () => setZone(z), onMouseLeave: () => setZone(null) });

  return (
    <Shell
      app="erasekey" accent={ACCENT} accent2={GREEN}
      island={<Island title="EraseKEY" status="clé USB · par OsaBoot" accent={GREEN} live notice={notice} />}
      right={<Pill href={ERASE_REPO}><span className="hidden sm:inline">GitHub</span> <ArrowUpRight className="w-4 h-4" /></Pill>}
    >
      <div className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col items-center">
        {/* ───────── Accroche ───────── */}
        <div className="relative mt-4">
          <Mascot size={104} mood={mood} say={say} lookAt={hover} glow="#ffffff33" bubble="right" />
        </div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="osa-display text-center font-extrabold leading-[0.95] mt-6" style={{ fontSize: "clamp(40px, 7.4vw, 84px)" }}>
          Un disque à donner ?<br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, #ffffff, #a1a1aa 55%, ${GREEN})` }}>Efface-le vraiment.</span>
        </motion.h1>
        <p className="text-white/60 text-center mt-5 max-w-[640px] text-lg leading-relaxed">
          EraseKEY est une clé USB qui démarre le PC et <b className="text-white/85 font-semibold">réécrit tout le disque</b>, puis le relit pour le vérifier.
          En français, en cinq écrans, sans rien installer. Supprimer des fichiers ne suffit pas : ils se récupèrent.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-7" {...zoneProps("get")}>
          <a href={BOOT_DMG} className="h-12 px-6 rounded-full bg-[#fdfcf7] text-black font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition shadow-[0_10px_40px_-12px_rgba(255,255,255,0.45)]">
            <Download className="w-4 h-4" /> Créer une EraseKEY
          </a>
          <a href={ERASE_REPO} target="_blank" rel="noreferrer" className="h-12 px-5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] font-semibold flex items-center gap-2 transition">
            Code source <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-[11px] text-white/35 mt-3 flex items-center gap-1.5 text-center">
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: GREEN }} /> Gratuit · se crée avec OsaBoot (Mac) · efface n’importe quel PC x86-64, UEFI ou BIOS
        </p>

        <div className="w-full mt-12" {...zoneProps("screens")}>
          <Screens />
        </div>

        {/* ───────── Méthodes ───────── */}
        <Section kicker="Trois méthodes" title={<>Réécrire, puis relire.<br /><span className="text-white/40">À chaque fois.</span></>}
          intro="Chaque méthode finit par une relecture complète : EraseKEY ne dit « réussi » que si le disque contient bien ce qu’elle y a écrit." />
        <div className="w-full mt-8" {...zoneProps("methods")}>
          <Methods />
        </div>

        {/* ───────── Sécurité ───────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-20">
          {SAFE.map(({ I, t, d }) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("safe")}>
              <div className="p-5 h-full">
                <span className="w-10 h-10 rounded-full bg-white/[0.08] grid place-items-center"><I className="w-5 h-5" /></span>
                <p className="osa-display text-lg font-bold mt-3.5 leading-tight">{t}</p>
                <p className="text-[13px] text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </div>
            </OsaBox>
          ))}
        </div>

        {/* ───────── Comment faire ───────── */}
        <Section kicker="Comment faire" title={<>Une clé, un PC,<br /><span className="text-white/40">et c’est parti.</span></>}
          intro="La clé se fabrique sur ton Mac avec OsaBoot. Ensuite, elle marche sur n’importe quel PC." />
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 w-full mt-8">
          {[
            { I: Usb, t: "Crée la clé", d: <>Dans <a href={BOOT_REPO} className="underline decoration-white/30 hover:decoration-white">OsaBoot</a>, clique sur « ou crée une EraseKEY ». Il télécharge ShredOS, prépare la clé, l’écrit puis la relit en entier.</>, foot: "Une clé de 256 Mo ou plus, de marque de préférence." },
            { I: Power, t: "Démarre le PC dessus", d: <>Touche F12, F11, F8 ou Échap au démarrage, selon la marque. Pas de menu : tu arrives directement sur l’écran EraseKEY.</>, foot: "Désactive le Secure Boot dans le BIOS : ShredOS n’est pas signé." },
            { I: Eraser, t: "Suis la mascotte", d: <>Choisis le disque, la méthode, tape EFFACER. À la fin, E éteint le PC, R le redémarre.</>, foot: "Le rapport PDF t’attend sur la clé." },
          ].map(({ I, t, d, foot }, i) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("how")} active={zone === "how"}>
              <div className="p-7 h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#fdfcf7] text-black grid place-items-center text-sm font-bold">{i + 1}</span>
                  <I className="w-5 h-5 text-white/50" />
                </div>
                <p className="osa-display text-2xl font-extrabold mt-4 leading-tight">{t}</p>
                <p className="text-sm text-white/55 mt-2 leading-relaxed">{d}</p>
                <p className="mt-auto pt-5 text-xs text-white/35">{foot}</p>
              </div>
            </OsaBox>
          ))}
        </div>

        {/* ───────── Sous le capot ───────── */}
        <Section kicker="Sous le capot" title={<>Des outils éprouvés,<br /><span className="text-white/40">une interface claire.</span></>}
          intro="EraseKEY ne réinvente pas l’effacement. Elle met une interface en français sur des outils libres utilisés depuis des années." />
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 w-full mt-8">
          {UNDER.map(({ I, t, d, href }) => (
            <OsaBox key={t} accent={ACCENT} onHover={enter("under")}>
              <a href={href} target="_blank" rel="noreferrer" className="p-6 h-full flex flex-col group">
                <span className="w-10 h-10 rounded-full bg-white/[0.08] grid place-items-center"><I className="w-5 h-5" /></span>
                <p className="osa-display text-xl font-bold mt-3.5 flex items-center gap-1.5">{t} <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition" /></p>
                <p className="text-[13px] text-white/50 mt-1.5 leading-relaxed">{d}</p>
              </a>
            </OsaBox>
          ))}
        </div>
        <div className="w-full mt-5 rounded-[28px] border border-white/10 bg-[#0b0b0d] p-6 sm:p-8 overflow-x-auto" {...zoneProps("under")}>
          <pre className="text-[12px] sm:text-[13px] leading-relaxed text-white/70 font-mono whitespace-pre">{`ShredOS officiel (téléchargé, empreinte vérifiée)
  └─ clé reconstruite au format standard : partition au secteur 2048, FAT32
       ├─ menu de démarrage caché : directement sur l’interface
       └─ petit initrd chargé après le noyau
            ├─ osa-erase        l’interface EraseKEY
            └─ nwipe_launcher   lance osa-erase au lieu de l’écran de nwipe`}</pre>
          <p className="text-xs text-white/40 mt-4 leading-relaxed">
            Rien de ShredOS n’est recompilé. Et sur les écrans haute définition, l’interface double elle-même la police de la console pour rester lisible.
          </p>
        </div>

        {/* ───────── Testé ───────── */}
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-4 sm:gap-5 w-full mt-20" {...zoneProps("story")}>
          <OsaBox accent={ACCENT} active={zone === "story"}>
            <div className="p-7 h-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Testé sur un vrai PC</p>
              <p className="osa-display text-3xl font-extrabold mt-3 leading-tight">Dell Latitude 5175.<br /><span className="text-white/40">Après trois clés.</span></p>
              <ul className="mt-5 space-y-3 text-sm text-white/60 leading-relaxed">
                <li className="flex gap-3"><span className="text-white/30 font-mono">1</span> La première clé recopiait des données au mauvais endroit. C’est la relecture d’OsaBoot qui l’a vu.</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono">2</span> Le Dell ne voyait pas l’image d’origine de ShredOS. OsaBoot reconstruit maintenant une clé au format standard.</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono">3</span> Avec une clé fiable : le Dell démarre directement sur EraseKEY et efface un vrai disque.</li>
              </ul>
            </div>
          </OsaBox>
          <OsaBox accent={ACCENT} active={zone === "story"}>
            <div className="p-2 sm:p-3 h-full flex flex-col justify-center">
              <ScreenFrame><img src="/erasekey/fin.webp" alt="EraseKEY à la fin : deux disques effacés avec succès, rapports enregistrés sur la clé" width={1600} height={900} loading="lazy" className="w-full h-auto block" /></ScreenFrame>
              <p className="text-sm text-white/50 px-3 pt-3 pb-1 leading-relaxed flex items-center gap-2">
                <Check className="w-4 h-4 flex-none" style={{ color: GREEN }} /> Et dans une machine virtuelle : un disque de 4 Go ressorti entièrement à zéro, vérifié octet par octet.
              </p>
            </div>
          </OsaBox>
        </div>

        {/* ───────── Dernier appel ───────── */}
        <div className="w-full mt-16 rounded-[36px] overflow-hidden relative border border-white/10" {...zoneProps("get")}
          style={{ background: `radial-gradient(circle at 15% 100%, #ffffff22, transparent 55%), radial-gradient(circle at 90% 0%, ${GREEN}26, transparent 50%), #101012` }}>
          <div className="relative px-6 py-16 sm:py-20 flex flex-col items-center text-center">
            <span className="w-20 h-20 rounded-[26px] bg-black border border-white/15 grid place-items-center"><Eraser className="w-9 h-9" /></span>
            <p className="osa-display font-extrabold leading-[0.95] mt-5" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Ce vieux PC mérite<br />un vrai départ à zéro.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <a href={BOOT_DMG} className="h-12 px-6 rounded-full bg-[#fdfcf7] text-black font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition">
                <Download className="w-4 h-4" /> Télécharger OsaBoot
              </a>
              <a href="/boot" className="h-12 px-5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] font-semibold flex items-center gap-2 transition">
                <Monitor className="w-4 h-4" /> C’est quoi, OsaBoot ?
              </a>
            </div>
            <p className="text-[11px] text-white/50 mt-3">OsaBoot : gratuit · Mac Apple Silicon · macOS 14 ou plus récent</p>
            <ViaHub label="ou installe OsaBoot avec OsaHUB" className="mt-3 justify-center" />
          </div>
        </div>

        <p className="text-[11px] text-white/30 text-center max-w-[760px] mt-10 leading-relaxed">
          PC x86 64 bits seulement (pas les Mac Apple Silicon ni les PC ARM). Le Secure Boot doit être désactivé.
          ShredOS et nwipe sont des logiciels libres (GPL v2, © PartialVolume et les contributeurs de nwipe) : OsaBoot les télécharge depuis leurs versions officielles.
          Captures : interface EraseKEY en mode démo dans une machine virtuelle (rien n’est effacé).
        </p>
      </div>
    </Shell>
  );
}

function Section({ kicker, title, intro }: { kicker: string; title: ReactNode; intro: string }) {
  return (
    <div className="text-center mt-24 max-w-[640px]">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: GREEN }}>{kicker}</p>
      <h2 className="osa-display font-extrabold leading-[0.98] mt-3" style={{ fontSize: "clamp(32px, 5vw, 54px)" }}>{title}</h2>
      <p className="text-white/55 mt-4 leading-relaxed">{intro}</p>
    </div>
  );
}

/** Un écran de PC autour d'une capture de la console. */
function ScreenFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[22px] bg-[#161618] p-[10px] sm:p-3 border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="rounded-[12px] overflow-hidden bg-black ring-1 ring-white/5">{children}</div>
    </div>
  );
}

/** Les vraies captures des cinq écrans, qui défilent toutes seules. */
function Screens() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((v) => (v + 1) % SCREENS.length), 4600);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <div className="flex flex-col items-center">
      <Tilt>
        <div className="relative w-full max-w-[920px] mx-auto">
          <div className="absolute inset-[10%] rounded-full blur-3xl opacity-40" style={{ background: `radial-gradient(circle, #ffffff40, transparent 70%)` }} />
          <ScreenFrame>
            <div className="relative" style={{ aspectRatio: "1600 / 900" }}>
              <AnimatePresence initial={false}>
                <motion.img key={SCREENS[i].id} src={`/erasekey/${SCREENS[i].id}.webp`} alt={`EraseKEY : ${SCREENS[i].text}`} width={1600} height={900}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
                  className="absolute inset-0 w-full h-full object-cover" />
              </AnimatePresence>
              {/* lignes de balayage très légères, façon écran */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)" }} />
            </div>
          </ScreenFrame>
        </div>
      </Tilt>
      <div className="mt-5 flex p-1 rounded-full bg-white/[0.06] border border-white/10 max-w-full overflow-x-auto">
        {SCREENS.map((s, k) => (
          <button key={s.id} onClick={() => { setI(k); setAuto(false); }}
            className={`relative h-10 px-3 sm:px-4 rounded-full text-[13px] sm:text-sm font-semibold whitespace-nowrap flex items-center gap-2 transition-colors ${i === k ? "text-black" : "text-white/65 hover:text-white"}`}>
            {i === k && <motion.span layoutId="erase-step" className="absolute inset-0 rounded-full bg-[#fdfcf7]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <span className={`relative font-mono text-xs ${i === k ? "text-black/50" : "text-white/35"}`}>{s.key}</span><span className="relative">{s.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={SCREENS[i].id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          className="text-sm text-white/50 mt-3 text-center px-4 max-w-[580px]">{SCREENS[i].text}</motion.p>
      </AnimatePresence>
      <p className="text-[11px] text-white/30 mt-1">Vraies captures de l’interface (mode démo, rien n’est effacé).</p>
    </div>
  );
}

/** Les trois méthodes, dessinées passe par passe. */
function Methods() {
  const [k, setK] = useState(0);
  const m = METHODS[k];
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-5 items-stretch">
      <div className="flex flex-col gap-2">
        {METHODS.map((x, j) => (
          <button key={x.id} onClick={() => setK(j)}
            className={`text-left rounded-2xl p-4 border transition ${j === k ? "bg-[#fdfcf7] text-black border-transparent" : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]"}`}>
            <p className="font-bold">{x.name}</p>
            <p className={`text-xs mt-1 ${j === k ? "text-black/55" : "text-white/40"}`}>{x.passes.length - 1} passe{x.passes.length > 2 ? "s" : ""} + relecture</p>
          </button>
        ))}
      </div>
      <div className="rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 sm:p-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <p className="osa-display text-3xl font-extrabold">{m.name}</p>
            <p className="text-sm text-white/45 mt-1">{m.when}</p>
            <div className="mt-7 space-y-3">
              {m.passes.map((p, j) => (
                <div key={j} className="flex items-center gap-4">
                  <span className="w-24 sm:w-36 flex-none text-[13px] text-white/60">{PASS[p].label}</span>
                  <div className="flex-1 h-5 rounded-md bg-white/[0.05] overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.15 + j * 0.45, duration: 0.6, ease: "easeInOut" }}
                      className="h-full rounded-md" style={{ background: PASS[p].fill }} />
                  </div>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 + j * 0.45 }}>
                    <Check className="w-4 h-4" style={{ color: p === "v" ? GREEN : "rgba(255,255,255,0.35)" }} />
                  </motion.span>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/35 mt-6">Chaque barre est un passage complet sur tout le disque. La dernière relit tout.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Incline doucement son contenu vers la souris. */
function Tilt({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 18 });
  return (
    <div className="w-full" style={{ perspective: 1400 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={{ rotateX: rx, rotateY: ry }}>{children}</motion.div>
    </div>
  );
}
