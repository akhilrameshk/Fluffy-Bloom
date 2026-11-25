import { createTheme } from '@mui/material/styles';

const bold = { fontWeight: 700 };

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e8338f', contrastText: '#fff' },
    background: { default: '#000', paper: '#121212' },
    text: { primary: '#f5f5f5', secondary: '#a3a3a3' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'inherit',
    button: { textTransform: 'none', fontWeight: 600 },
    h1: bold, h2: bold, h3: bold, h4: bold, h5: bold,
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', border: '1px solid #262626', borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
  },
});
