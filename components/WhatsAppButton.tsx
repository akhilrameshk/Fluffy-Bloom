import type { ReactNode } from 'react';
import PillButton, { type BtnProps } from './PillButton';
import { WhatsAppIcon } from './ui';
import { waLink } from '@/lib/utils';

export default function WhatsAppButton({ number, text, children = 'Contact Us', ...rest }: BtnProps & { number: string; text?: string; children?: ReactNode }) {
  return <PillButton external href={waLink(number, text)} icon={<WhatsAppIcon />} {...rest}>{children}</PillButton>;
}
