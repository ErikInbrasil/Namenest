import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { NameCard } from '@/components/NameCard';
import { getAllNames } from '@/lib/names';

export default function EnglishHome() {
  return <><Nav language="en" /><main><section className="hero container"><div><p className="eyebrow">NameNest</p><h1>Find a baby name that feels right in three languages.</h1><p>Search names, generate ideas, and honor family names across Portuguese, English, and Spanish.</p><div className="actions"><Link className="btn" href="/en/baby-name-generator">Generate names</Link><Link className="btn secondary" href="/en/honor-family-name">Honor family name</Link></div></div><div className="card"><h2>Built for bilingual and trilingual families</h2><p>Especially useful for Brazilian, Latin, expat, and international families.</p></div></section><section className="section container"><h2>Featured names</h2><div className="grid">{getAllNames().slice(0,6).map((name)=><NameCard key={name.slug} name={name} language="en" />)}</div></section></main></>;
}
