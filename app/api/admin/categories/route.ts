import { collection } from '@/lib/crud';
import { Category } from '@/lib/models';

const h = collection(Category);
export const GET = h.GET;
export const POST = h.POST;
