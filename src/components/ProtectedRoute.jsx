import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, role, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Indikator loading
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />; // Atau ke halaman `Unauthorized`
  }

  return children;
};

export default ProtectedRoute;
