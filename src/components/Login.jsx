import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import Logo from '../assets/logo.png';
import { useAuth } from '../context/authContext';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading menjadi true

    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {  
        const token  = response.data.content.tokens.accessToken.token; 
        const role = response.data.content.user.role;
        const userId = response.data.content.user.id;
        login(token, role, userId);
        navigate('/user'); // Redirect ke halaman user
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Please try again.'));
    } finally {
      setLoading(false); // Set loading menjadi false
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
    backgroundColor: loading ? '#a5d6a7' : '#388e3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    width: '100%',
    fontSize: '16px',
    cursor: loading ? 'not-allowed' : 'pointer',
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
            <button type="submit" style={buttonStyle} className="mt-4" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
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
