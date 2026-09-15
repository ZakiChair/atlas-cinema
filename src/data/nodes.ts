import { MOVEMENTS } from './index';
import type { AtlasNode, Movement } from './types';
import { normalizeText } from '../lib/normalize';

function nodesForMovement(m: Movement): AtlasNode[] {
  const nodes: AtlasNode[] = [
    {
      kind: 'movement',
      id: m.id,
      label: m.name,
      sublabel: m.countries.join(', '),
      movementId: m.id,
      searchText: normalizeText([m.name, ...(m.altNames ?? []), ...m.countries].join(' ')),
    },
  ];
  for (const s of m.styles) {
    nodes.push({
      kind: 'style',
      id: s.id,
      label: s.name,
      sublabel: m.name,
      movementId: m.id,
      styleId: s.id,
      searchText: normalizeText(s.name),
    });
  }
  for (const f of m.filmmakers) {
    nodes.push({
      kind: 'filmmaker',
      id: f.id,
      label: f.name,
      sublabel: `${f.nationality} · ${m.name}`,
      movementId: m.id,
      styleId: f.styleId,
      filmmakerId: f.id,
      searchText: normalizeText(`${f.name} ${f.nationality}`),
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

export const ATLAS_NODES: AtlasNode[] = MOVEMENTS.flatMap(nodesForMovement);
