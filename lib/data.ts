import { connect } from './db';
import { Category, Product, Setting } from './models';
import { plain } from './utils';
import type { ICategory, IProduct, ISettings } from '@/types';

const DEFAULTS: ISettings = {
  whatsapp: '9746636555', email: '', hours: '',
  address1: '', mapUrl1: '', address2: '', mapUrl2: '',
  instagram: '', facebook: '', foundedYear: '', about: '',
  visionImage: '', aboutImage: '',
  metaTitle: 'Fluffy Bloom - Ladies Innerwear & Lingerie in Cherthala and Thiruvampadi, Alappuzha',
  metaDescription: 'Fluffy Bloom is a ladies innerwear and lingerie shop in Cherthala with a new branch in Thiruvampadi, Alappuzha. Browse the collection and enquire on WhatsApp.',
  keywords: 'ladies innerwear, lingerie, Cherthala, Thiruvampadi, Alappuzha, Fluffy Bloom',
};

export async function getSettings(): Promise<ISettings> {
  await connect();
  return { ...DEFAULTS, ...plain<Partial<ISettings>>((await Setting.findOne().lean()) || {}) };
}
export async function getCategories() {
  await connect();
  return plain<ICategory[]>(await Category.find().sort({ createdAt: 1 }).lean());
}
export async function getProducts(filter: Record<string, unknown> = {}, limit = 0) {
  await connect();
  return plain<IProduct[]>(await Product.find(filter).populate('category', 'name').sort({ createdAt: -1 }).limit(limit).lean());
}
export async function getProduct(id: string) {
  await connect();
  try { return plain<IProduct | null>(await Product.findById(id).populate('category', 'name').lean()); } catch { return null; }
}

type PageOpts = { category?: string; q?: string; sort?: string; page?: number; limit?: number };
export async function getProductsPage({ category, q, sort, page = 1, limit = 8 }: PageOpts) {
  await connect();
  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (q) filter.name = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  const order: Record<string, 1 | -1> = sort === 'price-asc' ? { price: 1 } : sort === 'price-desc' ? { price: -1 } : { createdAt: -1 };
  const [items, total] = await Promise.all([
    Product.find(filter).populate('category', 'name').sort(order).skip((page - 1) * limit).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);
  return { items: plain<IProduct[]>(items), total, pages: Math.max(1, Math.ceil(total / limit)) };
}
