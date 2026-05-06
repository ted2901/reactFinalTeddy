import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // <-- Dark mode
    primary: {
      main: '#1e88e5', // azul profundo
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081', // rosa brillante
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212', // fondo casi negro
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fafafa',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none', // botones sin mayúsculas
    },
  },
  components: {
    // Mejor aspecto para los botones
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          padding: '0.6rem 1.4rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s, background 0.3s',
          '&:hover': {
            transform: 'scale(1.04)',
            backgroundImage: 'linear-gradient(45deg, #1e88e5, #42a5f5)',
          },
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(45deg, #1e88e5, #42a5f5)',
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(45deg, #ff4081, #f50057)',
        },
      },
    },
    // Mejora de la barra de navegación
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: '#fafafa',
          borderBottom: '1px solid #333',
        },
      },
    },
    // Tarjetas de tareas más modernas
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#272727',
          color: '#fafafa',
          borderRadius: 12,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          },
        },
      },
    },
  },
});

export default theme;
