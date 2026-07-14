'use client';

import { useMemo, useState } from 'react';
import { suggestFamilyHonorNames } from '@/lib/familyHonor';
import { familyHonorText, genderLabel, relationLabel } from '@/lib/uiText';
import type { Gender, Language } from '@/lib/types';

const relations = ['grandmother', 'grandfather', 'parent', 'relative'] as const;
const genders: Gender[] = ['girl', 'boy', 'unisex'];

export function FamilyHonorTool({ language = 'pt' }: { language?: Language }) {
  const [familyName, setFamilyName] = useState('Maria');
  const [relation, setRelation] = useState<'grandmother' | 'grandfather' | 'parent' | 'relative'>('grandmother');
  const [babyGender, setBabyGender] = useState<Gender>('girl');
  const suggestions = useMemo(() => suggestFamilyHonorNames({ familyName, relation, babyGender, languages: [language] }), [familyName, relation, babyGender, language]);
  const text = familyHonorText[language];

  return (
    <section className="section">
      <div className="container grid two">
        <div className="card">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
          <div className="form">
            <label>{text.familyName}<input value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="Maria, João, Helena..." /></label>
            <label>{text.relation}<select value={relation} onChange={(e) => setRelation(e.target.value as typeof relation)}>{relations.map((relationOption) => <option key={relationOption} value={relationOption}>{relationLabel(relationOption, language)}</option>)}</select></label>
            <label>{text.babyGender}<select value={babyGender} onChange={(e) => setBabyGender(e.target.value as Gender)}>{genders.map((genderOption) => <option key={genderOption} value={genderOption}>{genderLabel(genderOption, language)}</option>)}</select></label>
          </div>
        </div>
        <div className="card">
          <h3>{text.suggestionsFor(suggestions.exact.name)}</h3>
          <p>{text.explanation(relation)}</p>
          <h3>{text.exactMiddleName}</h3>
          <div className="pill-row">{suggestions.middleNameIdeas.map((item) => <span className="pill" key={item}>{item}</span>)}</div>
          <h3>{text.compoundNames}</h3>
          <div className="pill-row">{suggestions.compounds.map((item) => <span className="pill" key={item}>{item}</span>)}</div>
          <h3>{text.variants}</h3>
          <div className="pill-row">{suggestions.variants.length ? suggestions.variants.map((item) => <span className="pill" key={item}>{item}</span>) : <span className="pill">{text.useAsInspiration}</span>}</div>
        </div>
      </div>
    </section>
  );
}
