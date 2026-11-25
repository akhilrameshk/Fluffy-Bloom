'use client';
import { Pagination } from '@mui/material';
import { useQuery } from '@/hooks/useQuery';

export default function Pager({ page, pages }: { page: number; pages: number }) {
  const { set } = useQuery();
  if (pages <= 1) return null;
  return (
    <Pagination page={page} count={pages} color="primary" shape="rounded" sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
      onChange={(_, p) => set('page', p === 1 ? '' : String(p))} />
  );
}
