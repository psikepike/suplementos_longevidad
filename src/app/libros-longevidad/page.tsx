import { Metadata } from 'next';
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
      </div>
      <AffiliateDisclosure />
    </main>
  );
}
