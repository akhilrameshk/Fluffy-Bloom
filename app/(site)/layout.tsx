import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import JsonLd from '@/components/JsonLd';
import { getSettings } from '@/lib/data';
import { storeSchema } from '@/lib/schema';

export const dynamic = 'force-dynamic'; // admin changes show up immediately

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <JsonLd data={storeSchema(s)} />
      <Header />
      <main>{children}</main>
      <Footer s={s} />
      <FloatingActions s={s} />
    </>
  );
}