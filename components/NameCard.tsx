import Link from 'next/link';
import type { BabyName, Language } from '@/lib/types';

const namePath = { pt: 'nome', en: 'name', es: 'nombre' } as const;

export function NameCard({ name, language = 'pt' }: { name: BabyName; language?: Language }) {
  return (
    <article className="card name-card">
      <div className="name-title">
        <strong>{name.name}</strong>
        <span className="pill">{name.gender}</span>
      </div>
      <p>{name.meanings[language]}</p>
      <div className="pill-row">
        {name.styles.slice(0, 3).map((style) => <span className="pill" key={style}>{style}</span>)}
      </div>
      <Link className="btn secondary" href={`/${language}/${namePath[language]}/${name.slug}`}>View name</Link>
    </article>
  );
}
