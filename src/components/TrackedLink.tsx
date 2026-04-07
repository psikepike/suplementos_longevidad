'use client';
import { trackEvent } from '@/utils/tracking';
import { ReactNode } from 'react';

interface TrackedLinkProps {
  href: string;
  eventName: string;
  eventData?: Record<string, any>;
  className?: string;
  children: ReactNode;
  rel?: string;
}

export default function TrackedLink({ href, eventName, eventData, className, children, rel }: TrackedLinkProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel={rel || "sponsored noopener noreferrer"} 
      className={className}
      onClick={() => trackEvent(eventName, eventData)}
    >
      {children}
    </a>
  );
}
