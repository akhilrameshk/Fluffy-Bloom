'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  AddIcon,
  RemoveIcon,
  CloseIcon,
  WhatsAppIcon,
} from '@/components/ui';
import { inr, waLink } from '@/lib/utils';

export interface InquiryProduct {
  id?: string | number;
  name: string;
  image?: string;
  branch?: string;
  price?: string | number;
}

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  product: InquiryProduct | null;
  whatsappNumber?: string;
  defaultBranch?: string;
}

export default function InquiryModal({
  open,
  onClose,
  product,
  whatsappNumber = '9746636555',
}: InquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setError('');
    }
  }, [open, product]);

  const unitPrice = Number(product?.price ?? 0);
  const hasValidPrice = !Number.isNaN(unitPrice) && unitPrice > 0;
  const totalAmount = hasValidPrice ? unitPrice * quantity : 0;

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const cleanPhone = phone.trim();

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid contact number.');
      return;
    }

    setError('');

    const itemName = product?.name || 'Boutique Collection';
    const priceLines = hasValidPrice
      ? [
          `💰 *Per Item:* ${inr(unitPrice)}`,
          `🧾 *Total Amount (${inr(unitPrice)} × ${quantity}):* ${inr(totalAmount)}`,
        ].join('\n')
      : '';
    const notesText = notes.trim() ? `\n📝 *Note:* ${notes.trim()}` : '';

    const formattedMessage = [
      `✨ *FLUFFY BLOOM — PRODUCT INQUIRY* ✨`,
      `────────────────────────`,
      `🛍️ *Item:* ${itemName}`,
      `🔢 *Quantity:* ${quantity}`,
      ...(priceLines ? [priceLines] : []),
      `────────────────────────`,
      `👤 *Customer Name:* ${trimmedName}`,
      `📞 *Contact Number:* ${cleanPhone}${notesText}`,
      `────────────────────────`,
      `Please share availability and further details.`,
    ].join('\n');

    const url = waLink(whatsappNumber, formattedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background:
            'radial-gradient(circle at 15% 15%, rgba(255, 46, 147, 0.2) 0%, transparent 45%), linear-gradient(145deg, #160c14 0%, #0b060a 100%)',
          border: '1px solid rgba(255, 46, 147, 0.38)',
          boxShadow: '0 28px 80px rgba(0, 0, 0, 0.92)',
          color: '#ffffff',
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 1.75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
            }}
          >
            Fluffy Bloom Boutique
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#ffffff' }}>
            Quick WhatsApp Inquiry
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#d8c5cf',
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            '&:hover': { bgcolor: 'rgba(255, 46, 147, 0.18)', color: '#ffffff' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 2.5 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'grid', gap: 1.85 }}
        >
          {/* Product Photo, Name (Left) + Price (Right) */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 46, 147, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0, flex: 1 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  flexShrink: 0,
                  bgcolor: 'rgba(255, 46, 147, 0.1)',
                  border: '1px solid rgba(255, 46, 147, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {product?.image ? (
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <Typography sx={{ fontSize: 11, color: '#cbb8c2', textAlign: 'center', px: 0.5 }}>
                    No Photo
                  </Typography>
                )}
              </Box>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.35,
                }}
              >
                {product?.name || 'Boutique Item'}
              </Typography>
            </Box>

            {hasValidPrice && (
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: 'primary.main',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {inr(unitPrice)}
              </Typography>
            )}
          </Box>

          {/* Customer Name */}
          <TextField
            label="Your Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                color: '#ffffff',
              },
              '& .MuiInputLabel-root': { color: '#cbb8c2' },
            }}
          />

          {/* Contact Number */}
          <TextField
            label="Contact Number"
            placeholder="Enter WhatsApp / mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
            size="small"
            type="tel"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                color: '#ffffff',
              },
              '& .MuiInputLabel-root': { color: '#cbb8c2' },
            }}
          />

          {/* Quantity Counter (Starts at 1, never goes below 1) */}
          <Box
            sx={{
              px: 1.75,
              py: 1.15,
              borderRadius: 2.5,
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#ffffff' }}>
                Quantity Needed
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: '#b7a3ae' }}>
                Minimum 1 item
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <IconButton
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                size="small"
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  border: '1px solid rgba(255, 46, 147, 0.4)',
                  color: '#ffffff',
                  bgcolor: 'rgba(255, 46, 147, 0.12)',
                  '&.Mui-disabled': {
                    opacity: 0.35,
                    color: '#cbb8c2',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                  },
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography
                sx={{
                  minWidth: 28,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                {quantity}
              </Typography>

              <IconButton
                type="button"
                onClick={handleIncrement}
                size="small"
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  border: '1px solid rgba(255, 46, 147, 0.5)',
                  color: '#ffffff',
                  bgcolor: 'primary.main',
                  '&:hover': { filter: 'brightness(1.08)' },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Optional Size / Note */}
          <TextField
            label="Size / Note (Optional)"
            placeholder="e.g., Size M / Color preference"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                color: '#ffffff',
              },
              '& .MuiInputLabel-root': { color: '#cbb8c2' },
            }}
          />

          {/* Bottom Total Amount Breakdown */}
          {hasValidPrice && (
            <Box
              sx={{
                px: 1.75,
                py: 1.35,
                borderRadius: 2.5,
                background:
                  'linear-gradient(135deg, rgba(255, 46, 147, 0.15) 0%, rgba(22, 12, 20, 0.92) 100%)',
                border: '1px solid rgba(255, 46, 147, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#ff9ed0', letterSpacing: 0.6 }}>
                  TOTAL AMOUNT
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#d8c5cf', mt: 0.2 }}>
                  {inr(unitPrice)} × {quantity} = {inr(totalAmount)}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                }}
              >
                {inr(totalAmount)}
              </Typography>
            </Box>
          )}

          {error && (
            <Typography sx={{ fontSize: 12.5, color: '#ff7aa2', fontWeight: 600 }}>
              {error}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            startIcon={<WhatsAppIcon />}
            sx={{
              mt: 0.25,
              py: 1.25,
              borderRadius: 2.5,
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'none',
              bgcolor: 'primary.main',
              color: '#ffffff',
              boxShadow: '0 10px 28px rgba(255, 46, 147, 0.35)',
              '&:hover': { bgcolor: 'primary.main', filter: 'brightness(1.08)' },
            }}
          >
            Send Inquiry on WhatsApp
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}