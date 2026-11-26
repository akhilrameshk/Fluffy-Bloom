'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Paper, Typography, WhatsAppIcon } from './ui';
import ProductImage from './ProductImage';
import InquiryModal from './InquiryModal';
import { inr, productPath } from '@/lib/utils';
import type { IProduct } from '@/types';

export default function ProductCard({
  p,
  wa,
  showDescription = false,
}: {
  p?: IProduct | null;
  wa?: string;
  showDescription?: boolean;
}) {
  const [openModal, setOpenModal] = useState(false);

  if (!p) return null;

  const href = productPath(p);
  const desc =
    typeof (p as any)?.description === 'string' ? (p as any).description.trim() : '';

  return (
    <>
      <Paper
        component="article"
        sx={{
          p: showDescription ? { xs: 2, sm: 2.5 } : 2,
          width: '100%',
          display: 'grid',
          gap: showDescription ? 1.5 : 1.25,
          borderRadius: 4,
          alignContent: 'start',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background:
            'linear-gradient(180deg, rgba(24, 16, 22, 0.95) 0%, rgba(15, 10, 14, 0.99) 100%)',
          transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            borderColor: 'rgba(255, 46, 147, 0.48)',
            transform: 'translateY(-3px)',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)',
          },
        }}
      >
        <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
          <ProductImage
            src={p.image}
            alt={p.name || 'Product'}
            radius={2.5}
            bg="#f4efe9"
          />
        </Link>

        {/* Product Title (Left) + Price (Right) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 1.5,
            mt: 0.25,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: showDescription ? { xs: 17, sm: 18.5 } : 15.5,
              fontWeight: 700,
              lineHeight: 1.3,
              minWidth: 0,
              flex: 1,
            }}
          >
            <Link
              href={href}
              style={{
                color: '#f3e8ee',
                textDecoration: 'none',
              }}
            >
              {p.name}
            </Link>
          </Typography>

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: showDescription ? { xs: 20, sm: 22 } : 19,
              color: 'primary.main',
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {inr(p.price)}
          </Typography>
        </Box>

        {showDescription && desc && (
          <Typography
            sx={{
              fontSize: { xs: 13.5, sm: 14 },
              lineHeight: 1.55,
              color: '#cfc0c9',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {desc}
          </Typography>
        )}

        <Button
          type="button"
          variant="contained"
          startIcon={<WhatsAppIcon />}
          size={showDescription ? 'medium' : 'small'}
          fullWidth
          onClick={() => setOpenModal(true)}
          sx={{
            borderRadius: 2.5,
            fontWeight: 700,
            textTransform: 'none',
            bgcolor: 'primary.main',
            color: '#ffffff',
            boxShadow: '0 8px 22px rgba(255, 46, 147, 0.28)',
            '&:hover': {
              bgcolor: 'primary.main',
              filter: 'brightness(1.08)',
            },
          }}
        >
          Enquire via WhatsApp
        </Button>
      </Paper>

      <InquiryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        whatsappNumber={wa || '9072177570'}
        product={{
          id: (p as any)?._id || (p as any)?.id,
          name: p.name || 'Boutique Item',
          image: p.image,
          price: p.price,
        }}
      />
    </>
  );
}