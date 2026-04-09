import { Metadata } from 'next';
import Link from 'next/link';
import booksData from '@/data/books-longevity.json';
import BookList from '@/components/BookList';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export const metadata: Metadata = {
  title: 'Biblioteca de Longevidad y Salud | Suplementos Longevidad',
  description: 'Selección editorial de lecturas destacables sobre envejecimiento saludable y bienestar.',
  alternates: { canonical: '/libros-longevidad' }
};

export default function LibrosPage() {
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F3A5F] mb-6">Lecturas Recomendadas</h1>
        <p className="text-lg text-[#666666] mb-12 max-w-3xl leading-relaxed">
          Una selección clínica de literatura fiable para entender el envejecimiento celular, 
          los hábitos fundamentales y el uso inteligente de compuestos bioactivos, más allá de la publicidad médica.
        </p>

        <BookList initialBooks={booksData} />
        
        {/* ENLAZADO INTERNO: Suplementos Clave */}
        <section className="mt-20 pt-16 border-t border-[#E5E2DA]">
          <h2 className="text-3xl font-serif font-bold text-[#1F3A5F] mb-6 text-center">Fórmulas Biológicas Clave</h2>
          <p className="text-center text-[#666666] mb-12 max-w-2xl mx-auto">
            Muchos de los autores expuestos referencian compuestos fundamentales para la preservación celular. Puedes consultar nuestro análisis editorial prudente sobre las formulaciones reales de estos.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link href="/suplementos/omega-3" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-[#F7F6F2] hover:bg-white border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Omega 3 (EPA/DHA)</Link>
            <Link href="/suplementos/q10" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-[#F7F6F2] hover:bg-white border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Coenzima Q10</Link>
            <Link href="/suplementos/creatina-mayores" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-[#F7F6F2] hover:bg-white border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Creatina en Edad Avanzada</Link>
          </div>
          <div className="mt-10 text-center">
             <Link href="/suplementos" className="text-sm font-bold text-[#6B8F71] tracking-widest uppercase hover:underline">Ver todo el catálogo editorial →</Link>
          </div>
        </section>
      </div>
      <AffiliateDisclosure />
    </main>
  );
}
