import type { ReactNode } from 'react';
import { Box } from './ui';
import { cld } from '@/lib/utils';

type Props = { src?: string; alt: string; w?: number; radius?: number; priority?: boolean; bg?: string; children?: ReactNode };

/** 4:3 image box (Cloudinary-optimised). Children render on top. */
export default function ProductImage({ src, alt, w = 640, radius = 3, priority, bg = '#1c1c1c', children }: Props) {
  return (
    <Box sx={{ position: 'relative', aspectRatio: '4/3', bgcolor: bg, borderRadius: radius, overflow: 'hidden' }}>
      {src && (
        <Box component="img" src={cld(src, w)} alt={alt} loading={priority ? 'eager' : 'lazy'}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
      {children}
    </Box>
  );
}
