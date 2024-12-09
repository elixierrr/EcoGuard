import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import Header from './components/Header';
import Report from './pages/Report';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/article" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
