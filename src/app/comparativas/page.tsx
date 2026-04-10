import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Comparativas de Suplementos',
  description: 'Análisis detallados y comparativas imparciales entre distintos formatos y marcas de suplementos respaldados por la ciencia.',
  alternates: { canonical: 'https://www.suplementoslongevidad.com/comparativas' }
};

export default function ComparativasIndexPage() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F3A5F] mb-6">Comparativas de Suplementos</h1>
        <p className="text-lg text-[#666666] mb-12 max-w-3xl leading-relaxed mx-auto">
          Próximamente publicaremos duelos directos entre formatos (por ejemplo: Citrato vs Bisglicinato) para ayudarte a elegir la formulación de mayor biodisponibilidad para tus objetivos.
        </p>
        <Link href="/suplementos" className="inline-flex items-center justify-center bg-[#1F3A5F] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#6B8F71] transition-colors shadow-sm">
          Ver Catálogo de Suplementos
        </Link>
      </div>
    </main>
  );
}
