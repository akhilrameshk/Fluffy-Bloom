'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : '/products');
  };
  return (
    <>
      <IconButton aria-label="Search products" onClick={() => setOpen(true)}><SearchIcon /></IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogContent component="form" onSubmit={submit}>
          <TextField autoFocus fullWidth placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
