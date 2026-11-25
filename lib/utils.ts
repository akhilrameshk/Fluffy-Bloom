import type { ICategory, IProduct, ISettings } from '@/types';

export const plain = <T>(x: unknown): T => JSON.parse(JSON.stringify(x));

export const inr = (n?: number) => '₹ ' + Number(n || 0).toLocaleString('en-IN');

export const isObjectId = (s?: string): s is string => !!s && /^[a-f\d]{24}$/i.test(s);

export const waLink = (num = '9746636555', text = '') => {
  const d = String(num).replace(/\D/g, '');
  return `https://wa.me/${d.length === 10 ? '91' + d : d}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

export const num = (v: string | undefined, d: number) => Math.max(1, parseInt(v || '', 10) || d);

export const wrap = { maxWidth: 1360, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } };

const slugify = (s?: string | null) =>
  String(s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const productPath = (p?: Partial<Pick<IProduct, '_id' | 'name'>> | null) => {
  const id = p?._id ? String(p._id) : '';
  const slug = slugify(p?.name) || 'item';
  return id ? `/products/${slug}-${id}` : `/products/${slug}`;
};

export const idFromSlug = (slug: string) => String(slug ?? '').slice(-24);

/** Cloudinary delivery URL: auto format/quality, 4:3 crop, given width. */
export const cld = (url?: string, w = 640) =>
  url?.includes('res.cloudinary.com')
    ? url.replace('/upload/', `/upload/f_auto,q_auto,c_fill,ar_4:3,w_${w}/`)
    : url;

export const getBranches = (s: ISettings) => [
  {
    name: 'Cherthala',
    title: 'Cherthala Branch (Main Store)',
    address: s.address1,
    locality: 'Cherthala',
    phone: s.whatsapp,
    hours: s.hours,
    mapUrl: s.mapUrl1,
    isNew: false,
  },
  {
    name: 'Thiruvampadi',
    title: 'Thiruvampadi Branch',
    address: s.address2,
    locality: 'Thiruvampadi',
    phone: s.whatsapp,
    hours: s.hours,
    mapUrl: s.mapUrl2,
    isNew: true,
  },
];

export const enquiryText = (
  p?: Partial<IProduct> | null,
  origin = '',
  who: { name?: string; phone?: string; message?: string } = {}
) => {
  const categoryName =
    p?.category && typeof p.category === 'object' ? (p.category as ICategory).name : '';

  return [
    'Hi Fluffy Bloom, I would like to enquire about:',
    `${p?.name || 'Product'}${categoryName ? ` (${categoryName})` : ''}`,
    `Price: ${inr(p?.price)}`,
    `Link: ${origin}${productPath(p)}`,
    ...(who.name || who.phone ? ['', `Name: ${who.name || ''}`, `Phone: ${who.phone || ''}`] : []),
    ...(who.message ? ['', who.message] : []),
  ].join('\n');
};