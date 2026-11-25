import { Box, Button, Paper, Typography, PlaceIcon, MapIcon } from './ui';
import WhatsAppButton from './WhatsAppButton';
import CallButton from './CallButton';
import type { getBranches } from '@/lib/utils';

type Branch = ReturnType<typeof getBranches>[number];

/** Branch details. full=true adds phone, hours and the WhatsApp / Call / Maps actions (Contact page). */
export default function BranchCard({ b, full }: { b: Branch; full?: boolean }) {
  if (!full) {
    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <PlaceIcon color="primary" fontSize="small" />
        <Box>
          <Typography fontWeight={600}>{b.name} Branch:</Typography>
          <Typography color="text.secondary" fontSize={14}>{b.address || 'Alappuzha'}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Paper component="article" sx={{ p: 3.5, display: 'grid', gap: 1.5 }}>
      <Typography component="h2" variant="h5" sx={{ fontSize: 24 }}>{b.title}</Typography>
      <Typography color="text.secondary">{b.address || 'Alappuzha, Kerala'}</Typography>
      <Typography color="text.secondary">Ph: +91 {b.phone}</Typography>
      {b.hours && <Typography color="text.secondary">{b.hours}</Typography>}
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', mt: 1 }}>
        <WhatsAppButton number={b.phone} size="medium" radius={2}>Chat on WhatsApp</WhatsAppButton>
        <CallButton number={b.phone} label="Call Store" size="medium" radius={2} />
        {b.mapUrl && (
          <Button href={b.mapUrl} target="_blank" rel="noopener noreferrer" color="inherit" startIcon={<MapIcon />} sx={{ ml: 'auto', color: 'text.secondary' }}>
            View on Google Maps
          </Button>
        )}
      </Box>
    </Paper>
  );
}
