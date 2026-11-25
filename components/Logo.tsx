'use client';

import Link from 'next/link';
import { Box, Typography } from '@/components/ui';

/**
 * Renders the FB monogram + single-line "FLUFFY BLOOM" brand mark.
 * If you place an exported logo at /public/logo.svg or /public/logo.png, you can use <img> instead.
 */
export default function Logo() {
  return (
    <Box
      component={Link}
      href="/"
      aria-label="Fluffy Bloom home"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Stylized FB Monogram SVG */}
      <Box
        component="svg"
        viewBox="0 0 48 48"
        sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 }, flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fbPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5cb0" />
            <stop offset="100%" stopColor="#e82584" />
          </linearGradient>
        </defs>

        {/* Outer graceful flourish */}
        <path
          d="M25 6C15 6 9 13 9 21c0 6 4 10 10 10h12c5 0 8-3 8-7.5C39 18.5 35 15.5 29.5 15.5H16"
          fill="none"
          stroke="url(#fbPinkGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* White F vertical stem & crossbars */}
        <path
          d="M21 8v32M13 21h16M15 40h11"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pink B curves */}
        <path
          d="M21 20h10.5c4.4 0 7.5 2.6 7.5 6.2 0 3.2-2.2 5.4-5.4 6 4 .6 6.4 3 6.4 6.6 0 4.3-3.5 7.2-8.6 7.2H21"
          fill="none"
          stroke="url(#fbPinkGrad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>

      {/* Brand Title & Sub-tagline */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography
          component="span"
          sx={{
            color: 'primary.main',
            fontWeight: 800,
            fontSize: { xs: 17, sm: 21 },
            lineHeight: 1.05,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          FLUFFY BLOOM
        </Typography>
        <Typography
          component="span"
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: '#cbb6c1',
            fontWeight: 600,
            fontSize: 8,
            lineHeight: 1.2,
            letterSpacing: 1.25,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            mt: 0.3,
          }}
        >
          INNERWEAR • LINGERIE • MORE...
        </Typography>
      </Box>
    </Box>
  );
}