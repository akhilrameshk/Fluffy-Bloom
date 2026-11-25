import mongoose, { Schema } from 'mongoose';

const def = (name: string, fields: Record<string, unknown>) =>
  (mongoose.models[name] as mongoose.Model<any>) ||
  mongoose.model(name, new Schema(fields as any, { timestamps: true }));

export const Category = def('Category', { name: { type: String, required: true, trim: true } });
export const Product = def('Product', {
  name: { type: String, required: true, trim: true },
  price: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  image: String,
  description: String,
});
export const Setting = def('Setting', {
  whatsapp: String, email: String, hours: String,
  address1: String, mapUrl1: String, address2: String, mapUrl2: String,
  instagram: String, facebook: String, foundedYear: String, about: String,
  visionImage: String, aboutImage: String,
  metaTitle: String, metaDescription: String, keywords: String,
});
