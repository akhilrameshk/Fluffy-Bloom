export interface ICategory { _id: string; name: string }
export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: ICategory | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface ISettings {
  whatsapp: string;
  email: string;
  hours: string;
  address1: string;
  mapUrl1: string;
  address2: string;
  mapUrl2: string;
  instagram: string;
  facebook: string;
  foundedYear: string;
  about: string;
  visionImage: string;
  aboutImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}
