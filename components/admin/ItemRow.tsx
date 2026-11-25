'use client';
import type { ReactNode } from 'react';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

export default function ItemRow({ children, onEdit, onDelete }: { children: ReactNode; onEdit: () => void; onDelete: () => void }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: '1px solid #262626' }}>
      {children}
      <IconButton aria-label="Edit" onClick={onEdit}><EditIcon /></IconButton>
      <IconButton aria-label="Delete" onClick={onDelete}><DeleteIcon /></IconButton>
    </Box>
  );
}
