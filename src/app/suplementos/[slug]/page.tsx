import React from 'react';
import { notFound } from 'next/navigation';
import suplementos from '@/data/suplementos.json';
import amazonSupplementsData from '@/data/amazon-supplements.json';
import SupplementAffiliateCard from '@/components/SupplementAffiliateCard';
import FaqAccordion from '@/components/FaqAccordion';
import TrackedLink from '@/components/TrackedLink';
import Link from 'next/link';
import { getAmazonAffiliateUrl } from '@/utils/amazon';

export async function generateStaticParams() {
  return suplementos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const suplemento = suplementos.find((s) => s.slug === slug);
  if (!suplemento) return notFound();
  
  return {
    title: `Guía sobre ${suplemento.name}: Evidencia y Dosis`,
    description: suplemento.shortDescription,
    alternates: { canonical: `https://suplementoslongevidad.com/suplementos/${slug}` },
    openGraph: {
      type: "article",
      url: `https://suplementoslongevidad.com/suplementos/${slug}`,
      title: `Guía sobre ${suplemento.name}`,
      description: suplemento.shortDescription,
    },
    twitter: { card: "summary_large_image" }
  };
}

export default async function SuplementoPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const suplemento = suplementos.find((s) => s.slug === slug);

  if (!suplemento) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": suplemento.faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://suplementoslongevidad.com/"},
      {"@type": "ListItem", "position": 2, "name": "Categorías", "item": `https://suplementoslongevidad.com/categoria/${suplemento.categorySlug}`},
      {"@type": "ListItem", "position": 3, "name": suplemento.name, "item": `https://suplementoslongevidad.com/suplementos/${slug}`}
    ]
  };

  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-20 text-[17px] leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      {/* Breadcrumbs */}
      <nav className="text-sm text-[#666666] mb-8 font-medium">
        <Link href="/" className="hover:text-[#2B2B2B]">Inicio</Link> 
        <span className="mx-2 text-[#E5E2DA]">&gt;</span> 
        <Link href={`/categoria/${suplemento.categorySlug}`} className="hover:text-[#2B2B2B] capitalize">{suplemento.categorySlug.replace('-', ' ')}</Link>
        <span className="mx-2 text-[#E5E2DA]">&gt;</span> 
        <span className="text-[#2B2B2B]">{suplemento.name}</span>
      </nav>

      <header className="mb-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1F3A5F] tracking-tight mb-4">{suplemento.name}</h1>
        <p className="text-xl md:text-2xl text-[#6B8F71] font-serif italic max-w-2xl">{suplemento.shortDescription}</p>
      </header>

      <div className="grid gap-12 lg:gap-16">
        <section className="bg-white p-8 md:p-10 border border-[#E5E2DA] rounded-xl shadow-sm">
          <h2 className="text-2xl font-serif font-semibold text-[#1F3A5F] mb-4">¿Qué es?</h2>
          <p className="text-[#2B2B2B]">{suplemento.whatIsIt}</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-semibold text-[#1F3A5F] mb-4">Para qué suele utilizarse</h2>
          <p className="text-[#2B2B2B]">{suplemento.whatIsItUsedFor}</p>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-serif font-semibold text-[#1F3A5F]">Evidencia actual</h2>
            <span className="bg-[#6B8F71]/10 text-[#6B8F71] px-3 py-1 text-sm rounded-full font-semibold border border-[#6B8F71]/20">
              Nivel: {suplemento.evidenceLevel}
            </span>
          </div>
          <p className="text-[#2B2B2B]">{suplemento.evidence}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-[#Eef2f0] p-8 rounded-xl">
            <h2 className="text-xl font-serif font-semibold text-[#1F3A5F] mb-3">Dosis habituales</h2>
            <p className="text-[#424842]">{suplemento.standardDose}</p>
          </section>
          
          <section className="bg-white border border-[#E5E2DA] p-8 rounded-xl">
            <h2 className="text-xl font-serif font-semibold text-[#1F3A5F] mb-3">Efectos secundarios</h2>
            <p className="text-[#424842]">{suplemento.sideEffects}</p>
          </section>
        </div>

        <section className="border-l-4 border-[#1F3A5F] pl-6 py-2 my-4">
          <h2 className="text-lg font-bold text-[#1F3A5F] mb-2 uppercase tracking-wide text-sm">Precaución médica</h2>
          <p className="text-[#666666]">{suplemento.whoShouldAvoid}</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-semibold text-[#1F3A5F] mb-4">Mejores formatos</h2>
          <p className="text-[#2B2B2B]">{suplemento.bestFormats}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-serif font-semibold text-[#1F3A5F] mb-8">Comparativa de formatos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#1F3A5F] text-[#1F3A5F]">
                  <th className="py-4 px-4 font-semibold">Suplemento</th>
                  <th className="py-4 px-4 font-semibold">Tipo</th>
                  <th className="py-4 px-4 font-semibold">Dosis media</th>
                  <th className="py-4 px-4 font-semibold text-right">Referencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DA] bg-white">
                {(suplemento.recommendedAsins || []).map((asin: string, idx: number) => {
                  const prod = amazonSupplementsData.find(a => a.asin === asin);
                  if (!prod) return null;
                  
                  return (
                    <tr key={idx} className="hover:bg-[#F7F6F2]/50 transition-colors">
                      <td className="py-5 px-4 font-medium text-[#2B2B2B]">{prod.name}</td>
                      <td className="py-5 px-4 text-[#666666]">{prod.format} {prod.capsules > 0 && `/ ${prod.capsules} ud`}</td>
                      <td className="py-5 px-4 text-[#666666]">{prod.dose}</td>
                      <td className="py-5 px-4 text-right">
                        <TrackedLink
                          href={getAmazonAffiliateUrl(prod.asin)} 
                          eventName="amazon_click"
                          eventData={{ type: 'suplemento_tabla', asin: prod.asin, slug }}
                          className="inline-block bg-white text-[#1F3A5F] border border-[#E5E2DA] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#6B8F71] hover:text-white hover:border-[#6B8F71] transition-all"
                        >
                          Ver en Amazon
                        </TrackedLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#666666] mt-4 text-center italic">* Los precios y opciones son orientativos. Busque siempre fórmulas libres de aditivos innecesarios.</p>
          {suplemento.faq && suplemento.faq.length > 0 && (
            <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-serif text-[#1F3A5F] mb-8 text-center">Dudas Habituales</h2>
              <FaqAccordion faqs={suplemento.faq} />
            </section>
          )}
        </section>

        <section className="mt-16 md:mt-24">
          <div className="border-t border-[#E5E2DA] pt-12">
            <h2 className="text-3xl font-bold font-serif text-[#1F3A5F] mb-4">Productos Recomendados</h2>
            <p className="text-[#666666] mb-8 italic text-sm">
              Selección orientativa basada en formato, dosis habitual, valoración y utilidad general. No sustituye consejo médico.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amazonSupplementsData
                .filter(s => s.category === suplemento.categorySlug || s.goalTags.includes(suplemento.categorySlug))
                .slice(0, 3)
                .map(s => (
                  <SupplementAffiliateCard key={s.asin} supplement={s} />
                ))
              }
            </div>
            {amazonSupplementsData.filter(s => s.category === suplemento.categorySlug || s.goalTags.includes(suplemento.categorySlug)).length === 0 && (
              <p className="text-[#666666] text-sm py-4">Revisando próximos productos aprobados para esta categoría...</p>
            )}
            
            <div className="mt-8 text-center border-b border-[#E5E2DA] pb-12">
              <a href="/suplementos" className="inline-flex items-center justify-center bg-white text-[#1F3A5F] border border-[#1F3A5F] font-bold px-8 py-3 rounded-xl hover:bg-[#1F3A5F] hover:text-white transition-all">
                Ver todos los suplementos aprobados
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 p-6 bg-[#F7F6F2] border border-[#E5E2DA] rounded-lg text-sm text-[#424842] text-center italic">
          La información de esta guía es divulgativa y no sustituye el consejo de un profesional sanitario.
        </section>

      </div>
    </article>
  );
}
