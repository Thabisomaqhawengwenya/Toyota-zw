import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EB0A1E', // Toyota Red
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#000000', // Black
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F6F6F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E1E1E',
      secondary: '#58595B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Toyota brand uses sleek sharp corners
          padding: '10px 24px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(235, 10, 30, 0.2)',
          },
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#EB0A1E',
            '&:hover': {
              backgroundColor: '#C8081A',
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#000000',
            '&:hover': {
              backgroundColor: '#1E1E1E',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sharp aesthetic
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#000000',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});
export default theme;
