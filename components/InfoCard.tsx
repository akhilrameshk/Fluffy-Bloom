import { Paper, Typography, SpaIcon, FavoriteIcon, VerifiedIcon, HandshakeIcon, PlaceIcon } from './ui';
import type { IconKey } from '@/lib/content';

const ICONS = { spa: SpaIcon, heart: FavoriteIcon, verified: VerifiedIcon, handshake: HandshakeIcon, place: PlaceIcon };

/** Icon + title + text card (values, "what drives us"). accent=true gives the pink left border. */
export default function InfoCard({ icon, title, text, accent }: { icon?: IconKey; title: string; text: string; accent?: boolean }) {
  const Icon = icon ? ICONS[icon] : null;
  return (
    <Paper component="article" sx={{ p: 3, display: 'grid', gap: 1, alignContent: 'start', borderRadius: 3, ...(accent && { borderLeft: '4px solid', borderLeftColor: 'primary.main' }) }}>
      {Icon && <Icon sx={{ color: 'primary.main', fontSize: 34 }} />}
      <Typography component="h3" sx={{ fontWeight: 600, fontSize: 18 }}>{title}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.7 }}>{text}</Typography>
    </Paper>
  );
}
