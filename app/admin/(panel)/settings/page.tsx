'use client';
import { useEffect, useState } from 'react';
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import FormPanel from '@/components/admin/FormPanel';
import ImageUpload from '@/components/admin/ImageUpload';
import { api } from '@/lib/api';
import type { ISettings } from '@/types';

type Field = { key: keyof ISettings; label: string; rows?: number; image?: boolean };
const sections: { title: string; fields: Field[] }[] = [
  { title: 'Contact', fields: [
    { key: 'whatsapp', label: 'WhatsApp / phone number' },
    { key: 'email', label: 'Email' },
    { key: 'hours', label: 'Opening hours (shown on Contact page)' },
  ] },
  { title: 'Branches', fields: [
    { key: 'address1', label: 'Cherthala address', rows: 2 }, { key: 'mapUrl1', label: 'Cherthala Google Maps link' },
    { key: 'address2', label: 'Thiruvampadi address', rows: 2 }, { key: 'mapUrl2', label: 'Thiruvampadi Google Maps link' },
  ] },
  { title: 'Social links', fields: [{ key: 'instagram', label: 'Instagram URL' }, { key: 'facebook', label: 'Facebook URL' }] },
  { title: 'Story', fields: [{ key: 'foundedYear', label: 'Year the first store opened (About page)' }] },
  { title: 'Page images', fields: [{ key: 'visionImage', label: 'Vision page banner', image: true }, { key: 'aboutImage', label: 'About page banner', image: true }] },
  { title: 'SEO', fields: [
    { key: 'metaTitle', label: 'Meta title (home page)' },
    { key: 'metaDescription', label: 'Meta description (max ~160 characters)', rows: 3 },
    { key: 'keywords', label: 'Keywords (comma separated)' },
  ] },
];

export default function Settings() {
  const [s, setS] = useState<ISettings | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => { api<ISettings>('/api/admin/settings').then(setS); }, []);
  if (!s) return null;
  const set = (k: keyof ISettings, v: string) => setS({ ...s, [k]: v });
  const save = async () => { await api('/api/admin/settings', 'PUT', s); setSaved(true); };
  return (
    <Box sx={{ maxWidth: 760, display: 'grid', gap: 3 }}>
      <Typography variant="h4" component="h1">Settings &amp; SEO</Typography>
      {sections.map((sec) => (
        <FormPanel key={sec.title} title={sec.title}>
          {sec.fields.map((x) => x.image ? (
            <Box key={x.key}>
              <Typography color="text.secondary" fontSize={13} sx={{ mb: 1 }}>{x.label}</Typography>
              <ImageUpload value={s[x.key]} onChange={(url) => set(x.key, url)} />
            </Box>
          ) : (
            <TextField key={x.key} label={x.label} value={s[x.key] || ''} multiline={!!x.rows} rows={x.rows} onChange={(e) => set(x.key, e.target.value)} />
          ))}
        </FormPanel>
      ))}
      <Button variant="contained" size="large" onClick={save} sx={{ width: 200 }}>Save Changes</Button>
      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)} message="Saved" />
    </Box>
  );
}
