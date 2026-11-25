import Link from 'next/link';
import type { ReactNode } from 'react';
import { Box, Typography, ArrowForwardIcon } from './ui';
import { wrap } from '@/lib/utils';

type Props = { title?: string; h1?: boolean; href?: string; pt?: number; children: ReactNode };

/** Page section: centered container, optional heading (h1 for page titles) and a View All link. */
export default function Section({ title, h1, href, pt = 5, children }: Props) {
  return (
    <Box component="section" sx={{ ...wrap, pt }}>
      {title && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2.5 }}>
          <Typography component={h1 ? 'h1' : 'h2'} variant={h1 ? 'h2' : 'h4'} sx={h1 ? { fontSize: { xs: 36, md: 48 } } : undefined}>
            {title}
          </Typography>
          {href && (
            <Typography component={Link} href={href} sx={{ color: 'primary.main', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
              View All <ArrowForwardIcon fontSize="small" />
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Box>
  );
}
