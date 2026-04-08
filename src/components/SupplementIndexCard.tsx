import Link from 'next/link';

export default function SupplementIndexCard({ supplement }: { supplement: any }) {
  const formatCategory = (slug: string) => {
    const map: Record<string, string> = {
      'sueno': 'Descanso',
      'corazon-y-circulacion': 'Cardiovascular',
      'energia-y-fatiga': 'Energía y Músculo',
    };
    return map[slug] || slug.replace(/-/g, ' ');
  };

  const badgeColor = supplement.evidenceLevel === 'Alta' 
    ? 'bg-[#6B8F71] text-white' 
    : supplement.evidenceLevel === 'Media' 
      ? 'bg-[#1F3A5F] text-white' 
      : 'bg-[#E5E2DA] text-[#1F3A5F]';

  return (
    <div className="flex flex-col md:flex-row bg-[#F7F6F2] rounded-xl overflow-hidden border border-[#E5E2DA] transition-all hover:shadow-md">
      <div className="w-full md:w-1/3 relative bg-white flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#E5E2DA] min-h-[220px]">
        {supplement.evidenceLevel && (
          <span className={`absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded shadow-sm z-10 ${badgeColor}`}>
            Evidencia: {supplement.evidenceLevel}
          </span>
        )}
        <Link href={`/suplementos/${supplement.slug}`} className="w-full h-full cursor-pointer block relative">
          <div className="w-full h-full bg-[#F7F6F2] flex items-center justify-center border border-[#E5E2DA] rounded-sm relative overflow-hidden group">
            <span className="text-[#1F3A5F]/20 text-5xl font-serif font-bold uppercase select-none transition-transform group-hover:scale-110">
              {supplement.name.charAt(0)}
            </span>
            <img 
              src={`/images/supplements/${supplement.slug}/hero.jpeg`} 
              alt={supplement.name}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 hover:opacity-90" 
            />
          </div>
        </Link>
      </div>
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[11px] font-bold text-[#6B8F71] uppercase tracking-widest">{formatCategory(supplement.categorySlug)}</span>
          </div>
          <Link href={`/suplementos/${supplement.slug}`}>
            <h3 className="text-2xl font-bold text-[#1F3A5F] font-serif mb-2 leading-snug hover:text-[#6B8F71] transition-colors">
              {supplement.name}
            </h3>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-[#666666] bg-white border border-[#E5E2DA] px-2 py-1 rounded">
              Dosis base: {supplement.standardDose.split(' ')[0]} mg
            </span>
            {(supplement.recommendedAsins || []).length > 0 && (
              <span className="text-xs font-semibold text-[#1F3A5F] bg-[#4ade80]/10 border border-[#4ade80]/20 px-2 py-1 rounded flex items-center gap-1">
                <span className="text-[#4ade80] text-[10px]">✓</span> {supplement.recommendedAsins.length} opc. aprobadas
              </span>
            )}
          </div>
          <p className="text-[#424842] text-[15px] leading-relaxed mb-6">
            {supplement.shortDescription}
          </p>
        </div>
        <div>
          <Link
            href={`/suplementos/${supplement.slug}`}
            className="inline-flex w-full md:w-auto items-center justify-center bg-white border border-[#1F3A5F]/20 text-[#1F3A5F] font-bold px-6 py-3 rounded-lg hover:bg-[#1F3A5F] hover:text-white transition-colors"
          >
            Leer guía editorial →
          </Link>
        </div>
      </div>
    </div>
  );
}
