'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '@/components/Logo';
import { api } from '@/lib/api';

const nav = [
  { label: 'Categories', href: '/admin/categories', icon: <CategoryOutlined /> },
  { label: 'Products', href: '/admin/products', icon: <Inventory2Outlined /> },
  { label: 'Settings & SEO', href: '/admin/settings', icon: <SettingsOutlined /> },
];

export default function PanelLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const logout = async () => { await api('/api/auth', 'DELETE'); router.push('/admin/login'); };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box component="aside" sx={{ width: 240, flexShrink: 0, borderRight: '1px solid #262626', bgcolor: '#0a0a0a', p: 2.5, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 3 }}><Logo /></Box>
        <List sx={{ display: 'grid', gap: 0.5 }}>
          {nav.map((n) => (
            <ListItemButton key={n.href} component={Link} href={n.href} selected={path.startsWith(n.href)} sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}>{n.icon}</ListItemIcon>
              <ListItemText primary={n.label} />
            </ListItemButton>
          ))}
        </List>
        <ListItemButton onClick={logout} sx={{ mt: 'auto', borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
      <Box sx={{ flex: 1, p: { xs: 2, md: 6 }, minWidth: 0 }}>{children}</Box>
    </Box>
  );
}
