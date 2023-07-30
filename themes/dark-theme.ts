import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b',
    },
    
    error: {
      main: red.A400
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed'
      },
      styleOverrides: {
        root: {
          height: 70,
          background: '#101213',
          fontFamily: 'Press Start 2P cursive',
          fontSize: '3rem',
          fontWeight: '600',
        },
      },

    },
  }
});
