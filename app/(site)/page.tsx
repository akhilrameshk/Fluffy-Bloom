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

const BRAND_HIGHLIGHTS = [
  {
    badge: '01',
    title: 'Curated Comfort & Fit',
    desc: 'Breathable cottons, seamless silhouettes, and supportive everyday styles.',
  },
  {
    badge: '02',
    title: 'Cherthala & Alappuzha',
    desc: 'Visit our showrooms for personalized fit assistance and exclusive collections.',
  },
  {
    badge: '03',
    title: 'Instant WhatsApp Concierge',
    desc: 'Check size availability, colors, and new arrivals directly on WhatsApp.',
  },
];

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
        const list = Array.isArray(res) ? res : [];
        const catLabel = c?.name || c?.title || '';

        return list.map((item: any) => ({
          ...item,
          category:
            item?.category && typeof item.category === 'object' && item.category.name
              ? item.category
              : catLabel
              ? { _id: c._id, name: catLabel }
              : item?.category,
          categoryName:
            (typeof item?.category === 'object' && item?.category?.name) ||
            (typeof item?.category === 'string' && item.category.trim() !== String(c._id)
              ? item.category
              : '') ||
            catLabel,
        }));
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

  console.log(
    'featuredFour categories:',
    featuredFour.map((item: any) => ({
      id: item?._id,
      name: item?.name,
      category: item?.category,
      categoryName: item?.categoryName,
    }))
  );

  const heroBg = HERO_FALLBACK;
  const cleanWa = String(s?.whatsapp || '9746636555').replace(/\D/g, '');
  const generalWaText = encodeURIComponent(
    'Hello Fluffy Bloom! I would like to know more about your collections and store availability.'
  );

  return (
    <Box sx={{ pb: 10, overflowX: 'hidden' }}>
      {/* PREMIUM LUXURY BOUTIQUE HERO SECTION */}
      <Box
        component="section"
        sx={{
          ...containerSx,
          pt: { xs: 2.5, md: 4 },
          pb: { xs: 3, md: 4.5 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: 4, md: 5 },
            overflow: 'hidden',
            background:
              'radial-gradient(circle at 12% 18%, rgba(255, 46, 147, 0.2) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(255, 118, 186, 0.14) 0%, transparent 48%), linear-gradient(135deg, #140b12 0%, #0b060a 55%, #160c14 100%)',
            border: '1px solid rgba(255, 46, 147, 0.32)',
            boxShadow:
              '0 32px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.12fr 0.88fr' },
            alignItems: 'center',
            gap: { xs: 3.5, lg: 4 },
            p: { xs: 3, sm: 4.5, md: 6, lg: 6.5 },
          }}
        >
          {/* Decorative Ambient Orb */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: -90,
              right: '36%',
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'rgba(255, 46, 147, 0.14)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
            }}
          />

          {/* LEFT EDITORIAL CONTENT */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', lg: 'flex-start' },
              textAlign: { xs: 'center', lg: 'left' },
              gap: 2.25,
            }}
          >
            {/* Location Pill Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.75,
                py: 0.65,
                borderRadius: 999,
                bgcolor: 'rgba(255, 46, 147, 0.14)',
                border: '1px solid rgba(255, 46, 147, 0.42)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  boxShadow: '0 0 10px #ff2e93',
                }}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: 1.3,
                  textTransform: 'uppercase',
                  color: '#ffd4ea',
                }}
              >
                Cherthala &amp; Alappuzha
              </Typography>
            </Box>

            {/* Main Headline */}
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 32, sm: 44, md: 54 },
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              <Box component="span" sx={{ color: '#ffffff', display: 'block' }}>
                INNERWEAR
              </Box>
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #ff70ba 0%, #ff2e93 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                LINGERIE{' '}
              </Box>
              <Box component="span" sx={{ color: '#ffffff' }}>
                &amp; MORE
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontSize: { xs: 14.5, sm: 16.5 },
                lineHeight: 1.65,
                maxWidth: 500,
                color: '#dfcdd6',
              }}
            >
              Crafted for effortless comfort, confidence, and everyday luxury. Explore breathable essentials, sculpted shapewear, and soft loungewear curated for you.
            </Typography>

            {/* Primary & Secondary Action Buttons */}
            <Box
              sx={{
                mt: 0.5,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', lg: 'flex-start' },
                gap: 1.5,
              }}
            >
              <PillButton href="/products" radius={2}>
                Explore Collection
              </PillButton>

              <Box
                component="a"
                href={`https://wa.me/${cleanWa}?text=${generalWaText}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 2.75,
                  py: 1.2,
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(255, 46, 147, 0.16)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Enquire on WhatsApp
              </Box>
            </Box>

            {/* Bottom Boutique Metrics / Trust Strip */}
            <Box
              sx={{
                mt: 1.25,
                pt: 2,
                width: '100%',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 1.5,
                maxWidth: 480,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 800, color: '#ffffff' }}>
                  6+
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: '#b8a2ae' }}>
                  Curated Categories
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 800, color: 'primary.main' }}>
                  2 Stores
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: '#b8a2ae' }}>
                  Cherthala &amp; Alappuzha
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 800, color: '#ffffff' }}>
                  100%
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: '#b8a2ae' }}>
                  Comfort &amp; Fit Focus
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* RIGHT LUXURY SHOWCASE FRAME */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: { xs: 460, lg: '100%' },
              mx: 'auto',
            }}
          >
            {/* Outer Glow Frame */}
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                p: 1,
                background:
                  'linear-gradient(145deg, rgba(255, 92, 176, 0.45) 0%, rgba(255, 46, 147, 0.1) 50%, rgba(255, 255, 255, 0.12) 100%)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 3.25,
                  overflow: 'hidden',
                  height: { xs: 320, sm: 380, md: 420 },
                  bgcolor: '#1b1118',
                }}
              >
                <Box
                  component="img"
                  src={heroBg}
                  alt="Fluffy Bloom Innerwear & Lingerie"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 18%',
                    display: 'block',
                  }}
                />

                {/* Subtle Bottom Vignette */}
                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(14, 9, 13, 0.04) 45%, rgba(12, 7, 11, 0.85) 100%)',
                  }}
                />

                {/* Frosted Glass Floating Boutique Card */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 14,
                    right: 14,
                    bottom: 14,
                    p: 1.75,
                    borderRadius: 2.75,
                    bgcolor: 'rgba(18, 10, 16, 0.74)',
                    backdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: 1.1,
                        textTransform: 'uppercase',
                        color: 'primary.main',
                      }}
                    >
                      New Season Arrivals
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.25,
                      }}
                    >
                      Soft Silk, Cotton &amp; Bridal Essentials
                    </Typography>
                  </Box>

                  <Box
                    component={Link}
                    href="/products"
                    sx={{
                      px: 1.5,
                      py: 0.7,
                      borderRadius: 999,
                      bgcolor: 'primary.main',
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 700,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      '&:hover': { filter: 'brightness(1.08)' },
                    }}
                  >
                    Shop Now →
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* BRAND VALUE HIGHLIGHTS STRIP */}
      <Box component="section" sx={{ ...containerSx, py: { xs: 1.5, md: 2 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {BRAND_HIGHLIGHTS.map((item) => (
            <Box
              key={item.badge}
              sx={{
                p: 2.5,
                borderRadius: 3.5,
                background:
                  'linear-gradient(180deg, rgba(24, 16, 22, 0.94) 0%, rgba(15, 10, 14, 0.98) 100%)',
                border: '1px solid rgba(255, 46, 147, 0.18)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.75,
                transition: 'border-color 0.25s ease, transform 0.25s ease',
                '&:hover': {
                  borderColor: 'rgba(255, 46, 147, 0.48)',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <Box
                sx={{
                  px: 1.15,
                  py: 0.5,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 46, 147, 0.15)',
                  border: '1px solid rgba(255, 46, 147, 0.38)',
                  color: 'primary.main',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  flexShrink: 0,
                  mt: 0.2,
                }}
              >
                {item.badge}
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: 15, fontWeight: 700, color: '#ffffff', mb: 0.4 }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#bfaab5', lineHeight: 1.5 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* SHOP BY CATEGORY */}
      {cats.length > 0 && (
        <Box component="section" sx={{ ...containerSx, py: { xs: 3.5, md: 5 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
              gap: 1,
              mb: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'primary.main',
                  mb: 0.5,
                }}
              >
                Curated Essentials
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 24, md: 30 },
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                }}
              >
                Shop by Category
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 13.5, color: '#b8a4ae' }}>
              Browse styles or enquire directly for size &amp; color options
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(6, 1fr)',
              },
              gap: 2,
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
                    p: 2.25,
                    borderRadius: 3.5,
                    background:
                      'linear-gradient(180deg, rgba(28, 19, 26, 0.96) 0%, rgba(16, 11, 16, 0.99) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1.75,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: 'rgba(255, 46, 147, 0.55)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 36px rgba(255, 46, 147, 0.16)',
                    },
                  }}
                >
                  <Box
                    component={Link}
                    href={`/products?cat=${cat._id}`}
                    sx={{
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 1.25,
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2.5,
                          background:
                            'linear-gradient(135deg, rgba(255, 92, 176, 0.24) 0%, rgba(232, 37, 132, 0.12) 100%)',
                          border: '1px solid rgba(255, 46, 147, 0.45)',
                          color: 'primary.main',
                          fontWeight: 800,
                          fontSize: 15,
                          letterSpacing: 0.6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {getCategoryMonogram(cat.name)}
                      </Box>

                      <Typography
                        component="span"
                        sx={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#d9b8c9',
                        }}
                      >
                        Explore →
                      </Typography>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                      <Typography
                        noWrap
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: '#ffffff',
                          lineHeight: 1.25,
                        }}
                      >
                        {cat.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 11.5,
                          color: '#b8a4ae',
                          lineHeight: 1.4,
                          mt: 0.4,
                        }}
                      >
                        {getCategorySubtitle(cat)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    component="a"
                    href={`https://wa.me/${cleanWa}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 999,
                      bgcolor: 'rgba(255, 46, 147, 0.14)',
                      border: '1px solid rgba(255, 46, 147, 0.4)',
                      color: '#ffd6eb',
                      fontSize: 11,
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        borderColor: 'primary.main',
                        color: '#ffffff',
                      },
                    }}
                  >
                    Enquire on WhatsApp
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* FEATURED COLLECTION */}
      {featuredFour.length > 0 && (
        <Box component="section" sx={{ ...containerSx, py: { xs: 3.5, md: 5 } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: 3,
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'primary.main',
                  mb: 0.5,
                }}
              >
                Popular Picks
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 24, md: 30 },
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                }}
              >
                Featured Collection
              </Typography>
            </Box>

            <Typography
              component={Link}
              href="/products"
              sx={{
                color: 'primary.main',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View All Products →
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
              <ProductCard
                key={String(item._id)}
                p={item}
                wa={s?.whatsapp}
                showDescription
              />
            ))}
          </Box>
        </Box>
      )}

      {/* BOUTIQUE VISIT & WHATSAPP CONCIERGE BANNER */}
      <Box component="section" sx={{ ...containerSx, pt: { xs: 3, md: 4.5 } }}>
        <Box
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 4,
            background:
              'linear-gradient(135deg, rgba(255, 46, 147, 0.18) 0%, rgba(20, 12, 19, 0.96) 55%, rgba(14, 9, 13, 1) 100%)',
            border: '1px solid rgba(255, 46, 147, 0.36)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Typography
              sx={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                color: 'primary.main',
                mb: 0.75,
              }}
            >
              Visit Our Boutiques • Cherthala &amp; Alappuzha
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 22, md: 28 },
                fontWeight: 800,
                color: '#ffffff',
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              Looking for a specific fit, size, or bridal collection?
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#d8c5cf', lineHeight: 1.6 }}>
              Drop by our showrooms in <strong>Cherthala</strong> or{' '}
              <strong>Alappuzha</strong>, or message our team directly on WhatsApp for personalized recommendations.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, flexShrink: 0 }}>
            <PillButton
              href={`https://wa.me/${cleanWa}?text=${generalWaText}`}
              radius={2}
            >
              Message on WhatsApp
            </PillButton>

            <Box
              component={Link}
              href="/contact"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2.5,
                py: 1.15,
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.24)',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(255, 46, 147, 0.14)',
                },
              }}
            >
              Store Locations
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}