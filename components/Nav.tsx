import Link from 'next/link';

export function Nav() {
  return (
    <nav className="nav container">
      <Link className="logo" href="/">Name<span>Nest</span></Link>
      <div className="nav-links">
        <Link href="/pt">PT</Link>
        <Link href="/en">EN</Link>
        <Link href="/es">ES</Link>
        <Link href="/pt/gerador-de-nomes">Gerador</Link>
        <Link href="/pt/homenagear-nome-de-familia">Homenagear família</Link>
      </div>
    </nav>
  );
}
