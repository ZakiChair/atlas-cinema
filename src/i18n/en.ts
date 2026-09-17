/**
 * Traductions anglaises du corpus. Généré par `npm run i18n` (scripts/i18n-generate.ts) :
 * traduction MiniMax des textes FR + synopsis repris de l'article en.wikipedia (via qid).
 * Toute clé absente retombe sur le texte français à l'affichage.
 */

export interface EnMovement {
  name?: string;
  altNames?: string[];
  tagline?: string;
  summary?: string;
  countries?: string[];
  keyDates?: string[];
  visualTraits?: string[];
  context?: string[];
  debates?: string[];
  styles?: Record<string, { name?: string; summary?: string; traits?: string[] }>;
  filmmakers?: Record<string, { bio?: string; nationality?: string }>;
  films?: Record<string, { comment?: string; country?: string }>;
}

export interface EnData {
  eras: Record<string, { name?: string; tagline?: string }>;
  regions: Record<string, { name?: string; shortName?: string }>;
  movements: Record<string, EnMovement>;
  /** clé : `${source}|${target}|${kind}` */
  links: Record<string, { label?: string; note?: string }>;
  /** clé : `${source}|${target}|${kind}` */
  filmmakerLinks: Record<string, { note?: string }>;
  sources: Record<string, { note?: string }>;
  /** Film.id → synopsis / lien en.wikipedia. */
  extras: Record<string, { synopsis?: string; wikiUrl?: string }>;
}

export const EMPTY_EN: EnData = {
  eras: {},
  regions: {},
  movements: {},
  links: {},
  filmmakerLinks: {},
  sources: {},
  extras: {},
};

export { EN_DATA as EN } from './en-data';
