import React, { useState } from 'react';
import './SignIn.css';

const expertiseOptions = [
  'Anxiety',
  'Depression',
  'Relationship Issues',
  'Stress Management',
  'Trauma',
  'Other'
];

const TherapistRegistration = ({ onBack }) => {
  const [license, setLicense] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [years, setYears] = useState('');
  const [institution, setInstitution] = useState('');
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [greeting, setGreeting] = useState('Welcome, future healer!');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleExpertiseChange = (e) => {
    const value = e.target.value;
    setExpertise(
      expertise.includes(value)
        ? expertise.filter((item) => item !== value)
        : [...expertise, value]
    );
    setShowUpload(value === 'Other' || expertise.length > 0);
  };

  const handleFileChange = (e) => {
    setCredentials(e.target.files[0]);
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
    if (!email || !password || password !== confirmPassword || !license || expertise.length === 0 || !years) {
      setError('Please fill all required fields and make sure passwords match.');
      return;
    }
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('license', license);
    expertise.forEach((exp) => formData.append('expertise', exp));
    formData.append('years', years);
    formData.append('institution', institution);
    if (credentials) formData.append('credentials', credentials);
    try {
      const res = await fetch('http://localhost:5000/api/therapist', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        alert('Therapist registered successfully!');
        if (onBack) onBack();
      } else {
        const data = await res.json();
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="signin-container therapist-bg">
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
            type="text"
            placeholder="License/Registration Number"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            aria-label="License or Registration Number"
          />
          <span className="tooltip">Upload license to verify professional status</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Area of Expertise:</label>
          <div className="tags-container">
            {expertiseOptions.map((option) => (
              <label key={option} className={`tag ${expertise.includes(option) ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  value={option}
                  checked={expertise.includes(option)}
                  onChange={handleExpertiseChange}
                  aria-label={option}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="input-group">
          <input
            type="number"
            placeholder="Years of Experience"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="0"
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            aria-label="Years of Experience"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Affiliated Institution (optional)"

      </form>
    </div>
  );
};

export default TherapistRegistration;
