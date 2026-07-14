import { names } from '../data/names';
import type { BabyName, GenerateOptions, Language } from './types';

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function getAllNames(): BabyName[] {
  return names;
}

export function getNameBySlug(slug: string): BabyName | undefined {
  return names.find((name) => name.slug === normalize(slug));
}

export function generateNames(options: GenerateOptions = {}): BabyName[] {
  const { gender, languages = [], style, theme, limit = 12 } = options;

  return names
    .filter((name) => (gender ? name.gender === gender || name.gender === 'unisex' : true))
    .filter((name) => (style ? name.styles.includes(style) : true))
    .filter((name) => (theme ? name.themes.some((item) => normalize(item).includes(normalize(theme))) : true))
    .filter((name) => languages.every((language) => name.languages[language]))
    .slice(0, limit);
}

export function searchNames(query: string, language: Language = 'pt'): BabyName[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return names;

  return names.filter((name) => {
    const searchable = [
      name.name,
      name.slug,
      name.origin,
      name.meanings[language],
      ...name.themes,
      ...name.variants,
      ...name.similar,
      ...name.compounds,
    ]
      .map(normalize)
      .join(' ');

    return searchable.includes(normalizedQuery);
  });
}

export function languageLabel(language: Language): string {
  return { pt: 'Português', en: 'English', es: 'Español' }[language];
}
