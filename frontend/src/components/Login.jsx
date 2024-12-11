import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../assets/logo.png';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleLogin = (e) => {
    e.preventDefault();

    // Lakukan validasi login (misalnya cek email dan password)
    if (email === 'user@example.com' && password === 'password') {
      // Set status login ke localStorage
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true); // Update state isLoggedIn
      
      // Redirect ke halaman user setelah login berhasil
      navigate('/user');
    } else {
      alert('Invalid credentials');
    }
  };

  const pageStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#DAF5B6',
  };

  const coverStyle = {
    flex: 0.5,
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
    width: '500px',
    transform: 'rotate(90deg)',
    marginBottom: '20px',
  };

  const formContainerStyle = {
    flex: 1.5,
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
      <div style={coverStyle}>
        <img src={Logo} alt="EcoGuard Logo" style={logoStyle} />
      </div>

      <div style={formContainerStyle}>
        <div style={formStyle}>
          <h2 className="text-center text-success" style={{ fontSize: '28px' }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" style={buttonStyle} className="mt-4">Login</button>
          </form>
          <p className="text-center text-muted mt-3" style={{ fontSize: '14px' }}>
            Don't have an account? <a href="/register" className="text-success">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
