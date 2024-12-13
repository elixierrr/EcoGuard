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
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };
      console.log(JSON.stringify(formData));

      const response = await axios.post('http://localhost:3001/api/v1/auth/register', formData);

      if (response) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      console.log('Registration error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      } else {
        console.log('Error details:', error);
      }
      alert(
        'Registration failed: ' +
          (error.response?.data?.message || 'An unexpected error occurred.')
      );
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    page: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#DAF5B6',
    },
    cover: {
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
    },
    logo: {
      width: '300px',
      marginBottom: '20px',
    },
    formContainer: {
      flex: 1.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: loading ? '#a5d6a7' : '#388e3c',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      width: '100%',
      fontSize: '16px',
      cursor: loading ? 'not-allowed' : 'pointer',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.cover}>
        <img src={Logo} alt="EcoGuard Logo" style={styles.logo} />
      </div>

      <div style={styles.formContainer}>
        <div style={styles.form}>
          <h2 className="text-center text-success" style={{ fontSize: '28px' }}>
            Register
          </h2>
          <form onSubmit={handleRegister}>
            <div className="form-group mt-3">
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
            <div className="form-group mt-3">
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
            <div className="form-group mt-3">
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
              style={styles.button}
              className="mt-4"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="text-center text-muted mt-3" style={{ fontSize: '14px' }}>
            Already have an account?{' '}
            <a href="/login" className="text-success">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
