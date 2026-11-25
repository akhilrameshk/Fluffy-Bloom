'use client';

import Link from 'next/link';
import { Box } from '@/components/ui';

export default function Logo() {
  return (
    <Box
      component={Link}
      href="/"
      aria-label="Fluffy Bloom home"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src="/logo-horizontal.png"
        alt="Fluffy Bloom"
        sx={{
          height: { xs: 36, sm: 44 },
          width: 'auto',
          maxWidth: { xs: 160, sm: 210 },
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </Box>
  );
}