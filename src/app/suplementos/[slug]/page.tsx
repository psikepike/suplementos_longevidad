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
    alternates: { canonical: `https://www.suplementoslongevidad.com/suplementos/${slug}` },
    openGraph: {
      type: "article",
      url: `https://www.suplementoslongevidad.com/suplementos/${slug}`,
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
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.suplementoslongevidad.com/"},
      {"@type": "ListItem", "position": 2, "name": "Categorías", "item": `https://www.suplementoslongevidad.com/categoria/${suplemento.categorySlug}`},
      {"@type": "ListItem", "position": 3, "name": suplemento.name, "item": `https://www.suplementoslongevidad.com/suplementos/${slug}`}
    ]
  };

  const isVisualFunnel = ['magnesio', 'omega-3', 'creatina-mayores', 'q10'].includes(slug);

  return (
    <article className="min-h-screen bg-[#F7F6F2] text-[#2B2B2B]">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-8 md:py-16 text-base md:text-[17px] leading-relaxed">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        
        {/* Breadcrumbs */}
        <nav className="text-xs md:text-sm text-[#666666] mb-6 md:mb-8 font-medium">
          <Link href="/" className="hover:text-[#1F3A5F]">Inicio</Link> 
          <span className="mx-2 text-[#E5E2DA]">&gt;</span> 
          <Link href={`/categoria/${suplemento.categorySlug}`} className="hover:text-[#1F3A5F] capitalize">{suplemento.categorySlug.replace('-', ' ')}</Link>
          <span className="mx-2 text-[#E5E2DA]">&gt;</span> 
          <span className="text-[#1F3A5F] font-bold">{suplemento.name}</span>
        </nav>

        <header className="mb-10 md:mb-14">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1F3A5F] tracking-tight mb-4 leading-tight">{suplemento.name}</h1>
          <p className="text-lg md:text-2xl text-[#6B8F71] font-serif italic max-w-2xl mb-8 leading-snug">{suplemento.shortDescription}</p>
          
          {slug === 'magnesio' && (
            <div className="relative w-full h-[200px] sm:h-64 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-[#E5E2DA]">
              <Image src="/images/supplements/magnesio/hero.jpeg" alt={`Hero banner de ${suplemento.name}`} fill className="object-cover" priority />
            </div>
          )}
        </header>

        <div className="flex flex-col gap-10 md:gap-14">
          {slug === 'magnesio' && (
            <section className="bg-[#182C49] text-white p-6 rounded-xl md:rounded-2xl shadow-md border border-[#264166]">
              {/* OMITIENDO REPETICIÓN PARA BREVEDAD, SE MANTIENE BLOQUE RESUMIDO DE MAGNESIO */}
              <h2 className="text-lg md:text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4ade80]/20 flex items-center justify-center text-[#4ade80] text-xs">✓</span>
                Formatos recomendados
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="bg-[#162944] p-3 md:px-5 rounded-lg border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/90">Descanso nocturno</span>
                  <span className="font-bold text-[#4ade80]">Magnesio Bisglicinato</span>
                </div>
                <div className="bg-[#162944] p-3 md:px-5 rounded-lg border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/90">Tránsito intestinal</span>
                  <span className="font-bold text-[#4ade80]">Magnesio Citrato</span>
                </div>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1F3A5F] mb-3 md:mb-4">¿Qué es?</h2>
            <p className="text-[#2B2B2B]">{suplemento.whatIsIt}</p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1F3A5F] mb-3 md:mb-4">Para qué suele utilizarse</h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <p className="text-[#2B2B2B] flex-1">{suplemento.whatIsItUsedFor}</p>
              {slug === 'magnesio' && (
                <div className="relative w-full md:w-1/3 h-[180px] md:h-56 rounded-xl overflow-hidden shadow-sm border border-[#E5E2DA] shrink-0">
                  <Image src="/images/supplements/magnesio/contexto.jpeg" alt="Uso contextual" fill className="object-cover" />
                </div>
              )}
            </div>
          </section>

          {/* COMPRA: CTA AMAZON SUBIDO A FLUJO PRINCIPAL */}
          <section id="comparativa" className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E2DA] shadow-sm my-4 md:my-6">
            {(() => {
              const validProducts = (suplemento.recommendedAsins || [])
                .map((asin: string) => amazonSupplementsData.find(a => a.asin === asin))
                .filter((prod: typeof amazonSupplementsData[number] | undefined) => 
                  prod && 
                  !prod.asin.includes('PENDIENTE') && 
                  !prod.amazonUrl.includes('PENDIENTE')
                );

              return (
                <>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1F3A5F] mb-2 md:mb-4">
                    {validProducts.length > 1 
                      ? "Opciones probadas" 
                      : "Opción editorial recomendada"}
                  </h2>
                  <p className="text-[#666666] mb-6 md:mb-8 text-sm md:text-base">
                    Analizamos formatos de alta biodisponibilidad y calidad de laboratorio.
                  </p>
                  
                  <div className="flex flex-col gap-6">
                    {validProducts.length === 0 ? (
                      <p className="text-[#666666] italic bg-[#F7F6F2] p-6 rounded-xl border border-[#E5E2DA] text-sm">No hay productos aprobados en este momento. Estamos revisando el mercado.</p>
                    ) : (
                      validProducts.map((prod, idx: number) => {
                        if (!prod) return null;
                        
                        return (
                          <div key={idx} className="bg-[#F7F6F2] border border-[#E5E2DA] rounded-xl md:rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group">
                            <div className="w-full md:w-1/4 shrink-0 flex flex-col items-center">
                              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden bg-white mb-3 md:mb-4 border border-[#E5E2DA] shadow-sm">
                                <Image src={prod.image} alt={prod.name} fill className="object-contain p-2" />
                              </div>
                              <span className="bg-[#1F3A5F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{prod.badge || 'Recomendado'}</span>
                            </div>
                            
                            <div className="flex-1 w-full text-center md:text-left">
                              <h3 className="text-lg md:text-xl font-serif font-bold text-[#1F3A5F] mb-2 group-hover:text-[#6B8F71] transition-colors">{prod.name}</h3>
                              <p className="text-[#424842] mb-3 text-sm leading-relaxed">{prod.shortDescription}</p>
                              
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#424842] mb-5 justify-center md:justify-start">
                                <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E5E2DA]"><strong>Formato:</strong> {prod.format}</div>
                                <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E5E2DA]"><strong>Dosis Útil:</strong> {prod.dose}</div>
                              </div>
                            </div>
                            
                            <div className="w-full md:w-auto shrink-0 flex flex-col justify-center">
                              <TrackedLink
                                href={getAmazonAffiliateUrl(prod.asin)} 
                                eventName="amazon_click"
                                eventData={{ type: 'suplemento_card', asin: prod.asin, slug }}
                                className="w-full text-center bg-[#1F3A5F] text-white font-bold px-6 py-3.5 rounded-xl shadow-sm hover:bg-[#6B8F71] transition-colors flex flex-col items-center justify-center transform active:scale-95"
                              >
                                <span className="text-sm md:text-base font-medium">{prod.ctaHint || 'Ver en Amazon'}</span>
                              </TrackedLink>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </>
              );
            })()}
          </section>

          <section>
            <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-4 bg-[#6B8F71]/5 p-4 rounded-xl border border-[#6B8F71]/20">
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#1F3A5F]">Evidencia actual</h2>
              <span className="bg-[#6B8F71] text-white px-3 py-0.5 text-xs rounded-full font-bold uppercase tracking-wider">
                Nivel {suplemento.evidenceLevel}
              </span>
            </div>
            <p className="text-[#2B2B2B]">{suplemento.evidence}</p>
          </section>

          {/* Dosis, Efectos y Precaución - Minimización agresiva del peso visual */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-sm">
            <section className="bg-white p-5 rounded-xl border border-[#E5E2DA]">
              <h3 className="font-bold text-[#1F3A5F] mb-1.5 uppercase tracking-wide text-xs">Dosis Habitual</h3>
              <p className="text-[#666666]">{suplemento.standardDose}</p>
            </section>
            <section className="bg-white p-5 rounded-xl border border-[#E5E2DA]">
              <h3 className="font-bold text-[#1F3A5F] mb-1.5 uppercase tracking-wide text-xs">Mejores formatos</h3>
              <p className="text-[#666666]">{suplemento.bestFormats}</p>
            </section>
          </div>

          <section className="text-sm text-[#666666] bg-[#1F3A5F]/5 p-5 md:p-6 rounded-xl border border-[#1F3A5F]/10">
            <h3 className="font-bold text-[#1F3A5F] mb-2 uppercase tracking-wide text-xs flex items-center gap-2">
              <span className="text-rose-500">⚠</span> Efectos Secundarios y Precaución
            </h3>
            <p className="mb-2"><strong className="text-[#2B2B2B]">Efectos:</strong> {suplemento.sideEffects}</p>
            <p><strong className="text-[#2B2B2B]">Evitar en caso de:</strong> {suplemento.whoShouldAvoid}</p>
          </section>

          {suplemento.faq && suplemento.faq.length > 0 && (
            <section className="mt-8 max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold font-serif text-[#1F3A5F] mb-6 text-center">Dudas Habituales</h2>
              <FaqAccordion faqs={suplemento.faq} />
            </section>
          )}

          {/* INTERLINKING INTERNO */}
          <section className="mt-16 bg-white border border-[#E5E2DA] p-6 md:p-10 rounded-2xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1F3A5F] mb-4 text-center md:text-left">Otras guías recomendadas</h2>
            <p className="text-[#666666] mb-6 md:mb-8 text-sm md:text-base text-center md:text-left">Explora nuestros análisis sobre otros compuestos respaldados por la evidencia.</p>
            <div className="flex flex-wrap gap-2.5 md:gap-3 justify-center md:justify-start">
               {slug === 'magnesio' && <Link href="/suplementos/melatonina" className="bg-[#1F3A5F] text-white border border-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:bg-[#6B8F71] hover:border-[#6B8F71] transition-colors shadow-sm">Magnesio + Melatonina</Link>}
               {slug === 'colageno' && <Link href="/suplementos/curcumina" className="bg-[#1F3A5F] text-white border border-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:bg-[#6B8F71] hover:border-[#6B8F71] transition-colors shadow-sm">Sinergia Inflamación (Curcumina)</Link>}
               {slug === 'omega-3' && <Link href="/suplementos/curcumina" className="bg-[#1F3A5F] text-white border border-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:bg-[#6B8F71] hover:border-[#6B8F71] transition-colors shadow-sm">Sinergia Curcumina</Link>}
               {slug === 'creatina-mayores' && <Link href="/suplementos/proteina-suero" className="bg-[#1F3A5F] text-white border border-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:bg-[#6B8F71] hover:border-[#6B8F71] transition-colors shadow-sm">Base Sarcopenia (Aislado Suero)</Link>}
               {slug === 'melatonina' && <Link href="/suplementos/magnesio" className="bg-[#1F3A5F] text-white border border-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:bg-[#6B8F71] hover:border-[#6B8F71] transition-colors shadow-sm">Magnesio Clave</Link>}
               {slug === 'curcumina' && <Link href="/suplementos/colageno" className="bg-[#1F3A5F] text-white border border-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:bg-[#6B8F71] hover:border-[#6B8F71] transition-colors shadow-sm">Sinergia Articular (Colágeno)</Link>}
               {slug === 'proteina-suero' && <Link href="/suplementos/creatina-mayores" className="bg-[#1F3A5F] text-white border border-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:bg-[#6B8F71] hover:border-[#6B8F71] transition-colors shadow-sm">Combo Mayores 50 (Creatina)</Link>}

               {slug !== 'omega-3' && slug !== 'curcumina' && <Link href="/suplementos/omega-3" className="bg-[#F7F6F2] border border-[#E5E2DA] text-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:border-[#6B8F71] transition-colors shadow-sm">Omega 3 (EPA/DHA)</Link>}
               {slug !== 'q10' && <Link href="/suplementos/q10" className="bg-[#F7F6F2] border border-[#E5E2DA] text-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:border-[#6B8F71] transition-colors shadow-sm">Coenzima Q10</Link>}
               {slug !== 'creatina-mayores' && slug !== 'proteina-suero' && <Link href="/suplementos/creatina-mayores" className="bg-[#F7F6F2] border border-[#E5E2DA] text-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:border-[#6B8F71] transition-colors shadow-sm">Creatina 50+</Link>}
               {slug !== 'magnesio' && slug !== 'melatonina' && <Link href="/suplementos/magnesio" className="bg-[#F7F6F2] border border-[#E5E2DA] text-[#1F3A5F] text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 md:py-3 rounded-xl hover:border-[#6B8F71] transition-colors shadow-sm">Magnesio Clave</Link>}
            </div>
          </section>

          {amazonSupplementsData.filter(s => s.category === suplemento.categorySlug || s.goalTags.includes(suplemento.categorySlug)).length > 0 && (
            <section className="mt-12 md:mt-24">
              <div className="border-t border-[#E5E2DA] pt-10 md:pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1F3A5F] mb-4">Relacionados en {suplemento.categorySlug.replace('-', ' ')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-6 md:mt-8">
                  {amazonSupplementsData
                    .filter(s => s.category === suplemento.categorySlug || s.goalTags.includes(suplemento.categorySlug))
                    .slice(0, 3)
                    .map(s => (
                      <SupplementAffiliateCard key={s.asin} supplement={s} />
                    ))
                  }
                </div>
                
                <div className="mt-8 md:mt-10 text-center border-b border-[#E5E2DA] pb-10 md:pb-12">
                  <a href="/suplementos" className="inline-flex items-center justify-center bg-white text-[#1F3A5F] border border-[#E5E2DA] font-bold px-6 md:px-8 py-3 md:py-3.5 rounded-xl hover:bg-[#F7F6F2] transition-colors shadow-sm text-xs md:text-sm uppercase tracking-wide">
                    Explorar todo el catálogo
                  </a>
                </div>
              </div>
            </section>
          )}
          <section className="mt-10 p-5 bg-white border border-[#E5E2DA] rounded-xl text-xs text-[#666666] text-center italic">
            La información de esta guía es divulgativa y no sustituye el consejo de un profesional sanitario.
          </section>

        </div>
      </div>
    </article>
  );
}
