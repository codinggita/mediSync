import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ReactGA from 'react-ga4';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GlobalErrorUI from './components/GlobalErrorUI';
import AnalyticsTracker from './components/AnalyticsTracker';

// 🔑 Identity & Analytics Matrices
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

function App() {
  // Initialize Strategic Analytics
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={GlobalErrorUI} onReset={() => window.location.reload()}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <AnalyticsTracker />
              <div className="min-h-screen bg-[#ecf0f3] dark:bg-[#121826] transition-colors duration-300">
                <AppRoutes />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
