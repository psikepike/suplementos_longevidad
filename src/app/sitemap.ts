import { MetadataRoute } from 'next';
import categorias from '@/data/categorias.json';
import suplementos from '@/data/suplementos.json';
import articulos from '@/data/articulos.json';

const url = 'https://suplementoslongevidad.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  categorias.forEach((c) => {
    routes.push({
      url: `${url}/categoria/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  suplementos.forEach((s) => {
    routes.push({
      url: `${url}/suplementos/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  articulos.forEach((a) => {
    routes.push({
      url: `${url}/articulos/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
