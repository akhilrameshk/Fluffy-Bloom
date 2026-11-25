'use client';
import { MenuItem, TextField } from '@mui/material';
import { useQuery } from '@/hooks/useQuery';

export default function SortSelect() {
  const { get, set } = useQuery();
  return (
    <TextField select size="small" label="Sort by" sx={{ minWidth: 190 }} value={get('sort') || 'new'}
      onChange={(e) => set('sort', e.target.value === 'new' ? '' : e.target.value)}>
      <MenuItem value="new">Newest</MenuItem>
      <MenuItem value="price-asc">Price: Low to High</MenuItem>
      <MenuItem value="price-desc">Price: High to Low</MenuItem>
    </TextField>
  );
}
