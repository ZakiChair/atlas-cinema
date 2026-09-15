import type { Era, EraId, Region } from './types';

export const ERAS: Era[] = [
  {
    id: 'muet',
    name: 'Ère du muet',
    period: { start: 1895, end: 1929 },
    tagline: 'Invention d’un langage : de la vue Lumière au montage.',
  },
  {
    id: 'classique',
    name: 'Âge classique',
    period: { start: 1930, end: 1958 },
    tagline: 'Le parlant, les studios, les écoles nationales.',
  },
  {
    id: 'modernites',
    name: 'Modernités',
    period: { start: 1955, end: 1980 },
    tagline: 'Nouvelles vagues : le monde entier réinvente le cinéma.',
  },
  {
    id: 'contemporain',
    name: 'Contemporain',
    period: { start: 1980, end: null },
    tagline: 'Mondialisation, festivals, numérique, durée.',
  },
];

/**
 * Bandes de régions sur l'axe vertical (unités carte), contiguës et de hauteur
 * proportionnelle au nombre de courants qu'elles accueillent.
 */
export const REGIONS: Region[] = [
  { id: 'amerique-nord', name: 'Amérique du Nord', laneY: 350, y0: 0, y1: 700 },
  { id: 'europe-ouest', name: 'Europe de l’Ouest', laneY: 1200, y0: 700, y1: 1700 },
  { id: 'europe-est', name: 'Europe de l’Est et URSS', shortName: 'Europe de l’Est', laneY: 1960, y0: 1700, y1: 2220 },
  { id: 'asie', name: 'Asie', laneY: 2680, y0: 2220, y1: 3140 },
  { id: 'moyen-orient', name: 'Moyen-Orient', laneY: 3350, y0: 3140, y1: 3560 },
  { id: 'amerique-latine', name: 'Amérique latine', laneY: 3830, y0: 3560, y1: 4100 },
  { id: 'afrique', name: 'Afrique', laneY: 4300, y0: 4100, y1: 4500 },
];

/**
 * Bandes d'ères sur l'axe horizontal (unités carte). La chronologie n'est
 * qu'approximative : l'axe horizontal ordonne les courants par ère, l'axe
 * vertical par aire géographique.
 */
export const ERA_BANDS: { era: EraId; x0: number; x1: number }[] = [
  { era: 'muet', x0: 0, x1: 1520 },
  { era: 'classique', x0: 1520, x1: 2680 },
  { era: 'modernites', x0: 2680, x1: 4270 },
  { era: 'contemporain', x0: 4270, x1: 5600 },
];

/** Bornes temporelles de l'atlas (filtres chronologiques). */
export const TIME_BOUNDS = { start: 1895, end: 2025 } as const;

/** Dimensions de l'espace carte en unités virtuelles. */
export const MAP_SIZE = { width: 5600, height: 4500 } as const;
