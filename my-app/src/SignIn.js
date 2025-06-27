import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ onSignIn, onShowSignUp }) => {
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
        // Check role match
        if (
          (userType === 'Therapist' && data.role === 'therapist') ||
          (userType === 'Client' && data.role === 'client')
        ) {
          window.location.href = '/'; // Redirect to home page
        } else {
          setError('Role does not match. Please select the correct role.');
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="user-type">
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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign In</button>
        <div className="forgot">Forgot password?</div>
        <div className="signup-link">
          New user?{' '}
          <span
            onClick={onShowSignUp}
            style={{
              color: '#0077b6',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
