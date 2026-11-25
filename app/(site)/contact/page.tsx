import { Box, Typography } from '@/components/ui';
import Section from '@/components/Section';
import BranchCard from '@/components/BranchCard';
import InquiryForm from '@/components/InquiryForm';
import { getSettings } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { getBranches } from '@/lib/utils';

export async function generateMetadata() {
  return pageMeta({
    title: 'Contact Us', path: '/contact',
    description: 'Contact Fluffy Bloom on WhatsApp or phone. Branches in Cherthala and Thiruvampadi, Alappuzha.',
  });
}

export default async function Contact() {
  const s = await getSettings();
  const branches = getBranches(s);
  return (
    <Section pt={7}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography component="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 700, color: 'primary.main' }}>CONTACT US</Typography>
        <Typography color="text.secondary" sx={{ fontSize: 18 }}>Get in touch with us • Visit our stores or reach out online</Typography>
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1.7fr 1fr' }, alignItems: 'start' }}>
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          <Typography component="h2" variant="h5" sx={{ fontSize: 24 }}>Our Branches</Typography>
          {branches.map((b) => <BranchCard key={b.name} b={b} full />)}
        </Box>
        <InquiryForm whatsapp={s.whatsapp} email={s.email} branches={branches.map((b) => b.name)} />
      </Box>
    </Section>
  );
}
