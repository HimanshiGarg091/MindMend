import React, { useState } from 'react';
import './SignIn.css';

const concernsOptions = [
  'Anxiety',
  'Depression',
  'Stress',
  'Relationship',
  'Sleep',
  'Self-Esteem',
  'Other'
];

const communicationModes = [
  'Chat',
  'Video Call',
  'In-Person'
];

const ClientRegistration = ({ onBack }) => {
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('');
  const [concerns, setConcerns] = useState([]);
  const [mode, setMode] = useState('');
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState("Let's support your journey!");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConcernsChange = (e) => {
    const value = e.target.value;
    setConcerns(
      concerns.includes(value)
        ? concerns.filter((item) => item !== value)
        : [...concerns, value]
    );
  };

  const handleFocus = (e) => {
    e.target.parentNode.classList.add('focused');
  };
  const handleBlur = (e) => {
    e.target.parentNode.classList.remove('focused');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || password !== confirmPassword || !age || !language || concerns.length === 0 || !mode) {
      setError('Please fill all required fields and make sure passwords match.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/signup', { // ✅ Correct endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role: 'client', // ✅ Role added
          age,
          preferredLanguage: language, // ✅ Correct field name
          concerns,
          communicationMode: mode // ✅ Correct field name
        }),
      });

      if (res.ok) {
        alert('Client registered successfully!');
        if (onBack) onBack();
      } else {
        const data = await res.json();
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Client Registration Error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="signin-container client-bg">
      <form className="signin-form animated-form" onSubmit={handleSubmit}>
        <h2 className="role-heading">{greeting}</h2>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-label="Confirm Password"
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            aria-label="Age"
          />
          <span className="tooltip">We never share your data</span>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Preferred Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            aria-label="Preferred Language"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Mental Health Concerns:</label>
          <div className="tags-container">
            {concernsOptions.map((option) => (
              <label key={option} className={`tag ${concerns.includes(option) ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  value={option}
                  checked={concerns.includes(option)}
                  onChange={handleConcernsChange}
                  aria-label={option}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="input-group">
          <label>Preferred Communication Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} required aria-label="Preferred Communication Mode">
            <option value="">Select</option>
            {communicationModes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <button type="button" className="animated-btn" onClick={onBack} style={{ marginBottom: '10px' }}>Back to Sign In</button>
        <button type="submit" className="animated-btn">Register</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default ClientRegistration;
