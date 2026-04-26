import axios from 'axios';

/**
 * Pre-configured Axios instance for the MediSync API.
 * Automatically attaches the JWT Bearer token from localStorage on every request.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// ── Request interceptor: attach token ──────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('mediSync_user');
    if (stored) {
      try {
        const { token } = JSON.parse(stored);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // malformed storage — ignore
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 globally ──────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local session and let the router redirect to /signup
      localStorage.removeItem('mediSync_user');
      localStorage.removeItem('mediSync_onboarding_done');
      window.dispatchEvent(new Event('mediSync:logout'));
    }
    return Promise.reject(error);
  }
);

export default api;
