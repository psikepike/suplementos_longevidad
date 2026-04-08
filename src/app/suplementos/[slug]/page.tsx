import React from 'react';
import { notFound } from 'next/navigation';
import suplementos from '@/data/suplementos.json';
import amazonSupplementsData from '@/data/amazon-supplements.json';
import SupplementAffiliateCard from '@/components/SupplementAffiliateCard';
import FaqAccordion from '@/components/FaqAccordion';
import TrackedLink from '@/components/TrackedLink';
import Link from 'next/link';
import Image from 'next/image';
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
        <p className="text-xl md:text-2xl text-[#6B8F71] font-serif italic max-w-2xl mb-8">{suplemento.shortDescription}</p>
        
        {slug === 'magnesio' && (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-sm border border-[#E5E2DA]">
            <Image src="/images/supplements/magnesio/hero.jpeg" alt={`Hero banner de ${suplemento.name}`} fill className="object-cover" priority />
          </div>
        )}
      </header>

      <div className={`flex flex-col ${slug === 'magnesio' ? 'gap-8 lg:gap-10' : 'gap-12 lg:gap-16'}`}>
        
        {slug === 'magnesio' && (
          <section className="bg-[#182C49] text-white p-6 md:p-8 rounded-2xl shadow-xl border border-[#264166] order-1">
            <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#4ade80]/20 flex items-center justify-center text-[#4ade80] text-sm">✓</span>
              ¿Qué formato me conviene?
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#162944] p-4 md:px-6 rounded-xl border border-white/10 group hover:bg-white/5 transition-colors gap-3">
                <div className="flex items-center gap-3 md:w-5/12">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.4)]"></span>
                  <span className="text-white/90 text-sm md:text-base font-medium tracking-wide">Si buscas descanso nocturno</span>
                </div>
                <div className="hidden md:block text-white/30 font-bold mx-2">→</div>
                <div className="md:w-6/12 font-bold text-[#4ade80] text-base pl-5 md:pl-0">
                  Magnesio Bisglicinato
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#162944] p-4 md:px-6 rounded-xl border border-white/10 group hover:bg-white/5 transition-colors gap-3">
                <div className="flex items-center gap-3 md:w-5/12">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.4)]"></span>
                  <span className="text-white/90 text-sm md:text-base font-medium tracking-wide">Si buscas mejor tránsito intestinal</span>
                </div>
                <div className="hidden md:block text-white/30 font-bold mx-2">→</div>
                <div className="md:w-6/12 font-bold text-[#4ade80] text-base pl-5 md:pl-0">
                  Magnesio Citrato
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#162944] p-4 md:px-6 rounded-xl border border-white/10 group hover:bg-white/5 transition-colors gap-3">
                <div className="flex items-center gap-3 md:w-5/12">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.4)]"></span>
                  <span className="text-white/90 text-sm md:text-base font-medium tracking-wide">Si priorizas apoyo cognitivo</span>
                </div>
                <div className="hidden md:block text-white/30 font-bold mx-2">→</div>
                <div className="md:w-6/12 font-bold text-[#4ade80] text-base pl-5 md:pl-0">
                  Magnesio Treonato
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#162944] p-4 md:px-6 rounded-xl border border-rose-500/20 group hover:bg-rose-500/10 transition-colors gap-3 mt-3">
                <div className="flex items-center gap-3 md:w-5/12">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <span className="text-white/70 text-sm font-medium tracking-wide">Baja absorción (Evitar)</span>
                </div>
                <div className="hidden md:block text-white/30 font-bold mx-2">→</div>
                <div className="md:w-6/12 font-bold text-rose-400 text-sm pl-5 md:pl-0">
                  Óxido de Magnesio
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-right">
              <Link href="#comparativa" className="inline-block bg-white text-[#1F3A5F] text-sm font-bold px-8 py-3 rounded-xl hover:bg-[#6B8F71] hover:text-white transition-colors shadow-sm">
                Ver en comparativa ↓
              </Link>
            </div>
          </section>
        )}

        <section className={slug === 'magnesio' ? 'order-3' : ''}>
          <h2 className="text-2xl font-serif font-semibold text-[#1F3A5F] mb-4">¿Qué es?</h2>
          <p className="text-[#2B2B2B]">{suplemento.whatIsIt}</p>
        </section>

        <section className={slug === 'magnesio' ? 'order-4' : ''}>
          <h2 className="text-2xl font-serif font-semibold text-[#1F3A5F] mb-4">Para qué suele utilizarse</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <p className="text-[#2B2B2B] flex-1">{suplemento.whatIsItUsedFor}</p>
            {slug === 'magnesio' && (
              <div className="relative w-full md:w-1/3 h-48 md:h-56 rounded-xl overflow-hidden shadow-sm border border-[#E5E2DA] shrink-0">
                <Image src="/images/supplements/magnesio/contexto.jpeg" alt="Uso contextual" fill className="object-cover" />
              </div>
            )}
          </div>
        </section>

        <section className={slug === 'magnesio' ? 'order-5' : ''}>
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

        <section id="comparativa" className={slug === 'magnesio' ? 'order-2' : 'mt-12 md:mt-16'}>
          <h2 className="text-3xl font-serif font-bold text-[#1F3A5F] mb-6">
            {(suplemento.recommendedAsins || []).length > 1 
              ? "Comparativa de opciones aprobadas" 
              : "Opción editorial recomendada"}
          </h2>
          <p className="text-[#666666] mb-8 text-[17px] leading-relaxed">
            {(suplemento.recommendedAsins || []).length > 1 
              ? "Cribado editorial analizando formatos de alta biodisponibilidad y ausencia probada de excipientes indeseados."
              : "A la espera de ampliar el catálogo, destacamos de manera aislada la única fórmula actual que supera nuestro cribado editorial (dosis efectiva + formato sin aditivos)."}
          </p>
          
          <div className="flex flex-col gap-6">
            {(suplemento.recommendedAsins || []).length === 0 ? (
              <p className="text-[#666666] italic bg-[#F7F6F2] p-6 rounded-xl border border-[#E5E2DA]">No hay productos aprobados en este momento. Estamos revisando el mercado.</p>
            ) : (
              (suplemento.recommendedAsins || []).map((asin: string, idx: number) => {
                const prod = amazonSupplementsData.find(a => a.asin === asin);
                if (!prod) return null;
                
                return (
                  <div key={idx} className="bg-white border border-[#E5E2DA] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center md:items-start group">
                    <div className="w-full md:w-1/4 shrink-0 flex flex-col items-center">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-white mb-4 border border-[#E5E2DA] shadow-sm">
                        <Image src={prod.image} alt={prod.name} fill className="object-contain p-2" />
                      </div>
                      <span className="bg-[#1F3A5F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{prod.badge || 'Recomendado'}</span>
                    </div>
                    
                    <div className="flex-1 w-full text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1F3A5F] mb-3 group-hover:text-[#6B8F71] transition-colors">{prod.name}</h3>
                      <p className="text-[#666666] mb-4 text-sm md:text-base leading-relaxed">{prod.shortDescription}</p>
                      
                      <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#424842] mb-6 justify-center md:justify-start bg-[#F7F6F2] p-4 rounded-xl border border-[#E5E2DA]/50">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-[#666666] tracking-wider mb-1">Formato</span>
                          <span className="font-medium text-[#1F3A5F]">{prod.format}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-[#666666] tracking-wider mb-1">Dosis Útil</span>
                          <span className="font-medium text-[#1F3A5F]">{prod.dose}</span>
                        </div>
                        {prod.capsules > 0 && (
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-[#666666] tracking-wider mb-1">Duración</span>
                            <span className="font-medium text-[#1F3A5F]">{prod.capsules} ud</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full md:w-auto shrink-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#E5E2DA] pt-6 md:pt-0 md:pl-8 mt-2 md:mt-4">
                      <TrackedLink
                        href={getAmazonAffiliateUrl(prod.asin)} 
                        eventName="amazon_click"
                        eventData={{ type: 'suplemento_card', asin: prod.asin, slug }}
                        className="w-full text-center bg-[#1F3A5F] text-white font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md hover:bg-[#6B8F71] transition-all flex flex-col gap-1 items-center justify-center transform hover:-translate-y-0.5"
                      >
                        <span className="text-[17px] text-white font-medium">{prod.ctaHint || 'Ver formato recomendado'}</span>
                        <span className="text-[11px] text-white/80 uppercase tracking-widest font-bold">Comprobar disponibilidad en Amazon</span>
                      </TrackedLink>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <p className="text-xs text-[#666666] mt-6 text-center italic opacity-80">* Los precios y disponibilidad dependen de Amazon. Las fórmulas pueden cambiar, verifica siempre la etiqueta.</p>
          {suplemento.faq && suplemento.faq.length > 0 && (
            <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-serif text-[#1F3A5F] mb-8 text-center">Dudas Habituales</h2>
              <FaqAccordion faqs={suplemento.faq} />
            </section>
          )}
        </section>

        {amazonSupplementsData.filter(s => s.category === suplemento.categorySlug || s.goalTags.includes(suplemento.categorySlug)).length > 0 && (
          <section className="mt-16 md:mt-24">
            <div className="border-t border-[#E5E2DA] pt-12">
              <h2 className="text-3xl font-bold font-serif text-[#1F3A5F] mb-4">Relacionados en {suplemento.categorySlug.replace('-', ' ')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {amazonSupplementsData
                  .filter(s => s.category === suplemento.categorySlug || s.goalTags.includes(suplemento.categorySlug))
                  .slice(0, 3)
                  .map(s => (
                    <SupplementAffiliateCard key={s.asin} supplement={s} />
                  ))
                }
              </div>
              
              <div className="mt-10 text-center border-b border-[#E5E2DA] pb-12">
                <a href="/suplementos" className="inline-flex items-center justify-center bg-transparent text-[#1F3A5F] border border-[#E5E2DA] font-bold px-8 py-3.5 rounded-xl hover:bg-[#F7F6F2] transition-colors shadow-sm text-sm uppercase tracking-wide">
                  Explorar todo el catálogo
                </a>
              </div>
            </div>
          </section>
        )}

        <section className="mt-8 p-6 bg-[#F7F6F2] border border-[#E5E2DA] rounded-lg text-sm text-[#424842] text-center italic">
          La información de esta guía es divulgativa y no sustituye el consejo de un profesional sanitario.
        </section>

      </div>
    </article>
  );
}
