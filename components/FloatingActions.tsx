'use client';

import { useEffect, useState } from 'react';
import { keyframes } from '@mui/system';
import { Box, WhatsAppIcon } from './ui';
import { waLink } from '@/lib/utils';
import type { ISettings } from '@/types';

const beckonCall = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.55), 0 0 14px rgba(255, 59, 154, 0.35);
  }
  20% {
    transform: scale(1.08) rotate(-6deg);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.65), 0 0 22px rgba(255, 59, 154, 0.65);
  }
  40% {
    transform: scale(1.06) rotate(5deg);
  }
  60% {
    transform: scale(1.08) rotate(-3deg);
  }
  80% {
    transform: scale(1.03) rotate(0deg);
  }
`;

const beckonWa = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.55), 0 0 14px rgba(37, 211, 102, 0.35);
  }
  25% {
    transform: scale(1.09);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.65), 0 0 24px rgba(37, 211, 102, 0.72);
  }
  50% {
    transform: scale(1.02);
  }
  75% {
    transform: scale(1.07);
  }
`;

const rippleWave = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.75;
  }
  100% {
    transform: scale(1.55);
    opacity: 0;
  }
`;

function PhoneIconSvg() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ArrowDownIconSvg() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIconSvg() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

export default function FloatingActions({ s }: { s?: Partial<ISettings> | null }) {
  const [isNearBottom, setIsNearBottom] = useState(false);

  const rawPhone = String(s?.whatsapp || '9072177570').trim();
  const digits = rawPhone.replace(/\D/g, '');
  const telHref = `tel:${digits.startsWith('91') && digits.length === 12 ? '+' + digits : digits}`;
  const whatsappHref = waLink(
    rawPhone,
    'Hello Fluffy Bloom! I would like to know more about your collection.'
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight <= windowHeight + 120) {
        setIsNearBottom(false);
        return;
      }
      setIsNearBottom(scrollY + windowHeight >= docHeight - 180);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleScrollToggle = () => {
    if (isNearBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  const baseBtnSx = {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 14, sm: 22 },
        bottom: { xs: 16, sm: 24 },
        zIndex: 1050,
        display: 'flex',
        flexDirection: 'column-reverse', // 1. Arrow (ഏറ്റവും താഴെ), 2. Call, 3. WhatsApp (ഏറ്റവും മുകളിൽ)
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      {/* 1. ഏറ്റവും താഴെ: Scroll Down / Scroll Up Arrow */}
      <Box
        component="button"
        type="button"
        onClick={handleScrollToggle}
        aria-label={isNearBottom ? 'Scroll to top' : 'Scroll to bottom'}
        title={isNearBottom ? 'Go to Top' : 'Go to Bottom'}
        sx={{
          ...baseBtnSx,
          bgcolor: 'primary.main',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 22px rgba(0, 0, 0, 0.55)',
          '&:hover': {
            transform: 'translateY(-3px)',
            filter: 'brightness(1.08)',
          },
        }}
      >
        {isNearBottom ? <ArrowUpIconSvg /> : <ArrowDownIconSvg />}
      </Box>

      {/* 2. ആരോയ്ക്ക് മുകളിൽ: Call Icon (Attractive Beckon + Ripple) */}
      <Box
        component="a"
        href={telHref}
        aria-label="Call Fluffy Bloom"
        title="Call Now"
        sx={{
          ...baseBtnSx,
          bgcolor: '#1b1018',
          color: '#ff4da6',
          border: '1.5px solid rgba(255, 59, 154, 0.8)',
          animation: `${beckonCall} 2.2s ease-in-out infinite`,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(255, 59, 154, 0.65)',
            animation: `${rippleWave} 2.2s ease-out infinite`,
            pointerEvents: 'none',
          },
          '&:hover': {
            animation: 'none',
            transform: 'scale(1.12)',
            bgcolor: '#ff2e93',
            color: '#ffffff',
            '&::after': {
              display: 'none',
            },
          },
        }}
      >
        <PhoneIconSvg />
      </Box>

      {/* 3. മൂന്നാമതായി (ഏറ്റവും മുകളിൽ): WhatsApp Icon (Attractive Beckon + Ripple) */}
      <Box
        component="a"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        sx={{
          ...baseBtnSx,
          bgcolor: '#25D366',
          color: '#ffffff',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          animation: `${beckonWa} 2.2s ease-in-out 0.55s infinite`,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(37, 211, 102, 0.7)',
            animation: `${rippleWave} 2.2s ease-out 0.55s infinite`,
            pointerEvents: 'none',
          },
          '&:hover': {
            animation: 'none',
            transform: 'scale(1.12)',
            bgcolor: '#1ebe5a',
            '&::after': {
              display: 'none',
            },
          },
        }}
      >
        <WhatsAppIcon />
      </Box>
    </Box>
  );
}