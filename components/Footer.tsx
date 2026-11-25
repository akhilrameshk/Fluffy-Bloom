import Link from 'next/link';
import type { ReactNode } from 'react';
import { Box, Typography, WhatsAppIcon, InstagramIcon, FacebookIcon } from './ui';
import { NAV } from '@/lib/site';
import { getBranches, waLink } from '@/lib/utils';
import type { ISettings } from '@/types';

const DEFAULT_BRANCHES = [
  {
    name: 'Cherthala',
    address:
      'Opp: Karthyayani Devi Temple, Municipal Shopping Complex, CMC 11, Cherthala (PO), Alappuzha, Kerala, PIN 688524',
  },
  {
    name: 'Thiruvampady',
    address:
      'Building no 27/43C, Thiruvampady Junction, Near Muthoot Fin corp, Opposite Utkarsh Small Finance Bank, Pazhaveed PO, Alappuzha 688 009',
  },
];

const smallTextSx = {
  color: '#bfb0b8',
  fontSize: 13.5,
  lineHeight: 1.75,
};

const headingSx = {
  fontWeight: 700,
  fontSize: 15,
  color: '#ffffff',
  letterSpacing: 0.3,
  mb: 1.25,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    display: 'block',
    width: 24,
    height: 2,
    borderRadius: 999,
    bgcolor: 'primary.main',
    mt: 0.5,
  },
};

function Column({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography component="h2" sx={headingSx}>
        {title}
      </Typography>
      <Box sx={{ display: 'grid', gap: 0.75 }}>{children}</Box>
    </Box>
  );
}

export default function Footer({ s }: { s: ISettings }) {
  const waNumber = s?.whatsapp || '9746636555';
  const socials = [
    { label: 'Instagram', href: s?.instagram, icon: <InstagramIcon fontSize="small" /> },
    { label: 'Facebook', href: s?.facebook, icon: <FacebookIcon fontSize="small" /> },
    { label: 'WhatsApp', href: waLink(waNumber), icon: <WhatsAppIcon fontSize="small" /> },
  ].filter((x) => Boolean(x.href));

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
    <Box
      component="footer"
      sx={{
        mt: 8,
        bgcolor: '#0b070a',
        borderTop: '1px solid rgba(255, 46, 147, 0.2)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1360,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 5, md: 6 },
          pb: 3.5,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3.5, md: 4 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: '1.1fr 2.1fr 1.15fr 0.95fr',
            },
            alignItems: 'start',
          }}
        >
          {/* Brand Column */}
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography
              component={Link}
              href="/"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                fontSize: 21,
                letterSpacing: 1.1,
                textDecoration: 'none',
                lineHeight: 1.1,
                textTransform: 'uppercase',
              }}
            >
              FLUFFY BLOOM
            </Typography>
            <Typography
              sx={{ ...smallTextSx, fontSize: 11, letterSpacing: 1.1, color: '#a895a0' }}
            >
              INNERWEAR • LINGERIE • MORE...
            </Typography>
            <Typography sx={{ ...smallTextSx, mt: 0.5 }}>
              Ladies Innerwears, Newborn &amp; Maternity Wears across Cherthala &amp; Alappuzha.
            </Typography>
          </Box>

          {/* Locations Column: 2-Column Side-by-Side Branches */}
          <Column title="Our Locations">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 2,
              }}
            >
              {branches.map((b) => (
                <Box key={b.name}>
                  <Typography sx={{ ...smallTextSx, color: '#ffffff', fontWeight: 700, mb: 0.25 }}>
                    {b.name} Branch
                  </Typography>
                  <Typography sx={{ ...smallTextSx, fontSize: 12.5, lineHeight: 1.65 }}>
                    {b.address}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ ...smallTextSx, mt: 0.75, fontSize: 13 }}>
              <Box component="span" sx={{ color: '#ffffff', fontWeight: 600 }}>
                Ph:
              </Box>{' '}
              +91 97466 36555 / +91 81297 84499
            </Typography>
          </Column>

          {/* Navigation Column: 2-Column Links */}
          <Column title="Navigation & Links">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: 2,
                rowGap: 0.5,
              }}
            >
              {NAV.map((n) => (
                <Typography
                  key={n.href}
                  component={Link}
                  href={n.href}
                  sx={{
                    ...smallTextSx,
                    textDecoration: 'none',
                    transition: 'color 0.2s, transform 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(2px)',
                    },
                  }}
                >
                  {n.label}
                </Typography>
              ))}
            </Box>
          </Column>

          {/* Socials Column */}
          <Box
            sx={{
              display: 'grid',
              gap: 1.25,
              justifyItems: { xs: 'start', lg: 'end' },
            }}
          >
            <Typography component="h2" sx={headingSx}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.25 }}>
              {socials.map((x) => (
                <Box
                  key={x.label}
                  component="a"
                  href={x.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={x.label}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(232, 51, 143, 0.14)',
                    border: '1px solid rgba(232, 51, 143, 0.35)',
                    color: 'primary.main',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: '#ffffff',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {x.icon}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Bottom Copyright Bar */}
        <Box
          sx={{
            mt: 4,
            pt: 2.5,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1,
          }}
        >
          <Typography sx={{ ...smallTextSx, fontSize: 12.5, color: '#9c8994' }}>
            © {new Date().getFullYear()} Fluffy Bloom Family. All Rights Reserved.
          </Typography>
          <Typography sx={{ ...smallTextSx, fontSize: 12.5, color: '#9c8994' }}>
            Cherthala &amp; Alappuzha • Kerala
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}