import "./globals.css";

export const metadata = {
  title: "Suplementos Longevidad",
  description: "Evidencia, precaución y transparencia para madurez saludable",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-mono bg-stone-50">{children}</body>
    </html>
  );
}
