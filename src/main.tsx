import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppRouter } from './routes/AppRouter.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AlertProvider } from './context/alert/Alert.provider.tsx';
import { AuthProvider } from './context/auth/Auth.provider.tsx';

import theme from './theme';
// removed inline theme definition

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <AppRouter />
          <CssBaseline />
          <App />
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
