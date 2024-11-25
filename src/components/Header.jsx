import React from 'react';
import Logo from '../assets/logo.png';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#DAF5B6',
    padding: '10px 20px',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoImageStyle = {
    height: '40px',
    marginRight: '10px',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  };

  const navLinkStyle = {
    color: '#388e3c',
    fontWeight: '500',
    textDecoration: 'none',
    marginLeft: '15px',
  };

  const loginButtonStyle = {
    backgroundColor: '#388e3c',
    color: '#fff',
    borderRadius: '5px',
    padding: '8px 15px',
    marginLeft: '15px',
  };

  return (
    <header style={headerStyle}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div style={logoStyle}>
          <img src={Logo} alt="EcoGuard Logo" style={logoImageStyle} />
        </div>

        {/* Navigation and Login */}
        <div className="d-flex align-items-center">
          <nav>
            <ul style={navStyle}>
              <li className="nav-item">
                <a className="nav-link" href="/" style={navLinkStyle}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/report" style={navLinkStyle}>
                  Report
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/statistics" style={navLinkStyle}>
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/article" style={navLinkStyle}>
                  Article
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact" style={navLinkStyle}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Login Button */}
          <button style={loginButtonStyle}>Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
