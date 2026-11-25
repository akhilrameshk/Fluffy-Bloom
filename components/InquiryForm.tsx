'use client';
import { useState } from 'react';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { waLink } from '@/lib/utils';

type Props = { whatsapp: string; email?: string; branches: string[] };

/** "Send an Inquiry" form: nothing is stored, the message opens in WhatsApp. */
export default function InquiryForm({ whatsapp, email, branches }: Props) {
  const [f, setF] = useState({ name: '', phone: '', branch: branches[0] || '', message: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const send = () => {
    const text = `Hi Fluffy Bloom, I have an enquiry.\nName: ${f.name}\nPhone: ${f.phone}\nBranch: ${f.branch}\n${f.message}`;
    window.open(waLink(whatsapp, text), '_blank', 'noopener');
  };
  return (
    <Paper component="form" onSubmit={(e) => { e.preventDefault(); send(); }} sx={{ p: 3.5, display: 'grid', gap: 2, alignContent: 'start' }}>
      <Typography component="h2" variant="h5" sx={{ fontSize: 24 }}>Send an Inquiry</Typography>
      <TextField placeholder="Your Name" value={f.name} onChange={set('name')} />
      <TextField placeholder="Phone Number" value={f.phone} onChange={set('phone')} />
      <TextField select label="Select Branch" value={f.branch} onChange={set('branch')}>
        {branches.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
      </TextField>
      <TextField placeholder="Message / Product Inquiry" multiline rows={4} value={f.message} onChange={set('message')} />
      <Button type="submit" variant="contained" size="large" startIcon={<WhatsAppIcon />}>Submit Inquiry via WhatsApp</Button>
      {email && <Typography align="center" color="text.secondary" fontSize={14}>Or Email Us: <a href={`mailto:${email}`}>{email}</a></Typography>}
      <Box sx={{ borderTop: '1px solid #262626', pt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PhoneIcon color="primary" />
        <Typography fontWeight={600} sx={{ flex: 1 }}>Direct Helpline: +91 {whatsapp}</Typography>
        <a href={waLink(whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon sx={{ color: '#25d366' }} /></a>
      </Box>
    </Paper>
  );
}
