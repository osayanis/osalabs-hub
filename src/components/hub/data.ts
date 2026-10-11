"use client";

import { useEffect, useState } from "react";

export type AppId = "osaparty" | "osadrop" | "osacast" | "osaboard";

// Couleurs alignées sur les sites refaits (île + boîtes façon OsaNotch).
export const PROJECTS: { id: AppId; name: string; href: string; color: string; tag: string; desc: string }[] = [
  { id: "osadrop", name: "OsaDrop", href: "https://osadrop.osalabs.fr", color: "#7cc4ff", tag: "Fichiers",
    desc: "Envoie des fichiers d'un appareil à l'autre, en direct et sans les stocker sur un serveur." },
  { id: "osacast", name: "OsaCast", href: "https://osacast.osalabs.fr", color: "#a5b4fc", tag: "Écran",
    desc: "Partage ton écran avec un code. Tes amis regardent depuis leur navigateur, rien à installer." },
  { id: "osaparty", name: "OsaParty", href: "https://osaparty.osalabs.fr", color: "#f9a8d4", tag: "Musique",
    desc: "Une soirée Apple Music partagée : paroles synchronisées, réactions et blind test." },
  { id: "osaboard", name: "OsaBoard", href: "https://osaboard.osalabs.fr", color: "#5eead4", tag: "Tableau",
    desc: "Un tableau blanc collaboratif : des idées, des liens, tout le monde dessus en même temps." },
];

export type Status = Record<string, { ok: boolean; ms: number | null }>;

// Interroge /api/status au chargement puis chaque minute.
export function useStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/status", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => { if (alive) setStatus(d.services); })
        .catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => { alive = false; clearInterval(t); };
  }, []);
  return status;
}
