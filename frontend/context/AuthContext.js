'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
          console.log('✅ User authenticated:', currentUser.name);
        } else {
          console.log('⚠️ Token exists but no user data');
          localStorage.removeItem('token');
        }
      } else {
        console.log('ℹ️ No token found');
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      // Backend returns: { success, data: { token, user } }
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${response.data.user.name}! 🙏`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      // Backend returns: { success, data: { token, user } }
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success(`Welcome to BrajPath, ${response.data.user.name}! 🎉`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully. Jai Shri Krishna! 🙏');
  };

  const updateUser = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      setUser(response.data);
      toast.success('Profile updated successfully!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
