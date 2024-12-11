import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicHeader from './components/PubHeader';
import AdminHeader from './components/AdminHeader';
import Header from './components/Header';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek status login saat aplikasi pertama kali dimuat
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const renderHeader = () => {
    if (isLoggedIn) {
      return <Header />;
    }
    return <PublicHeader />;
  };

  return (
    <Router>
      {renderHeader()}
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* Rute User */}
        <Route path="/user" element={<Home />} />
        <Route path="/user/report" element={<Report />} />
        <Route path="/user/statistics" element={<Statistics />} />
        <Route path="/user/article" element={<Articles />} />
        <Route path="/user/article/:articleId" element={<ArticleDetail />} />
        <Route path="/user/contact" element={<Contact />} />

        {/* Rute Admin */}
        <Route path="/admin" element={<><AdminHeader /><AdminDashboard /></>} />
        <Route path="/admin/articles" element={<><AdminHeader /><AdminArticles /></>} />
        <Route path="/admin/articles/create" element={<><AdminHeader /><AdminCreateArticle /></>} />
        <Route path="/admin/articles/update/:id" element={<><AdminHeader /><AdminUpdateArticle /></>} />
        <Route path="/admin/reports" element={<><AdminHeader /><AdminReports /></>} />
      </Routes>
    </Router>
  );
};

export default App;
