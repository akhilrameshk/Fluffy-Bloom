import { notFound } from 'next/navigation';
import { Box, Typography } from '@/components/ui';
import Section from '@/components/Section';
import Breadcrumb from '@/components/Breadcrumb';
import ProductImage from '@/components/ProductImage';
import ProductRow from '@/components/ProductRow';
import ProductDetailInquiry from '@/components/ProductDetailInquiry';
import JsonLd from '@/components/JsonLd';
import { getProduct, getProducts, getSettings } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema, productSchema } from '@/lib/schema';
import { idFromSlug, inr, productPath } from '@/lib/utils';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const p = await getProduct(idFromSlug(params.slug));
  if (!p) return { title: 'Product not found', robots: { index: false } };
  return pageMeta({
    title: `${p.name}${p.category ? ` - ${p.category.name}` : ''}`,
    description:
      p.description?.slice(0, 160) ||
      `${p.name} at Fluffy Bloom, ${inr(p.price)}. Enquire on WhatsApp.`,
    path: productPath(p),
    image: p.image,
  });
}

export default async function ProductDetail({ params }: Props) {
  const p = await getProduct(idFromSlug(params.slug));
  if (!p) notFound();
  const s = await getSettings();
  const related = p.category
    ? await getProducts({ category: p.category._id, _id: { $ne: p._id } }, 4)
    : [];

  return (
    <>
      <JsonLd data={productSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: p.name, path: productPath(p) },
        ])}
      />
      <Section>
        <Box sx={{ mb: 3.5 }}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: p.name },
            ]}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 6, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1.1 }}>
            <ProductImage
              src={p.image}
              alt={p.name}
              w={1000}
              radius={4}
              priority
              bg="#f4efe9"
            />
          </Box>
          <Box sx={{ flex: 1, display: 'grid', gap: 2.5, alignContent: 'start' }}>
            <Typography
              sx={{
                letterSpacing: 2,
                fontSize: 13,
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              {p.category?.name}
            </Typography>
            <Typography
              component="h1"
              sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 700, lineHeight: 1.15 }}
            >
              {p.name}
            </Typography>
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: 'primary.main' }}>
              {inr(p.price)}
            </Typography>
            <Typography sx={{ color: '#cfcfcf', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {p.description}
            </Typography>
            <ProductDetailInquiry
              id={(p as any)?._id || (p as any)?.id}
              name={p.name}
              image={p.image}
              price={p.price}
              wa={s?.whatsapp}
            />
          </Box>
        </Box>
      </Section>
      {related.length > 0 && p.category && (
        <ProductRow
          title={`More from ${p.category.name}`}
          href={`/products?cat=${p.category._id}`}
          items={related}
          wa={s.whatsapp}
        />
      )}
    </>
  );
}