import { describe, expect, it } from 'vitest';
import { suggestFamilyHonorNames } from '../lib/familyHonor';

describe('family honor-name suggestions', () => {
  it('suggests exact, compound, and cross-language variants for a grandmother name', () => {
    const suggestions = suggestFamilyHonorNames({ familyName: 'Maria', relation: 'grandmother', babyGender: 'girl', languages: ['pt', 'en', 'es'] });

    expect(suggestions.exact.name).toBe('Maria');
    expect(suggestions.compounds).toContain('Maria Clara');
    expect(suggestions.variants).toEqual(expect.arrayContaining(['Marie', 'Mary', 'Marisol']));
    expect(suggestions.explanation).toMatch(/grandmother/i);
  });

  it('suggests masculine and international variants for a grandfather name', () => {
    const suggestions = suggestFamilyHonorNames({ familyName: 'João', relation: 'grandfather', babyGender: 'boy', languages: ['pt', 'en', 'es'] });

    expect(suggestions.exact.name).toBe('João');
    expect(suggestions.compounds).toContain('João Miguel');
    expect(suggestions.variants).toEqual(expect.arrayContaining(['Juan', 'John', 'Giovanni', 'Ian']));
  });

  it('falls back respectfully for unknown family names', () => {
    const suggestions = suggestFamilyHonorNames({ familyName: 'Amelinda', relation: 'grandmother', babyGender: 'girl', languages: ['pt'] });

    expect(suggestions.exact.name).toBe('Amelinda');
    expect(suggestions.middleNameIdeas).toContain('Amelinda');
    expect(suggestions.explanation).toContain('honor');
  });

  it('handles empty or whitespace-only family names without emitting blank suggestions', () => {
    for (const familyName of ['', '   ']) {
      const suggestions = suggestFamilyHonorNames({ familyName, relation: 'grandmother', babyGender: 'girl', languages: ['pt'] });

      expect(suggestions.exact.name).toBe('');
      // No blank/whitespace entries leak into any suggestion list
      expect(suggestions.middleNameIdeas.every((item) => item.trim().length > 0)).toBe(true);
      expect(suggestions.compounds.every((item) => item.trim().length > 0)).toBe(true);
      expect(suggestions.variants.every((item) => item.trim().length > 0)).toBe(true);
      // The "use exactly" hint should not contain a dangling empty name
      expect(suggestions.exact.use).not.toMatch(/\s{2,}/);
    }
  });
});
