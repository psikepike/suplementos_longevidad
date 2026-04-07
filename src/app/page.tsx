import React from 'react';
import Link from 'next/link';
import categorias from '@/data/categorias.json';
import suplementos from '@/data/suplementos.json';
import NewsletterForm from '@/components/NewsletterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 px-6 lg:px-8 max-w-6xl mx-auto relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <h1 className="font-serif text-[32px] sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#1F3A5F] tracking-tight leading-[1.2] lg:leading-[1.12] mb-6">
            Los suplementos más utilizados para envejecer con salud
          </h1>
          <p className="text-lg md:text-xl text-[#666666] mb-8 font-serif italic max-w-2xl leading-relaxed">
            Guías claras y prudentes sobre suplementos, hábitos y comparativas construidas expresamente para el bienestar a partir de los 50 años.
          </p>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="#categorias" className="bg-[#1F3A5F] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#6B8F71] transition-colors shadow-sm text-center">
                Ver suplementos
              </Link>
              <button className="bg-transparent border border-[#E5E2DA] text-[#1F3A5F] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F7F6F2] hover:border-[#6B8F71] transition-all text-center">
                Leer guía gratuita
              </button>
            </div>
            <p className="text-sm text-[#666666] font-medium flex items-center gap-2 ml-1">
               <span className="w-1.5 h-1.5 rounded-full bg-[#6B8F71]"></span>
               Sin promesas milagro ni lenguaje agresivo
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-10 pt-6 border-t border-[#E5E2DA]/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6B8F71]"></span>
              <span className="text-[#666666] text-xs font-bold tracking-wider uppercase">Información Prudente</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6B8F71]"></span>
              <span className="text-[#666666] text-xs font-bold tracking-wider uppercase">Enfoque clínico base</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1F3A5F]"></span>
              <span className="text-[#666666] text-xs font-bold tracking-wider uppercase">Evidencia Actualizada</span>
            </div>
          </div>
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
              return (
                <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="bg-[#F7F6F2] hover:bg-[#E5E2DA]/10 hover:border-[#6B8F71]/30 border border-[#E5E2DA] p-6 md:p-8 rounded-2xl transition-all group flex flex-col justify-between shadow-sm hover:shadow-md">
                  <div className="mb-6">
                    <h4 className="font-serif text-2xl font-bold text-[#1F3A5F] mb-3 group-hover:text-[#6B8F71] transition-colors">{cat.name}</h4>
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
              <h2 className="text-sm font-bold text-[#4ade80] tracking-widest uppercase mb-2">Visión global</h2>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white max-w-2xl leading-tight">Mapeo Rápido de Suplementos</h3>
            </div>
            <Link href="/suplementos" className="text-white hover:text-[#4ade80] border-b border-white/50 hover:border-[#4ade80] pb-1 transition-all md:mb-2 text-sm font-bold uppercase tracking-wider">
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
                      <span className="bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/30 px-3 py-1.5 text-xs rounded-full font-bold shadow-[0_0_10px_rgba(74,222,128,0.1)]">
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
               <div className="w-56 h-72 bg-white border border-[#E5E2DA] shadow-xl rounded-sm rotate-3 flex items-center justify-center text-center p-8 flex-col bg-gradient-to-br from-white to-[#F7F6F2]">
                 <div className="w-10 h-10 border border-[#1F3A5F] rounded-full flex items-center justify-center text-[#1F3A5F] font-serif font-bold text-xl mb-4 italic shadow-sm bg-white">S</div>
                 <h4 className="font-serif font-bold text-2xl text-[#1F3A5F] leading-snug mb-3">7 Hábitos Clave</h4>
                 <div className="w-12 h-1 bg-[#6B8F71] mb-4"></div>
                 <p className="text-[10px] text-[#666666] uppercase tracking-widest font-bold">Edición Revisada</p>
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
            <Link href="/suplementos/q10" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-white hover:bg-[#F7F6F2] border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Coenzima Q10</Link>
            <Link href="/articulos/mejor-suplemento-memoria-mayores" className="text-[#1F3A5F] hover:text-[#1F3A5F] bg-white hover:bg-[#F7F6F2] border border-[#E5E2DA] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">Memoria +50</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
