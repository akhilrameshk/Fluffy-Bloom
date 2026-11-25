'use client';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';

/** List + create/update/delete for any admin REST endpoint. */
export function useCrud<T extends { _id: string }>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const load = useCallback(async () => setItems(await api<T[]>(endpoint)), [endpoint]);
  useEffect(() => { load().catch(() => {}); }, [load]);

  const run = async (fn: () => Promise<unknown>) => {
    try { await fn(); await load(); } catch (e) { alert((e as Error).message); }
  };
  const save = (body: unknown, id?: string | null) => run(() => api(id ? `${endpoint}/${id}` : endpoint, id ? 'PUT' : 'POST', body));
  const remove = (id: string, label = 'item') => confirm(`Delete this ${label}?`) ? run(() => api(`${endpoint}/${id}`, 'DELETE')) : undefined;
  return { items, save, remove, reload: load };
}
