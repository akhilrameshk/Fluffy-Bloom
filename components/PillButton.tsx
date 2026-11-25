import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from './ui';

export type BtnProps = {
  variant?: 'contained' | 'outlined'; size?: 'small' | 'medium' | 'large'; fullWidth?: boolean; radius?: number;
};
type Props = BtnProps & { href: string; children: ReactNode; icon?: ReactNode; iconAfter?: boolean; external?: boolean };

/** The call-to-action button used across the site (internal link or external). radius 999 = pill. */
export default function PillButton({ href, children, icon, iconAfter, external, variant = 'contained', size = 'large', fullWidth, radius = 999 }: Props) {
  return (
    <Button
      href={href} LinkComponent={external ? 'a' : Link} variant={variant} size={size} fullWidth={fullWidth}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      startIcon={iconAfter ? undefined : icon} endIcon={iconAfter ? icon : undefined}
      sx={{ borderRadius: radius, px: radius > 100 && size === 'large' ? 4 : undefined }}
    >
      {children}
    </Button>
  );
}
