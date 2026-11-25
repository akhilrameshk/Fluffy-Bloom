import { Box, Paper, Typography, ArrowForwardIcon } from '@/components/ui';
import PillButton from '@/components/PillButton';
import Section from '@/components/Section';
import InfoCard from '@/components/InfoCard';
import BranchCard from '@/components/BranchCard';
import { getSettings } from '@/lib/data';
import { ABOUT } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { getBranches } from '@/lib/utils';

// Uses /public/aboutus.png by default until overridden in Admin > Settings > About banner
const ABOUT_HERO_FALLBACK = '/aboutus.png';

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
  const milestones = ABOUT.milestones.map((m, i) =>
    i === 0 && s.foundedYear ? { ...m, title: `${s.foundedYear} - ${m.title}` } : m
  );

  return (
    <>
      {/* FULL-WIDTH ABOUT US HERO BANNER */}
      <Box component="section" sx={{ ...containerSx, pt: { xs: 2.5, md: 3.5 }, pb: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            minHeight: { xs: 400, md: 460 },
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
              maxWidth: { xs: '100%', md: 700 },
              p: { xs: 3.5, sm: 5.5, md: 7 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              gap: 1.75,
            }}
          >
            {ABOUT.title && (
              <Typography
                sx={{
                  letterSpacing: 3,
                  fontSize: 13,
                  color: 'primary.main',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {ABOUT.title}
              </Typography>
            )}

            {ABOUT.subtitle && (
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 15 },
                  color: '#d9c6d0',
                  fontWeight: 500,
                }}
              >
                {ABOUT.subtitle}
              </Typography>
            )}

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 30, sm: 40, md: 48 },
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: 0.3,
                color: '#ffffff',
              }}
            >
              {ABOUT.heading}
              <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
                {ABOUT.headingAccent}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 15, sm: 16.5 },
                lineHeight: 1.65,
                maxWidth: 530,
                color: '#e6d5de',
              }}
            >
              {ABOUT.body}
            </Typography>

            {ABOUT.cta && (
              <Box sx={{ mt: 1 }}>
                <PillButton
                  href={typeof ABOUT.cta === 'string' ? '/products' : ABOUT.cta.href || '/products'}
                  icon={<ArrowForwardIcon />}
                  iconAfter
                  radius={2}
                >
                  {typeof ABOUT.cta === 'string' ? ABOUT.cta : ABOUT.cta.label || 'Explore Our Journey'}
                </PillButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* MILESTONES & JOURNEY */}
      <Section title={ABOUT.milestonesTitle}>
        <Typography color="text.secondary" sx={{ mt: -2, mb: 2.5 }}>
          {ABOUT.milestonesSub}
        </Typography>
        <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {milestones.map((m) => (
            <InfoCard key={m.title} {...m} accent />
          ))}
        </Box>
      </Section>

      {/* WHAT DRIVES US & OUR BRANCHES */}
      <Section title={ABOUT.drivesTitle}>
        <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
          <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
            {ABOUT.drives.map((d) => (
              <InfoCard key={d.title} {...d} />
            ))}
          </Box>
          <Paper sx={{ p: 3, borderColor: 'primary.main', display: 'grid', gap: 2, alignContent: 'start' }}>
            <Typography component="h3" sx={{ color: 'primary.main', fontWeight: 700, fontSize: 20 }}>
              OUR BRANCHES
            </Typography>
            {getBranches(s).map((b) => (
              <BranchCard key={b.name} b={b} />
            ))}
            <Typography fontSize={14}>
              Contact: +91 {s.whatsapp}
              {s.email ? ` | ${s.email}` : ''}
            </Typography>
          </Paper>
        </Box>
      </Section>
    </>
  );
}