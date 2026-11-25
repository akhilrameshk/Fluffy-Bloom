import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/env';
import { getProducts } from '@/lib/data';
import { productPath } from '@/lib/utils';

export const dynamic = 'force-dynamic'; // always reflects the current products

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await getProducts();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/vision`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    ...products.map((p) => ({
      url: `${SITE_URL}${productPath(p)}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
