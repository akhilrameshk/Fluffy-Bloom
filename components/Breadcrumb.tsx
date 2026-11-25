import Link from 'next/link';
import { Box, ChevronRightIcon } from './ui';

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <Box component="nav" aria-label="Breadcrumb" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: 14, flexWrap: 'wrap' }}>
      {items.map((it, i) => (
        <Box key={it.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
          {i < items.length - 1 && <ChevronRightIcon fontSize="small" />}
        </Box>
      ))}
    </Box>
  );
}
