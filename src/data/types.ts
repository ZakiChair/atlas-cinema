/**
 * Schéma de données de l'Atlas du cinéma.
 *
 * Principe éditorial : chaque énoncé historique est typé.
 *  - `fait`           : événement datable, documenté, ou observation formelle vérifiable
 *                       (dates, personnes, dispositifs, procédés visibles à l'écran).
 *  - `interpretation` : lecture critique, attribution de sens ou d'influence,
 *                       jugement esthétique — signé par une tradition critique et discutable.
 *
 * Les liens entre courants sont eux aussi typés (nature du lien + statut épistémique).
 */

export type Epistemic = 'fait' | 'interpretation';

export interface Statement {
  kind: Epistemic;
  text: string;
  /** Identifiants de sources (registre `sources.ts`). */
  sources?: string[];
}

export type EraId = 'muet' | 'classique' | 'modernites' | 'contemporain';

export interface Era {
  id: EraId;
  name: string;
  period: Period;
  tagline: string;
}

export type RegionId =
  | 'amerique-nord'
  | 'europe-ouest'
  | 'europe-est'
  | 'asie'
  | 'amerique-latine'
  | 'moyen-orient'
  | 'afrique';

export interface Region {
  id: RegionId;
  name: string;
  /** Libellé court pour les marges de la carte (par défaut : name). */
  shortName?: string;
  /** Centre de la bande horizontale indicative sur la carte (unités carte). */
  laneY: number;
  /** Bornes verticales de la bande (unités carte) ; les bandes sont contiguës. */
  y0: number;
  y1: number;
}

export interface Period {
  start: number;
  /** `null` = toujours actif. */
  end: number | null;
  /** Bornes conventionnelles, discutées par les historiens. */
  approx?: boolean;
}

export type SourceType = 'livre' | 'article' | 'manifeste' | 'film' | 'web' | 'archive';

export interface Source {
  id: string;
  type: SourceType;
  author: string;
  title: string;
  year?: number;
  publisher?: string;
  url?: string;
  /** Précision : édition consultée, chapitre pertinent, etc. */
  note?: string;
}

export type LinkKind = 'filiation' | 'influence' | 'affinite' | 'reaction';

export interface Link {
  /** Identifiant du courant d'origine (antérieur ou contemporain). */
  source: string;
  /** Identifiant du courant d'arrivée. */
  target: string;
  /**
   * filiation : continuité historique directe (mêmes personnes, institutions, pays)
   * influence : influence esthétique ou idéologique documentée à distance
   * affinite  : parenté esthétique sans causalité démontrée (toujours interprétative)
   * reaction  : rupture ou opposition explicite
   */
  kind: LinkKind;
  epistemic: Epistemic;
  /** Formule courte affichée sur la carte / dans le panneau. */
  label: string;
  /** Explication en une ou deux phrases. */
  note: string;
  sources?: string[];
}

export interface Style {
  id: string;
  name: string;
  period?: Period;
  summary: string;
  /** Caractéristiques visuelles et formelles, en quelques mots chacune. */
  traits: string[];
}

export interface Filmmaker {
  id: string;
  name: string;
  /** [naissance, décès | null si vivant]. */
  years: [number, number | null];
  nationality: string;
  /** Deux ou trois phrases : rôle dans le courant, singularité. */
  bio: string;
  /** Sous-courant principal, si pertinent. */
  styleId?: string;
}

export interface Film {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  /** Nom affiché du ou des réalisateurs. */
  director: string;
  /** Référence vers `Filmmaker.id` si le cinéaste figure dans l'atlas. */
  filmmakerId?: string;
  styleId?: string;
  country: string;
  /** Recommandation commentée : pourquoi le voir, quoi regarder. */
  comment: string;
}

export interface MapPlacement {
  /** Coordonnées cibles en unités carte (voir MAP_SIZE : 4400 × 3200). L'axe x suit les bandes d'ères (ERA_BANDS), l'axe y les aires géographiques (REGIONS.laneY). */
  x: number;
  y: number;
  /** Importance historique → rayon du territoire. */
  size: 1 | 2 | 3;
  palette: {
    /** Teinte principale du territoire (utilisée en aplat translucide). */
    fill: string;
    /** Contour et libellés. */
    stroke: string;
    /** Accent : titres, surlignage, marqueurs. */
    accent: string;
  };
}

export interface KeyDate {
  year: number;
  text: string;
}

export interface Movement {
  id: string;
  name: string;
  altNames?: string[];
  era: EraId;
  period: Period;
  regions: RegionId[];
  countries: string[];
  map: MapPlacement;
  /** Une ligne, ton évocateur. */
  tagline: string;
  /** Description accessible en trois ou quatre phrases. */
  summary: string;
  /** Caractéristiques visuelles et formelles (faits et interprétations mêlés, typés). */
  visualTraits: Statement[];
  /** Contexte historique, économique, technique. */
  context: Statement[];
  /** Lectures critiques, débats historiographiques (interprétations principalement). */
  debates: Statement[];
  keyDates: KeyDate[];
  styles: Style[];
  filmmakers: Filmmaker[];
  /** Cinéastes définis dans un autre courant mais actifs ici. */
  relatedFilmmakerIds?: string[];
  films: Film[];
  /** Sources principales (identifiants du registre). */
  sources: string[];
}

/** Nœud aplati pour la recherche et la navigation. */
export type NodeKind = 'movement' | 'style' | 'filmmaker' | 'film';

export interface AtlasNode {
  kind: NodeKind;
  id: string;
  label: string;
  sublabel?: string;
  movementId: string;
  styleId?: string;
  filmmakerId?: string;
  /** Champs normalisés (sans accents, minuscules) pour la recherche. */
  searchText: string;
}
