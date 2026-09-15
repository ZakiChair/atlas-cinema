import { describe, it, expect } from 'vitest';
import { computeLayout, baseRadius, RELAX_MARGIN } from '../layout';
import { MOVEMENTS, MAP_SIZE } from '../../data';
import type { Movement } from '../../data/types';
import { seededRandom } from '../../lib/prng';

/** Génère un jeu synthétique de n courants très denses. */
function syntheticMovements(n: number): Movement[] {
  const rand = seededRandom('synthetic');
  const out: Movement[] = [];
  for (let i = 0; i < n; i++) {
    const styles = Array.from({ length: 2 + Math.floor(rand() * 4) }, (_, j) => ({
      id: `m${i}-s${j}`,
      name: `Style ${j}`,
      summary: 's',
      traits: ['t'],
    }));
    const filmmakers = Array.from({ length: 6 + Math.floor(rand() * 6) }, (_, j) => ({
      id: `m${i}-f${j}`,
      name: `Réal ${j}`,
      years: [1900, 1980] as [number, number | null],
      nationality: 'x',
      bio: 'b',
      styleId: rand() < 0.8 ? styles[Math.floor(rand() * styles.length)].id : undefined,
    }));
    const films = Array.from({ length: 10 + Math.floor(rand() * 6) }, (_, j) => ({
      id: `m${i}-fi${j}`,
      title: `Film ${j}`,
      year: 1960,
      director: 'x',
      country: 'x',
      comment: 'c',
      filmmakerId: rand() < 0.8 ? filmmakers[Math.floor(rand() * filmmakers.length)].id : undefined,
      styleId: rand() < 0.5 ? styles[Math.floor(rand() * styles.length)].id : undefined,
    }));
    out.push({
      id: `m${i}`,
      name: `Courant ${i}`,
      era: 'modernites',
      period: { start: 1950 + (i % 40), end: 1990 },
      regions: ['europe-ouest'],
      countries: ['X'],
      // positions volontairement serrées pour stresser la relaxation
      map: {
        x: 400 + (i % 8) * 400 + rand() * 120,
        y: 400 + Math.floor(i / 8) * 450 + rand() * 120,
        size: (1 + Math.floor(rand() * 3)) as 1 | 2 | 3,
        palette: { fill: '#223344', stroke: '#aabbcc', accent: '#ffcc66' },
      },
      tagline: 't',
      summary: 's',
      visualTraits: [{ kind: 'fait', text: 'x' }],
      context: [{ kind: 'interpretation', text: 'y' }],
      debates: [],
      keyDates: [],
      styles,
      filmmakers,
      films,
      sources: [],
    });
  }
  return out;
}

function checkLayout(moves: Movement[]) {
  const a = computeLayout(moves);
  const b = computeLayout(moves);
  // déterminisme
  expect(a).toEqual(b);
  // centres dans les bornes
  for (const t of a.territories) {
    expect(t.x).toBeGreaterThanOrEqual(0);
    expect(t.x).toBeLessThanOrEqual(MAP_SIZE.width);
    expect(t.y).toBeGreaterThanOrEqual(0);
    expect(t.y).toBeLessThanOrEqual(MAP_SIZE.height);
    expect(t.path.length).toBeGreaterThan(10);
    // enfants ≤ 0.85 r
    for (const c of t.children) {
      expect(Math.hypot(c.x - t.x, c.y - t.y)).toBeLessThanOrEqual(t.r * 0.85 + 1e-6);
    }
  }
  // pas de chevauchement de cercles (r + marge de chaque côté)
  for (let i = 0; i < a.territories.length; i++) {
    for (let j = i + 1; j < a.territories.length; j++) {
      const t1 = a.territories[i];
      const t2 = a.territories[j];
      const d = Math.hypot(t1.x - t2.x, t1.y - t2.y);
      expect(d).toBeGreaterThanOrEqual(t1.r + t2.r + 2 * RELAX_MARGIN - 1);
    }
  }
  return a;
}

describe('computeLayout', () => {
  it('corpus réel : déterministe, borné, sans chevauchement', () => {
    checkLayout(MOVEMENTS);
  });

  it('40 courants synthétiques denses : convergence bornée', () => {
    const moves = syntheticMovements(40);
    const layout = checkLayout(moves);
    expect(layout.territories).toHaveLength(40);
  });

  it('baseRadius croît avec le nombre de films (plafonné)', () => {
    const m = MOVEMENTS[0];
    const r0 = baseRadius({ ...m, films: m.films.slice(0, 8) });
    const r1 = baseRadius({ ...m, films: [...m.films, ...m.films] });
    expect(r1).toBeGreaterThanOrEqual(r0);
    expect(r1).toBeLessThanOrEqual(r0 * 1.26);
  });
});
