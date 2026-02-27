import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('inspiroai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, userpassword) => {
    try {
      const response = await api.post('/auth/login', {
        useremail: email,
        password: userpassword
      })
      const { data, accessToken, refreshToken } = response.data;

      const userData = {
        id: data._id,
        name: data.userName,
        email: data.email,
      }
      setUser(userData);

      localStorage.setItem('inspiroai_user', JSON.stringify(userData));
      localStorage.setItem('inspiroai_access_token', accessToken);
      localStorage.setItem('inspiroai_refresh_token', refreshToken);

      return userData;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        username: name,
        useremail: email,
        userpassword: password
      })
      const { data, accessToken, refreshToken } = response.data;

      const userData = {
        id: data._id,
        name: data.userName,
        email: data.email,
      }

      setUser(userData);

      localStorage.setItem('inspiroai_user', JSON.stringify(userData));
      localStorage.setItem('inspiroai_access_token', accessToken);
      localStorage.setItem('inspiroai_refresh_token', refreshToken);

      return userData;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inspiroai_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    setUser, // Expose setUser to allow updating user data after profile updates
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
