'use client';

import { useMemo, useState } from 'react';
import { generateNames } from '@/lib/names';
import type { Gender, Language, NameStyle } from '@/lib/types';
import { NameCard } from './NameCard';

export function Generator({ language = 'pt' }: { language?: Language }) {
  const [gender, setGender] = useState<Gender | ''>('');
  const [style, setStyle] = useState<NameStyle | ''>('');
  const [requiredLanguage, setRequiredLanguage] = useState<Language | 'all'>('all');

  const names = useMemo(() => generateNames({
    gender: gender || undefined,
    style: style || undefined,
    languages: requiredLanguage === 'all' ? ['pt', 'en', 'es'] : [requiredLanguage],
    limit: 9,
  }), [gender, style, requiredLanguage]);

  return (
    <section className="section">
      <div className="container">
        <div className="card">
          <p className="eyebrow">Smart generator</p>
          <h2>Generate baby names by style and language fit</h2>
          <div className="grid">
            <label>Gender
              <select value={gender} onChange={(e) => setGender(e.target.value as Gender | '')}>
                <option value="">Any</option><option value="girl">Girl</option><option value="boy">Boy</option><option value="unisex">Unisex</option>
              </select>
            </label>
            <label>Style
              <select value={style} onChange={(e) => setStyle(e.target.value as NameStyle | '')}>
                <option value="">Any</option><option value="classic">Classic</option><option value="short">Short</option><option value="biblical">Biblical</option><option value="international">International</option><option value="delicate">Delicate</option><option value="strong">Strong</option>
              </select>
            </label>
            <label>Language fit
              <select value={requiredLanguage} onChange={(e) => setRequiredLanguage(e.target.value as Language | 'all')}>
                <option value="all">Portuguese + English + Spanish</option><option value="pt">Portuguese</option><option value="en">English</option><option value="es">Spanish</option>
              </select>
            </label>
          </div>
        </div>
        <div className="grid section">
          {names.map((name) => <NameCard key={name.slug} name={name} language={language} />)}
        </div>
      </div>
    </section>
  );
}
