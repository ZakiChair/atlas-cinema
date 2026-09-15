import type { Era, Link, Movement, Region, Source } from './types';
import { MAP_SIZE } from './eras';

export interface AtlasInput {
  movements: Movement[];
  links: Link[];
  sources: Source[];
  eras: Era[];
  regions: Region[];
}

const HEX = /^#[0-9a-fA-F]{6}$/;

/** Validation du corpus : renvoie une liste de messages d'erreur lisibles. */
export function validateAtlas(input: AtlasInput): string[] {
  const errors: string[] = [];
  const { movements, links, sources, eras, regions } = input;

  const eraIds = new Set(eras.map((e) => e.id));
  const regionIds = new Set(regions.map((r) => r.id));
  const sourceIds = new Set(sources.map((s) => s.id));

  // ids uniques globalement par type
  const allIds = new Map<string, string>();
  const claim = (id: string, ctx: string) => {
    const prev = allIds.get(id);
    if (prev) errors.push(`id dupliqué « ${id} » (${prev} et ${ctx})`);
    else allIds.set(id, ctx);
  };

  const movementIds = new Set<string>();
  const globalFilmmakerIds = new Set<string>();

  for (const m of movements) {
    movementIds.add(m.id);
    claim(`movement:${m.id}`, `courant ${m.id}`);
    for (const s of m.styles) claim(`style:${s.id}`, `style ${s.id} (courant ${m.id})`);
    for (const f of m.filmmakers) {
      claim(`filmmaker:${f.id}`, `cinéaste ${f.id} (courant ${m.id})`);
      globalFilmmakerIds.add(f.id);
    }
    for (const f of m.films) claim(`film:${f.id}`, `film ${f.id} (courant ${m.id})`);
  }

  const checkSources = (ids: string[] | undefined, ctx: string) => {
    for (const sid of ids ?? []) {
      if (!sourceIds.has(sid)) errors.push(`${ctx} : source inconnue « ${sid} »`);
    }
  };

  for (const m of movements) {
    const ctx = `courant ${m.id}`;
    if (!eraIds.has(m.era)) errors.push(`${ctx} : era inconnue « ${m.era} »`);
    for (const r of m.regions) {
      if (!regionIds.has(r)) errors.push(`${ctx} : région inconnue « ${r} »`);
    }
    if (m.period.start > (m.period.end ?? Infinity)) {
      errors.push(`${ctx} : period.start (${m.period.start}) > period.end (${m.period.end})`);
    }
    if (!m.summary.trim()) errors.push(`${ctx} : summary vide`);
    if (!m.tagline.trim()) errors.push(`${ctx} : tagline vide`);
    for (const c of [m.map.palette.fill, m.map.palette.stroke, m.map.palette.accent]) {
      if (!HEX.test(c)) errors.push(`${ctx} : couleur invalide « ${c} »`);
    }
    if (m.map.x < 0 || m.map.x > MAP_SIZE.width || m.map.y < 0 || m.map.y > MAP_SIZE.height) {
      errors.push(`${ctx} : position carte (${m.map.x},${m.map.y}) hors bornes`);
    }
    if (m.styles.length < 2) errors.push(`${ctx} : moins de 2 styles (${m.styles.length})`);
    if (m.filmmakers.length < 3) errors.push(`${ctx} : moins de 3 cinéastes (${m.filmmakers.length})`);
    if (m.films.length < 4) errors.push(`${ctx} : moins de 4 films (${m.films.length})`);
    if (m.sources.length < 2) errors.push(`${ctx} : moins de 2 sources (${m.sources.length})`);
    checkSources(m.sources, ctx);

    const styleIds = new Set(m.styles.map((s) => s.id));
    const filmmakerIds = new Set(m.filmmakers.map((f) => f.id));
    const related = new Set(m.relatedFilmmakerIds ?? []);

    const statements = [...m.visualTraits, ...m.context, ...m.debates];
    if (!statements.some((s) => s.kind === 'fait')) {
      errors.push(`${ctx} : aucun énoncé « fait » dans visualTraits/context/debates`);
    }
    if (!statements.some((s) => s.kind === 'interpretation')) {
      errors.push(`${ctx} : aucun énoncé « interpretation » dans visualTraits/context/debates`);
    }
    statements.forEach((s, i) => checkSources(s.sources, `${ctx} énoncé #${i}`));

    for (const f of m.filmmakers) {
      if (f.styleId && !styleIds.has(f.styleId)) {
        errors.push(`${ctx} : cinéaste ${f.id} : styleId inconnu « ${f.styleId} »`);
      }
      if (f.years[1] !== null && f.years[0] >= f.years[1]) {
        errors.push(`${ctx} : cinéaste ${f.id} : années invalides (${f.years[0]}, ${f.years[1]})`);
      }
    }
    const lo = m.period.start - 5;
    const hi = (m.period.end ?? 2030) + 5;
    for (const f of m.films) {
      if (f.styleId && !styleIds.has(f.styleId)) {
        errors.push(`${ctx} : film ${f.id} : styleId inconnu « ${f.styleId} »`);
      }
      if (f.filmmakerId) {
        const ok = filmmakerIds.has(f.filmmakerId) || (related.has(f.filmmakerId) && globalFilmmakerIds.has(f.filmmakerId));
        if (!ok) {
          if (related.has(f.filmmakerId)) {
            errors.push(`${ctx} : film ${f.id} : relatedFilmmakerId « ${f.filmmakerId} » inexistant globalement`);
          } else {
            errors.push(`${ctx} : film ${f.id} : filmmakerId inconnu « ${f.filmmakerId} »`);
          }
        }
      }
      if (f.year < lo || f.year > hi) {
        errors.push(`${ctx} : film ${f.id} : année ${f.year} hors [${lo}, ${hi}]`);
      }
    }
    for (const rid of m.relatedFilmmakerIds ?? []) {
      if (!globalFilmmakerIds.has(rid)) {
        errors.push(`${ctx} : relatedFilmmakerId inexistant « ${rid} »`);
      }
    }
  }

  const linkKeys = new Set<string>();
  for (const l of links) {
    const ctx = `lien ${l.source}→${l.target}`;
    if (!movementIds.has(l.source)) errors.push(`${ctx} : source inconnue « ${l.source} »`);
    if (!movementIds.has(l.target)) errors.push(`${ctx} : target inconnue « ${l.target} »`);
    if (l.source === l.target) errors.push(`${ctx} : auto-lien interdit`);
    const key = `${l.source}|${l.target}|${l.kind}`;
    if (linkKeys.has(key)) errors.push(`${ctx} (${l.kind}) : doublon`);
    linkKeys.add(key);
    checkSources(l.sources, ctx);
  }

  return errors;
}
