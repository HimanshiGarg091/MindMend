import React, { useState } from 'react';
import './SignIn.css';

function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

const expertiseOptions = [
  'Anxiety',
  'Depression',
  'Relationship Issues',
  'Stress Management',
  'Trauma',
  'Other'
];
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

const SignUp = ({ onBack }) => {
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Therapist fields
  const [licenseNumber, setLicenseNumber] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [yearsExperience, setYearsExperience] = useState('');
  const [institution, setInstitution] = useState('');
  const [credentials, setCredentials] = useState(null);
  // Client fields
  const [age, setAge] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [concerns, setConcerns] = useState([]);
  const [communicationMode, setCommunicationMode] = useState('');
  // UI
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleExpertiseChange = (e) => {
    const value = e.target.value;
    setExpertise(
      expertise.includes(value)
        ? expertise.filter((item) => item !== value)
        : [...expertise, value]
    );
  };
  const handleConcernsChange = (e) => {
    const value = e.target.value;
    setConcerns(
      concerns.includes(value)
        ? concerns.filter((item) => item !== value)
        : [...concerns, value]
    );
  };
  const handleFileChange = (e) => {
    setCredentials(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password || password !== confirmPassword) {
      setError('Please fill all required fields and make sure passwords match.');
      return;
    }
    if (getPasswordStrength(password) < 3) {
      setError('Password is too weak.');
      return;
    }
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (role === 'therapist') {
      formData.append('licenseNumber', licenseNumber);
      expertise.forEach((exp) => formData.append('expertise', exp));
      formData.append('yearsExperience', yearsExperience);
      formData.append('institution', institution);
      if (credentials) formData.append('credentials', credentials);
    } else {
      formData.append('age', age);
      formData.append('preferredLanguage', preferredLanguage);
      concerns.forEach((c) => formData.append('concerns', c));
      formData.append('communicationMode', communicationMode);
    }
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess('Registration successful! You can now sign in.');
        setTimeout(() => { if (onBack) onBack(); }, 1500);
      } else {
        const data = await res.json();
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="signup-responsive-container">
      <form className="signup-responsive-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-role-row">
          <label>
            <input
              type="radio"
              value="client"
              checked={role === 'client'}
              onChange={() => setRole('client')}
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              value="therapist"
              checked={role === 'therapist'}
              onChange={() => setRole('therapist')}
            />
            Therapist
          </label>
        </div>
        <div className="signup-shared-fields">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(getPasswordStrength(e.target.value));
            }}
            minLength={8}
            maxLength={32}
            required
            className="signup-input"
          />
          <div className="password-strength">
            Password Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength]}
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-input"
          />
        </div>
        <div className="signup-role-sections">
          {role === 'therapist' && (
            <div className="signup-role-box">
              <input
                type="text"
                placeholder="License/Registration Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
                className="signup-input"
              />
              <label className="signup-label">Area of Expertise:</label>
              <div className="tags-container">
                {expertiseOptions.map((option) => (
                  <label key={option} className={`tag ${expertise.includes(option) ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={expertise.includes(option)}
                      onChange={handleExpertiseChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <input
                type="number"
                placeholder="Years of Experience"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                min="0"
                required
                className="signup-input"
              />
              <input
                type="text"
                placeholder="Affiliated Institution (optional)"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="signup-input"
              />
              <label className="signup-label">Upload Credentials (PDF or image):</label>
              <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="signup-input-file" />
            </div>
          )}
          {role === 'client' && (
            <div className="signup-role-box">
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                required
                className="signup-input"
              />
              <input
                type="text"
                placeholder="Preferred Language"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                required
                className="signup-input"
              />
              <label className="signup-label">Mental Health Concerns:</label>
              <div className="tags-container">
                {concernsOptions.map((option) => (
                  <label key={option} className={`tag ${concerns.includes(option) ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={concerns.includes(option)}
                      onChange={handleConcernsChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <label className="signup-label">Preferred Communication Mode:</label>
              <select value={communicationMode} onChange={(e) => setCommunicationMode(e.target.value)} required className="signup-input">
                <option value="">Select</option>
                {communicationModes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        {error && (<div className="error-message">{error}</div>)}
        {success && (<div className="success-message">{success}</div>)}
        <div className="signup-btn-row">
          <button type="button" className="signup-btn secondary" onClick={onBack}>Back to Sign In</button>
          <button type="submit" className="signup-btn primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
