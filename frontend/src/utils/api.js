import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000' 
      : 'https://medisync-gxiy.onrender.com'),
  timeout: 30000, 
});


api.interceptors.request.use((config) => {
  
  const hasApiInBase = config.baseURL?.endsWith('/api') || config.baseURL?.endsWith('/api/');
  const hasApiInUrl = config.url?.startsWith('/api') || config.url?.startsWith('api/');
  if (!hasApiInBase && !hasApiInUrl && config.url && !config.url.startsWith('http')) {
    config.url = `/api${config.url.startsWith('/') ? '' : '/'}${config.url}`;
  }

  try {
    const stored = localStorage.getItem('mediSync_user');
    if (stored) {
      const userData = JSON.parse(stored);
      if (userData?.token) {
        
        const parts = userData.token.split('.');
        if (parts.length === 3 && userData.token.length < 2000) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        } else {
          
          console.warn('🔐 [SECURITY] Malformed token detected. Purging session.');
          localStorage.removeItem('mediSync_user');
        }
      }
    }
  } catch (err) {
    console.error('[API] Auth interceptor error:', err);
    localStorage.removeItem('mediSync_user');
  }

  
  config.headers['Cache-Control'] = 'no-cache, no-store';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';

  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response && [502, 503, 504].includes(error.response.status) && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn('📡 [API] Backend warming up. Retrying in 3s...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      return api(originalRequest);
    }

    if (error.response?.status === 429) {
      console.warn('🚫 [SECURITY] Rate limit reached. Please slow down.');
    }

    if (error.response?.status === 401) {
      console.warn('🔐 [SECURITY] Session expired or unauthorized. Clearing credentials.');
      localStorage.removeItem('mediSync_user');
      sessionStorage.clear();
      const publicPages = ['/', '/login', '/signup', '/forgot-password'];
      const isPublic = publicPages.includes(window.location.pathname);
      if (!isPublic) {
        window.location.href = '/login?reason=session_expired';
      }
    }

    if (error.response?.status === 403) {
      console.warn('🚫 [SECURITY] Access forbidden. Insufficient permissions.');
    }

    return Promise.reject(error);
  }
);

export default api;
