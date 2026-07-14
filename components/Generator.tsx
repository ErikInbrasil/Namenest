'use client';

import { useMemo, useState } from 'react';
import { generateNames } from '@/lib/names';
import { generatorText, genderLabel, localizedLanguageLabel, styleLabel } from '@/lib/uiText';
import type { Gender, Language, NameStyle } from '@/lib/types';
import { NameCard } from './NameCard';

const styles: NameStyle[] = ['classic', 'short', 'biblical', 'international', 'delicate', 'strong'];

export function Generator({ language = 'pt' }: { language?: Language }) {
  const [gender, setGender] = useState<Gender | ''>('');
  const [style, setStyle] = useState<NameStyle | ''>('');
  const [requiredLanguage, setRequiredLanguage] = useState<Language | 'all'>('all');
  const text = generatorText[language];

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
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <div className="grid">
            <label>{text.gender}
              <select value={gender} onChange={(e) => setGender(e.target.value as Gender | '')}>
                <option value="">{text.any}</option>
                <option value="girl">{genderLabel('girl', language)}</option>
                <option value="boy">{genderLabel('boy', language)}</option>
                <option value="unisex">{genderLabel('unisex', language)}</option>
              </select>
            </label>
            <label>{text.style}
              <select value={style} onChange={(e) => setStyle(e.target.value as NameStyle | '')}>
                <option value="">{text.any}</option>
                {styles.map((styleOption) => <option key={styleOption} value={styleOption}>{styleLabel(styleOption, language)}</option>)}
              </select>
            </label>
            <label>{text.languageFit}
              <select value={requiredLanguage} onChange={(e) => setRequiredLanguage(e.target.value as Language | 'all')}>
                <option value="all">{text.languageFitAll}</option>
                <option value="pt">{localizedLanguageLabel('pt', language)}</option>
                <option value="en">{localizedLanguageLabel('en', language)}</option>
                <option value="es">{localizedLanguageLabel('es', language)}</option>
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
