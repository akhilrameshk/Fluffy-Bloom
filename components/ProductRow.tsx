import Section from './Section';
import CardRow from './CardRow';
import ProductCard from './ProductCard';
import type { IProduct } from '@/types';

export default function ProductRow({ title, href, items, wa }: { title: string; href?: string; items: IProduct[]; wa: string }) {
  return (
    <Section title={title} href={href}>
      <CardRow>{items.map((p) => <ProductCard key={p._id} p={p} wa={wa} />)}</CardRow>
    </Section>
  );
}
