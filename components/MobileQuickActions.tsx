import Link from 'next/link';

export function MobileQuickActions() {
  return (
    <div className="mobile-quick-actions" data-testid="mobile-quick-actions" aria-label="Mobile quick actions">
      <Link data-testid="mobile-generate-action" href="/pt/gerador-de-nomes">Generate</Link>
      <Link data-testid="mobile-family-action" href="/pt/homenagear-nome-de-familia">Family name</Link>
    </div>
  );
}
