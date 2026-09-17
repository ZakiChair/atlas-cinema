/**
 * Rattrapage unitaire : traduit un par un les textes absents du cache
 * (les lots qui échouent en masse passent mieux isolés). Réécrire ensuite
 * en-data.ts via i18n-generate.
 */
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { ERAS, REGIONS, MOVEMENTS, LINKS, FILMMAKER_LINKS, SOURCES, FILM_EXTRAS } from '../src/data';

const CACHE = 'scripts/.cache/i18n-en.json';
const EX_CACHE = 'scripts/.cache/i18n-extras.json';
const cache: Record<string, { text: string; en: string }> = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};
const exCache: Record<string, { synopsis?: string }> = existsSync(EX_CACHE) ? JSON.parse(readFileSync(EX_CACHE, 'utf8')) : {};
const h = (s: string) => createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 16);

const missing = new Map<string, string>();
const collect = (text?: string | null) => {
  if (!text) return;
  const t = text.trim();
  if (t && !cache[h(t)]) missing.set(h(t), t);
};

for (const e of ERAS) { collect(e.name); collect(e.tagline); }
for (const r of REGIONS) { collect(r.name); collect(r.shortName); }
for (const m of MOVEMENTS) {
  collect(m.name); collect(m.tagline); collect(m.summary);
  m.countries.forEach(collect);
  m.keyDates.forEach((k) => collect(k.text));
  [...m.visualTraits, ...m.context, ...m.debates].forEach((s) => collect(s.text));
  for (const s of m.styles) { collect(s.name); collect(s.summary); s.traits.forEach(collect); }
  for (const f of m.filmmakers) { collect(f.bio); collect(f.nationality); }
  for (const f of m.films) { collect(f.comment); collect(f.country); }
}
for (const l of LINKS) { collect(l.label); collect(l.note); }
for (const l of FILMMAKER_LINKS) collect(l.note);
for (const s of SOURCES) collect(s.note);
for (const id of Object.keys(FILM_EXTRAS)) {
  if (!exCache[id]?.synopsis) collect(FILM_EXTRAS[id].synopsis);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function one(text: string): Promise<string> {
  const msgs = JSON.stringify([
    { role: 'system', content: 'Tu es un traducteur FR→EN spécialisé dans le cinéma. Réponds UNIQUEMENT par un JSON {"en":"..."} : traduction anglaise naturelle, noms propres et titres de films conservés, pas de guillemets « ».' },
    { role: 'user', content: text },
  ]);
  const out = await new Promise<string>((res, rej) => {
    const p = execFile('mmx', ['text', 'chat', '--messages-file', '-', '--output', 'json', '--max-tokens', '8000', '--temperature', '0.2', '--non-interactive'], { timeout: 180_000, maxBuffer: 8 * 1024 * 1024 }, (e, s) => (e ? rej(e) : res(s)));
    p.stdin?.end(msgs);
  });
  const d = JSON.parse(out);
  if (d.error) throw new Error(d.error.message);
  const t: string = d?.content?.[0]?.text ?? '';
  const j = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
  return j.en;
}

async function main() {
  console.log(`${missing.size} textes à rattraper`);
  let ok = 0;
  let fail = 0;
  let i = 0;
  for (const [id, t] of missing) {
    let done = false;
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        const en = await one(t);
        if (en) { cache[id] = { text: t, en }; ok++; done = true; break; }
        throw new Error('vide');
      } catch (e) {
        const msg = e instanceof Error ? e.message : '';
        await sleep(/rate limit|quota/i.test(msg) ? 15_000 + attempt * 10_000 : 1_500);
      }
    }
    if (!done) fail++;
    if (++i % 20 === 0) { writeFileSync(CACHE, JSON.stringify(cache)); console.log(`  ${i}/${missing.size} (ok ${ok}, échec ${fail})`); }
    await sleep(250);
  }
  writeFileSync(CACHE, JSON.stringify(cache));
  console.log(`ok ${ok}, échec ${fail} — relancer i18n-generate pour réémettre en-data.ts`);
}

main();
