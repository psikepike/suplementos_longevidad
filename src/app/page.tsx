import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import categorias from '@/data/categorias.json';
import suplementos from '@/data/suplementos.json';
import NewsletterForm from '@/components/NewsletterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      
      {/* Hero Section */}
      <section className="bg-[#F7F6F2] pt-4 pb-10 md:pt-16 md:pb-24 px-5 md:px-8 max-w-6xl mx-auto relative overflow-hidden flex flex-col md:flex-row items-center gap-5 md:gap-10">
        <div className="max-w-3xl relative z-10 flex-1 order-last md:order-first w-full">
          <h1 className="font-serif text-[28px] sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#1F3A5F] tracking-tight leading-[1.15] lg:leading-[1.12] mb-3 md:mb-6">
            Los suplementos más utilizados para envejecer con salud
          </h1>
          <p className="text-[17px] md:text-xl text-[#666666] mb-5 md:mb-8 font-serif italic max-w-2xl leading-relaxed">
            Guías claras y prudentes sobre suplementos, hábitos y comparativas construidas expresamente para el bienestar a partir de los 50 años.
          </p>
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto">
              <Link href="#categorias" className="bg-[#1F3A5F] text-white w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-[600] md:font-bold hover:bg-[#6B8F71] transition-colors shadow-sm text-center">
                Ver suplementos
              </Link>
              <button className="bg-transparent border border-[#E5E2DA] w-full sm:w-auto text-[#1F3A5F] px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-[600] md:font-bold hover:bg-[#F7F6F2] hover:border-[#6B8F71] transition-all text-center">
                Leer guía gratuita
              </button>
            </div>
            <p className="text-[13px] md:text-sm text-[#666666] font-medium flex items-center gap-2 ml-0.5 md:ml-1 mt-1 md:mt-0">
               <span className="w-1.5 h-1.5 rounded-full bg-[#6B8F71]"></span>
               Sin promesas milagro ni lenguaje agresivo
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 md:mt-10 pt-4 md:pt-6 border-t border-[#E5E2DA]/60">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#6B8F71]"></span>
              <span className="text-[#666666] text-[10px] md:text-xs font-bold tracking-wider uppercase">Información Prudente</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#6B8F71]"></span>
              <span className="text-[#666666] text-[10px] md:text-xs font-bold tracking-wider uppercase">Enfoque clínico base</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#1F3A5F]"></span>
              <span className="text-[#666666] text-[10px] md:text-xs font-bold tracking-wider uppercase">Evidencia Actualizada</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:flex-1 relative h-[140px] sm:h-[180px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-sm md:shadow-lg border border-[#E5E2DA] order-first md:order-last">
          <Image src="/images/home/hero/hero-supplements.jpeg" alt="Suplementos para longevidad" fill className="object-cover" priority />
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="bg-white border-t border-[#E5E2DA] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-sm font-bold text-[#6B8F71] tracking-widest uppercase mb-2">Por áreas</h2>
            <h3 className="font-serif text-3xl font-bold text-[#1F3A5F]">Explorar por objetivo</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorias.map(cat => {
              const subItems = suplementos.filter(s => s.categorySlug === cat.slug).slice(0, 3).map(s => s.name).join(', ');
              
              // Helper resolver para SVG minimalista por categoría (stroke fino, maduro y neutro)
              const renderIcon = (slug: string) => {
                const svgProps = { className: "w-6 h-6 text-[#1F3A5F] opacity-70 group-hover:text-[#6B8F71] transition-colors shrink-0", fill: "none", stroke: "currentColor", strokeWidth: 1.5, viewBox: "0 0 24 24" };
                switch (slug) {
                  case 'energia-y-fatiga':
                    return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>;
                  case 'memoria-y-cerebro':
                    return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.829 1.508-2.316a7.5 7.5 0 1 0-7.516 0c.85.487 1.508 1.333 1.508 2.316v.192" /></svg>;
                  case 'articulaciones':
                    return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
                  case 'sueno':
                    return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>;
                  case 'corazon-y-circulacion':
                    return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>;
                  case 'longevidad':
                    return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
                  default:
                    return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>;
                }
              };

              return (
                <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="bg-[#F7F6F2] hover:bg-[#E5E2DA]/10 hover:border-[#6B8F71]/30 border border-[#E5E2DA] p-6 md:p-8 rounded-2xl transition-all group flex flex-col justify-between shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#E5E2DA]/50 flex items-center justify-center border border-[#E5E2DA] group-hover:border-[#6B8F71]/20 group-hover:bg-[#E5E2DA]/80 transition-colors">
                        {renderIcon(cat.slug)}
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-[#1F3A5F] group-hover:text-[#6B8F71] transition-colors">{cat.name}</h4>
                    </div>
                    <p className="text-[#666666] text-sm leading-relaxed mb-4 line-clamp-2">{cat.description}</p>
                    {subItems && (
                      <p className="text-[#2B2B2B] font-medium text-xs italic opacity-85 border-l-2 border-[#E5E2DA] group-hover:border-[#6B8F71]/40 pl-3 py-0.5 transition-colors">
                        Ej: {subItems}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-[#6B8F71] font-bold text-sm uppercase tracking-wide">
                    Ver catálogo asociado
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section id="comparativa" className="bg-[#1F3A5F] py-16 md:py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
           {/* Gradient shadow to hint horizontal scroll on mobile */}
           <div className="absolute right-6 top-1/2 bottom-0 w-8 bg-gradient-to-l from-[#1F3A5F] to-transparent z-20 pointer-events-none md:hidden block h-[80%] my-auto" />
           
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-sm font-bold text-white/70 tracking-widest uppercase mb-2">Visión global</h2>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white max-w-2xl leading-tight">Mapeo Rápido de Suplementos</h3>
            </div>
            <Link href="/suplementos" className="text-white hover:text-white/80 border-b border-white/50 hover:border-white/80 pb-1 transition-all md:mb-2 text-sm font-bold uppercase tracking-wider">
              Ver catálogo completo
            </Link>
          </div>
          
          <div className="overflow-x-auto bg-[#182C49] rounded-2xl border border-white/10 shadow-xl relative scroll-smooth flex pb-1">
            <table className="w-full text-left min-w-[650px] relative">
              <thead>
                <tr className="border-b border-white/10 bg-[#162944]">
                  <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider text-white/70 min-w-[150px]">Suplemento</th>
                  <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider text-white/70 min-w-[200px]">Para qué suele utilizarse</th>
                  <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider text-white/70 min-w-[110px]">Evidencia</th>
                  <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider text-white/70 text-right sticky right-0 bg-[#162944] border-l border-white/5 md:border-transparent z-10">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {suplementos.slice(0, 5).map((sup, idx) => (
                  <tr key={sup.slug} className={`transition-colors ${idx % 2 === 0 ? 'bg-[#182C49]' : 'bg-[#162944] hover:bg-white/5'}`}>
                    <td className="py-5 px-6 font-serif font-bold text-lg text-white/95 whitespace-nowrap">{sup.name}</td>
                    <td className="py-5 px-6 text-white/70 text-sm leading-relaxed pr-8">{sup.whatIsItUsedFor}</td>
                    <td className="py-5 px-6">
                      <span className="bg-white/10 text-white/90 border border-white/20 px-3 py-1.5 text-xs rounded-full font-bold shadow-sm">
                        {sup.evidenceLevel}
                      </span>
                    </td>
                    <td className={`py-5 px-6 text-right sticky right-0 border-l border-white/5 md:border-transparent z-10 transition-colors ${idx % 2 === 0 ? 'bg-[#182C49]' : 'bg-[#162944]'}`}>
                      <Link href={`/suplementos/${sup.slug}`} className="inline-block bg-white text-[#1F3A5F] font-bold text-sm px-5 py-2.5 rounded-lg border border-white hover:bg-transparent hover:text-white transition-colors shadow-sm whitespace-nowrap">
                        Leer guía
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Editor's pick / Populares */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E5E2DA]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10 text-center mx-auto max-w-2xl">
            <h2 className="text-sm font-bold text-[#6B8F71] tracking-widest uppercase mb-2">Populares</h2>
            <h3 className="font-serif text-3xl font-bold text-[#1F3A5F]">Más buscados recientemente</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suplementos.slice(0, 6).map(sup => {
              const cat = categorias.find(c => c.slug === sup.categorySlug);
              return (
                <div key={sup.slug} className="bg-[#F7F6F2] p-6 lg:p-8 rounded-xl border border-[#E5E2DA] hover:shadow-md hover:border-[#6B8F71]/40 transition-all flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-white border-b border-l border-[#E5E2DA] rounded-bl-xl px-3 py-1.5 text-[10px] font-bold text-[#6B8F71] tracking-wider shadow-[0_2px_4px_rgba(0,0,0,0.02)] z-10">
                    {sup.evidenceLevel} EVIDENCIA
                  </div>
                  <span className="text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-2">{cat?.name || 'Salud General'}</span>
                  <h4 className="font-serif text-2xl font-bold text-[#1F3A5F] mb-3 group-hover:text-[#6B8F71] transition-colors">{sup.name}</h4>
                  <p className="text-[#424842] mb-6 flex-grow text-[15px] line-clamp-2 leading-relaxed">{sup.shortDescription}</p>
                  <Link href={`/suplementos/${sup.slug}`} className="bg-white border text-center border-[#E5E2DA] text-[#1F3A5F] py-2.5 rounded-lg text-sm font-bold hover:bg-[#6B8F71] hover:text-white transition-all shadow-sm">
                    Revisión completa
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Email Capture */}
      <section className="bg-white py-16 md:py-24">
         <div className="max-w-5xl mx-auto px-6 lg:px-8">
           <div className="bg-[#F7F6F2] rounded-3xl p-8 md:p-12 border border-[#E5E2DA] shadow-sm flex flex-col md:flex-row items-center gap-10 md:gap-16">
             <div className="flex-1 text-center md:text-left">
               <span className="inline-block px-3 py-1 bg-[#1F3A5F] text-white text-xs font-bold uppercase tracking-widest rounded shadow-sm mb-5">Gratis en PDF</span>
               <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1F3A5F] mb-5 leading-tight">La guía para llegar sano a los 70</h3>
               <p className="text-[#666666] mb-8 leading-relaxed max-w-sm mx-auto md:mx-0 text-lg">Descubre los 7 hábitos respaldados por la evidencia científica sobre alimentación, sueño y suplementación prudente.</p>
               <NewsletterForm buttonText="Enviar guía a mi email" layout="horizontal" />
               <p className="text-[11px] uppercase tracking-wider text-[#666666] mt-6 flex items-center justify-center md:justify-start gap-2 font-bold">
                 <span className="w-1.5 h-1.5 bg-[#6B8F71] rounded-full"></span>
                 100% privacidad. Cero spam. Puro rigor editorial.
               </p>
             </div>
             <div className="hidden md:flex w-2/5 justify-center transform hover:-translate-y-2 transition-transform duration-500">
               <div className="relative w-56 h-76 shadow-xl rounded-sm rotate-3 overflow-hidden border border-[#E5E2DA] min-h-[290px]">
                 <Image src="/images/home/lead-magnet/guia-70.jpeg" alt="La guía para llegar sano a los 70" fill className="object-cover" />
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Pre-footer Editorial Links */}
      <section className="bg-white py-16 border-t border-[#E5E2DA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-[#1F3A5F] mb-2">Suplementos más consultados</h3>
          <p className="text-[#666666] mb-8 font-medium">Guías recomendadas para empezar</p>
          
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link href="/suplementos/magnesio" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-white hover:bg-[#F7F6F2] border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Magnesio Citrato</Link>
            <Link href="/suplementos/omega-3" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-white hover:bg-[#F7F6F2] border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Omega 3 y EPA/DHA</Link>
            <Link href="/suplementos/creatina-mayores" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-white hover:bg-[#F7F6F2] border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Creatina 50+</Link>
            <Link href="/suplementos/melatonina" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-white hover:bg-[#F7F6F2] border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Melatonina Retard</Link>
            <Link href="/suplementos/proteina-suero" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-white hover:bg-[#F7F6F2] border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Aislado WPI</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
