import './globals.css';
import type { Metadata } from 'next';
import { MobileQuickActions } from '@/components/MobileQuickActions';

export const metadata: Metadata = {
  title: 'NameNest — Baby names in Portuguese, English, and Spanish',
  description: 'Find, generate, compare, and honor family baby names across Portuguese, English, and Spanish.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <MobileQuickActions />
      </body>
    </html>
  );
}
