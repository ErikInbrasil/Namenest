import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { NameCard } from '@/components/NameCard';
import { getAllNames } from '@/lib/names';

export default function PortugueseHome() {
  return <><Nav /><main><section className="hero container"><div><p className="eyebrow">NameNest Brasil</p><h1>Encontre o nome perfeito para o seu bebê.</h1><p>Pesquise nomes, descubra significados e gere ideias em português, inglês e espanhol.</p><div className="actions"><Link className="btn" href="/pt/gerador-de-nomes">Gerar nomes</Link><Link className="btn secondary" href="/pt/homenagear-nome-de-familia">Homenagear família</Link></div></div><div className="card"><h2>Para famílias modernas</h2><p>Inclui nomes que funcionam internacionalmente e uma ferramenta para homenagear avós.</p></div></section><section className="section container"><h2>Nomes em destaque</h2><div className="grid">{getAllNames().slice(0,6).map((name)=><NameCard key={name.slug} name={name} language="pt" />)}</div></section></main></>;
}
