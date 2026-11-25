'use client';
import { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import AdminPage from '@/components/admin/AdminPage';
import FormPanel from '@/components/admin/FormPanel';
import ItemRow from '@/components/admin/ItemRow';
import { useCrud } from '@/hooks/useCrud';
import type { ICategory } from '@/types';

export default function Categories() {
  const { items, save, remove } = useCrud<ICategory>('/api/admin/categories');
  const [name, setName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const submit = async () => {
    if (!name.trim()) return;
    await save({ name }, editId);
    setName(''); setEditId(null);
  };
  return (
    <AdminPage title="Categories">
      <Paper sx={{ flex: 1, p: 2, width: '100%' }}>
        {items.map((c) => (
          <ItemRow key={c._id} onEdit={() => { setEditId(c._id); setName(c.name); }} onDelete={() => remove(c._id, 'category')}>
            <Typography sx={{ flex: 1, fontWeight: 600 }}>{c.name}</Typography>
          </ItemRow>
        ))}
        {!items.length && <Typography color="text.secondary">No categories yet.</Typography>}
      </Paper>
      <FormPanel title={`${editId ? 'Edit' : 'Add'} Category`} width={320}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button variant="contained" onClick={submit}>Save</Button>
      </FormPanel>
    </AdminPage>
  );
}
