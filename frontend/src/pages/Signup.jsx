import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError('');
    setLoading(true);

    console.log("SIGNUP CLICKED");
    console.log("FORM:", form);

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      console.log("SENDING REQUEST...");

      const response = await API.post('/auth/signup', form);

      console.log("RESPONSE:", response.data);

      // ✅ FIXED (correct key)
      localStorage.setItem("token", response.data.access_token);

      alert("Signup successful!");

      navigate('/predict');

    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("ERROR DATA:", err.response?.data);

      if (err.response) {
        setError(err.response.data.detail || 'Signup failed');
      } else {
        setError('Cannot connect to server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🏥</div>

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join MediClassify today!</p>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name *</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email *</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password *</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone (optional)</label>
          <input
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? '⏳ Creating account...' : '✅ Create Account'}
        </button>

        <p style={styles.linkText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  logo: {
    fontSize: '48px',
    marginBottom: '8px'
  },

  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: '8px'
  },

  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px'
  },

  error: {
    backgroundColor: '#fde8e8',
    color: '#c0392b',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '16px',
    width: '100%',
    fontSize: '14px',
    textAlign: 'center'
  },

  inputGroup: {
    width: '100%',
    marginBottom: '16px'
  },

  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '6px'
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },

  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '8px',
    marginBottom: '16px',
    cursor: 'pointer'
  },

  linkText: {
    fontSize: '14px',
    color: '#666'
  },

  link: {
    color: '#1a73e8',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Signup;