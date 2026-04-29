import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ReactGA from 'react-ga4';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import GlobalErrorUI from './components/GlobalErrorUI';
import AnalyticsTracker from './components/AnalyticsTracker';

// 🔑 Analytics Matrix
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

function App() {
  // Initialize Strategic Analytics
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={GlobalErrorUI} onReset={() => window.location.reload()}>
      <Router>
        <AnalyticsTracker />
        <div className="min-h-screen bg-[#ecf0f3] dark:bg-[#121826] transition-colors duration-300">
          <AppRoutes />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
