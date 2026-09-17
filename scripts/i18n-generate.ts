/**
 * Génère src/i18n/en.ts : surcouche anglaise du corpus.
 *
 *  - Textes FR traduits par MiniMax (`mmx text chat`), par lots, avec cache
 *    par empreinte du texte source (scripts/.cache/i18n-en.json).
 *  - Synopsis de films repris de l'article en.wikipedia via le qid Wikidata
 *    (scripts/.cache/i18n-extras.json) ; à défaut, traduction MiniMax.
 *
 * Usage : npx tsx scripts/i18n-generate.ts [--limit N] [--dry]
 */
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { ERAS, REGIONS, MOVEMENTS, LINKS, FILMMAKER_LINKS, SOURCES, FILM_EXTRAS } from '../src/data';

const CACHE_DIR = new URL('./.cache/', import.meta.url).pathname;
const TR_CACHE = CACHE_DIR + 'i18n-en.json';
const EX_CACHE = CACHE_DIR + 'i18n-extras.json';
const OUT_FILE = new URL('../src/i18n/en-data.ts', import.meta.url).pathname;
const UA = 'AtlasDuCinema/1.0 (atlas pedagogique; contact: local)';
const BATCH = 50;
const CONCURRENCY = 3;
const MMX_TIMEOUT = 180_000;
const ATTEMPTS = 8;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const hash = (s: string) => createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 16);

// ——— collecte : texte → clés de destination ———

type TrCache = Record<string, { text: string; en: string }>;
const trCache: TrCache = existsSync(TR_CACHE) ? JSON.parse(readFileSync(TR_CACHE, 'utf8')) : {};
const todoTexts = new Map<string, string>(); // hash → texte

function collect(text: string | undefined | null) {
  if (!text) return;
  const t = text.trim();
  if (!t) return;
  const h = hash(t);
  if (!trCache[h]) todoTexts.set(h, t);
}

function collectAll() {
  for (const e of ERAS) {
    collect(e.name);
    collect(e.tagline);
  }
  for (const r of REGIONS) {
    collect(r.name);
    collect(r.shortName);
  }
  for (const m of MOVEMENTS) {
    collect(m.name);
    collect(m.tagline);
    collect(m.summary);
    m.countries.forEach(collect);
    m.keyDates.forEach((k) => collect(k.text));
    [...m.visualTraits, ...m.context, ...m.debates].forEach((s) => collect(s.text));
    for (const s of m.styles) {
      collect(s.name);
      collect(s.summary);
      s.traits.forEach(collect);
    }
    for (const f of m.filmmakers) {
      collect(f.bio);
      collect(f.nationality);
    }
    for (const f of m.films) {
      collect(f.comment);
      collect(f.country);
    }
  }
  for (const l of LINKS) {
    collect(l.label);
    collect(l.note);
  }
  for (const l of FILMMAKER_LINKS) collect(l.note);
  for (const s of SOURCES) collect(s.note);
  // synopsis sans extrait en.wikipedia : traduction MiniMax en secours
  for (const id of Object.keys(FILM_EXTRAS)) {
    if (!exCache[id]?.synopsis) collect(FILM_EXTRAS[id].synopsis);
  }
}

// ——— MiniMax ———

const SYSTEM = `Tu es un traducteur FR→EN spécialisé dans le cinéma et l'histoire du cinéma.
On te donne un objet JSON {"items":[{"id","text"}]} de textes français.
Réponds UNIQUEMENT par un JSON valide {"items":[{"id","en"}]} : même ordre, mêmes id, traduction anglaise naturelle et précise.
Règles :
- Ne traduis pas les noms de personnes ni les titres de films cités (garde le titre original ou le titre anglais consacré s'il existe : « La Nouvelle Vague » → « the French New Wave »).
- Préserve la ponctuation typographique simple ; pas de guillemets français « » dans l'anglais.
- Ton concis, encyclopédique.`;

async function mmxTranslate(batch: { id: string; text: string }[]): Promise<Record<string, string>> {
  const messages = JSON.stringify([
    { role: 'system', content: SYSTEM },
    { role: 'user', content: JSON.stringify({ items: batch }) },
  ]);
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    try {
      const out = await new Promise<string>((resolve, reject) => {
        const p = execFile('mmx', ['text', 'chat', '--messages-file', '-', '--output', 'json', '--max-tokens', '16000', '--temperature', '0.2', '--non-interactive'], { timeout: MMX_TIMEOUT, maxBuffer: 16 * 1024 * 1024 }, (err, stdout) => {
          if (err) reject(err);
          else resolve(stdout);
        });
        p.stdin?.end(messages);
      });
      const parsed = JSON.parse(out);
      if (parsed?.error) throw new Error(`mmx: ${parsed.error.message ?? 'erreur'}`);
      const text: string = parsed?.content?.[0]?.text ?? '';
      const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
      const items: { id: string; en: string }[] = json.items ?? [];
      const map: Record<string, string> = {};
      for (const it of items) if (it.id && typeof it.en === 'string') map[it.id] = it.en.trim();
      if (Object.keys(map).length >= Math.ceil(batch.length * 0.8)) return map;
      throw new Error(`réponse incomplète (${Object.keys(map).length}/${batch.length})`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const rateLimited = /rate limit|quota/i.test(msg);
      // rate-limit : backoff long ; les lots non traduits seront repris à la prochaine exécution
      await sleep(rateLimited ? 20_000 + attempt * 15_000 : 2_000 * (attempt + 1));
    }
  }
  return {};
}

async function translateAll(limit: number, dry: boolean) {
  const todo = [...todoTexts.entries()].slice(0, limit);
  console.log(`${todoTexts.size} textes uniques à traduire (${Object.keys(trCache).length} en cache)`);
  if (dry) return;
  const batches: { id: string; text: string }[][] = [];
  for (let i = 0; i < todo.length; i += BATCH) batches.push(todo.slice(i, i + BATCH).map(([id, text]) => ({ id, text })));
  let done = 0;
  const queue = [...batches];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const b = queue.shift()!;
      const map = await mmxTranslate(b);
      for (const { id, text } of b) {
        if (map[id]) trCache[id] = { text, en: map[id] };
      }
      done++;
      if (done % 5 === 0 || done === batches.length) {
        console.log(`  ${done}/${batches.length} lots`);
        writeFileSync(TR_CACHE, JSON.stringify(trCache));
      }
      await sleep(200);
    }
  });
  await Promise.all(workers);
  writeFileSync(TR_CACHE, JSON.stringify(trCache));
  const missing = [...todoTexts.keys()].filter((h) => !trCache[h]);
  if (missing.length) console.warn(`  ! ${missing.length} textes sans traduction (repli FR)`);
}

// ——— synopsis en.wikipedia via qid ———

type ExCache = Record<string, { synopsis?: string; wikiUrl?: string; qid?: string; checkedAt: string }>;
const exCache: ExCache = existsSync(EX_CACHE) ? JSON.parse(readFileSync(EX_CACHE, 'utf8')) : {};

async function fetchJson(url: string, tries = 3): Promise<any> {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, 'Api-User-Agent': UA } });
      if (res.status === 429 || res.status >= 500) {
        await sleep(1000 * (i + 1));
        continue;
      }
      if (!res.ok) return null;
      return await res.json();
    } catch {
      await sleep(800 * (i + 1));
    }
  }
  return null;
}

async function fetchEnExtras(dry: boolean) {
  const ids = Object.keys(FILM_EXTRAS);
  const pending = ids.filter((id) => !exCache[id] || exCache[id].qid !== FILM_EXTRAS[id].qid);
  console.log(`${ids.length} extras, ${pending.length} à résoudre sur en.wikipedia`);
  if (dry || !pending.length) return;

  // 1. qid → titre enwiki (lots de 50)
  const qidToId = new Map<string, string>();
  for (const id of pending) if (FILM_EXTRAS[id].qid) qidToId.set(FILM_EXTRAS[id].qid!, id);
  const qids = [...qidToId.keys()];
  const enTitle = new Map<string, string>(); // filmId → titre enwiki
  for (let i = 0; i < qids.length; i += 50) {
    const data = await fetchJson(
      `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${qids.slice(i, i + 50).join('|')}&props=sitelinks&format=json`,
    );
    for (const e of Object.values<any>(data?.entities ?? {})) {
      const title = e.sitelinks?.enwiki?.title;
      const filmId = qidToId.get(e.id);
      if (title && filmId) enTitle.set(filmId, title);
    }
    await sleep(150);
  }

  // 2. titre enwiki → extrait (lots de 20)
  const pairs = [...enTitle.entries()];
  for (let i = 0; i < pairs.length; i += 20) {
    const chunk = pairs.slice(i, i + 20);
    const data = await fetchJson(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&format=json&titles=${encodeURIComponent(chunk.map(([, t]) => t).join('|'))}`,
    );
    const byTitle = new Map<string, any>();
    for (const p of Object.values<any>(data?.query?.pages ?? {})) byTitle.set(p.title, p);
    // les redirections peuvent renommer les titres
    const redirects = new Map<string, string>((data?.query?.redirects ?? []).map((r: any) => [r.from, r.to]));
    for (const [filmId, title] of chunk) {
      const page = byTitle.get(title) ?? byTitle.get(redirects.get(title) ?? '');
      const text: string | undefined = page?.extract?.trim();
      const finalTitle = page?.title ?? title;
      if (text && text.length > 80) {
        const sentences = text.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]+$/g) ?? [text];
        let synopsis = '';
        for (const s of sentences) {
          if (synopsis.length + s.length > 700 && synopsis) break;
          synopsis += s;
          if (synopsis.length > 220 && sentences.indexOf(s) >= 2) break;
        }
        exCache[filmId] = {
          synopsis: synopsis.trim(),
          wikiUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(finalTitle.replace(/ /g, '_'))}`,
          qid: FILM_EXTRAS[filmId].qid,
          checkedAt: new Date().toISOString(),
        };
      } else {
        exCache[filmId] = { qid: FILM_EXTRAS[filmId].qid, checkedAt: new Date().toISOString() };
      }
    }
    if ((i / 20) % 5 === 4) {
      console.log(`  extras ${Math.min(i + 20, pairs.length)}/${pairs.length}`);
      writeFileSync(EX_CACHE, JSON.stringify(exCache));
    }
    await sleep(150);
  }
  for (const id of pending) if (!exCache[id]) exCache[id] = { qid: FILM_EXTRAS[id].qid, checkedAt: new Date().toISOString() };
  writeFileSync(EX_CACHE, JSON.stringify(exCache));
}

// ——— émission ———

const tr = (text: string | undefined): string | undefined => {
  if (!text) return undefined;
  return trCache[hash(text)]?.en;
};
const trAll = (arr: string[] | undefined): string[] | undefined =>
  arr?.map((x) => tr(x) ?? x);

function emit() {
  const movements = Object.fromEntries(
    MOVEMENTS.map((m) => [
      m.id,
      {
        name: tr(m.name),
        tagline: tr(m.tagline),
        summary: tr(m.summary),
        countries: trAll(m.countries),
        keyDates: trAll(m.keyDates.map((k) => k.text)),
        visualTraits: trAll(m.visualTraits.map((s) => s.text)),
        context: trAll(m.context.map((s) => s.text)),
        debates: trAll(m.debates.map((s) => s.text)),
        styles: Object.fromEntries(
          m.styles.map((s) => [s.id, { name: tr(s.name), summary: tr(s.summary), traits: trAll(s.traits) }]),
        ),
        filmmakers: Object.fromEntries(
          m.filmmakers.map((f) => [f.id, { bio: tr(f.bio), nationality: tr(f.nationality) }]),
        ),
        films: Object.fromEntries(m.films.map((f) => [f.id, { comment: tr(f.comment), country: tr(f.country) }])),
      },
    ]),
  );
  const links = Object.fromEntries(
    LINKS.map((l) => [`${l.source}|${l.target}|${l.kind}`, { label: tr(l.label), note: tr(l.note) }]),
  );
  const filmmakerLinks = Object.fromEntries(
    FILMMAKER_LINKS.map((l) => [`${l.source}|${l.target}|${l.kind}`, { note: tr(l.note) }]),
  );
  const sources = Object.fromEntries(SOURCES.filter((s) => s.note).map((s) => [s.id, { note: tr(s.note) }]));
  const eras = Object.fromEntries(ERAS.map((e) => [e.id, { name: tr(e.name), tagline: tr(e.tagline) }]));
  const regions = Object.fromEntries(REGIONS.map((r) => [r.id, { name: tr(r.name), shortName: tr(r.shortName) }]));
  const extras = Object.fromEntries(
    Object.keys(FILM_EXTRAS).map((id) => {
      const ex = exCache[id];
      const frSynopsis = FILM_EXTRAS[id].synopsis;
      return [
        id,
        {
          synopsis: ex?.synopsis ?? tr(frSynopsis),
          wikiUrl: ex?.wikiUrl,
        },
      ];
    }),
  );

  const body = JSON.stringify({ eras, regions, movements, links, filmmakerLinks, sources, extras }, null, 1);
  const file = `// Généré par scripts/i18n-generate.ts — traduction EN (MiniMax) + synopsis en.wikipedia.
// Ne pas éditer à la main : relancer le script. Toute clé absente retombe sur le français.
import type { EnData } from './en';

export const EN_DATA: EnData = ${body};
`;
  writeFileSync(OUT_FILE, file);
  console.log(`écrit ${OUT_FILE} (${(body.length / 1024).toFixed(0)} Ko)`);
}

async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity;
  const dry = args.includes('--dry');
  mkdirSync(CACHE_DIR, { recursive: true });
  await fetchEnExtras(dry);
  collectAll();
  await translateAll(limit, dry);
  if (!dry) emit();
}

main();
