'use client';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined';
import ProductImage from '@/components/ProductImage';

/** Click-to-upload 4:3 box. Uploads to Cloudinary through /api/admin/upload and returns the URL. */
export default function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const upload = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      onChange(d.url);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Box component="label" sx={{ display: 'block', cursor: 'pointer' }}>
      <input type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files?.[0])} />
      {value ? (
        <ProductImage src={value} alt="Product" w={600} />
      ) : (
        <Box sx={{ border: '1px dashed #555', borderRadius: 3, aspectRatio: '4/3', display: 'grid', placeItems: 'center', color: 'text.secondary', textAlign: 'center' }}>
          <Box>
            <CloudUploadIcon />
            <Typography color="primary" fontWeight={600}>{busy ? 'Uploading...' : 'Upload Image'}</Typography>
            <Typography fontSize={13}>JPG / PNG, 4:3 ratio, max 8 MB</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
