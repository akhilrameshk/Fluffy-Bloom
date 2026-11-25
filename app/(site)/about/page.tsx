import Link from 'next/link';
import { Box, Typography, PlaceIcon, ArrowForwardIcon } from '@/components/ui';
import PillButton from '@/components/PillButton';
import { getSettings } from '@/lib/data';
import { ABOUT } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { getBranches } from '@/lib/utils';

const ABOUT_HERO_FALLBACK = '/aboutus.png';

const DEFAULT_BRANCHES = [
  {
    name: 'Cherthala Branch',
    address:
      'Opp: Karthyayani Devi Temple, Municipal Shopping Complex, CMC 11, Cherthala (PO), Alappuzha, Kerala, PIN 688524',
  },
  {
    name: 'Thiruvampady Branch',
    address:
      'Building no 27/43C, Thiruvampady Junction, Near Muthoot Fin corp, Opposite Utkarsh Small Finance Bank, Pazhaveed PO, Alappuzha 688 009',
  },
];

const containerSx = {
  width: '100%',
  maxWidth: 1360,
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
};

export async function generateMetadata() {
  return pageMeta({
    title: 'About Us',
    path: '/about',
    description:
      'Fluffy Bloom is a ladies innerwear and lingerie shop in Cherthala, Alappuzha, now with a second branch in Thiruvampadi.',
  });
}

export default async function About() {
  const s = await getSettings();
  const heroBg = s.aboutImage || ABOUT_HERO_FALLBACK;
  const cleanWa = String(s?.whatsapp || '9746636555').replace(/\D/g, '');
  const waText = encodeURIComponent(
    'Hello Fluffy Bloom! I would like to know more about your stores and collections.'
  );

  const milestones = ABOUT.milestones.map((m, i) =>
    i === 0 && s.foundedYear ? { ...m, title: `${s.foundedYear} - ${m.title}` } : m
  );

  const rawBranches = getBranches(s);
  const branches =
    Array.isArray(rawBranches) && rawBranches.length > 0
      ? rawBranches.map((b, idx) => ({
          name: b.name || DEFAULT_BRANCHES[idx]?.name || `Branch ${idx + 1}`,
          address:
            b.address && b.address.trim().toLowerCase() !== 'alappuzha'
              ? b.address
              : DEFAULT_BRANCHES[idx]?.address || 'Alappuzha, Kerala',
        }))
      : DEFAULT_BRANCHES;

  return (
    <Box sx={{ pb: 10, overflowX: 'hidden' }}>
      {/* LUXURY BOUTIQUE ABOUT HERO */}
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
              gap: 2,
            }}
          >
            {ABOUT.title && (
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
                  {ABOUT.title}
                </Typography>
              </Box>
            )}

            {ABOUT.subtitle && (
              <Typography
                sx={{
                  fontSize: { xs: 13.5, sm: 14.5 },
                  color: '#d9c6d0',
                  fontWeight: 600,
                  letterSpacing: 0.4,
                }}
              >
                {ABOUT.subtitle}
              </Typography>
            )}

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 30, sm: 42, md: 50 },
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: 0.3,
                color: '#ffffff',
              }}
            >
              {ABOUT.heading}
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background: 'linear-gradient(90deg, #ff70ba 0%, #ff2e93 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {ABOUT.headingAccent}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14.5, sm: 16.5 },
                lineHeight: 1.65,
                maxWidth: 530,
                color: '#dfcdd6',
              }}
            >
              {ABOUT.body}
            </Typography>

            {ABOUT.cta && (
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
                  href={typeof ABOUT.cta === 'string' ? '/products' : ABOUT.cta.href || '/products'}
                  icon={<ArrowForwardIcon />}
                  iconAfter
                  radius={2}
                >
                  {typeof ABOUT.cta === 'string'
                    ? ABOUT.cta
                    : ABOUT.cta.label || 'Explore Collection'}
                </PillButton>

                <Box
                  component={Link}
                  href="/contact"
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
                  Visit Our Stores
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
                  height: { xs: 300, sm: 360, md: 410 },
                  bgcolor: '#1b1118',
                }}
              >
                <Box
                  component="img"
                  src={heroBg}
                  alt="About Fluffy Bloom Boutique"
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
                    Our Story • Alappuzha
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
                    Trusted destination for Ladies Innerwears, Newborn &amp; Maternity Wears
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* MILESTONES & JOURNEY */}
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
            Our Growth
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
            {ABOUT.milestonesTitle}
          </Typography>
          {ABOUT.milestonesSub && (
            <Typography sx={{ color: '#b8a4ae', fontSize: 14, mt: 0.75 }}>
              {ABOUT.milestonesSub}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {milestones.map((m, idx) => (
            <Box
              key={m.title}
              sx={{
                p: 3,
                borderRadius: 3.5,
                background:
                  'linear-gradient(180deg, rgba(28, 19, 26, 0.96) 0%, rgba(16, 11, 16, 0.99) 100%)',
                border: '1px solid rgba(255, 46, 147, 0.24)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
                transition: 'all 0.25s ease',
                '&:hover': {
                  borderColor: 'rgba(255, 46, 147, 0.58)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 36px rgba(255, 46, 147, 0.15)',
                },
              }}
            >
              <Box
                sx={{
                  px: 1.25,
                  py: 0.45,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 46, 147, 0.15)',
                  border: '1px solid rgba(255, 46, 147, 0.38)',
                  color: 'primary.main',
                  fontSize: 11.5,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  alignSelf: 'flex-start',
                }}
              >
                STEP 0{idx + 1}
              </Box>

              <Typography
                component="h3"
                sx={{ fontSize: 18, fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}
              >
                {m.title}
              </Typography>

              <Typography sx={{ fontSize: 14, color: '#c7b5bf', lineHeight: 1.65 }}>
                {m.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* WHAT DRIVES US & OUR BRANCHES */}
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
            Why Choose Us
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
            {ABOUT.drivesTitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: '1fr', lg: '1.85fr 1.15fr' },
            alignItems: 'stretch',
          }}
        >
          {/* Drives Grid */}
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            }}
          >
            {ABOUT.drives.map((d, idx) => (
              <Box
                key={d.title}
                sx={{
                  p: 2.75,
                  borderRadius: 3.5,
                  background:
                    'linear-gradient(180deg, rgba(24, 16, 22, 0.95) 0%, rgba(14, 9, 13, 0.99) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    borderColor: 'rgba(255, 46, 147, 0.45)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 46, 147, 0.14)',
                    border: '1px solid rgba(255, 46, 147, 0.35)',
                    color: 'primary.main',
                    fontSize: 12.5,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  0{idx + 1}
                </Box>

                <Typography
                  component="h3"
                  sx={{ fontSize: 16.5, fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}
                >
                  {d.title}
                </Typography>

                <Typography sx={{ fontSize: 13.5, color: '#bfb0b8', lineHeight: 1.6 }}>
                  {d.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Luxury Branches Card */}
          <Box
            sx={{
              p: 3,
              borderRadius: 3.5,
              background:
                'linear-gradient(145deg, rgba(255, 46, 147, 0.16) 0%, rgba(20, 12, 19, 0.97) 55%, rgba(14, 9, 13, 1) 100%)',
              border: '1px solid rgba(255, 46, 147, 0.38)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.3,
                    textTransform: 'uppercase',
                    color: 'primary.main',
                  }}
                >
                  Showrooms
                </Typography>
                <Typography
                  component="h3"
                  sx={{ color: '#ffffff', fontWeight: 800, fontSize: 20, mt: 0.25 }}
                >
                  Our Branches
                </Typography>
              </Box>

              {branches.map((b) => (
                <Box
                  key={b.name}
                  sx={{
                    p: 1.75,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      mb: 0.5,
                    }}
                  >
                    <PlaceIcon color="primary" fontSize="small" />
                    {b.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#cbb8c2', lineHeight: 1.6 }}>
                    {b.address}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                pt: 1.5,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}
            >
              <Typography sx={{ fontSize: 13, color: '#e2d2da', fontWeight: 600 }}>
                Ph: +91 97466 36555 / +91 81297 84499
                {s.email ? ` • ${s.email}` : ''}
              </Typography>

              <Box
                component="a"
                href={`https://wa.me/${cleanWa}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  '&:hover': { filter: 'brightness(1.08)' },
                }}
              >
                Chat with Our Team on WhatsApp
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}