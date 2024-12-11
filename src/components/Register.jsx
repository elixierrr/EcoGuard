import React from 'react';
import Logo from '../assets/logo.png';

const Register = () => {
  const pageStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#DAF5B6',
  };

  const coverStyle = {
    flex: 0.5, // Ukuran lebih kecil
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    width: '500px', // Ukuran lebih kecil
    transform: 'rotate(90deg)', // Rotasi vertikal
    marginBottom: '20px',
  };

  const formContainerStyle = {
    flex: 1.5, // Proporsi lebih besar untuk form
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#388e3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    width: '100%',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={pageStyle}>
      {/* Cover Section */}
      <div style={coverStyle}>
        <img src={Logo} alt="EcoGuard Logo" style={logoStyle} />
      </div>

      {/* Form Section */}
      <div style={formContainerStyle}>
        <div style={formStyle}>
          <h2 className="text-center text-success" style={{ fontSize: '28px' }}>Register</h2>
          <form>
            <div className="form-group mt-3">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" style={buttonStyle} className="mt-4">Register</button>
          </form>
          <p className="text-center text-muted mt-3" style={{ fontSize: '14px' }}>
            Already have an account? <a href="/login" className="text-success">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
