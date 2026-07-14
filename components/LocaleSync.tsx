'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { localeFromPath } from '@/lib/locale';

/** Keeps the root <html lang> attribute aligned with the active localized route. */
export function LocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname);
  }, [pathname]);

  return null;
}
