'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import Logo from '@/components/Logo';
import { api } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try { await api('/api/auth', 'POST', f); router.push('/admin/categories'); } catch { setErr('Invalid email or password'); }
  };
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Box component="form" onSubmit={submit} sx={{ width: 380, p: 4, display: 'grid', gap: 2, bgcolor: '#111', border: '1px solid #262626', borderRadius: 4 }}>
        <Box sx={{ textAlign: 'center' }}><Logo /></Box>
        <Typography align="center" color="text.secondary" fontSize={14}>Admin Login</Typography>
        {err && <Alert severity="error">{err}</Alert>}
        <TextField label="Email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <TextField label="Password" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <Button type="submit" variant="contained" size="large">Login</Button>
      </Box>
    </Box>
  );
}
