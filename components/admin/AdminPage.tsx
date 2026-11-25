'use client';
import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

export default function AdminPage({ title, action, children }: { title: ReactNode; action?: ReactNode; children: ReactNode }) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Typography variant="h4" component="h1">{title}</Typography>
        {action}
      </Box>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexDirection: { xs: 'column', lg: 'row' } }}>{children}</Box>
    </>
  );
}
