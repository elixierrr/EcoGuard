import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan indikator loading

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId")
    setIsLoggedIn(loggedIn);
    setRole(userRole);
    setToken(token);
    setUserId(userId);
    setIsLoading(false); // Inisialisasi selesai
  }, []);

  const login = (token, userRole, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', userRole);
    localStorage.setItem('isLoggedIn', 'true');

    setIsLoggedIn(true);
    setToken(token);
    setUserId(userId);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, isLoading, token, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
