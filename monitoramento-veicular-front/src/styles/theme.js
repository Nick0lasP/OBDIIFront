import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Azul escuro
    },
    secondary: {
      main: '#FF6F00', // Laranja
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;
