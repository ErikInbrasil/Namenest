'use client';

import { useMemo, useState } from 'react';
import { combineNames } from '@/lib/combiner';
import type { Language } from '@/lib/types';

const combinerText = {
  pt: {
    eyebrow: 'Combinador de nomes',
    title: 'Junte dois nomes e descubra o nome do bebê',
    intro: 'Digite o nome da mãe e do pai (ou de quem você quiser homenagear) e veja combinações únicas.',
    nameA: 'Primeiro nome',
    nameB: 'Segundo nome',
    combine: 'Combinar nomes',
    resultsFor: (a: string, b: string) => `Combinações de ${a} + ${b}`,
    realBadge: 'nome real ✓',
    none: 'Nenhuma combinação encontrada. Tente nomes com mais sílabas.',
    share: 'Enviar no WhatsApp',
    shareMessage: (list: string, a: string, b: string) => `Olha os nomes de bebê que a gente criou juntando ${a} + ${b}: ${list} — feito no NameNest`,
    notice: 'Nomes marcados com "nome real ✓" já existem no nosso banco de nomes.',
  },
  en: {
    eyebrow: 'Name combiner',
    title: 'Blend two names into a baby name',
    intro: "Type the mother's and father's names (or any two names you love) and see unique blends.",
    nameA: 'First name',
    nameB: 'Second name',
    combine: 'Combine names',
    resultsFor: (a: string, b: string) => `Blends of ${a} + ${b}`,
    realBadge: 'real name ✓',
    none: 'No blends found. Try names with more syllables.',
    share: 'Share on WhatsApp',
    shareMessage: (list: string, a: string, b: string) => `Look at the baby names we made blending ${a} + ${b}: ${list} — made on NameNest`,
    notice: 'Names marked "real name ✓" already exist in our name database.',
  },
  es: {
    eyebrow: 'Combinador de nombres',
    title: 'Une dos nombres y descubre el nombre del bebé',
    intro: 'Escribe el nombre de la madre y del padre (o de quien quieras homenajear) y mira combinaciones únicas.',
    nameA: 'Primer nombre',
    nameB: 'Segundo nombre',
    combine: 'Combinar nombres',
    resultsFor: (a: string, b: string) => `Combinaciones de ${a} + ${b}`,
    realBadge: 'nombre real ✓',
    none: 'No se encontraron combinaciones. Prueba nombres con más sílabas.',
    share: 'Enviar por WhatsApp',
    shareMessage: (list: string, a: string, b: string) => `Mira los nombres de bebé que creamos uniendo ${a} + ${b}: ${list} — hecho en NameNest`,
    notice: 'Los nombres marcados con "nombre real ✓" ya existen en nuestra base de nombres.',
  },
} as const;

export function NameCombiner({ language = 'pt' }: { language?: Language }) {
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [submitted, setSubmitted] = useState<{ a: string; b: string } | null>(null);
  const text = combinerText[language];

  const results = useMemo(
    () => (submitted ? combineNames(submitted.a, submitted.b) : []),
    [submitted],
  );

  const canCombine = nameA.trim().length >= 2 && nameB.trim().length >= 2;
  const shareList = results.map((result) => result.name).join(', ');
  const shareHref = submitted
    ? `https://wa.me/?text=${encodeURIComponent(text.shareMessage(shareList, submitted.a, submitted.b))}`
    : '#';

  return (
    <section className="section">
      <div className="container">
        <div className="card">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
          <div className="form">
            <label>{text.nameA}<input value={nameA} onChange={(e) => setNameA(e.target.value)} placeholder="Camila" /></label>
            <label>{text.nameB}<input value={nameB} onChange={(e) => setNameB(e.target.value)} placeholder="Rodrigo" /></label>
          </div>
          <div className="actions">
            <button className="btn" type="button" disabled={!canCombine} onClick={() => setSubmitted({ a: nameA.trim(), b: nameB.trim() })}>
              {text.combine}
            </button>
          </div>
        </div>

        {submitted && (
          <div className="card section">
            <h3>{text.resultsFor(submitted.a, submitted.b)}</h3>
            {results.length === 0 && <p>{text.none}</p>}
            <div className="pill-row">
              {results.map((result) => (
                <span className="pill" key={result.name}>
                  {result.name}{result.real ? ` · ${text.realBadge}` : ''}
                </span>
              ))}
            </div>
            {results.length > 0 && (
              <div className="actions">
                <a className="btn" href={shareHref} target="_blank" rel="noreferrer">{text.share}</a>
              </div>
            )}
            <p className="notice">{text.notice}</p>
          </div>
        )}
      </div>
    </section>
  );
}
