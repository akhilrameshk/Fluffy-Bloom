import { Box, Typography, PlaceIcon, WhatsAppIcon } from '@/components/ui';
import InquiryForm from '@/components/InquiryForm';
import { getSettings } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { getBranches, waLink } from '@/lib/utils';

const DEFAULT_BRANCHES = [
  {
    name: 'Cherthala',
    address:
      'Opp: Karthyayani Devi Temple, Municipal Shopping Complex, CMC 11, Cherthala (PO), Alappuzha, Kerala, PIN 688524',
  },
  {
    name: 'Alappuzha',
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
    title: 'Contact Us',
    path: '/contact',
    description:
      'Contact Fluffy Bloom on WhatsApp or phone. Boutiques in Cherthala and Alappuzha.',
  });
}

export default async function Contact() {
  const s = await getSettings();
  const rawBranches = getBranches(s);

  const branches =
    Array.isArray(rawBranches) && rawBranches.length > 0
      ? rawBranches.map((b, idx) => ({
          name: idx === 0 ? 'Cherthala' : 'Alappuzha',
          address:
            b.address && b.address.trim().toLowerCase() !== 'alappuzha'
              ? b.address
              : DEFAULT_BRANCHES[idx]?.address || 'Alappuzha, Kerala',
        }))
      : DEFAULT_BRANCHES;

  const waNumber = s?.whatsapp || '9746636555';
  const cleanDigits = String(waNumber).replace(/\D/g, '');
  const telHref = `tel:${
    cleanDigits.startsWith('91') && cleanDigits.length === 12
      ? '+' + cleanDigits
      : cleanDigits
  }`;
  const whatsappHref = waLink(
    waNumber,
    'Hello Fluffy Bloom! I would like to know more about your collections.'
  );

  return (
    <Box sx={{ pb: 7, overflowX: 'hidden' }}>
      <Box component="section" sx={{ ...containerSx, pt: { xs: 2, md: 3 } }}>
        {/* SINGLE UNIFIED LUXURY BOUTIQUE CARD */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: 4, md: 5 },
            overflow: 'hidden',
            p: { xs: 2.25, sm: 3.5, md: 4 },
            background:
              'radial-gradient(circle at 12% 18%, rgba(255, 46, 147, 0.2) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(255, 118, 186, 0.14) 0%, transparent 48%), linear-gradient(135deg, #140b12 0%, #0b060a 55%, #160c14 100%)',
            border: '1px solid rgba(255, 46, 147, 0.34)',
            boxShadow:
              '0 32px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gap: 2.25,
          }}
        >
          {/* Top Header Strip with Highlighted Timing Badge */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1.5,
              pb: 1.75,
              borderBottom: '1px solid rgba(255, 255, 255, 0.09)',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: 1.4,
                  textTransform: 'uppercase',
                  color: 'primary.main',
                  mb: 0.2,
                }}
              >
                Cherthala &amp; Alappuzha
              </Typography>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 28, sm: 36, md: 42 },
                  fontWeight: 800,
                  lineHeight: 1.08,
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #ffffff 0%, #ff70ba 65%, #ff2e93 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Contact Us
              </Typography>
            </Box>

            <Box
              sx={{
                px: 1.75,
                py: 0.85,
                borderRadius: 2.5,
                bgcolor: 'rgba(255, 46, 147, 0.14)',
                border: '1px solid rgba(255, 46, 147, 0.42)',
                boxShadow: '0 8px 24px rgba(255, 46, 147, 0.16)',
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: 'primary.main',
                  lineHeight: 1.2,
                }}
              >
                Store Timings
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: '#ffffff',
                  fontWeight: 700,
                  mt: 0.25,
                  lineHeight: 1.25,
                }}
              >
                Open Daily • 10:00 AM – 8:30 PM
              </Typography>
            </Box>
          </Box>

          {/* Main Two-Column Grid */}
          <Box
            sx={{
              display: 'grid',
              gap: 2.25,
              gridTemplateColumns: { xs: '1fr', lg: '1.15fr 1fr' },
              alignItems: 'stretch',
            }}
          >
            {/* LEFT COLUMN: Cherthala, Alappuzha, Boutique Sentence & Left Helpline/WhatsApp Card */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1.5,
                height: '100%',
              }}
            >
              <Box sx={{ display: 'grid', gap: 1.5 }}>
                {/* 1. Cherthala Branch */}
                <Box
                  sx={{
                    p: 1.9,
                    mb: 3.3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 46, 147, 0.22)',
                    transition: 'border-color 0.2s ease',
                    '&:hover': { borderColor: 'rgba(255, 46, 147, 0.5)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.65, mb: 0.5 }}>
                    <PlaceIcon color="primary" fontSize="small" />
                    <Typography component="h2" sx={{ fontSize: 16.5, fontWeight: 700, color: '#ffffff' }}>
                      {branches[0]?.name || 'Cherthala'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: '#d2c2cb',
                      lineHeight: 1.9,
                      letterSpacing: 0.7,
                    }}
                  >
                    {branches[0]?.address}
                  </Typography>
                </Box>

                {/* 2. Alappuzha Branch */}
                <Box
                  sx={{
                    p: 1.9,
                    mb: 3.3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 46, 147, 0.22)',
                    transition: 'border-color 0.2s ease',
                    '&:hover': { borderColor: 'rgba(255, 46, 147, 0.5)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.65, mb: 0.5 }}>
                    <PlaceIcon color="primary" fontSize="small" />
                    <Typography component="h2" sx={{ fontSize: 16.5, fontWeight: 700, color: '#ffffff' }}>
                      {branches[1]?.name || 'Alappuzha'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: '#d2c2cb',
                      lineHeight: 1.9,
                      letterSpacing: 0.7,
                    }}
                  >
                    {branches[1]?.address}
                  </Typography>
                </Box>

                {/* 3. Boutique Sentence Box */}
                <Box
                  sx={{
                    p: 1.85,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.025)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: '#d2c2cb',
                      lineHeight: 1.9,
                      letterSpacing: 0.7,
                    }}
                  >
                    Crafted for everyday comfort and confidence — visit our Cherthala and Alappuzha boutiques for personalized fit guidance across innerwear, newborn, and maternity collections.
                  </Typography>
                </Box>
              </Box>

              {/* 4. Left Card: Dial & Helpline + WhatsApp */}
              <Box
                sx={{
                  p: 1.9,
                  borderRadius: 3,
                  background:
                    'linear-gradient(135deg, rgba(255, 46, 147, 0.14) 0%, rgba(20, 12, 19, 0.9) 100%)',
                  border: '1px solid rgba(255, 46, 147, 0.32)',
                  display: 'grid',
                  gap: 0.55,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: 1.3,
                    textTransform: 'uppercase',
                    color: 'primary.main',
                  }}
                >
                  Dial &amp; Helpline
                </Typography>

                <Box
                  component="a"
                  href={telHref}
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#ffffff',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  +91 97466 36555 / +91 81297 84499
                </Box>

                <Box
                  component="a"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.7,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#6ef29f',
                    textDecoration: 'none',
                    mt: 0.15,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  <WhatsAppIcon fontSize="small" />
                  <span>WhatsApp: +91 {waNumber}</span>
                </Box>
              </Box>
            </Box>

            {/* RIGHT COLUMN: Inquiry Form */}
            <Box
              sx={{
                p: { xs: 1.75, sm: 2.25 },
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 46, 147, 0.24)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <InquiryForm
                whatsapp={s.whatsapp}
                email={s.email}
                branches={branches.map((b) => b.name)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}