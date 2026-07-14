import { describe, expect, it } from 'vitest';
import { localeFromPath, toolLinks, homeHref } from '../lib/locale';

describe('localeFromPath', () => {
  it('detects the locale from the first path segment', () => {
    expect(localeFromPath('/en')).toBe('en');
    expect(localeFromPath('/es/generador-de-nombres')).toBe('es');
    expect(localeFromPath('/pt/nome/sofia')).toBe('pt');
  });

  it('defaults to Portuguese for the root and unknown prefixes', () => {
    expect(localeFromPath('/')).toBe('pt');
    expect(localeFromPath('')).toBe('pt');
    expect(localeFromPath('/xx/whatever')).toBe('pt');
  });
});

describe('toolLinks', () => {
  it('returns locale-correct generator and family-honor links for English', () => {
    const links = toolLinks('en');
    expect(links.generator.href).toBe('/en/baby-name-generator');
    expect(links.family.href).toBe('/en/honor-family-name');
    expect(links.generator.label).toBe('Generator');
    expect(links.family.label).toBe('Honor family name');
  });

  it('returns locale-correct links for Spanish', () => {
    const links = toolLinks('es');
    expect(links.generator.href).toBe('/es/generador-de-nombres');
    expect(links.family.href).toBe('/es/honrar-nombre-familiar');
  });

  it('returns Portuguese links by default', () => {
    const links = toolLinks('pt');
    expect(links.generator.href).toBe('/pt/gerador-de-nomes');
    expect(links.family.href).toBe('/pt/homenagear-nome-de-familia');
  });
});

describe('homeHref', () => {
  it('points at the localized home', () => {
    expect(homeHref('en')).toBe('/en');
    expect(homeHref('es')).toBe('/es');
    expect(homeHref('pt')).toBe('/pt');
  });
});
