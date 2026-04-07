import React from 'react';
import articulos from '@/data/articulos.json';
import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

export async function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const articulo = articulos.find((a) => a.slug === slug);
  if (!articulo) return { title: 'No encontrado' };
  
  return {
    title: `${articulo.title} | Suplementos Longevidad`,
    description: articulo.excerpt,
    alternates: { canonical: `/articulos/${slug}` },
    openGraph: {
      type: "article",
      url: `https://suplementoslongevidad.com/articulos/${slug}`,
      title: articulo.title,
      description: articulo.excerpt,
    },
    twitter: { card: "summary_large_image" }
  };
}

export default async function ArticuloPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const articulo = articulos.find((a) => a.slug === slug);

  if (!articulo) {
    return <div className="max-w-4xl mx-auto py-24 text-center">Artículo no encontrado</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articulo.title,
    "description": articulo.excerpt,
    "datePublished": articulo.date
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://suplementoslongevidad.com/"},
      {"@type": "ListItem", "position": 2, "name": "Artículos", "item": "https://suplementoslongevidad.com/articulos"},
      {"@type": "ListItem", "position": 3, "name": articulo.title, "item": `https://suplementoslongevidad.com/articulos/${slug}`}
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      
      <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Columna Principal */}
        <article className="md:col-span-8 text-[18px] leading-[1.8] text-[#2B2B2B]">
          {/* Breadcrumbs */}
          <nav className="text-sm text-[#666666] mb-8 font-medium">
            <Link href="/" className="hover:text-[#2B2B2B]">Inicio</Link> 
            <span className="mx-2 text-[#E5E2DA]">&gt;</span> 
            <span className="text-[#2B2B2B]">Artículos</span>
          </nav>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F3A5F] tracking-tight mb-8 leading-tight">
            {articulo.title}
          </h1>
          <p className="text-xl md:text-2xl text-[#6B8F71] font-serif italic mb-12">
            {articulo.excerpt}
          </p>

          <div 
            className="prose prose-lg prose-headings:font-serif prose-headings:text-[#1F3A5F] prose-a:text-[#6B8F71] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1F3A5F] prose-h2:mt-16 prose-h2:mb-6"
            dangerouslySetInnerHTML={{ __html: articulo.content }}
          />
          <section className="mt-12 p-6 bg-[#F7F6F2] border border-[#E5E2DA] rounded-lg text-sm text-[#424842] text-center italic">
            La información de esta guía es divulgativa y no sustituye el consejo de un profesional sanitario.
          </section>
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-12">
          <div className="sticky top-28 bg-white p-8 rounded-xl border border-[#E5E2DA] shadow-sm">
            <h3 className="font-serif font-bold text-[#1F3A5F] text-xl mb-4">Descarga gratuíta</h3>
            <p className="text-[#666666] text-sm mb-6">Recibe nuestra guía en PDF con los "7 hábitos probados para llegar mejor a los 70". Sin spam, solo ciencia.</p>
            <NewsletterForm buttonText="Enviar guía gratis" layout="vertical" />
          </div>
          
          {articulo.relatedSupplements && articulo.relatedSupplements.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-[#1F3A5F] text-lg mb-4 uppercase tracking-wider text-sm border-b border-[#E5E2DA] pb-2">Suplementos mencionados</h3>
              <ul className="space-y-3">
                {articulo.relatedSupplements.map(sup => (
                  <li key={sup}>
                    <Link href={`/suplementos/${sup}`} className="text-[#6B8F71] hover:text-[#1F3A5F] font-medium flex items-center gap-2 transition-colors">
                      <span className="w-2 h-2 bg-[#6B8F71] rounded-full"></span>
                      Guía del <span className="capitalize">{sup}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
