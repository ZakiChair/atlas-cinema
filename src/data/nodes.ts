import { MOVEMENTS, MOVEMENT_BY_ID } from './index';
import type { AtlasNode, Movement } from './types';
import { normalizeText } from '../lib/normalize';
import type { Lang } from '../i18n/lang';

function nodesForMovement(m: Movement, lang: Lang): AtlasNode[] {
  // en mode EN, le texte de recherche inclut aussi les libellés FR d'origine :
  // « nouvelle vague » doit retrouver « New Wave ».
  const raw = lang === 'fr' ? m : (MOVEMENT_BY_ID[m.id] ?? m);
  const nodes: AtlasNode[] = [
    {
      kind: 'movement',
      id: m.id,
      label: m.name,
      sublabel: m.countries.join(', '),
      movementId: m.id,
      searchText: normalizeText(
        [m.name, raw.name, ...(m.altNames ?? []), ...(raw.altNames ?? []), ...m.countries, ...(raw.countries ?? [])].join(' '),
      ),
    },
  ];
  const rawStyles = new Map(raw.styles.map((s) => [s.id, s]));
  for (const s of m.styles) {
    nodes.push({
      kind: 'style',
      id: s.id,
      label: s.name,
      sublabel: m.name,
      movementId: m.id,
      styleId: s.id,
      searchText: normalizeText(`${s.name} ${rawStyles.get(s.id)?.name ?? ''}`),
    });
  }
  const rawFilmmakers = new Map(raw.filmmakers.map((f) => [f.id, f]));
  for (const f of m.filmmakers) {
    nodes.push({
      kind: 'filmmaker',
      id: f.id,
      label: f.name,
      sublabel: `${f.nationality} · ${m.name}`,
      movementId: m.id,
      styleId: f.styleId,
      filmmakerId: f.id,
      searchText: normalizeText(`${f.name} ${f.nationality} ${rawFilmmakers.get(f.id)?.nationality ?? ''}`),
    });
  }
  for (const f of m.films) {
    nodes.push({
      kind: 'film',
      id: f.id,
      label: f.title,
      sublabel: `${f.director} · ${f.year}`,
      movementId: m.id,
      styleId: f.styleId,
      filmmakerId: f.filmmakerId,
      searchText: normalizeText([f.title, f.originalTitle ?? '', f.director].join(' ')),
    });
  }
  return nodes;
}

export function buildNodes(movements: Movement[], lang: Lang): AtlasNode[] {
  return movements.flatMap((m) => nodesForMovement(m, lang));
}

export const ATLAS_NODES: AtlasNode[] = buildNodes(MOVEMENTS, 'fr');
