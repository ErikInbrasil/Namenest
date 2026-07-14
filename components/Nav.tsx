import Link from 'next/link';
import type { Language } from '@/lib/types';
import { LANGUAGE_SWITCH_LABEL, LOCALES, homeHref, toolLinks } from '@/lib/locale';

export function Nav({ language = 'pt' }: { language?: Language }) {
  const { generator, family } = toolLinks(language);
  return (
    <nav className="nav container">
      <Link className="logo" href={homeHref(language)}>Name<span>Nest</span></Link>
      <div className="nav-links">
        {LOCALES.map((locale) => (
          <Link key={locale} href={homeHref(locale)}>{LANGUAGE_SWITCH_LABEL[locale]}</Link>
        ))}
        <Link href={generator.href}>{generator.label}</Link>
        <Link href={family.href}>{family.label}</Link>
      </div>
    </nav>
  );
}
