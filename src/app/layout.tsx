import "@/app/globals.css";

import type { Metadata } from 'next';
import TrackScroll from '@/components/TrackScroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://suplementoslongevidad.com'),
  title: {
    default: "Suplementos Longevidad | Guías prudentes para mayores de 50 años",
    template: "%s | Suplementos Longevidad"
  },
  description: "Información divulgativa y basada en evidencia sobre los suplementos más comunes para favorecer un envejecimiento saludable.",
  openGraph: {
    type: "website",
    url: "https://suplementoslongevidad.com",
    title: "Suplementos Longevidad | Guías prudentes",
    description: "Información y evidencia sobre suplementos sin promesas milagro.",
    siteName: "Suplementos Longevidad",
  },
  twitter: {
    card: "summary_large_image",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#F7F6F2] text-[#2B2B2B] antialiased selection:bg-[#6B8F71] selection:text-white flex flex-col min-h-screen">
        <TrackScroll />
        <header className="bg-white border-b border-[#E5E2DA] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
            <a href="/" className="font-serif font-semibold text-xl text-[#1F3A5F]">
              suplementoslongevidad.com
            </a>
            <nav className="hidden md:flex gap-8 text-[17px] text-[#666666] font-medium">
              <a href="/suplementos/magnesio" className="hover:text-[#6B8F71] transition-colors">Suplementos</a>
              <a href="/categoria/sueno" className="hover:text-[#6B8F71] transition-colors">Categorías</a>
              <a href="/articulos/magnesio-citrato-vs-bisglicinato" className="hover:text-[#6B8F71] transition-colors">Artículos</a>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-white border-t border-[#E5E2DA] mt-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-[15px] text-[#666666] max-w-3xl">
              <p className="font-semibold text-[#1F3A5F] mb-4">Aviso Importante</p>
              <p>La información contenida en esta web es de carácter divulgativo y editorial. En ningún caso debe interpretarse como consejo médico profesional, diagnóstico o tratamiento. Si tienes alguna condición médica o tomas medicación, consulta siempre a tu médico antes de incorporar cualquier suplemento a tu dieta.</p>
            </div>
            <div className="mt-12 text-sm text-[#666666] flex flex-wrap gap-6">
              <span>© {new Date().getFullYear()} Suplementos Longevidad.</span>
              <a href="#" className="underline decoration-[#E5E2DA] hover:text-[#2B2B2B]">Aviso Legal</a>
              <a href="#" className="underline decoration-[#E5E2DA] hover:text-[#2B2B2B]">Privacidad</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
