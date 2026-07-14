'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeFromPath, toolLinks } from '@/lib/locale';

export function MobileQuickActions() {
  const language = localeFromPath(usePathname());
  const { generator, family } = toolLinks(language);
  return (
    <div className="mobile-quick-actions" data-testid="mobile-quick-actions">
      <Link href={generator.href} data-testid="mobile-generate-action">{generator.label}</Link>
      <Link href={family.href} data-testid="mobile-family-action">{family.label}</Link>
    </div>
  );
}
