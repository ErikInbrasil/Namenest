import type { Metadata } from 'next';
import './globals.css';
import { LocaleSync } from '@/components/LocaleSync';
import { MobileQuickActions } from '@/components/MobileQuickActions';
import { DEFAULT_LOCALE } from '@/lib/locale';

export const metadata: Metadata = {
  title: 'NameNest — Baby names in Portuguese, English, and Spanish',
  description: 'Find, generate, compare, and honor family baby names across Portuguese, English, and Spanish.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <LocaleSync />
        {children}
        <MobileQuickActions />
      </body>
    </html>
  );
}
