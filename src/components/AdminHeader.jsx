import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useAuth } from '../context/authContext';

const AdminHeader = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  const headerStyle = {
    backgroundColor: '#DAF5B6',
    padding: '10px 0',
  };

  const logoImageStyle = {
    height: '40px',
  };

  const navLinkStyle = {
    color: '#388e3c',
    fontWeight: '500',
    textDecoration: 'none',
  };

  const logoutButtonStyle = {
    backgroundColor: '#d32f2f',
    color: '#fff',
    borderRadius: '5px',
    padding: '8px 15px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <header style={headerStyle}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          {/* Logo */}
          <a className="navbar-brand" href="/admin">
            <img src={Logo} alt="Admin Logo" style={logoImageStyle} />
          </a>

          {/* Hamburger Menu (Toggler) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link px-2" href="/admin/articles" style={navLinkStyle}>
                  Articles
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/admin/reports" style={navLinkStyle}>
                  Reports
                </a>
              </li>
            </ul>

            {/* Logout Button */}
            <button
              style={{ ...logoutButtonStyle, marginLeft: '20px' }}
              onClick={() => {
                logout()
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
