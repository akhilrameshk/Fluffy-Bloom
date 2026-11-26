'use client';

import { useState } from 'react';
import { Button, WhatsAppIcon } from '@/components/ui';
import InquiryModal from '@/components/InquiryModal';

interface ProductDetailInquiryProps {
  id?: string | number;
  name: string;
  image?: string;
  price?: string | number;
  wa?: string;
}

export default function ProductDetailInquiry({
  id,
  name,
  image,
  price,
  wa,
}: ProductDetailInquiryProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="contained"
        startIcon={<WhatsAppIcon />}
        fullWidth
        onClick={() => setOpenModal(true)}
        sx={{
          py: 1.35,
          borderRadius: 2.5,
          fontWeight: 700,
          fontSize: 15,
          textTransform: 'none',
          bgcolor: 'primary.main',
          color: '#ffffff',
          boxShadow: '0 10px 26px rgba(255, 46, 147, 0.34)',
          '&:hover': {
            bgcolor: 'primary.main',
            filter: 'brightness(1.08)',
          },
        }}
      >
        Enquire via WhatsApp
      </Button>

      <InquiryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        whatsappNumber={wa || '9746636555'}
        product={{
          id,
          name: name || 'Boutique Item',
          image,
          price,
        }}
      />
    </>
  );
}