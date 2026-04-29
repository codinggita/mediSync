import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  refreshUser: () => {},
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const storedUser = localStorage.getItem('mediSync_user');
      if (!storedUser) return;

      const currentUser = JSON.parse(storedUser);
      const { token } = currentUser;
      if (!token) return;

      const { data } = await api.get('/auth/me');
      if (data) {
        // Persistence Guard: Merge fresh data with existing token
        const updatedUser = {
          ...data,
          token: data.token || token,
        };
        setUser(updatedUser);
        localStorage.setItem('mediSync_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error('Failed to refresh user data', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('mediSync_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.token) {
          setUser(parsed);
          refreshUser(); // Sync with backend
        } else {
          // If token is missing, the session is invalid
          logout();
        }
      } catch (err) {
        logout();
      }
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('mediSync_user', JSON.stringify(userData));
  };

  // Called after successful signup — clears onboarding so the tour shows
  const signup = (userData) => {
    setUser(userData);
    localStorage.setItem('mediSync_user', JSON.stringify(userData));
    localStorage.removeItem('mediSync_onboarding_done'); // reset tour for new account
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mediSync_user');
    localStorage.removeItem('mediSync_onboarding_done'); // next person gets the tour
  };

  const value = {
    user,
    login,
    signup,
    logout,
    refreshUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
