import { collection } from '@/lib/crud';
import { Product } from '@/lib/models';

const h = collection(Product, 'category');
export const GET = h.GET;
export const POST = h.POST;
