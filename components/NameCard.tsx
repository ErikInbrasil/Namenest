import Link from 'next/link';
import { NAME_SLUG } from '@/lib/locale';
import { genderLabel, nameCardText, styleLabel } from '@/lib/uiText';
import type { BabyName, Language } from '@/lib/types';

export function NameCard({ name, language = 'pt' }: { name: BabyName; language?: Language }) {
  return (
    <article className="card name-card">
      <div className="name-title">
        <strong>{name.name}</strong>
        <span className="pill">{genderLabel(name.gender, language)}</span>
      </div>
      <p>{name.meanings[language]}</p>
      <div className="pill-row">
        {name.styles.slice(0, 3).map((style) => <span className="pill" key={style}>{styleLabel(style, language)}</span>)}
      </div>
      <Link className="btn secondary" href={`/${language}/${NAME_SLUG[language]}/${name.slug}`}>{nameCardText[language].viewName}</Link>
    </article>
  );
}
