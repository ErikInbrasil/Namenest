import { describe, expect, it } from 'vitest';
import { normalizeSpokenName, speechLocaleForLanguage } from '../lib/speech';

describe('speech helpers', () => {
  it('keeps full names intact while trimming extra spaces', () => {
    expect(normalizeSpokenName('  Suzana   Vera brito   Macedo Hansen  ')).toBe('Suzana Vera brito Macedo Hansen');
  });

  it('returns an empty string for blank names', () => {
    expect(normalizeSpokenName('   ')).toBe('');
  });

  it('uses a natural speech locale for each site language', () => {
    expect(speechLocaleForLanguage('pt')).toBe('pt-BR');
    expect(speechLocaleForLanguage('en')).toBe('en-US');
    expect(speechLocaleForLanguage('es')).toBe('es-ES');
  });
});
