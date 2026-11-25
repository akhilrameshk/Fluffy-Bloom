'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NAV } from '@/lib/site';

export default function NavLinks() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
  return (
    <>
      <Box component="nav" aria-label="Main" sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
        {NAV.map((n) => (
          <Box
            key={n.href}
            component={Link}
            href={n.href}
            sx={{
              textDecoration: 'none',
              fontWeight: 500,
              pb: 0.5,
              borderBottom: '2px solid',
              color: active(n.href) ? 'primary.main' : 'text.primary',
              borderColor: active(n.href) ? 'primary.main' : 'transparent',
              transition: 'color 0.2s, border-color 0.2s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {n.label}
          </Box>
        ))}
      </Box>
      <IconButton aria-label="Menu" onClick={() => setOpen(true)} sx={{ display: { md: 'none' } }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 240 }}>
          {NAV.map((n) => (
            <ListItemButton key={n.href} component={Link} href={n.href} selected={active(n.href)} onClick={() => setOpen(false)}>
              <ListItemText primary={n.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}