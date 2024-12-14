import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { useAuth } from '../context/authContext';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.content.tokens.accessToken.token;
        const role = response.data.content.user.role;
        const userId = response.data.content.user.id;
        login(token, role, userId);
        navigate('/user');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#DAF5B6' }}
    >
      <div className="row w-100">
        {/* Cover Section */}
        <div
          className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center bg-white p-4 shadow order-1"
          style={{
            minHeight: '650px',
            borderTopRightRadius: '50px',
            borderBottomRightRadius: '50px',
          }}
        >
          <img
            src={Logo}
            alt="EcoGuard Logo"
            className="img-fluid"
            style={{ maxWidth: '250px', transform: 'rotate(90deg)' }}
          />
        </div>

        {/* Form Section */}
        <div
          className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center p-4 order-2 order-md-1"
        >
          <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center text-success mb-4" style={{ fontSize: '28px' }}>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
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
              <div className="form-group mb-3">
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
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
                style={{ fontSize: '16px' }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p className="text-center text-muted mt-3" style={{ fontSize: '14px' }}>
              Don't have an account? <a href="/register" className="text-success">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
