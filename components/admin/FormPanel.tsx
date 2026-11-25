'use client';
import type { ReactNode } from 'react';
import { Paper } from '@mui/material';

/** Right-hand add/edit panel. Pass `width` for a fixed-width side panel; omit for a full card. */
export default function FormPanel({ title, width, children }: { title: string; width?: number; children: ReactNode }) {
  return (
    <Paper sx={{ p: 3, display: 'grid', gap: 2, width: { xs: '100%', lg: width ?? '100%' } }}>
      <b>{title}</b>
      {children}
    </Paper>
  );
}
