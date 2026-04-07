'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/utils/tracking';
import { usePathname } from 'next/navigation';

export default function TrackScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let fired = false;
    
    const handleScroll = () => {
      if (fired) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight * 0.75) {
        trackEvent('scroll_75', { path: pathname });
        fired = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return null;
}
