import Link from 'next/link';
import { Box, Chip, Typography } from '@/components/ui';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import SortSelect from '@/components/SortSelect';
import Pager from '@/components/Pager';
import { getCategories, getProductsPage, getSettings } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { isObjectId, num } from '@/lib/utils';

const containerSx = {
  width: '100%',
  maxWidth: 1360,
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
};

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
        px: 1.25,
        height: 34,
        fontSize: 12.5,
        fontWeight: 700,
        borderColor: active ? 'primary.main' : 'rgba(255, 255, 255, 0.16)',
        color: active ? '#ffffff' : '#e6d6df',
        bgcolor: active ? 'primary.main' : 'rgba(255, 255, 255, 0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: active ? 'primary.main' : 'rgba(255, 46, 147, 0.16)',
          transform: 'translateY(-1px)',
        },
      }}
    />
  );

  return (
    <Box sx={{ pb: 10, overflowX: 'hidden' }}>
      {/* LUXURY COLLECTION HEADER BANNER */}
      <Box component="section" sx={{ ...containerSx, pt: { xs: 2.5, md: 4 }, pb: 2 }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: 4, md: 5 },
            overflow: 'hidden',
            p: { xs: 3, sm: 4.5, md: 5.5 },
            background:
              'radial-gradient(circle at 12% 20%, rgba(255, 46, 147, 0.2) 0%, transparent 45%), radial-gradient(circle at 88% 80%, rgba(255, 118, 186, 0.12) 0%, transparent 48%), linear-gradient(135deg, #140b12 0%, #0b060a 60%, #160c14 100%)',
            border: '1px solid rgba(255, 46, 147, 0.3)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.85)',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.6,
              py: 0.55,
              borderRadius: 999,
              bgcolor: 'rgba(255, 46, 147, 0.14)',
              border: '1px solid rgba(255, 46, 147, 0.4)',
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                width: 6.5,
                height: 6.5,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                boxShadow: '0 0 8px #ff2e93',
              }}
            />
            <Typography
              component="span"
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.3,
                textTransform: 'uppercase',
                color: '#ffd4ea',
              }}
            >
              Fluffy Bloom Boutique • Cherthala &amp; Alappuzha
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 30, sm: 38, md: 46 },
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #ffffff 0%, #ff70ba 65%, #ff2e93 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Products
          </Typography>

          <Box
            sx={{
              mt: 1,
              '& a': { color: '#d8c3ce', textDecoration: 'none' },
              '& a:hover': { color: '#ff2e93' },
            }}
          >
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
          </Box>

          <Typography
            sx={{
              color: '#dcc9d3',
              fontSize: { xs: 14, sm: 15.5 },
              lineHeight: 1.6,
              maxWidth: 620,
              mt: 1.5,
            }}
          >
            {sp?.q
              ? `Showing search results for "${sp.q}".`
              : 'Explore our curated collection of everyday essentials, innerwear, maternity wear, and loungewear.'}
          </Typography>
        </Box>
      </Box>

      {/* CATEGORY FILTER + SORT BAR + PRODUCT GRID */}
      <Box component="section" sx={{ ...containerSx, pt: 1.5 }}>
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 3.5,
            bgcolor: 'rgba(20, 13, 19, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 3.5,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap', alignItems: 'center' }}>
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
              showDescription
            />
          ))}
        </Box>

        {!items?.length && (
          <Box
            sx={{
              p: 4,
              borderRadius: 3.5,
              textAlign: 'center',
              bgcolor: 'rgba(20, 13, 19, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Typography sx={{ color: '#cfbfc8', fontSize: 15 }}>
              No products found matching your selection.
            </Typography>
          </Box>
        )}

        <Pager page={page} pages={pages} />
      </Box>
    </Box>
  );
}