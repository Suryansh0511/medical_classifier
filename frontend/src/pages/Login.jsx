import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        // Basic validation
        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            console.log("Attempting login...");
            const response = await API.post('/auth/login', form);
            console.log("Login success:", response.data);

            // Save token and user to context
            login(response.data.token, response.data.user);

            // Redirect to predict page
            navigate('/predict');

        } catch (err) {
            console.error("Login error:", err);
            if (err.response) {
                setError(err.response.data.detail || 'Invalid credentials');
            } else if (err.request) {
                setError('Cannot connect to server. Is backend running?');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                {/* Logo */}
                <div style={styles.logo}>🏥</div>
                <h1 style={styles.title}>MediClassify</h1>
                <p style={styles.subtitle}>Welcome back! Please login.</p>

                {/* Error Message */}
                {error && (
                    <div style={styles.error}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Email Input */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                    />
                </div>

                {/* Password Input */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                    />
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        ...styles.button,
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? '⏳ Logging in...' : '🔐 Login'}
                </button>

                {/* Signup Link */}
                <p style={styles.linkText}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={styles.link}>
                        Sign Up
                    </Link>
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
        padding: '20px',
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
        alignItems: 'center',
    },
    logo: {
        fontSize: '48px',
        marginBottom: '8px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1a73e8',
        margin: '0 0 8px 0',
    },
    subtitle: {
        fontSize: '14px',
        color: '#666',
        margin: '0 0 24px 0',
    },
    error: {
        backgroundColor: '#fde8e8',
        color: '#c0392b',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '16px',
        width: '100%',
        fontSize: '14px',
        textAlign: 'center',
    },
    inputGroup: {
        width: '100%',
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '6px',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border 0.2s',
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#1a73e8',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        marginTop: '8px',
        marginBottom: '16px',
        transition: 'background 0.2s',
    },
    linkText: {
        fontSize: '14px',
        color: '#666',
        margin: '0',
    },
    link: {
        color: '#1a73e8',
        textDecoration: 'none',
        fontWeight: '600',
    },
};

export default Login;