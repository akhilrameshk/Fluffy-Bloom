import type { Metadata } from 'next';
import { SITE_NAME } from './env';

type Opts = {
  title: string; description?: string; path: string; image?: string; keywords?: string; absoluteTitle?: boolean;
};

/** One place that builds title, canonical, Open Graph and Twitter metadata for every page. */
export const pageMeta = ({ title, description, path, image, keywords, absoluteTitle }: Opts): Metadata => {
  const full = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: SITE_NAME, type: 'website', locale: 'en_IN', images: image ? [image] : undefined },
    twitter: { card: image ? 'summary_large_image' : 'summary', title: full, description, images: image ? [image] : undefined },
  };
};
