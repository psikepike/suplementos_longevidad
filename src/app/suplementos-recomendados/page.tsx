import { Metadata } from 'next';
import amazonSupplementsData from '@/data/amazon-supplements.json';
import SupplementList from '@/components/SupplementList';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export const metadata: Metadata = {
  title: 'Catálogo de Suplementos Recomendados | Longevidad',
  description: 'Selección de suplementos por evidencia, dosis prudente y fiabilidad. Orientación para envejecimiento de calidad sin medical claims.',
  alternates: { canonical: '/suplementos-recomendados' }
};

export default function SuplementosAfiliadosPage() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F3A5F] mb-6">Catálogo de Suplementos</h1>
        <p className="text-lg text-[#666666] mb-12 max-w-3xl leading-relaxed">
          Selección orientativa catalogada por objetivo de salud. 
          Filtramos laboratorios independientes basándonos en formas químicas de alta absorción, 
          dosis prudente y fiabilidad, alejándonos de agresivas promesas comerciales.
        </p>

        <SupplementList initialSupplements={amazonSupplementsData} />
      </div>
      <AffiliateDisclosure />
    </main>
  );
}
