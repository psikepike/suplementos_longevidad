import { Metadata } from 'next';
import suplementosData from '@/data/suplementos.json';
import SupplementIndexList from '@/components/SupplementIndexList';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export const metadata: Metadata = {
  title: 'Catálogo de Suplementos y Protocolos | Suplementos Longevidad',
  description: 'Descubre nuestra matriz editorial de suplementos antienvejecimiento y salud genérica, clasificados por evidencia y formato clínico.',
  alternates: { canonical: '/suplementos' }
};

export default function SuplementosPage() {
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F3A5F] mb-6">Directorio de Suplementos</h1>
        <p className="text-lg text-[#666666] mb-12 max-w-3xl leading-relaxed">
          Un catálogo curado con los compuestos de mayor evidencia clínica. Filtra por objetivos 
          de salud o nivel científico para acceder a guías editoriales que te ayudarán a tomar 
          decisiones exactas sobre formatos orgánicos y dosis, eludiendo la desinformación comercial.
        </p>

        <SupplementIndexList initialData={suplementosData} />
      </div>
      <AffiliateDisclosure />
    </main>
  );
}
