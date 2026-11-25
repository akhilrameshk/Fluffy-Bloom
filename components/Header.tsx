import { Box } from './ui';
import Logo from './Logo';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: '#000',
        borderBottom: '1px solid #262626',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1360,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Logo />
        <NavLinks />
      </Box>
    </Box>
  );
}