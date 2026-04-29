import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
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

// Response interceptor to handle session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('🚨 [API SYNC]: Session Protocol Expired. Redirecting to Re-auth.');
      localStorage.removeItem('mediSync_user');
      // Redirect to login with reason
      window.location.href = '/login?reason=session_missing';
    }
    return Promise.reject(error);
  }
);

export default api;
