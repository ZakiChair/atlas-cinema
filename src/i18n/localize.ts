import { useMemo } from 'react';
import {
  ERAS,
  REGIONS,
  MOVEMENTS,
  MOVEMENT_BY_ID,
  FILMMAKER_BY_ID,
  MOVEMENT_OF_FILMMAKER,
  LINKS,
  FILMMAKER_LINKS_BY_ID,
  SOURCE_BY_ID,
  FILM_EXTRAS,
} from '../data';
import type {
  AtlasNode,
  Era,
  FilmExtra,
  Filmmaker,
  FilmmakerLink,
  Link,
  LinkKind,
  Movement,
  Region,
  Source,
} from '../data/types';
import { buildNodes } from '../data/nodes';
import { EN } from './en';
import { useLang, type Lang } from './lang';
import type { UiKey } from './ui';

export const LINK_KIND_I18N: Record<LinkKind, UiKey> = {
  filiation: 'link.filiation',
  influence: 'link.influence',
  affinite: 'link.affinite',
  reaction: 'link.reaction',
};

export const FM_LINK_KIND_I18N: Record<FilmmakerLink['kind'], UiKey> = {
  ...LINK_KIND_I18N,
  collaboration: 'link.collaboration',
};

export const LEVEL_I18N: UiKey[] = ['level.0', 'level.1', 'level.2', 'level.3'];

// ——— localisation ponctuelle (cache : un clone par objet et par langue) ———

const movementCache = new WeakMap<Movement, Partial<Record<Lang, Movement>>>();

export function localizeMovement(m: Movement, lang: Lang): Movement {
  if (lang === 'fr') return m;
  const hit = movementCache.get(m);
  if (hit?.[lang]) return hit[lang]!;
  const e = EN.movements[m.id];
  if (!e) return m;
  const out: Movement = {
    ...m,
    name: e.name ?? m.name,
    altNames: e.altNames ?? m.altNames,
    tagline: e.tagline ?? m.tagline,
    summary: e.summary ?? m.summary,
    countries: e.countries ?? m.countries,
    keyDates: m.keyDates.map((k, i) => ({ ...k, text: e.keyDates?.[i] ?? k.text })),
    visualTraits: m.visualTraits.map((s, i) => ({ ...s, text: e.visualTraits?.[i] ?? s.text })),
    context: m.context.map((s, i) => ({ ...s, text: e.context?.[i] ?? s.text })),
    debates: m.debates.map((s, i) => ({ ...s, text: e.debates?.[i] ?? s.text })),
    styles: m.styles.map((s) => {
      const es = e.styles?.[s.id];
      return es ? { ...s, name: es.name ?? s.name, summary: es.summary ?? s.summary, traits: es.traits ?? s.traits } : s;
    }),
    filmmakers: m.filmmakers.map((f) => {
      const ef = e.filmmakers?.[f.id];
      return ef ? { ...f, bio: ef.bio ?? f.bio, nationality: ef.nationality ?? f.nationality } : f;
    }),
    films: m.films.map((f) => {
      const ef = e.films?.[f.id];
      return ef ? { ...f, comment: ef.comment ?? f.comment, country: ef.country ?? f.country } : f;
    }),
  };
  movementCache.set(m, { ...hit, [lang]: out });
  return out;
}

export function localizeLink(l: Link, lang: Lang): Link {
  if (lang === 'fr') return l;
  const e = EN.links[`${l.source}|${l.target}|${l.kind}`];
  return e ? { ...l, label: e.label ?? l.label, note: e.note ?? l.note } : l;
}

export function localizeFilmmakerLink(l: FilmmakerLink, lang: Lang): FilmmakerLink {
  if (lang === 'fr') return l;
  const e = EN.filmmakerLinks[`${l.source}|${l.target}|${l.kind}`];
  return e ? { ...l, note: e.note ?? l.note } : l;
}

export function localizeEra(e: Era, lang: Lang): Era {
  if (lang === 'fr') return e;
  const t = EN.eras[e.id];
  return t ? { ...e, name: t.name ?? e.name, tagline: t.tagline ?? e.tagline } : e;
}

export function localizeRegion(r: Region, lang: Lang): Region {
  if (lang === 'fr') return r;
  const t = EN.regions[r.id];
  return t ? { ...r, name: t.name ?? r.name, shortName: t.shortName ?? r.shortName } : r;
}

export function localizeSource(s: Source, lang: Lang): Source {
  if (lang === 'fr') return s;
  const t = EN.sources[s.id];
  return t ? { ...s, note: t.note ?? s.note } : s;
}

export function localizeFilmExtra(id: string, lang: Lang): FilmExtra | undefined {
  const raw = FILM_EXTRAS[id];
  if (!raw) return undefined;
  if (lang === 'fr') return raw;
  const t = EN.extras[id];
  if (!t) return raw;
  return { ...raw, synopsis: t.synopsis ?? raw.synopsis, wikiUrl: t.wikiUrl ?? raw.wikiUrl };
}

// ——— accès groupé : toutes les données affichables dans une langue ———

export interface AtlasData {
  lang: Lang;
  movements: Movement[];
  movementById: Record<string, Movement>;
  filmmakerById: Record<string, Filmmaker>;
  movementOfFilmmaker: Record<string, Movement>;
  links: Link[];
  filmmakerLinksById: Record<string, FilmmakerLink[]>;
  eras: Era[];
  regions: Region[];
  nodes: AtlasNode[];
  filmExtra: (id: string) => FilmExtra | undefined;
  sourceById: Record<string, Source>;
}

const DATA: Partial<Record<Lang, AtlasData>> = {};

export function atlasData(lang: Lang): AtlasData {
  const hit = DATA[lang];
  if (hit) return hit;
  if (lang === 'fr') {
    const data: AtlasData = {
      lang,
      movements: MOVEMENTS,
      movementById: MOVEMENT_BY_ID,
      filmmakerById: FILMMAKER_BY_ID,
      movementOfFilmmaker: MOVEMENT_OF_FILMMAKER,
      links: LINKS,
      filmmakerLinksById: FILMMAKER_LINKS_BY_ID,
      eras: ERAS,
      regions: REGIONS,
      nodes: buildNodes(MOVEMENTS, lang),
      filmExtra: (id) => FILM_EXTRAS[id],
      sourceById: SOURCE_BY_ID,
    };
    DATA[lang] = data;
    return data;
  }
  const movements = MOVEMENTS.map((m) => localizeMovement(m, lang));
  const movementById = Object.fromEntries(movements.map((m) => [m.id, m]));
  const filmmakerById = Object.fromEntries(movements.flatMap((m) => m.filmmakers.map((f) => [f.id, f] as const)));
  const movementOfFilmmaker = Object.fromEntries(movements.flatMap((m) => m.filmmakers.map((f) => [f.id, m] as const)));
  const data: AtlasData = {
    lang,
    movements,
    movementById,
    filmmakerById,
    movementOfFilmmaker,
    links: LINKS.map((l) => localizeLink(l, lang)),
    filmmakerLinksById: Object.fromEntries(
      Object.entries(FILMMAKER_LINKS_BY_ID).map(([k, ls]) => [k, ls.map((l) => localizeFilmmakerLink(l, lang))]),
    ),
    eras: ERAS.map((e) => localizeEra(e, lang)),
    regions: REGIONS.map((r) => localizeRegion(r, lang)),
    nodes: buildNodes(movements, lang),
    filmExtra: (id) => localizeFilmExtra(id, lang),
    sourceById: Object.fromEntries(Object.entries(SOURCE_BY_ID).map(([k, s]) => [k, localizeSource(s, lang)])),
  };
  DATA[lang] = data;
  return data;
}

export function useData(): AtlasData {
  const { lang } = useLang();
  return useMemo(() => atlasData(lang), [lang]);
}
