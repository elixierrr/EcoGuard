import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/authContext';

import PublicHeader from './components/PubHeader';
import AdminHeader from './components/AdminHeader';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Halaman Publik
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';

// Halaman User
import Statistics from './pages/Statistics';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import Report from './pages/Report';

// Halaman Admin
import AdminDashboard from './admin/adminHome';
import AdminArticles from './admin/articles/index';
import AdminCreateArticle from './admin/articles/create';
import AdminUpdateArticle from './admin/articles/update';
import AdminReports from './admin/reports/index';

const App = () => {
  const { isLoggedIn, role, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Tampilkan indikator loading
  }

  const renderHeader = () => {
    const noHeaderRoutes = ['/login', '/register'];
    if (noHeaderRoutes.includes(window.location.pathname)) {
      return null;
    }
    if (!isLoggedIn) {
      return <PublicHeader />;
    }
    if (role === 'admin') {
      return <AdminHeader onLogout={logout} />;
    }
    return <Header onLogout={logout} />;
  };

  return (
    <>
      {renderHeader()}
      <Routes>
        {/* Halaman Publik */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman User */}
        <Route path="/user" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user/report/create" element={<ProtectedRoute><Report /></ProtectedRoute>} />
        <Route path="/user/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
        <Route path="/user/article" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
        <Route path="/user/article/:articleId" element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />
        <Route path="/user/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

        {/* Halaman Admin */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/articles" element={<ProtectedRoute requiredRole="admin"><AdminArticles /></ProtectedRoute>} />
        <Route path="/admin/articles/create" element={<ProtectedRoute requiredRole="admin"><AdminCreateArticle /></ProtectedRoute>} />
        <Route path="/admin/articles/update/:id" element={<ProtectedRoute requiredRole="admin"><AdminUpdateArticle /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><AdminReports /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
