import { item } from '@/lib/crud';
import { Product } from '@/lib/models';
import { destroyImage } from '@/lib/cloudinary';

const h = item(Product, (doc) => destroyImage(doc.image)); // remove the Cloudinary file too
export const PUT = h.PUT;
export const DELETE = h.DELETE;
