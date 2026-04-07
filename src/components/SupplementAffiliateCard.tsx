import TrackedLink from './TrackedLink';
import Image from 'next/image';
import { getAmazonAffiliateUrl } from '@/utils/amazon';
export interface AmazonSupplement {
  slug: string;
  asin: string;
  name: string;
  category: string;
  goalTags: string[];
  format: string;
  dose: string;
  capsules: number;
  price: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  shortDescription: string;
  ctaHint?: string;
  amazonUrl: string;
  image: string;
  evidenceLevel: string;
}

export default function SupplementAffiliateCard({ supplement }: { supplement: AmazonSupplement }) {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-[#E5E2DA] transition-all hover:shadow-md">
      <div className="relative h-56 bg-[#F7F6F2] border-b border-[#E5E2DA] flex items-center justify-center p-6">
        {supplement.badge && (
          <span className="absolute top-4 left-4 bg-[#6B8F71] text-white text-xs font-bold px-2 py-1 rounded z-10">
            {supplement.badge}
          </span>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#1F3A5F] text-xs font-bold px-2 py-1 rounded border border-[#E5E2DA] z-10">
          Evidencia: {supplement.evidenceLevel}
        </div>
        <Image 
          src={supplement.image} 
          alt={supplement.name} 
          fill
          className="object-cover absolute inset-0 opacity-80 mix-blend-multiply" 
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {supplement.goalTags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs font-medium text-[#6B8F71] uppercase tracking-wider">{tag}</span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold text-[#1F3A5F] font-serif mb-2 leading-snug">{supplement.name}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#FBBF24] text-sm">★</span>
          <span className="text-sm font-bold text-[#1F3A5F]">{supplement.rating}</span>
          <span className="text-sm text-[#999999]">({supplement.reviewCount.toLocaleString()} reseñas)</span>
        </div>
        
        <ul className="text-sm text-[#666666] mb-4 space-y-1">
          <li><strong>Formato:</strong> {supplement.format}</li>
          <li><strong>Dosis:</strong> {supplement.dose}</li>
        </ul>
        
        <p className="text-[#424842] text-sm leading-relaxed mb-6 flex-grow border-t border-[#E5E2DA] pt-4">
          {supplement.shortDescription}
        </p>
        
        <div className="flex items-center justify-between border-t border-[#E5E2DA] pt-4 mt-auto">
          <span className="text-lg font-bold text-[#1F3A5F]">{supplement.price}</span>
          <TrackedLink
            href={getAmazonAffiliateUrl(supplement.asin)}
            eventName="amazon_click"
            eventData={{ type: 'suplemento_card', asin: supplement.asin }}
            className="inline-flex items-center justify-center bg-white text-[#1F3A5F] font-medium border border-[#E5E2DA] px-4 py-2 rounded-lg hover:bg-[#6B8F71] hover:text-white hover:border-[#6B8F71] transition-all text-sm"
          >
            {supplement.ctaHint || 'Ver en Amazon'}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
