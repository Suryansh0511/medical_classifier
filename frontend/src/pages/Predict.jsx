import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const commonSymptoms = [
  'fever', 'headache', 'cough', 'chest pain', 'joint pain',
  'skin rash', 'vomiting', 'fatigue', 'breathlessness', 'nausea',
  'stomach pain', 'back pain', 'dizziness', 'itching', 'swelling'
];

const Predict = () => {
  const navigate  = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const addSymptom = (s) => {
    setSymptoms(prev => prev ? `${prev} ${s}` : s);
  };

  const handlePredict = async () => {
    if (!symptoms.trim()) {
      setError('Please enter your symptoms');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/predict', { symptoms });
      navigate('/result', { state: { result: response.data, symptoms } });
    } catch (err) {
      setError('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🔍 Symptom Checker</h1>
          <p style={styles.subtitle}>
            Describe your symptoms below and we'll recommend
            the right medical department
          </p>

          {error && <div style={styles.error}>⚠️ {error}</div>}

          <label style={styles.label}>Your Symptoms</label>
          <textarea
            placeholder="e.g. fever headache stiff neck, chest pain breathlessness..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            style={styles.textarea}
            rows={4}
          />

          {/* Quick Symptom Buttons */}
          <p style={styles.quickLabel}>Quick Add:</p>
          <div style={styles.tagRow}>
            {commonSymptoms.map((s, i) => (
              <button key={i} onClick={() => addSymptom(s)} style={styles.tag}>
                + {s}
              </button>
            ))}
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '⏳ Analyzing...' : '🔍 Find Department'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '700px', margin: '40px auto', padding: '0 20px' },
  card: { backgroundColor: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#1a73e8', marginBottom: '8px' },
  subtitle: { color: '#666', marginBottom: '24px', lineHeight: '1.6' },
  error: { backgroundColor: '#fde8e8', color: '#c0392b', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  label: { display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' },
  textarea: { width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: '16px' },
  quickLabel: { fontSize: '13px', color: '#666', marginBottom: '8px' },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' },
  tag: { backgroundColor: '#e8f0fe', color: '#1a73e8', border: 'none', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' },
  button: { width: '100%', padding: '16px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
};

export default Predict;