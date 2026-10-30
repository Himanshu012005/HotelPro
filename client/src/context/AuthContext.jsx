import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hotelpro_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.toLowerCase().includes('aniket')) {
          parsed.name = 'Himanshu Sanodiya';
          parsed.email = 'himanshu.travel@gmail.com';
          localStorage.setItem('hotelpro_user', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {}
    }
    return {
      id: 'usr_guest_01',
      name: 'Himanshu Sanodiya',
      email: 'himanshu.travel@gmail.com',
      role: 'guest',
      geniusLevel: 2
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('hotelpro_token') || 'demo_token');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('hotelpro_user', JSON.stringify(data.user));
      localStorage.setItem('hotelpro_token', data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('hotelpro_user', JSON.stringify(data.user));
      localStorage.setItem('hotelpro_token', data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const switchRolePreset = (role) => {
    if (role === 'guest') {
      const u = { id: 'usr_guest_01', name: 'Himanshu Sanodiya', email: 'himanshu.travel@gmail.com', role: 'guest', geniusLevel: 2 };
      setUser(u);
      localStorage.setItem('hotelpro_user', JSON.stringify(u));
    } else if (role === 'staff') {
      const u = { id: 'usr_staff_01', name: 'Kenji Sato (Front Desk)', email: 'staff@hotelpro.com', role: 'staff', geniusLevel: 2 };
      setUser(u);
      localStorage.setItem('hotelpro_user', JSON.stringify(u));
    } else if (role === 'admin') {
      const u = { id: 'usr_admin_01', name: 'Hotel General Manager', email: 'admin@hotelpro.com', role: 'admin', geniusLevel: 2 };
      setUser(u);
      localStorage.setItem('hotelpro_user', JSON.stringify(u));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hotelpro_user');
    localStorage.removeItem('hotelpro_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, switchRolePreset }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
