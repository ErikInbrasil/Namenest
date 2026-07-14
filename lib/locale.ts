import type { Language } from './types';

export const LOCALES: Language[] = ['pt', 'en', 'es'];
export const DEFAULT_LOCALE: Language = 'pt';

/** Detect the active locale from a pathname's first segment; falls back to Portuguese. */
export function localeFromPath(pathname: string | null | undefined): Language {
  const first = (pathname ?? '').split('/').filter(Boolean)[0];
  return (LOCALES as string[]).includes(first) ? (first as Language) : DEFAULT_LOCALE;
}

interface ToolLink {
  href: string;
  label: string;
}

const GENERATOR_SLUG: Record<Language, string> = {
  pt: 'gerador-de-nomes',
  en: 'baby-name-generator',
  es: 'generador-de-nombres',
};

const FAMILY_SLUG: Record<Language, string> = {
  pt: 'homenagear-nome-de-familia',
  en: 'honor-family-name',
  es: 'honrar-nombre-familiar',
};

/** Route slug for an individual name detail page, per locale. */
export const NAME_SLUG: Record<Language, string> = {
  pt: 'nome',
  en: 'name',
  es: 'nombre',
};

const GENERATOR_LABEL: Record<Language, string> = {
  pt: 'Gerador',
  en: 'Generator',
  es: 'Generador',
};

const FAMILY_LABEL: Record<Language, string> = {
  pt: 'Homenagear família',
  en: 'Honor family name',
  es: 'Honrar familia',
};

export const LANGUAGE_SWITCH_LABEL: Record<Language, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
};

const GENERATOR_SLUG_TO_LOCALE = Object.fromEntries(
  Object.entries(GENERATOR_SLUG).map(([locale, slug]) => [slug, locale]),
) as Record<string, Language>;

const FAMILY_SLUG_TO_LOCALE = Object.fromEntries(
  Object.entries(FAMILY_SLUG).map(([locale, slug]) => [slug, locale]),
) as Record<string, Language>;

const NAME_SLUG_TO_LOCALE = Object.fromEntries(
  Object.entries(NAME_SLUG).map(([locale, slug]) => [slug, locale]),
) as Record<string, Language>;

/** Locale-correct links to the two core tools. */
export function toolLinks(language: Language): { generator: ToolLink; family: ToolLink } {
  return {
    generator: { href: `/${language}/${GENERATOR_SLUG[language]}`, label: GENERATOR_LABEL[language] },
    family: { href: `/${language}/${FAMILY_SLUG[language]}`, label: FAMILY_LABEL[language] },
  };
}

/** Localized home href. */
export function homeHref(language: Language): string {
  return `/${language}`;
}

/**
 * Return the equivalent route in a target locale so switching PT/EN/ES keeps
 * users on the same kind of page instead of bouncing them back to the homepage.
 */
export function localizedPathForLocale(pathname: string | null | undefined, targetLocale: Language): string {
  const segments = (pathname ?? '').split('/').filter(Boolean);
  const [, pageSlug, itemSlug] = segments;

  if (segments.length <= 1) {
    return homeHref(targetLocale);
  }

  if (pageSlug in GENERATOR_SLUG_TO_LOCALE) {
    return toolLinks(targetLocale).generator.href;
  }

  if (pageSlug in FAMILY_SLUG_TO_LOCALE) {
    return toolLinks(targetLocale).family.href;
  }

  if (pageSlug in NAME_SLUG_TO_LOCALE && itemSlug) {
    return `/${targetLocale}/${NAME_SLUG[targetLocale]}/${itemSlug}`;
  }

  return homeHref(targetLocale);
}
