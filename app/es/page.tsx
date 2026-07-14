import Link from 'next/link';
import { FullNameSpeaker } from '@/components/FullNameSpeaker';
import { Nav } from '@/components/Nav';
import { NameCard } from '@/components/NameCard';
import { getAllNames } from '@/lib/names';

export default function SpanishHome() {
  return (
    <>
      <Nav language="es" />
      <main>
        <section className="hero container">
          <div>
            <p className="eyebrow">NameNest</p>
            <h1>Encuentra un nombre de bebé que funcione en tres idiomas.</h1>
            <p>Busca nombres, genera ideas y honra nombres familiares en portugués, inglés y español.</p>
            <div className="actions">
              <Link className="btn" href="/es/generador-de-nombres">Generar nombres</Link>
              <Link className="btn secondary" href="/es/honrar-nombre-familiar">Honrar familia</Link>
            </div>
          </div>
          <div className="card">
            <h2>Para familias internacionales</h2>
            <p>Ideas para nombres brasileños, portugueses, latinos e internacionales.</p>
          </div>
        </section>
        <FullNameSpeaker language="es" />
        <section className="section container">
          <h2>Nombres destacados</h2>
          <div className="grid">{getAllNames().slice(0,6).map((name)=><NameCard key={name.slug} name={name} language="es" />)}</div>
        </section>
      </main>
    </>
  );
}
