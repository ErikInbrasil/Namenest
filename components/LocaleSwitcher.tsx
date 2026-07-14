'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGUAGE_SWITCH_LABEL, LOCALES, localizedPathForLocale } from '@/lib/locale';

export function LocaleSwitcher() {
  const pathname = usePathname();

  return (
    <>
      {LOCALES.map((locale) => (
        <Link key={locale} href={localizedPathForLocale(pathname, locale)}>
          {LANGUAGE_SWITCH_LABEL[locale]}
        </Link>
      ))}
    </>
  );
}
