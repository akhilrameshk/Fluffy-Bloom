import type { ReactNode } from 'react';
import { Box } from './ui';

/** 4 cards per row on desktop. scroll=true -> one sideways-scrolling row; false -> wrapping grid. */
export default function CardRow({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  return (
    <Box sx={{
      display: 'flex', gap: 2.5, pb: 1.5,
      overflowX: scroll ? 'auto' : 'visible', flexWrap: scroll ? 'nowrap' : 'wrap',
      '& > *': { flex: { xs: '0 0 70%', sm: '0 0 calc((100% - 20px * 1) / 2)', md: '0 0 calc((100% - 20px * 3) / 4)' }, minWidth: 0 },
    }}>
      {children}
    </Box>
  );
}
