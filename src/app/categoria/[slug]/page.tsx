import React from 'react';
import categorias from '@/data/categorias.json';
import suplementos from '@/data/suplementos.json';
import articulosData from '@/data/articulos.json';
import librosData from '@/data/books-longevity.json';
import Link from 'next/link';
import BookCard from '@/components/BookCard';

export async function generateStaticParams() {
  return categorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const categoria = categorias.find((c) => c.slug === slug);
  if (!categoria) return { title: 'No encontrado' };
  
  return {
    title: `${categoria.name} | Suplementos Longevidad`,
    description: categoria.description,
    alternates: { canonical: `/categoria/${slug}` },
    openGraph: {
      type: "website",
      url: `https://www.suplementoslongevidad.com/categoria/${slug}`,
      title: `${categoria.name} | Suplementos`,
      description: categoria.description,
    },
    twitter: { card: "summary_large_image" }
  };
}

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const categoria = categorias.find((c) => c.slug === slug);

  if (!categoria) {
    return <div className="max-w-4xl mx-auto py-24 text-center">Categoría no encontrada</div>;
  }

  const suplementosDeCategoria = suplementos.filter(s => s.categorySlug === slug);
  const librosRelacionados = librosData.filter(b => b.tags.includes(slug)).slice(0, 2);
  
  const articlesInCategory = articulosData.filter(a => 
    a.relatedSupplements && a.relatedSupplements.some(rs => suplementosDeCategoria.some(s => s.slug === rs))
  ).slice(0, 3);
  
  const articulosRelacionados = articlesInCategory.length > 0 ? articlesInCategory : articulosData.slice(0, 3);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.suplementoslongevidad.com/"},
      {"@type": "ListItem", "position": 2, "name": "Categorías", "item": "https://www.suplementoslongevidad.com/categoria"},
      {"@type": "ListItem", "position": 3, "name": categoria.name, "item": `https://www.suplementoslongevidad.com/categoria/${slug}`}
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-20 text-[17px] leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      {/* Breadcrumbs */}
      <nav className="text-sm text-[#666666] mb-8 font-medium">
        <Link href="/" className="hover:text-[#2B2B2B]">Inicio</Link> 
        <span className="mx-2 text-[#E5E2DA]">&gt;</span> 
        <span className="text-[#2B2B2B]">{categoria.name}</span>
      </nav>

      {/* Hero */}
      <section className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1F3A5F] tracking-tight mb-4">{categoria.name}</h1>
        <p className="text-xl text-[#6B8F71] font-serif max-w-3xl">{categoria.description}</p>
      </section>

      {/* Grid suplementos */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold text-[#1F3A5F] mb-8">Guías de suplementos relacionados</h2>
        {suplementosDeCategoria.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suplementosDeCategoria.map(sup => (
              <div key={sup.slug} className="bg-white p-6 rounded-xl border border-[#E5E2DA] hover:shadow-md transition-shadow group flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[#F7F6F2] text-[#666666] text-xs font-bold rounded-md mb-3 tracking-wide">
                    {sup.evidenceLevel} evidencia
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1F3A5F] mb-2">{sup.name}</h3>
                  <p className="text-[#666666] text-[15px] leading-snug line-clamp-3">{sup.shortDescription}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#E5E2DA]/50">
                  <Link href={`/suplementos/${sup.slug}`} className="text-[#6B8F71] font-medium group-hover:text-[#1F3A5F] transition-colors flex items-center justify-between">
                    <span>Leer guía completa</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#666666] mb-8">Estamos preparando más información rigurosa sobre los suplementos de esta categoría.</p>
        )}
      </section>

      {/* Grid Articulos Pilar */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold text-[#1F3A5F] mb-8">Artículos recomendados sobre {categoria.name.toLowerCase()}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articulosRelacionados.map(art => (
            <div key={art.slug} className="bg-white p-6 rounded-xl border border-[#E5E2DA] flex flex-col group hover:shadow-md transition-shadow">
              <h3 className="font-serif text-xl font-bold text-[#1F3A5F] mb-3 leading-snug">{art.title}</h3>
              <p className="text-[#666666] text-[15px] flex-grow mb-4 leading-relaxed">{art.excerpt}</p>
              <Link href={`/articulos/${art.slug}`} className="text-[#6B8F71] group-hover:text-[#1F3A5F] font-bold transition-colors text-sm uppercase tracking-wide">
                Leer artículo →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Libros Pilar */}
      {librosRelacionados.length > 0 && (
        <section className="mb-24">
          <h2 className="text-2xl font-serif font-bold text-[#1F3A5F] mb-8">Bibliografía recomendada</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {librosRelacionados.map(libro => (
              <BookCard key={libro.asin} book={libro as any} />
            ))}
          </div>
        </section>
      )}

      {/* Lo más consultado / Bloque SEO */}
      <section className="bg-white rounded-xl border border-[#E5E2DA] p-8 md:p-12 text-center max-w-4xl mx-auto mt-24">
        <h2 className="font-serif text-3xl font-bold text-[#1F3A5F] mb-4">¿Tienes dudas sobre por dónde empezar?</h2>
        <p className="text-[#666666] mb-8 max-w-2xl mx-auto">
          No todos los suplementos sirven para todo el mundo ni en las mismas dosis. En nuestra guía gratuita agrupamos los patrones nutricionales y suplementos más seguros según estudios vigentes para personas activas a partir de los 50.
        </p>
        <Link href="/" className="inline-block bg-[#1F3A5F] text-white font-medium px-8 py-3 rounded-lg hover:bg-[#6B8F71] transition-colors">
          Descargar guía en PDF
        </Link>
      </section>
      
    </div>
  );
}
