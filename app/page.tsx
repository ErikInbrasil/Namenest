import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { NameCard } from '@/components/NameCard';
import { getAllNames } from '@/lib/names';

export default function Home() {
  const featured = getAllNames().filter((name) => name.languages.pt && name.languages.en && name.languages.es).slice(0, 3);
  return (
    <>
      <Nav language="pt" />
      <main>
        <section className="hero container">
          <div>
            <p className="eyebrow">Portuguese · English · Spanish</p>
            <h1>Find a baby name that works across the whole family.</h1>
            <p>NameNest helps parents search meanings, generate ideas, honor grandparents, and find names that feel natural in Portuguese, English, and Spanish.</p>
            <div className="actions">
              <Link className="btn" href="/pt/gerador-de-nomes">Generate names</Link>
              <Link className="btn secondary" href="/pt/homenagear-nome-de-familia">Honor a family name</Link>
            </div>
          </div>
          <div className="card">
            <p className="eyebrow">MVP focus</p>
            <h2>Three tools in one</h2>
            <p>Search by meaning, filter by language fit, and turn grandmother/grandfather names into exact, compound, or modern variants.</p>
            <div className="pill-row"><span className="pill">WhatsApp-ready</span><span className="pill">SEO pages</span><span className="pill">Family voting later</span></div>
          </div>
        </section>
        <section className="section container">
          <h2>Featured trilingual-friendly names</h2>
          <div className="grid">{featured.map((name) => <NameCard key={name.slug} name={name} language="pt" />)}</div>
        </section>
      </main>
      <footer className="footer container">NameNest MVP — built for Brazilian Portuguese first, with English and Spanish expansion.</footer>
    </>
  );
}
