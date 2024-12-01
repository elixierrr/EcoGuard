import React from 'react';
import Logo from '../assets/logo.png';

const Header = () => {
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

  const loginButtonStyle = {
    backgroundColor: '#388e3c',
    color: '#fff',
    borderRadius: '5px',
    padding: '8px 15px',
    border: 'none',
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
                <a className="nav-link px-2" href="/" style={navLinkStyle}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/report" style={navLinkStyle}>
                  Report
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/statistics" style={navLinkStyle}>
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/article" style={navLinkStyle}>
                  Article
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-2" href="/contact" style={navLinkStyle}>
                  Contact
                </a>
              </li>
            </ul>

            {/* Login Button */}
            <button style={{ ...loginButtonStyle, marginLeft: '20px' }} href="/login">Login</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
