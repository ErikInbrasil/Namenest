import Link from 'next/link';
import type { Language } from '@/lib/types';
import { homeHref, toolLinks } from '@/lib/locale';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Nav({ language = 'pt' }: { language?: Language }) {
  const { generator, family } = toolLinks(language);
  return (
    <nav className="nav container">
      <Link className="logo" href={homeHref(language)}>Name<span>Nest</span></Link>
      <div className="nav-links">
        <LocaleSwitcher />
        <Link href={generator.href}>{generator.label}</Link>
        <Link href={family.href}>{family.label}</Link>
      </div>
    </nav>
  );
}
