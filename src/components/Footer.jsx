import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#DAF5B6', // Sama dengan header
    color: '#388e3c',
    textAlign: 'center',
    padding: '10px 0',
    marginTop: '20px',
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} EcoGuard. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
