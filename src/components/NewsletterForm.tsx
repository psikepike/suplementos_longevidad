'use client';
import { trackEvent } from '@/utils/tracking';

export default function NewsletterForm({ 
  buttonText = "Suscribirme", 
  placeholder = "Tu mejor email",
  layout = "horizontal"
}: { 
  buttonText?: string, 
  placeholder?: string,
  layout?: "horizontal" | "vertical"
}) {
  return (
    <form 
      className={`flex gap-4 ${layout === 'horizontal' ? 'flex-col sm:flex-row max-w-md mx-auto' : 'flex-col w-full'}`}
      onSubmit={(e) => {
        e.preventDefault();
        trackEvent('email_signup_click');
        alert('Suscripción simulada (Tracking activado)');
      }}
    >
      <input type="email" placeholder={placeholder} className={`px-5 py-3 rounded-xl border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#6B8F71] text-[#2B2B2B] bg-white transition-all ${layout === 'horizontal' ? 'flex-1' : 'w-full'}`} required />
      <button type="submit" className={`bg-[#1F3A5F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6B8F71] transition-colors ${layout === 'horizontal' ? 'whitespace-nowrap' : 'w-full'}`}>
        {buttonText}
      </button>
    </form>
  );
}
