"use client";

// Gabarit des pages légales (confidentialité, cookies, conditions), au style des apps OsaLabs.
import type { ReactNode } from "react";
import Mascot from "@/components/osa/Mascot";
import { Island, OsaBox, Shell, LEGAL } from "@/components/osa/Kit";

const ACCENT = "#a78bfa";
export const UPDATED = "26 octobre 2026";
export const CONTACT = "https://github.com/osayanis";

export function LegalPage({ title, intro, say, children }: { title: string; intro: string; say: string; children: ReactNode }) {
  return (
    <Shell app="osalabs" accent={ACCENT} accent2="#7cc4ff" island={<Island title="OsaLabs" status={title} accent={ACCENT} notice={null} />}>
      <div className="flex-1 w-full max-w-[820px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col items-center">
        <div className="relative mt-4">
          <Mascot size={92} mood="think" say={say} glow={`${ACCENT}55`} bubble="right" />
        </div>
        <h1 className="osa-display text-center font-extrabold leading-[0.95] mt-6" style={{ fontSize: "clamp(36px, 6vw, 60px)" }}>{title}</h1>
        <p className="text-white/55 text-center mt-4 max-w-[560px]">{intro}</p>
        <p className="text-xs text-white/30 mt-2">Dernière mise à jour : {UPDATED}</p>

        <nav className="flex flex-wrap justify-center gap-1.5 mt-6">
          {LEGAL.map((l) => (
            <a key={l.href} href={l.href}
              className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition ${l.name === title ? "bg-[#fdfcf7] text-black border-transparent" : "text-white/55 border-white/10 hover:text-white hover:bg-white/[0.06]"}`}>
              {l.name}
            </a>
          ))}
        </nav>

        <OsaBox accent={ACCENT} className="w-full mt-8">
          <article className="p-6 sm:p-9 legal">{children}</article>
        </OsaBox>
      </div>
    </Shell>
  );
}

/** Une section : titre + contenu. */
export function S({ t, children }: { t: string; children: ReactNode }) {
  return (
    <section className="mb-8 last:mb-0">
      <h2 className="osa-display text-xl sm:text-2xl font-bold mb-3">{t}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-white/65">{children}</div>
    </section>
  );
}

/** Ligne « service : ce qui est traité ». */
export function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
      <p className="font-semibold text-white/90 text-sm">{k}</p>
      <div className="text-sm text-white/55 mt-1 leading-relaxed">{children}</div>
    </div>
  );
}

export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith("/") ? undefined : "_blank"} rel="noreferrer" className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-white">{children}</a>
);
