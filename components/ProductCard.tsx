import Link from 'next/link';
import { Paper, Typography } from './ui';
import ProductImage from './ProductImage';
import WhatsAppButton from './WhatsAppButton';
import { SITE_URL } from '@/lib/env';
import { enquiryText, inr, productPath } from '@/lib/utils';
import type { IProduct } from '@/types';

export default function ProductCard({ p, wa }: { p: IProduct; wa: string }) {
  return (
    <Paper component="article" sx={{ p: 2, display: 'grid', gap: 1.25, borderRadius: 4, alignContent: 'start' }}>
      <Link href={productPath(p)} style={{ display: 'block' }}>
        <ProductImage src={p.image} alt={p.name} radius={2} bg="#f4efe9" />
      </Link>
      <Typography sx={{ fontWeight: 700, fontSize: 22, color: 'primary.main' }}>{inr(p.price)}</Typography>
      <Typography component="h3" sx={{ fontSize: 16 }}>
        <Link href={productPath(p)}>{p.name}</Link>
      </Typography>
      <WhatsAppButton number={wa} text={enquiryText(p, SITE_URL)} size="small" fullWidth radius={2}>Enquire via WhatsApp</WhatsAppButton>
    </Paper>
  );
}
