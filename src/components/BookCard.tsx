import Image from 'next/image';
import TrackedLink from './TrackedLink';

export interface Book {
  title: string;
  author: string;
  asin: string;
  cover: string;
  description: string;
  amazonUrlEs: string;
  badge?: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  ctaHint?: string;
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="flex flex-col md:flex-row bg-[#F7F6F2] rounded-xl overflow-hidden border border-[#E5E2DA] transition-all hover:shadow-md">
      <div className="w-full md:w-1/3 relative bg-white flex items-center justify-center py-8 px-6 border-b md:border-b-0 md:border-r border-[#E5E2DA]">
        {book.badge && (
          <span className="absolute top-4 left-4 bg-[#6B8F71] text-white text-xs font-bold px-2 py-1 rounded">
            {book.badge}
          </span>
        )}
        <div className="relative w-32 h-48 drop-shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.cover} alt={`Portada de ${book.title}`} className="w-full h-full object-cover rounded-sm border border-[#E5E2DA]" />
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {book.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs font-medium text-[#6B8F71] uppercase tracking-wider">{tag}</span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-[#1F3A5F] font-serif mb-1 leading-snug">{book.title}</h3>
          <p className="text-sm font-medium text-[#666666] mb-3">Por {book.author}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FBBF24]">★</span>
            <span className="text-sm font-bold text-[#1F3A5F]">{book.rating}</span>
            <span className="text-sm text-[#999999]">({book.reviewCount.toLocaleString()} reseñas)</span>
          </div>
          <p className="text-[#424842] text-sm leading-relaxed mb-6">
            {book.description}
          </p>
        </div>
        <div>
          <TrackedLink
            href={book.amazonUrlEs}
            eventName="amazon_click"
            eventData={{ type: 'libro', asin: book.asin }}
            className="inline-flex w-full md:w-auto items-center justify-center bg-[#1F3A5F] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#6B8F71] transition-colors"
          >
            {book.ctaHint || 'Ver en Amazon'}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
