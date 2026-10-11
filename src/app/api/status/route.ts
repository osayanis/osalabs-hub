// Statut réel des services : on interroge chaque site (avec un petit cache
// de 30 s pour ne pas les solliciter à chaque visite).
const SITES = {
  osaparty: "https://osaparty.osalabs.fr",
  osadrop: "https://osadrop.osalabs.fr",
  osacast: "https://osacast.osalabs.fr",
  osaboard: "https://osaboard.osalabs.fr",
  osanotch: "https://notch.osalabs.fr",
} as const;

type Probe = { ok: boolean; ms: number | null };
let cache: { at: number; services: Record<string, Probe> } | null = null;

async function probe(url: string): Promise<Probe> {
  const t0 = Date.now();
  try {
    const r = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    r.body?.cancel().catch(() => {});
    return { ok: r.status < 500, ms: Date.now() - t0 };
  } catch {
    return { ok: false, ms: null };
  }
}

export async function GET() {
  if (!cache || Date.now() - cache.at > 30_000) {
    const entries = await Promise.all(Object.entries(SITES).map(async ([k, u]) => [k, await probe(u)] as const));
    cache = { at: Date.now(), services: Object.fromEntries(entries) };
  }
  return Response.json(cache, { headers: { "Cache-Control": "no-store" } });
}
