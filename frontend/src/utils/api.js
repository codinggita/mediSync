import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000' 
      : 'https://medisync-gxiy.onrender.com'),
});

// ── Smart Route Interceptor ──────────────────────────────────────────────────
// Automatically ensures all local routes are prefixed with /api
api.interceptors.request.use((config) => {
  // 🛡️ Double-Prefix Guard: Only add /api if it's not already in the URL 
  // AND not already in the baseURL
  const hasApiInBase = config.baseURL?.endsWith('/api') || config.baseURL?.endsWith('/api/');
  const hasApiInUrl = config.url?.startsWith('/api') || config.url?.startsWith('api/');
  
  if (!hasApiInBase && !hasApiInUrl && config.url && !config.url.startsWith('http')) {
    config.url = `/api${config.url.startsWith('/') ? '' : '/'}${config.url}`;
  }
  
  try {
    const stored = localStorage.getItem('mediSync_user');
    if (stored) {
      const userData = JSON.parse(stored);
      if (userData && userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
        // Diagnostic log
        console.log('📡 [API SYNC]: Outgoing Request with Token');
      }
    }
  } catch (err) {
    console.error('API Auth Interceptor Error:', err);
  }
  return config;
});

// Response interceptor to handle session expiration and cold starts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛡️ Cold Start Resilience: Retry once if the server is waking up (502/503/504)
    if (error.response && [502, 503, 504].includes(error.response.status) && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn('📡 [API SYNC]: Backend is warming up. Retrying clinical handshake...');
      // Wait 3 seconds for Render to spin up
      await new Promise(resolve => setTimeout(resolve, 3000));
      return api(originalRequest);
    }

    if (error.response && error.response.status === 401) {
      console.warn('🚨 [API SYNC]: Session Protocol Expired. Cleaning up local state.');
      localStorage.removeItem('mediSync_user');
      
      // 🛡️ Smart Redirect: Only force login if the user is NOT already on a public page
      const publicPages = ['/', '/login', '/signup', '/forgot-password'];
      const isPublic = publicPages.includes(window.location.pathname);
      
      if (!isPublic) {
        window.location.href = '/login?reason=session_missing';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
