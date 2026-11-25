import { Box, Paper, Typography, PlaceIcon, ArrowForwardIcon } from '@/components/ui';
import PillButton from '@/components/PillButton';
import Section from '@/components/Section';
import InfoCard from '@/components/InfoCard';
import { getSettings } from '@/lib/data';
import { VISION } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

// Save your Vision banner image in /public/vision-banner.jpg (used until uploaded in Admin > Settings)
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

const grid3 = { display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } };

export default async function Vision() {
  const s = await getSettings();
  const heroBg = s.visionImage || VISION_HERO_FALLBACK;

  return (
    <>
      {/* FULL-WIDTH VISION HERO BANNER (Matching Home Hero Style) */}
      <Box component="section" sx={{ ...containerSx, pt: { xs: 2.5, md: 3.5 }, pb: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            minHeight: { xs: 380, md: 440 },
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#130d12',
            border: '1px solid rgba(255, 46, 147, 0.3)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.85)',
            backgroundImage: `
              linear-gradient(
                90deg,
                #0e090d 0%,
                rgba(14, 9, 13, 0.94) 44%,
                rgba(24, 12, 20, 0.58) 74%,
                rgba(255, 46, 147, 0.14) 100%
              ),
              url("${encodeURI(heroBg)}")
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: { xs: '100%', md: 680 },
              p: { xs: 3.5, sm: 5.5, md: 7 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              gap: 2,
            }}
          >
            {VISION.title && (
              <Typography
                sx={{
                  letterSpacing: 3,
                  fontSize: 13,
                  color: 'primary.main',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {VISION.title}
              </Typography>
            )}

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 30, sm: 40, md: 48 },
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              <Box component="span" sx={{ color: 'primary.main' }}>
                {VISION.heading}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 15, sm: 16.5 },
                lineHeight: 1.65,
                maxWidth: 520,
                color: '#e6d5de',
              }}
            >
              {VISION.body}
            </Typography>

            {VISION.cta && (
              <Box sx={{ mt: 1 }}>
                <PillButton
                  href={typeof VISION.cta === 'string' ? '/about' : VISION.cta.href || '/about'}
                  icon={<ArrowForwardIcon />}
                  iconAfter
                  radius={2}
                >
                  {typeof VISION.cta === 'string' ? VISION.cta : VISION.cta.label || 'Our Journey & Story'}
                </PillButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* VALUES SECTION */}
      <Section title={VISION.valuesTitle}>
        <Box sx={grid3}>{VISION.values.map((v) => <InfoCard key={v.title} {...v} />)}</Box>
      </Section>

      {/* EXPANDING ACROSS KERALA */}
      <Section title={VISION.expandTitle}>
        <Paper sx={{ p: 3, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1.4fr 2fr' }, alignItems: 'center' }}>
          <Box>
            <Typography component="h3" sx={{ fontWeight: 600, fontSize: 20, mb: 1 }}>{VISION.footprint.title}</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.7 }}>{VISION.footprint.text}</Typography>
          </Box>
          <Box sx={grid3}>
            {VISION.footprint.chips.map((c) => (
              <Paper key={c.title} sx={{ p: 2, borderRadius: 2, bgcolor: '#1a1a1a' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 14, display: 'flex', gap: 0.5 }}><PlaceIcon color="primary" fontSize="small" />{c.title}</Typography>
                <Typography color="text.secondary" fontSize={13} sx={{ mt: 0.5 }}>{c.text}</Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Section>

      {/* COMMITMENT CALLOUT */}
      <Section>
        <Paper sx={{ p: 3, borderColor: 'primary.main', bgcolor: '#2a0f1f' }}>
          <Typography component="h3" sx={{ fontWeight: 600, fontSize: 20 }}>{VISION.commitment.title}</Typography>
          <Typography sx={{ color: '#e6d3dd', mt: 0.5 }}>{VISION.commitment.text}</Typography>
        </Paper>
      </Section>
    </>
  );
}