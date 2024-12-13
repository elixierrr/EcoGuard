import React from 'react';
import Logo from '../assets/logo.png';
import { useAuth } from '../context/authContext';

const Header = ({ setIsLoggedIn }) => {

  const {logout} = useAuth();
  const handleLogout = () => {
    logout()
  };

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

  const buttonStyle = {
    backgroundColor: '#388e3c',
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
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="EcoGuard Logo" style={logoImageStyle} />
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
                <a className="nav-link px-2" href="/user" style={navLinkStyle}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/user/report/create" style={navLinkStyle}>
                  Report
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/user/statistics" style={navLinkStyle}>
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/user/article" style={navLinkStyle}>
                  Article
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/user/contact" style={navLinkStyle}>
                  Contact
                </a>
              </li>
            </ul>

            {/* Logout Button */}
            <button
              style={{ ...buttonStyle, marginLeft: '20px' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
