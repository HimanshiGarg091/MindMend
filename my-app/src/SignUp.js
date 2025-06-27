import React, { useState } from 'react';
import './Register.css';

const defaultFields = {
  user: 'client',
  email: '',
  pass: '',
  confirm: '',
  licenseId: '',
  focusAreas: [],
  experience: '',
  institution: '',
  credentialFile: null,
  age: '',
  language: '',
  issues: [],
  mode: ''
};

const options = {
  specialties: ['Anxiety', 'Depression', 'Relationship Issues', 'Stress Management', 'Trauma', 'Other'],
  concerns: ['Anxiety', 'Depression', 'Stress', 'Relationship', 'Sleep', 'Self-Esteem', 'Other'],
  modes: ['Chat', 'Video Call', 'In-Person']
};

const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState(defaultFields);
  const [status, setStatus] = useState({ error: '', message: '', strength: 0 });

  const evaluateStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const toggleSelection = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value]
    }));
  };

  const updateValue = (key, val) => {
    setForm((f) => ({
      ...f,
      [key]: key === 'pass' ? val : val
    }));
    if (key === 'pass') {
      setStatus((s) => ({ ...s, strength: evaluateStrength(val) }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus({ error: '', message: '', strength: status.strength });

    if (!form.email || !form.pass || form.pass !== form.confirm) {
      return setStatus((s) => ({ ...s, error: 'Please fill required fields correctly.' }));
    }
    if (evaluateStrength(form.pass) < 3) {
      return setStatus((s) => ({ ...s, error: 'Your password isn’t strong enough.' }));
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (Array.isArray(val)) val.forEach((v) => payload.append(key, v));
      else if (val) payload.append(key, val);
    });

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        body: payload
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ error: '', message: 'Successfully registered!', strength: 0 });
        setTimeout(() => onSwitch && onSwitch(), 1000);
      } else {
        setStatus((s) => ({ ...s, error: data.error || 'Signup failed' }));
      }
    } catch {
      setStatus((s) => ({ ...s, error: 'Server issue. Try again later.' }));
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={submitHandler}>
        <h1 style={{ marginBottom: '1.5rem' }}>Create Account</h1>
        <div className="role-selector" style={{ marginBottom: '1.2rem', display: 'flex', gap: '1.5rem' }}>
          {['client', 'therapist'].map((r) => (
            <label key={r} style={{ fontWeight: 500 }}>
              <input
                type="radio"
                value={r}
                checked={form.user === r}
                onChange={() => updateValue('user', r)}
                style={{ marginRight: '0.5rem' }}
              />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
          ))}
        </div>

        <div className="input-group" style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateValue('email', e.target.value)}
            required
          />
        </div>

        <div className="input-group" style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={form.pass}
            onChange={(e) => updateValue('pass', e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem', color: '#0077b6', fontWeight: 500 }}>
          Password Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][status.strength]}
        </div>

        <div className="input-group" style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={(e) => updateValue('confirm', e.target.value)}
            required
          />
        </div>

        {form.user === 'therapist' ? (
          <>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="License Number"
                value={form.licenseId}
                onChange={(e) => updateValue('licenseId', e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group" style={{ marginBottom: '1rem' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Expertise</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {options.specialties.map((item) => (
                  <label key={item} style={{ fontWeight: 400 }}>
                    <input
                      type="checkbox"
                      value={item}
                      checked={form.focusAreas.includes(item)}
                      onChange={() => toggleSelection('focusAreas', item)}
                      style={{ marginRight: '0.4rem' }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <input
                type="number"
                placeholder="Years of Experience"
                value={form.experience}
                onChange={(e) => updateValue('experience', e.target.value)}
                required
              />
            </div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Institution (optional)"
                value={form.institution}
                onChange={(e) => updateValue('institution', e.target.value)}
              />
            </div>
            <label style={{ marginBottom: '1rem', fontWeight: 500 }}>
              Upload Credentials:
              <input type="file" accept=".pdf,image/*" onChange={(e) => updateValue('credentialFile', e.target.files[0])} style={{ marginLeft: '0.5rem' }} />
            </label>
          </>
        ) : (
          <>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => updateValue('age', e.target.value)}
                required
              />
            </div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Preferred Language"
                value={form.language}
                onChange={(e) => updateValue('language', e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group" style={{ marginBottom: '1rem' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Concerns</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {options.concerns.map((item) => (
                  <label key={item} style={{ fontWeight: 400 }}>
                    <input
                      type="checkbox"
                      value={item}
                      checked={form.issues.includes(item)}
                      onChange={() => toggleSelection('issues', item)}
                      style={{ marginRight: '0.4rem' }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="input-group" style={{ marginBottom: '1.2rem' }}>
              <select
                value={form.mode}
                onChange={(e) => updateValue('mode', e.target.value)}
                required
                style={{ padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1.5px solid #b3c6e0', fontSize: '1rem' }}
              >
                <option value="">Select Communication Mode</option>
                {options.modes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {status.error && <p className="error-msg" style={{ color: 'red', marginBottom: '1rem' }}>{status.error}</p>}
        {status.message && <p className="success-msg" style={{ color: 'green', marginBottom: '1rem' }}>{status.message}</p>}

        <div className="button-stack">
          <div className="register-row">
            <button type="submit" className="dark-btn">Register</button>
            <button type="button" className="register-link" onClick={onSwitch}>Back to Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
