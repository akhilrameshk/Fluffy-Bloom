import Link from 'next/link';
import { Box, Chip, Typography } from '@/components/ui';
import Section from '@/components/Section';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import SortSelect from '@/components/SortSelect';
import Pager from '@/components/Pager';
import { getCategories, getProductsPage, getSettings } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { isObjectId, num } from '@/lib/utils';

type Props = {
  searchParams:
    | Promise<{ cat?: string; q?: string; sort?: string; page?: string }>
    | { cat?: string; q?: string; sort?: string; page?: string };
};

export async function generateMetadata({ searchParams }: Props) {
  const sp = await searchParams;
  const s = await getSettings();
  const cat = isObjectId(sp?.cat) ? sp.cat : undefined;
  const meta = pageMeta({
    title: 'Ladies Innerwear & Lingerie Collection',
    keywords: s.keywords,
    path: cat ? `/products?cat=${cat}` : '/products',
    description:
      'Browse the Fluffy Bloom collection of ladies innerwear, lingerie and sleepwear and enquire on WhatsApp.',
  });
  return sp?.q || sp?.sort || sp?.page
    ? { ...meta, robots: { index: false, follow: true } }
    : meta;
}

export default async function Products({ searchParams }: Props) {
  const sp = await searchParams;
  const cat = isObjectId(sp?.cat) ? sp.cat : undefined;
  const page = num(sp?.page, 1);

  const [s, cats, { items, pages }] = await Promise.all([
    getSettings(),
    getCategories(),
    getProductsPage({
      category: cat,
      q: sp?.q?.trim(),
      sort: sp?.sort,
      page,
    }),
  ]);

  const chip = (href: string, label: string, active: boolean, key?: string) => (
    <Chip
      key={key ?? label}
      component={Link}
      href={href}
      clickable
      label={label}
      color={active ? 'primary' : 'default'}
      variant={active ? 'filled' : 'outlined'}
      sx={{
        borderRadius: 999,
        px: 1,
        fontWeight: 600,
        borderColor: active ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
        color: active ? '#ffffff' : '#e6d6df',
        bgcolor: active ? 'primary.main' : 'rgba(255, 255, 255, 0.03)',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: active ? 'primary.main' : 'rgba(232, 51, 143, 0.14)',
        },
      }}
    />
  );

  return (
    <Section pt={5}>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 700, color: '#ffffff' }}
      >
        Our Products
      </Typography>

      <Box
        sx={{
          mt: 1,
          '& a': { color: '#d8c3ce', textDecoration: 'none' },
          '& a:hover': { color: '#e8338f' },
        }}
      >
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      </Box>

      <Typography sx={{ color: '#cfcfcf', mt: 2.5 }}>
        {sp?.q
          ? `Results for "${sp.q}"`
          : 'Explore our collection of everyday essentials, innerwear, and sleepwear.'}
      </Typography>

      {/* All Category Chips Visible + Sort */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          my: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {chip('/products', 'All Products', !cat, 'all')}
          {(cats || []).map((c: any) =>
            chip(`/products?cat=${c._id}`, c.name, cat === c._id, String(c._id))
          )}
        </Box>
        <SortSelect />
      </Box>

      {/* Mobile: 1 large card per row; Tablet: 2 per row; Desktop: 3-4 per row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
          gap: 2.5,
          width: '100%',
          '& a': { color: 'inherit', textDecoration: 'none' },
        }}
      >
        {(items || []).map((p: any) => (
          <ProductCard
            key={String(p._id)}
            p={p}
            wa={s?.whatsapp}
          />
        ))}
      </Box>

      {!items?.length && (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No products found.
        </Typography>
      )}

      <Pager page={page} pages={pages} />
    </Section>
  );
}