'use client';
import { trackEvent } from '@/utils/tracking';

export default function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <details 
          key={idx} 
          className="bg-white border border-[#E5E2DA] rounded-xl group overflow-hidden transition-all"
          onToggle={(e) => {
            const el = e.target as HTMLDetailsElement;
            if (el.open) {
              trackEvent('faq_open', { question: faq.question });
            }
          }}
        >
          <summary className="font-bold text-[#1F3A5F] p-5 cursor-pointer list-none flex justify-between items-center hover:bg-[#F7F6F2] transition-colors">
            <span className="pr-4 leading-snug">{faq.question}</span>
            <span className="text-[#6B8F71] group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
          </summary>
          <div className="p-5 text-[#424842] leading-relaxed border-t border-[#E5E2DA] bg-[#F7F6F2]/30">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
