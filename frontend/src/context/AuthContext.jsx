import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  refreshUser: () => {},
  loading: true
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
      
      const { token } = JSON.parse(storedUser);
      if (!token) return;

      const { data } = await api.get('/auth/me');

      if (data) {
        const updatedUser = { ...data, token }; // keep the token
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
      setUser(JSON.parse(storedUser));
      refreshUser(); // Sync with backend immediately on mount
    }
    
    // Periodically sync user profile (e.g. for role changes by admin)
    const interval = setInterval(refreshUser, 60000); // every 60s
    
    setLoading(false);
    return () => clearInterval(interval);
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
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
