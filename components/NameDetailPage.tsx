import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { getAllNames, getNameBySlug, languageLabel } from '@/lib/names';
import type { Language } from '@/lib/types';

const routeLabel = { pt: 'nome', en: 'name', es: 'nombre' } as const;

export function generateStaticParams() {
  return getAllNames().map((name) => ({ slug: name.slug }));
}

export function NameDetailPage({ slug, language }: { slug: string; language: Language }) {
  const name = getNameBySlug(slug);
  if (!name) notFound();

  const shareText = encodeURIComponent(`Name idea: ${name.name} — ${name.meanings[language]}`);
  return (
    <>
      <Nav language={language} />
      <main className="container section">
        <Link href={`/${language}`} className="pill">← Back to {languageLabel(language)}</Link>
        <section className="hero">
          <div>
            <p className="eyebrow">{name.origin} · {name.gender}</p>
            <h1>{name.name}</h1>
            <p>{name.meanings[language]}</p>
            <div className="actions"><a className="btn" href={`https://wa.me/?text=${shareText}`}>Share on WhatsApp</a><Link className="btn secondary" href={`/${language}/${routeLabel[language]}/${name.slug}`}>Copy page</Link></div>
          </div>
          <div className="card">
            <h2>Pronunciation</h2>
            <p>PT: {name.pronunciations.pt ?? '—'}</p><p>EN: {name.pronunciations.en ?? '—'}</p><p>ES: {name.pronunciations.es ?? '—'}</p>
          </div>
        </section>
        <section className="grid two">
          <div className="card"><h2>Variants</h2><div className="pill-row">{name.variants.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div>
          <div className="card"><h2>Compound names</h2><div className="pill-row">{name.compounds.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div>
          <div className="card"><h2>Similar names</h2><div className="pill-row">{name.similar.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div>
          <div className="card"><h2>Multilingual fit</h2><p>{name.name} works in: {Object.entries(name.languages).filter(([, works])=>works).map(([lang])=>lang.toUpperCase()).join(', ')}.</p><p>{name.popularity}</p></div>
        </section>
        <p className="notice section">Name meanings can vary by source. Use this page as inspiration, then verify important cultural, religious, and family context before choosing a baby name.</p>
      </main>
    </>
  );
}
