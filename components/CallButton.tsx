import PillButton, { type BtnProps } from './PillButton';
import { PhoneIcon } from './ui';

export default function CallButton({ number, label, ...rest }: BtnProps & { number: string; label?: string }) {
  return <PillButton external href={`tel:${number}`} icon={<PhoneIcon />} variant="outlined" {...rest}>{label ?? `Call ${number}`}</PillButton>;
}
