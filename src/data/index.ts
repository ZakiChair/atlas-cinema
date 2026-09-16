import type { Filmmaker, Movement } from './types';
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

export const FILMMAKER_BY_ID: Record<string, Filmmaker> = Object.fromEntries(
  MOVEMENTS.flatMap((m) => m.filmmakers.map((f) => [f.id, f] as const)),
);

/** Mouvement dans lequel chaque cinéaste est rangé (les ids de cinéastes sont uniques globalement). */
export const MOVEMENT_OF_FILMMAKER: Record<string, Movement> = Object.fromEntries(
  MOVEMENTS.flatMap((m) => m.filmmakers.map((f) => [f.id, m] as const)),
);

export { FILM_EXTRAS } from './filmExtras';
export { FILMMAKER_LINKS, FILMMAKER_LINKS_BY_ID } from './filmmakerLinks';
