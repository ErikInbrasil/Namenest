import { describe, expect, it } from 'vitest';
import { generateNames, searchNames } from '../lib/names';

describe('NameNest generator and search', () => {
  it('generates girl names that work across Portuguese, English, and Spanish', () => {
    const names = generateNames({ gender: 'girl', languages: ['pt', 'en', 'es'], style: 'classic', limit: 5 });

    expect(names.length).toBeGreaterThan(0);
    expect(names.every((name) => name.gender === 'girl')).toBe(true);
    expect(names.every((name) => name.languages.pt && name.languages.en && name.languages.es)).toBe(true);
  });

  it('finds names by meaning theme in Portuguese', () => {
    const results = searchNames('luz', 'pt');

    expect(results.map((name) => name.name)).toContain('Clara');
    expect(results.some((name) => name.meanings.pt.toLowerCase().includes('luz'))).toBe(true);
  });

  it('returns individual names by slug aliases', () => {
    const results = searchNames('sofia', 'pt');

    expect(results[0]?.slug).toBe('sofia');
    expect(results[0]?.variants).toContain('Sophia');
  });
});
