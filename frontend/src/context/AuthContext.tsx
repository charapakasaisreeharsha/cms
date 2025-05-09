import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Define the structure of the User object
interface User {
  id: string;
  name: string;
  phone_number: string;
  unit?: string;
  employee_id?: string;
  role: 'resident' | 'security' | 'admin';
}

// Define the structure of the AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phoneNumber: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isResident: boolean;
  isSecurity: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to manage authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session (user and token in localStorage)
    const storedUser = localStorage.getItem('societyUser');
    const storedToken = localStorage.getItem('societyToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (phoneNumber: string, password: string, role: string) => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
      const response = await axios.post(
        `${apiUrl.replace(/\/+$/, '')}/api/auth/login`, {
        phone_number: phoneNumber,
        password,
        role,
      });

      const userData: User = {
        id: response.data.id,
        name: response.data.name,
        phone_number: response.data.phone_number,
        unit: response.data.unit || undefined,
        employee_id: response.data.employee_id || undefined,
        role: response.data.role,
      };

      setUser(userData);
      localStorage.setItem('societyUser', JSON.stringify(userData));
      localStorage.setItem('societyToken', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw error.response?.data?.error || 'Login failed';
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('societyUser');
    localStorage.removeItem('societyToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isResident: user?.role === 'resident',
    isSecurity: user?.role === 'security',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};