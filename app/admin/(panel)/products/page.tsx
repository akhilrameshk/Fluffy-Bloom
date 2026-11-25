'use client';
import { useState } from 'react';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminPage from '@/components/admin/AdminPage';
import FormPanel from '@/components/admin/FormPanel';
import ItemRow from '@/components/admin/ItemRow';
import ImageUpload from '@/components/admin/ImageUpload';
import ProductImage from '@/components/ProductImage';
import { useCrud } from '@/hooks/useCrud';
import { inr } from '@/lib/utils';
import type { ICategory, IProduct } from '@/types';

const empty = { name: '', price: '', category: '', image: '', description: '' };

export default function Products() {
  const products = useCrud<IProduct>('/api/admin/products');
  const { items: cats } = useCrud<ICategory>('/api/admin/categories');
  const [filter, setFilter] = useState('');
  const [f, setF] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const reset = () => { setF(empty); setEditId(null); };

  const submit = async () => {
    if (!f.name.trim() || !f.category) return alert('Name and category are required');
    await products.save({ ...f, price: Number(f.price) || 0 }, editId);
    reset();
  };
  const edit = (p: IProduct) => {
    setEditId(p._id);
    setF({ name: p.name, price: String(p.price ?? ''), category: p.category?._id || '', image: p.image || '', description: p.description || '' });
  };
  const shown = filter ? products.items.filter((p) => p.category?._id === filter) : products.items;

  return (
    <AdminPage
      title="Products"
      action={
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField select size="small" sx={{ width: 200 }} value={filter} onChange={(e) => setFilter(e.target.value)} SelectProps={{ displayEmpty: true }}>
            <MenuItem value="">All Categories</MenuItem>
            {cats.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
          </TextField>
          <Button variant="contained" startIcon={<AddIcon />} onClick={reset}>Add Product</Button>
        </Box>
      }
    >
      <Paper sx={{ flex: 1, p: 2, width: '100%' }}>
        {shown.map((p) => (
          <ItemRow key={p._id} onEdit={() => edit(p)} onDelete={() => products.remove(p._id, 'product')}>
            <Box sx={{ width: 64 }}><ProductImage src={p.image} alt={p.name} w={160} radius={1} /></Box>
            <Typography sx={{ fontWeight: 600, flex: 1 }}>{p.name}</Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>{p.category?.name}</Typography>
            <Typography>{inr(p.price)}</Typography>
          </ItemRow>
        ))}
        {!shown.length && <Typography color="text.secondary">No products yet.</Typography>}
      </Paper>
      <FormPanel title={`${editId ? 'Edit' : 'Add'} Product`} width={340}>
        <TextField label="Name" value={f.name} onChange={set('name')} />
        <TextField label="Price" type="number" value={f.price} onChange={set('price')} />
        <TextField select label="Category" value={f.category} onChange={set('category')}>
          {cats.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
        </TextField>
        <ImageUpload value={f.image} onChange={(url) => setF((x) => ({ ...x, image: url }))} />
        <TextField label="Description" multiline rows={3} value={f.description} onChange={set('description')} />
        <Button variant="contained" onClick={submit}>Save Product</Button>
      </FormPanel>
    </AdminPage>
  );
}
