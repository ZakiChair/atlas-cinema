import { describe, it, expect } from 'vitest';
import { search } from '../search';

describe('search', () => {
  it('« godard » → Jean-Luc Godard en tête', () => {
    const r = search('godard');
    expect(r.length).toBeGreaterThan(0);
    expect(r[0].node.kind).toBe('filmmaker');
    expect(r[0].node.label).toBe('Jean-Luc Godard');
  });

  it('« a bout de souffle » (sans accent) → le film', () => {
    const r = search('a bout de souffle');
    expect(r.some((x) => x.node.id === 'a-bout-de-souffle' && x.node.kind === 'film')).toBe(true);
    expect(r[0].node.id).toBe('a-bout-de-souffle');
  });

  it('« nouvelle vague » → le courant', () => {
    const r = search('nouvelle vague');
    expect(r[0].node.kind).toBe('movement');
    expect(r[0].node.id).toBe('nouvelle-vague');
  });

  it('« Caligari » → le film', () => {
    const r = search('Caligari');
    expect(r[0].node.kind).toBe('film');
    expect(r[0].node.id).toBe('caligari');
  });

  it('limite à 6 résultats par groupe', () => {
    const r = search('le');
    const byKind = new Map<string, number>();
    for (const x of r) byKind.set(x.node.kind, (byKind.get(x.node.kind) ?? 0) + 1);
    for (const n of byKind.values()) expect(n).toBeLessThanOrEqual(6);
  });

  it('chaîne vide → aucun résultat', () => {
    expect(search('')).toEqual([]);
    expect(search('   ')).toEqual([]);
  });
});
