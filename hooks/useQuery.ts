'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/** Read / update URL query params (sort, page ...). Changing anything but `page` resets to page 1. */
export function useQuery() {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const set = (key: string, value: string) => {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value); else p.delete(key);
    if (key !== 'page') p.delete('page');
    const qs = p.toString();
    router.push(qs ? `${path}?${qs}` : path);
  };
  return { set, get: (k: string) => params.get(k) || '' };
}
