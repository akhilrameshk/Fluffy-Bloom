import Link from 'next/link';
import { Box, Typography, PlaceIcon, ArrowForwardIcon } from '@/components/ui';
import PillButton from '@/components/PillButton';
import { getSettings } from '@/lib/data';
import { VISION } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

const VISION_HERO_FALLBACK = '/vision.png';

const containerSx = {
  width: '100%',
  maxWidth: 1360,
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
};

export async function generateMetadata() {
  return pageMeta({ title: 'Our Vision', path: '/vision', description: VISION.body });
}

export default async function Vision() {
  const s = await getSettings();
  const heroBg = s.visionImage || VISION_HERO_FALLBACK;
  const cleanWa = String(s?.whatsapp || '9746636555').replace(/\D/g, '');
  const waText = encodeURIComponent(
    'Hello Fluffy Bloom! I would like to know more about your brand and collections.'
  );

  return (
    <Box sx={{ pb: 10, overflowX: 'hidden' }}>
      {/* LUXURY BOUTIQUE VISION HERO */}
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
              'radial-gradient(circle at 14% 20%, rgba(255, 46, 147, 0.2) 0%, transparent 45%), radial-gradient(circle at 86% 80%, rgba(255, 118, 186, 0.14) 0%, transparent 48%), linear-gradient(135deg, #140b12 0%, #0b060a 55%, #160c14 100%)',
            border: '1px solid rgba(255, 46, 147, 0.32)',
            boxShadow:
              '0 32px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' },
            alignItems: 'center',
            gap: { xs: 3.5, lg: 4 },
            p: { xs: 3, sm: 4.5, md: 6, lg: 6.5 },
          }}
        >
          {/* Decorative Ambient Glow */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: -80,
              right: '35%',
              width: 240,
              height: 240,
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
            {VISION.title && (
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
                    letterSpacing: 1.4,
                    textTransform: 'uppercase',
                    color: '#ffd4ea',
                  }}
                >
                  {VISION.title}
                </Typography>
              </Box>
            )}

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 30, sm: 42, md: 50 },
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #ffffff 0%, #ff70ba 55%, #ff2e93 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {VISION.heading}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14.5, sm: 16.5 },
                lineHeight: 1.65,
                maxWidth: 520,
                color: '#dfcdd6',
              }}
            >
              {VISION.body}
            </Typography>

            {VISION.cta && (
              <Box
                sx={{
                  mt: 0.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  gap: 1.5,
                }}
              >
                <PillButton
                  href={typeof VISION.cta === 'string' ? '/about' : VISION.cta.href || '/about'}
                  icon={<ArrowForwardIcon />}
                  iconAfter
                  radius={2}
                >
                  {typeof VISION.cta === 'string'
                    ? VISION.cta
                    : VISION.cta.label || 'Our Journey & Story'}
                </PillButton>

                <Box
                  component={Link}
                  href="/products"
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
                  Explore Collection
                </Box>
              </Box>
            )}
          </Box>

          {/* RIGHT SHOWCASE FRAME */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: { xs: 460, lg: '100%' },
              mx: 'auto',
            }}
          >
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
                  height: { xs: 300, sm: 360, md: 400 },
                  bgcolor: '#1b1118',
                }}
              >
                <Box
                  component="img"
                  src={heroBg}
                  alt="Fluffy Bloom Vision"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    display: 'block',
                  }}
                />

                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(14, 9, 13, 0.05) 45%, rgba(12, 7, 11, 0.86) 100%)',
                  }}
                />

                {/* Frosted Glass Floating Card */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 14,
                    right: 14,
                    bottom: 14,
                    p: 1.75,
                    borderRadius: 2.75,
                    bgcolor: 'rgba(18, 10, 16, 0.76)',
                    backdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: 1.1,
                      textTransform: 'uppercase',
                      color: 'primary.main',
                    }}
                  >
                    Our Philosophy
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.3,
                      mt: 0.25,
                    }}
                  >
                    Confidence begins with comfort crafted for every woman
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* CORE VALUES SECTION */}
      <Box component="section" sx={{ ...containerSx, py: { xs: 3, md: 4.5 } }}>
        <Box sx={{ mb: 3 }}>
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
            What Guides Us
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
            {VISION.valuesTitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
          }}
        >
          {VISION.values.map((v, index) => (
            <Box
              key={v.title}
              sx={{
                p: 3,
                borderRadius: 3.5,
                background:
                  'linear-gradient(180deg, rgba(28, 19, 26, 0.96) 0%, rgba(16, 11, 16, 0.99) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                transition: 'all 0.25s ease',
                '&:hover': {
                  borderColor: 'rgba(255, 46, 147, 0.55)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 36px rgba(255, 46, 147, 0.15)',
                },
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 46, 147, 0.14)',
                  border: '1px solid rgba(255, 46, 147, 0.4)',
                  color: 'primary.main',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                0{index + 1}
              </Box>

              <Typography
                component="h3"
                sx={{ fontSize: 18, fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}
              >
                {v.title}
              </Typography>

              <Typography sx={{ fontSize: 14, color: '#c7b5bf', lineHeight: 1.65 }}>
                {v.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* EXPANDING ACROSS KERALA */}
      <Box component="section" sx={{ ...containerSx, py: { xs: 3, md: 4.5 } }}>
        <Box sx={{ mb: 3 }}>
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
            Our Presence
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
            {VISION.expandTitle}
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            background:
              'linear-gradient(180deg, rgba(24, 16, 22, 0.95) 0%, rgba(14, 9, 13, 0.99) 100%)',
            border: '1px solid rgba(255, 46, 147, 0.22)',
            display: 'grid',
            gap: 3.5,
            gridTemplateColumns: { xs: '1fr', lg: '1.2fr 2fr' },
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              component="h3"
              sx={{ fontWeight: 800, fontSize: { xs: 20, md: 22 }, color: '#ffffff', mb: 1.25 }}
            >
              {VISION.footprint.title}
            </Typography>
            <Typography sx={{ color: '#cbb8c2', fontSize: 14.5, lineHeight: 1.7 }}>
              {VISION.footprint.text}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {VISION.footprint.chips.map((c) => (
              <Box
                key={c.title}
                sx={{
                  p: 2.25,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  '&:hover': {
                    borderColor: 'rgba(255, 46, 147, 0.45)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.85 }}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 46, 147, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <PlaceIcon color="primary" fontSize="small" />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: '#ffffff' }}>
                    {c.title}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#b8a4ae', fontSize: 13, lineHeight: 1.55 }}>
                  {c.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* PREMIUM COMMITMENT BANNER */}
      <Box component="section" sx={{ ...containerSx, pt: { xs: 2.5, md: 4 } }}>
        <Box
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 4,
            background:
              'linear-gradient(135deg, rgba(255, 46, 147, 0.2) 0%, rgba(20, 12, 19, 0.96) 55%, rgba(14, 9, 13, 1) 100%)',
            border: '1px solid rgba(255, 46, 147, 0.36)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ maxWidth: 660 }}>
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
              Our Promise • Fluffy Bloom
            </Typography>
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: 22, md: 28 },
                fontWeight: 800,
                color: '#ffffff',
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              {VISION.commitment.title}
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: '#dcc9d3', lineHeight: 1.65 }}>
              {VISION.commitment.text}
            </Typography>
          </Box>

          <Box sx={{ flexShrink: 0 }}>
            <PillButton
              href={`https://wa.me/${cleanWa}?text=${waText}`}
              radius={2}
            >
              Connect on WhatsApp
            </PillButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}