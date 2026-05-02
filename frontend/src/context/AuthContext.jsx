import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import api from '../utils/api';
import storage from '../utils/storage';

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
    storage.clearAll();
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const stored = storage.getLocal('mediSync_user');
      if (!stored) return;

      const { token } = stored;
      if (!token) return;

      const { data } = await api.get('/auth/me');
      if (data) {
        const updatedUser = { ...data, token: data.token || token };
        setUser(updatedUser);
        storage.setLocal('mediSync_user', updatedUser);
      }
    } catch (err) {
      if (err.response?.status === 401) logout();
    }
  }, [logout]);

  const login = useCallback((userData) => {
    setUser(userData);
    storage.setLocal('mediSync_user', userData);
  }, []);

  const signup = useCallback((userData) => {
    storage.setLocal('mediSync_user', userData);
    setUser(userData);
    storage.removeLocal('mediSync_onboarding_done');
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    const initAuth = async () => {
      const stored = storage.getLocal('mediSync_user');
      if (stored) {
        try {
          if (stored?.token) {
            setUser(stored);

            try {
              const { data } = await api.get('/auth/me');
              if (data) {
                const updatedUser = { ...data, token: data.token || stored.token };
                setUser(updatedUser);
                storage.setLocal('mediSync_user', updatedUser);
              }
            } catch (refreshErr) {
              console.warn('📡 [AUTH SYNC]: Background refresh failed, keeping local session.');

              if (refreshErr.response?.status === 401) logout();
            }
          }
        } catch (err) {
          console.error('Auth Init Error:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();


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
