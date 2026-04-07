export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  // 1. Log local por consola para validación del MVP
  console.log(`[Tracking] ${eventName}`, data || {});

  // 2. DataLayer push para GTM/Analytics (si se inyecta el script posteriormente)
  if (typeof window !== 'undefined') {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: eventName,
      ...data,
      timestamp: new Date().toISOString()
    });
  }
};
