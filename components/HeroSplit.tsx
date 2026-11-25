import type { ReactNode } from 'react';
import { Box, Typography } from './ui';
import PillButton from './PillButton';
import { cld } from '@/lib/utils';

type Props = {
  title: string; subtitle?: string; heading: ReactNode; body: string;
  cta: { label: string; href: string }; image?: string; center?: boolean;
};

/** Text on the left, photo fading in from the right. Used by Vision and About. */
export default function HeroSplit({ title, subtitle, heading, body, cta, image, center }: Props) {
  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#121212', minHeight: 440, display: 'flex', alignItems: 'center' }}>
      {image && (
        <Box aria-hidden sx={{
          position: 'absolute', inset: 0, left: { xs: 0, md: '40%' },
          background: `linear-gradient(90deg, #121212 0%, rgba(18,18,18,0.2) 40%, rgba(18,18,18,0) 100%), url(${cld(image, 1400)}) center / cover`,
        }} />
      )}
      <Box sx={{ position: 'relative', px: { xs: 2, md: 8 }, py: 6, maxWidth: { md: '58%' }, textAlign: center ? 'center' : 'left', display: 'grid', gap: 2, justifyItems: center ? 'center' : 'start' }}>
        <Typography component="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 700, color: center ? 'primary.main' : 'text.primary', lineHeight: 1.1 }}>{title}</Typography>
        {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
        <Typography component="h2" sx={{ fontSize: { xs: 24, md: 34 }, fontWeight: 700, lineHeight: 1.2 }}>{heading}</Typography>
        <Typography sx={{ color: '#cfcfcf', maxWidth: 620 }}>{body}</Typography>
        <PillButton href={cta.href} radius={2} size="medium">{cta.label}</PillButton>
      </Box>
    </Box>
  );
}
