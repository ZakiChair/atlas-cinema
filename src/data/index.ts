import type { Movement } from './types';
import { MUET } from './movements/muet';
import { CLASSIQUE } from './movements/classique';
import { MODERNITES } from './movements/modernites';
import { CONTEMPORAIN } from './movements/contemporain';

export { ERAS, REGIONS, ERA_BANDS, TIME_BOUNDS, MAP_SIZE } from './eras';
export { SOURCES, SOURCE_BY_ID } from './sources';
export { LINKS } from './links';
export * from './types';

/** Tous les courants, dans l'ordre chronologique des ères puis des périodes. */
export const MOVEMENTS: Movement[] = [...MUET, ...CLASSIQUE, ...MODERNITES, ...CONTEMPORAIN].sort(
  (a, b) => a.period.start - b.period.start,
);

export const MOVEMENT_BY_ID: Record<string, Movement> = Object.fromEntries(MOVEMENTS.map((m) => [m.id, m]));
