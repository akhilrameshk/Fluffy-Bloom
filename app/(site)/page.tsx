import Link from 'next/link';
import { Box, Typography } from '@/components/ui';
import PillButton from '@/components/PillButton';
import ProductCard from '@/components/ProductCard';
import { getCategories, getProducts, getSettings } from '@/lib/data';
import { pageMeta } from '@/lib/seo';

const HERO_FALLBACK = '/hero-banner.png';

const containerSx = {
  width: '100%',
  maxWidth: 1360,
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
};

const CATEGORY_SUBTITLES: Record<string, string> = {
  bras: 'Comfortable everyday fits',
  panties: 'Premium cotton essentials',
  shapewear: 'Smooth contouring fits',
  sleepwear: 'Soft nightwear & loungewear',
  maternity: 'Gentle nursing support',
  'thermal & more': 'Daily active essentials',
};

function getCategorySubtitle(cat: any) {
  if (cat?.tagline) return cat.tagline;
  if (cat?.description) return cat.description;
  const key = String(cat?.name || '').trim().toLowerCase();
  return CATEGORY_SUBTITLES[key] || 'Comfort & everyday fit';
}

function getCategoryMonogram(name = '') {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'FB';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export async function generateMetadata() {
  const s = await getSettings();
  return pageMeta({
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    path: '/',
    absoluteTitle: true,
  });
}

export default async function Home() {
  const [s, cats] = await Promise.all([getSettings(), getCategories()]);

  const perCatLists = await Promise.all(
    (cats || []).map(async (c: any) => {
      try {
        const res = await getProducts({ category: c._id });
        return Array.isArray(res) ? res : [];
      } catch {
        return [];
      }
    })
  );

  const featuredFour = perCatLists
    .flat()
    .filter(
      (item: any) =>
        item &&
        item._id &&
        typeof item.name === 'string' &&
        item.name.trim().length > 0
    )
    .slice(0, 4);

  const heroBg = HERO_FALLBACK;
  const cleanWa = String(s?.whatsapp || '9746636555').replace(/\D/g, '');

  return (
    <Box sx={{ pb: 8 }}>
      {/* HERO BANNER */}
      <Box component="section" sx={{ ...containerSx, pt: { xs: 2.5, md: 3.5 }, pb: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            minHeight: { xs: 420, md: 490 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            bgcolor: '#130d12',
            border: '1px solid rgba(255, 46, 147, 0.25)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.85)',
            backgroundImage: {
              xs: `
                linear-gradient(
                  180deg,
                  rgba(14, 9, 13, 0.88) 0%,
                  rgba(14, 9, 13, 0.72) 55%,
                  rgba(14, 9, 13, 0.85) 100%
                ),
                url("${encodeURI(heroBg)}")
              `,
              md: `
                linear-gradient(
                  90deg,
                  #0e090d 0%,
                  rgba(14, 9, 13, 0.95) 40%,
                  rgba(18, 11, 17, 0.62) 66%,
                  rgba(24, 12, 20, 0.16) 100%
                ),
                url("${encodeURI(heroBg)}")
              `,
            },
            backgroundSize: 'cover',
            backgroundPosition: { xs: 'center 20%', md: '82% 20%' },
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: { xs: 620, md: 640 },
              px: { xs: 3, sm: 5, md: 7 },
              py: { xs: 5, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              gap: 1.75,
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 30, sm: 42, md: 50 },
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
                INNERWEAR
              </Box>
              <Box component="span" sx={{ color: 'primary.main' }}>
                LINGERIE{' '}
              </Box>
              <Box component="span" sx={{ color: '#ffffff' }}>
                - MORE
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14.5, sm: 16 },
                lineHeight: 1.55,
                maxWidth: 460,
                color: '#ece0e6',
              }}
            >
              Comfort, confidence, and everyday elegance. Now at Cherthala &amp; Thiruvambady, Alappuzha.
            </Typography>

            <Box sx={{ mt: 1 }}>
              <PillButton href="/products" radius={2}>
                Explore Products
              </PillButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* SHOP BY CATEGORY STRIP */}
      {cats.length > 0 && (
        <Box component="section" sx={{ ...containerSx, py: { xs: 2, md: 3 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 20, md: 24 },
              fontWeight: 700,
              color: '#ffffff',
              mb: 2.25,
            }}
          >
            Shop by Category
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(6, 1fr)',
              },
              gap: 1.75,
            }}
          >
            {cats.slice(0, 6).map((cat: any) => {
              const waText = encodeURIComponent(
                `Hello Fluffy Bloom! I would like to enquire about ${cat.name}.`
              );

              return (
                <Box
                  key={cat._id}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: '#120e12',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    transition: 'border-color 0.2s, transform 0.2s',
                    '&:hover': {
                      borderColor: 'rgba(255, 46, 147, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    component={Link}
                    href={`/products?cat=${cat._id}`}
                    aria-label={cat.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 46, 147, 0.14)',
                      border: '1px solid rgba(255, 46, 147, 0.45)',
                      color: 'primary.main',
                      fontWeight: 800,
                      fontSize: 14,
                      letterSpacing: 0.5,
                      textDecoration: 'none',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getCategoryMonogram(cat.name)}
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      component={Link}
                      href={`/products?cat=${cat._id}`}
                      noWrap
                      sx={{
                        display: 'block',
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: '#ffffff',
                        textDecoration: 'none',
                        lineHeight: 1.2,
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {cat.name}
                    </Typography>

                    <Typography
                      noWrap
                      sx={{
                        fontSize: 10.5,
                        color: '#b8a4ae',
                        lineHeight: 1.35,
                        mt: 0.25,
                        mb: 0.85,
                      }}
                    >
                      {getCategorySubtitle(cat)}
                    </Typography>

                    <Box
                      component="a"
                      href={`https://wa.me/${cleanWa}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-block',
                        px: 1.25,
                        py: 0.45,
                        borderRadius: 999,
                        bgcolor: 'primary.main',
                        color: '#ffffff',
                        fontSize: 10.5,
                        fontWeight: 700,
                        textDecoration: 'none',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        '&:hover': { filter: 'brightness(1.08)' },
                      }}
                    >
                      Enquire on WhatsApp
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* COMBINED 4 ITEMS + VIEW ALL */}
      {featuredFour.length > 0 && (
        <Box component="section" sx={{ ...containerSx, py: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2.5,
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 20, md: 24 },
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              Featured Collection
            </Typography>

            <Typography
              component={Link}
              href="/products"
              sx={{
                color: 'primary.main',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View All →
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2.5,
            }}
          >
            {featuredFour.map((item: any) => (
              <ProductCard key={String(item._id)} p={item} wa={s?.whatsapp} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}