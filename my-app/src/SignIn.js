import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ onSignIn, onShowSignUp, isNewUser }) => {
  const [userType, setUserType] = useState('Client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Check if user role matches
        if (
          (userType === 'Therapist' && data.role === 'therapist') ||
          (userType === 'Client' && data.role === 'client')
        ) {
          // ✅ Save token to localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('userType', data.role);

          // ✅ Optional: Pass token to parent component
          if (onSignIn) onSignIn(data);

          // ✅ Redirect to dashboard/home
          window.location.href = '/';
        } else {
          setError('Role does not match. Please select the correct role.');
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {isNewUser && (
          <div
            className="new-user-message"
            style={{
              color: '#0077b6',
              marginBottom: '1rem',
              fontWeight: 'bold',
            }}
          >
            Welcome! Please sign in with your new account.
          </div>
        )}

        <div className="user-type-row">
          <label>
            <input
              type="radio"
              value="Client"
              checked={userType === 'Client'}
              onChange={() => setUserType('Client')}
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              value="Therapist"
              checked={userType === 'Therapist'}
              onChange={() => setUserType('Therapist')}
            />
            Therapist
          </label>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit-btn">Sign In</button>

        <div className="form-links-row">
          <span className="forgot" tabIndex={0} role="link">Forgot password?</span>
          <span className="signup-link">
            New user?{' '}
            <span
              onClick={onShowSignUp}
              style={{ color: '#0077b6', cursor: 'pointer', textDecoration: 'underline' }}
              tabIndex={0}
              role="link"
            >
              Sign Up
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
