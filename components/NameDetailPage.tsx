import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { getAllNames, getNameBySlug, languageLabel } from '@/lib/names';
import { NAME_SLUG } from '@/lib/locale';
import { detailText, genderLabel, originLabel, popularityText } from '@/lib/uiText';
import type { Language } from '@/lib/types';

export function generateStaticParams() {
  return getAllNames().map((name) => ({ slug: name.slug }));
}

export function NameDetailPage({ slug, language }: { slug: string; language: Language }) {
  const name = getNameBySlug(slug);
  if (!name) notFound();

  const text = detailText[language];
  const shareText = encodeURIComponent(`Name idea: ${name.name} — ${name.meanings[language]}`);
  const worksIn = Object.entries(name.languages).filter(([, works])=>works).map(([lang])=>lang.toUpperCase()).join(', ');

  return (
    <>
      <Nav language={language} />
      <main className="container section">
        <Link href={`/${language}`} className="pill">← {text.backTo} {languageLabel(language)}</Link>
        <section className="hero">
          <div>
            <p className="eyebrow">{originLabel(name.origin, language)} · {genderLabel(name.gender, language)}</p>
            <h1>{name.name}</h1>
            <p>{name.meanings[language]}</p>
            <div className="actions"><a className="btn" href={`https://wa.me/?text=${shareText}`}>{text.shareOnWhatsApp}</a><Link className="btn secondary" href={`/${language}/${NAME_SLUG[language]}/${name.slug}`}>{text.copyPage}</Link></div>
          </div>
          <div className="card">
            <h2>{text.pronunciation}</h2>
            <p>PT: {name.pronunciations.pt ?? '—'}</p><p>EN: {name.pronunciations.en ?? '—'}</p><p>ES: {name.pronunciations.es ?? '—'}</p>
          </div>
        </section>
        <section className="grid two">
          <div className="card"><h2>{text.variants}</h2><div className="pill-row">{name.variants.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div>
          <div className="card"><h2>{text.compoundNames}</h2><div className="pill-row">{name.compounds.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div>
          <div className="card"><h2>{text.similarNames}</h2><div className="pill-row">{name.similar.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div>
          <div className="card"><h2>{text.multilingualFit}</h2><p>{name.name} {text.worksIn}: {worksIn}.</p><p>{popularityText(name.popularity, language)}</p></div>
        </section>
        <p className="notice section">{text.nameMeaningsNotice}</p>
      </main>
    </>
  );
}
