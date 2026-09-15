/**
 * Enrichit les films du corpus avec Wikidata + Wikipédia :
 * affiche (image principale de l'article enwiki, poster), distribution (P161),
 * réalisateur(s) (P57), synopsis (intro de l'article frwiki/enwiki).
 *
 * Usage : npx tsx scripts/enrich-films.ts [--limit N] [--only id1,id2] [--missing]
 * Sortie : src/data/filmExtras.ts + cache scripts/.cache/films.json
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { MOVEMENTS } from '../src/data';
import type { Film } from '../src/data/types';

const CACHE_DIR = new URL('./.cache/', import.meta.url).pathname;
const CACHE_FILE = CACHE_DIR + 'films.json';
const OUT_FILE = new URL('../src/data/filmExtras.ts', import.meta.url).pathname;
const UA = 'AtlasDuCinema/1.0 (atlas pedagogique; contact: local)';
const CONCURRENCY = 6;

interface Extra {
  qid?: string;
  poster?: string;
  cast?: string[];
  directors?: string[];
  synopsis?: string;
  wikiUrl?: string;
  checkedAt: string;
}

const cache: Record<string, Extra> = existsSync(CACHE_FILE) ? JSON.parse(readFileSync(CACHE_FILE, 'utf8')) : {};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Mots significatifs du nom de réalisateur attendu (nom de famille surtout). */
function directorTokens(director: string): string[] {
  return norm(director)
    .split(' ')
    .filter((w) => w.length > 2 && !['les', 'des', 'and', 'von', 'van', 'der', 'de', 'di', 'du'].includes(w));
}

/** P31 acceptés : film, long métrage, court métrage, film d'animation, documentaire, serial, muet. */
const FILM_CLASSES = new Set(['Q11424', 'Q24862', 'Q24869', 'Q202866', 'Q93204', 'Q193977', 'Q25169']);

function scoreEntity(e: any, r: any, film: Film, wanted: string[]): number {
  const claims = e.claims ?? {};
  const desc = `${e.labels?.fr?.value ?? ''} ${e.labels?.en?.value ?? ''} ${r.description ?? ''}`;
  const descN = norm(desc);
  const isFilm =
    (claims.P31 ?? []).some((c: any) => FILM_CLASSES.has(c.mainsnak?.datavalue?.value?.id)) || /\bfilm\b/.test(descN);
  if (!isFilm) return -1;
  let score = 3;
  const years = (claims.P577 ?? [])
    .map((c: any) => {
      const t = c.mainsnak?.datavalue?.value?.time;
      return t ? Math.abs(parseInt(t.slice(1, 5), 10)) : null;
    })
    .filter(Boolean) as number[];
  const descYear = (desc.match(/\b(18|19|20)\d{2}\b/) ?? [])[0];
  if (years.some((y) => Math.abs(y - film.year) <= 1)) score += 3;
  else if (descYear && Math.abs(Number(descYear) - film.year) <= 1) score += 2;
  else if (years.length) score -= 4;
  if (wanted.some((w) => descN.includes(w))) score += 1;
  if (e.sitelinks?.enwiki || e.sitelinks?.frwiki) score += 1;
  return score;
}

async function pickBest(results: any[], film: Film, wanted: string[]): Promise<any | null> {
  if (!results.length) return null;
  const ids = results.map((r: any) => r.id).join('|');
  const ents = await fetchJson(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids}&props=claims|sitelinks|labels&languages=fr|en&format=json`,
  );
  if (!ents?.entities) return null;
  let best: any = null;
  let bestScore = -1;
  for (const r of results) {
    const e = ents.entities[r.id];
    const score = e ? scoreEntity(e, r, film, wanted) : -1;
    if (score > bestScore) {
      bestScore = score;
      best = e;
    }
  }
  return bestScore >= 4 ? best : null;
}

async function searchWikidata(film: Film): Promise<any | null> {
  const wanted = directorTokens(film.director);
  const queries = [
    `${film.title} ${film.year}`,
    film.originalTitle ? `${film.originalTitle} ${film.year}` : null,
    `${film.title} film`,
    film.title,
    film.originalTitle,
  ].filter(Boolean) as string[];
  for (const q of queries) {
    for (const lang of ['fr', 'en']) {
      const data = await fetchJson(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(q)}&language=${lang}&uselang=${lang}&format=json&limit=6&type=item`,
      );
      const best = await pickBest(data?.search ?? [], film, wanted);
      if (best) return best;
    }
  }
  // repli : recherche plein texte sur Wikipédia fr puis en, entité via pageprops
  for (const [lang, term] of [
    ['fr', film.title],
    ['en', film.originalTitle ?? film.title],
  ] as const) {
    const data = await fetchJson(
      `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`"${term}" film`)}&srlimit=3&srprop=&format=json`,
    );
    const titles = (data?.query?.search ?? []).map((s: any) => s.title);
    if (!titles.length) continue;
    const pages = await fetchJson(
      `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageprops&format=json&titles=${encodeURIComponent(titles.join('|'))}`,
    );
    const qids = Object.values<any>(pages?.query?.pages ?? {})
      .map((p) => p.pageprops?.wikibase_item)
      .filter(Boolean);
    if (!qids.length) continue;
    const ents = await fetchJson(
      `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${qids.join('|')}&props=claims|sitelinks|labels&languages=fr|en&format=json`,
    );
    const results = Object.values<any>(ents?.entities ?? {}).map((e) => ({ id: e.id, description: '' }));
    const best = await pickBest(results, film, wanted);
    if (best) return best;
  }
  return null;
}

async function resolveLabels(qids: string[]): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (let i = 0; i < qids.length; i += 50) {
    const chunk = qids.slice(i, i + 50).join('|');
    const data = await fetchJson(
      `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${chunk}&props=labels&languages=fr|en&format=json`,
    );
    for (const [id, e] of Object.entries<any>(data?.entities ?? {})) {
      out[id] = e.labels?.fr?.value ?? e.labels?.en?.value ?? id;
    }
  }
  return out;
}

async function wikiPoster(enTitle?: string, frTitle?: string): Promise<string | undefined> {
  for (const [lang, title] of [
    ['en', enTitle],
    ['fr', frTitle],
  ] as const) {
    if (!title) continue;
    const data = await fetchJson(
      `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&pilicense=any&pithumbsize=400&format=json&titles=${encodeURIComponent(title)}`,
    );
    const page = Object.values<any>(data?.query?.pages ?? {})[0];
    const th = page?.thumbnail;
    if (!th?.source) continue;
    // garder les images plausibles comme affiche : portrait ou presque carrée, pas un svg de carte/logo
    if (/\.svg/i.test(th.source)) continue;
    if (th.height && th.width && th.height < th.width * 0.9) continue;
    return th.source.split('?')[0];
  }
  return undefined;
}

async function wikiExtract(frTitle?: string, enTitle?: string): Promise<{ synopsis?: string; url?: string }> {
  for (const [lang, title] of [
    ['fr', frTitle],
    ['en', enTitle],
  ] as const) {
    if (!title) continue;
    const data = await fetchJson(
      `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&format=json&titles=${encodeURIComponent(title)}`,
    );
    const page = Object.values<any>(data?.query?.pages ?? {})[0];
    const text: string | undefined = page?.extract?.trim();
    if (text && text.length > 80) {
      // coupe après ~3 phrases pour rester un synopsis court
      const sentences = text.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]+$/g) ?? [text];
      let synopsis = '';
      for (const s of sentences) {
        if (synopsis.length + s.length > 700 && synopsis) break;
        synopsis += s;
        if (synopsis.length > 220 && sentences.indexOf(s) >= 2) break;
      }
      return { synopsis: synopsis.trim(), url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}` };
    }
  }
  return {};
}

async function enrichFilm(film: Film): Promise<Extra> {
  const entity = await searchWikidata(film);
  const extra: Extra = { checkedAt: new Date().toISOString() };
  if (!entity) return extra;
  extra.qid = entity.id;
  const claims = entity.claims ?? {};
  const dirQ = (claims.P57 ?? []).map((c: any) => c.mainsnak?.datavalue?.value?.id).filter(Boolean);
  const castQ = (claims.P161 ?? [])
    .map((c: any) => c.mainsnak?.datavalue?.value?.id)
    .filter(Boolean)
    .slice(0, 8);
  const labels = await resolveLabels([...dirQ, ...castQ]);
  extra.directors = dirQ.map((q: string) => labels[q]).filter(Boolean);
  extra.cast = castQ.map((q: string) => labels[q]).filter(Boolean);
  const en = entity.sitelinks?.enwiki?.title;
  const fr = entity.sitelinks?.frwiki?.title;
  extra.poster = await wikiPoster(en, fr);
  const { synopsis, url } = await wikiExtract(fr, en);
  extra.synopsis = synopsis;
  extra.wikiUrl = url;
  return extra;
}

async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity;
  const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
  const missingOnly = args.includes('--missing');

  const films = MOVEMENTS.flatMap((m) => m.films);
  const seen = new Set<string>();
  const unique = films.filter((f) => (seen.has(f.id) ? false : (seen.add(f.id), true)));
  const todo = unique
    .filter((f) => (only ? only.includes(f.id) : true))
    .filter((f) => (only ? true : missingOnly ? !cache[f.id]?.qid : !cache[f.id]))
    .slice(0, limit);

  console.log(`${unique.length} films uniques, ${Object.keys(cache).length} en cache, ${todo.length} à enrichir`);
  mkdirSync(CACHE_DIR, { recursive: true });

  let done = 0;
  const queue = [...todo];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const f = queue.shift()!;
      try {
        cache[f.id] = await enrichFilm(f);
      } catch (e) {
        cache[f.id] = { checkedAt: new Date().toISOString() };
        console.error(`  ! ${f.id}: ${e}`);
      }
      done++;
      if (done % 20 === 0 || done === todo.length) {
        console.log(`  ${done}/${todo.length} — ${f.id}: ${cache[f.id]?.qid ?? 'non trouvé'}`);
        writeFileSync(CACHE_FILE, JSON.stringify(cache));
      }
      await sleep(120);
    }
  });
  await Promise.all(workers);
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1));

  const found = Object.values(cache).filter((e) => e.qid).length;
  const posters = Object.values(cache).filter((e) => e.poster).length;
  const synos = Object.values(cache).filter((e) => e.synopsis).length;
  const casts = Object.values(cache).filter((e) => e.cast?.length).length;
  console.log(`résultats : ${found} identifiés, ${posters} affiches, ${synos} synopsis, ${casts} distributions`);

  const lines = Object.entries(cache)
    .filter(([id]) => seen.has(id))
    .map(([id, e]) => {
      const o: Record<string, unknown> = {};
      if (e.poster) o.poster = e.poster;
      if (e.cast?.length) o.cast = e.cast;
      if (e.directors?.length) o.directors = e.directors;
      if (e.synopsis) o.synopsis = e.synopsis;
      if (e.wikiUrl) o.wikiUrl = e.wikiUrl;
      if (e.qid) o.qid = e.qid;
      return `  '${id}': ${JSON.stringify(o)},`;
    });
  const file = `// Généré par scripts/enrich-films.ts — données Wikidata / Wikipédia (CC BY-SA / usage équitable).
// Ne pas éditer à la main : relancer le script pour régénérer.
import type { FilmExtra } from './types';

export const FILM_EXTRAS: Record<string, FilmExtra> = {
${lines.join('\n')}
};
`;
  writeFileSync(OUT_FILE, file);
  console.log(`écrit ${OUT_FILE} (${lines.length} entrées)`);
}

main();
