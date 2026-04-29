import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mediSync_user');
    localStorage.removeItem('mediSync_onboarding_done');
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const stored = localStorage.getItem('mediSync_user');
      if (!stored) return;

      const { token } = JSON.parse(stored);
      if (!token) return;

      const { data } = await api.get('/auth/me');
      if (data) {
        const updatedUser = { ...data, token: data.token || token };
        setUser(updatedUser);
        localStorage.setItem('mediSync_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      if (err.response?.status === 401) logout();
    }
  }, [logout]);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('mediSync_user', JSON.stringify(userData));
  }, []);

  const signup = useCallback((userData) => {
    localStorage.setItem('mediSync_user', JSON.stringify(userData));
    setUser(userData);
    localStorage.removeItem('mediSync_onboarding_done');
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    const initAuth = async () => {
      const stored = localStorage.getItem('mediSync_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.token) {
            setUser(parsed);
            await refreshUser();
          } else {
            logout();
          }
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();

    // ── Multi-Tab Logout Sync ──
    const handleStorageChange = (e) => {
      if (e.key === 'mediSync_user' && !e.newValue) {
        logout();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout, refreshUser]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    refreshUser,
    loading,
  }), [user, login, signup, logout, refreshUser, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
