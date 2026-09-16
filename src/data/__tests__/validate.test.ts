import { describe, it, expect } from 'vitest';
import { validateAtlas } from '../validate';
import { MOVEMENTS, LINKS, SOURCES, ERAS, REGIONS, FILMMAKER_LINKS } from '../index';

describe('validateAtlas', () => {
  it('le corpus actuel est valide', () => {
    const errors = validateAtlas({
      movements: MOVEMENTS,
      links: LINKS,
      sources: SOURCES,
      eras: ERAS,
      regions: REGIONS,
      filmmakerLinks: FILMMAKER_LINKS,
    });
    expect(errors).toEqual([]);
  });
});
