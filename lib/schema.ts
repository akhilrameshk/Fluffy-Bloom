import { SITE_URL, SITE_NAME } from './env';
import { getBranches, productPath } from './utils';
import type { IProduct, ISettings } from '@/types';

const digits = (n: string) => n.replace(/\D/g, '');
const tel = (n: string) => `+${digits(n).length === 10 ? '91' + digits(n) : digits(n)}`;

export const storeSchema = (s: ISettings) => ({
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: SITE_NAME,
  url: SITE_URL,
  description: s.metaDescription,
  telephone: tel(s.whatsapp),
  email: s.email || undefined,
  sameAs: [s.instagram, s.facebook].filter(Boolean),
  priceRange: '₹₹',
  department: getBranches(s).map((b) => ({
    '@type': 'ClothingStore',
    name: `${SITE_NAME} ${b.name}`,
    telephone: tel(s.whatsapp),
    address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: b.locality, addressRegion: 'Kerala', addressCountry: 'IN' },
  })),
});

export const productSchema = (p: IProduct) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: p.name,
  description: p.description || p.name,
  image: p.image ? [p.image] : undefined,
  category: p.category?.name,
  brand: { '@type': 'Brand', name: SITE_NAME },
  offers: {
    '@type': 'Offer', url: `${SITE_URL}${productPath(p)}`, priceCurrency: 'INR', price: p.price,
    availability: 'https://schema.org/InStock',
  },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
});
