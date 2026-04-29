import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE'}>
          <App />
        </GoogleOAuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0a0f1d',
              color: '#fff',
              borderRadius: '1rem',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              boxShadow: '15px 15px 30px #0a0f1d, -15px -15px 30px #121a32',
            },
          }}
        />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
