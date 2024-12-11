import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '50px',
    background: 'linear-gradient(to bottom, #DAF5B6, #ffffff)',
    minHeight: '100vh',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  };

  const cardStyle = {
    backgroundColor: '#f1f8e9',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '250px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#388e3c', fontSize: '36px', fontWeight: 'bold' }}>Admin Dashboard</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>Manage Reports, Articles, and more</p>
      <div style={cardContainerStyle}>
        <Link to="/admin/reports" style={{ textDecoration: 'none' }}>
          <div style={{ ...cardStyle }} className="hover-card">
            <h3 style={{ color: '#388e3c' }}>Manage Reports</h3>
          </div>
        </Link>
        <Link to="/admin/articles" style={{ textDecoration: 'none' }}>
          <div style={{ ...cardStyle }} className="hover-card">
            <h3 style={{ color: '#388e3c' }}>Manage Articles</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
