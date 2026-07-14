'use client';

import { useMemo, useState } from 'react';
import { suggestFamilyHonorNames } from '@/lib/familyHonor';
import type { Gender, Language } from '@/lib/types';

export function FamilyHonorTool({ language = 'pt' }: { language?: Language }) {
  const [familyName, setFamilyName] = useState('Maria');
  const [relation, setRelation] = useState<'grandmother' | 'grandfather' | 'parent' | 'relative'>('grandmother');
  const [babyGender, setBabyGender] = useState<Gender>('girl');
  const suggestions = useMemo(() => suggestFamilyHonorNames({ familyName, relation, babyGender, languages: [language] }), [familyName, relation, babyGender, language]);

  return (
    <section className="section">
      <div className="container grid two">
        <div className="card">
          <p className="eyebrow">Family honor names</p>
          <h2>Honor a grandparent without losing a modern feel</h2>
          <p>Enter a grandfather, grandmother, parent, or family name. NameNest suggests exact, middle-name, compound, and international variant ideas.</p>
          <div className="form">
            <label>Family name<input value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="Maria, João, Helena..." /></label>
            <label>Relation<select value={relation} onChange={(e) => setRelation(e.target.value as typeof relation)}><option value="grandmother">Grandmother</option><option value="grandfather">Grandfather</option><option value="parent">Parent</option><option value="relative">Other relative</option></select></label>
            <label>Baby gender<select value={babyGender} onChange={(e) => setBabyGender(e.target.value as Gender)}><option value="girl">Girl</option><option value="boy">Boy</option><option value="unisex">Unisex</option></select></label>
          </div>
        </div>
        <div className="card">
          <h3>Suggestions for {suggestions.exact.name}</h3>
          <p>{suggestions.explanation}</p>
          <h3>Exact / middle name</h3>
          <div className="pill-row">{suggestions.middleNameIdeas.map((item) => <span className="pill" key={item}>{item}</span>)}</div>
          <h3>Compound names</h3>
          <div className="pill-row">{suggestions.compounds.map((item) => <span className="pill" key={item}>{item}</span>)}</div>
          <h3>Variants</h3>
          <div className="pill-row">{suggestions.variants.length ? suggestions.variants.map((item) => <span className="pill" key={item}>{item}</span>) : <span className="pill">Use as inspiration</span>}</div>
        </div>
      </div>
    </section>
  );
}
