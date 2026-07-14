import type { Language } from './types';

const speechLocales: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

export function normalizeSpokenName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

export function speechLocaleForLanguage(language: Language): string {
  return speechLocales[language];
}
