import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan indikator loading

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');
    setIsLoggedIn(loggedIn);
    setRole(userRole);
    setIsLoading(false); // Inisialisasi selesai
  }, []);

  const login = (token, userRole, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', userRole);
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
