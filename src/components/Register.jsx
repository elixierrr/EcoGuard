import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      alert('First and Last names are required!');
      return;
    }

    setLoading(true);

    try {
      const formData = {
        email,
        password,
        firstName,
        lastName,
      };

      const response = await axios.post('http://localhost:3001/api/v1/auth/register', formData);

      if (response) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + (error.response?.data?.message || 'An unexpected error occurred.'));
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
            minHeight: '250px',
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
            <h2 className="text-center text-success mb-4" style={{ fontSize: '28px' }}>Register</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter your first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter your last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
                style={{ fontSize: '16px' }}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p className="text-center text-muted mt-3" style={{ fontSize: '14px' }}>
              Already have an account? <a href="/login" className="text-success">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;