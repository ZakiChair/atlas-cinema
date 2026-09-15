import { MOVEMENTS, MOVEMENT_BY_ID } from '../data';
import type { Film, Filmmaker, Movement, Style } from '../data/types';
import type { Selection } from '../state/store';
import { movementOf } from '../map/bounds';

export interface Resolved {
  movement?: Movement;
  style?: Style;
  filmmaker?: Filmmaker;
  film?: Film;
  /** Courant qui définit le cinéaste (peut différer du courant affiché). */
  filmmakerHome?: Movement;
}

export function resolveSelection(sel: Selection | null): Resolved | null {
  if (!sel) return null;
  const mid = movementOf(sel);
  const m = mid ? MOVEMENT_BY_ID[mid] : undefined;
  if (!m) return null;
  const out: Resolved = { movement: m };
  if (sel.kind === 'style') out.style = m.styles.find((s) => s.id === sel.id);
  if (sel.kind === 'filmmaker') {
    out.filmmaker = m.filmmakers.find((f) => f.id === sel.id);
    if (!out.filmmaker) {
      // cinéaste défini dans un autre courant
      for (const other of MOVEMENTS) {
        const f = other.filmmakers.find((x) => x.id === sel.id);
        if (f) {
          out.filmmaker = f;
          out.filmmakerHome = other;
          break;
        }
      }
    } else out.filmmakerHome = m;
    if (out.filmmaker?.styleId) out.style = m.styles.find((s) => s.id === out.filmmaker!.styleId) ?? out.filmmakerHome?.styles.find((s) => s.id === out.filmmaker!.styleId);
  }
  if (sel.kind === 'film') {
    out.film = m.films.find((f) => f.id === sel.id);
    if (out.film?.styleId) out.style = m.styles.find((s) => s.id === out.film!.styleId);
    if (out.film?.filmmakerId) out.filmmaker = m.filmmakers.find((f) => f.id === out.film!.filmmakerId);
  }
  return out;
}

/** Liste ordonnée des sources d'un courant : movement.sources + citées en plus. */
export function sourceOrderFor(m: Movement): string[] {
  const order = [...m.sources];
  for (const s of [...m.visualTraits, ...m.context, ...m.debates]) {
    for (const sid of s.sources ?? []) {
      if (!order.includes(sid)) order.push(sid);
    }
  }
  return order;
}
