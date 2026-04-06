import React, { useState } from 'react';

const commonSymptoms = [
  'fever', 'headache', 'cough', 'chest pain', 'joint pain',
  'skin rash', 'vomiting', 'fatigue', 'breathlessness', 'nausea',
  'stomach pain', 'back pain', 'dizziness', 'itching', 'swelling'
];

const SymptomInput = ({ value, onChange, onSubmit, loading }) => {
  const [focused, setFocused] = useState(false);

  const addSymptom = (symptom) => {
    const newValue = value ? `${value} ${symptom}` : symptom;
    onChange(newValue);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Describe Your Symptoms</label>

      <textarea
        placeholder="e.g. fever headache stiff neck..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.textarea,
          border: focused
            ? '2px solid #1a73e8'
            : '2px solid #ddd'
        }}
        rows={4}
      />

      <p style={styles.quickLabel}>💡 Quick Add Symptoms:</p>
      <div style={styles.tagRow}>
        {commonSymptoms.map((s, i) => (
          <button
            key={i}
            onClick={() => addSymptom(s)}
            style={styles.tag}
          >
            + {s}
          </button>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '⏳ Analyzing symptoms...' : '🔍 Find Department'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '16px',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    marginBottom: '16px',
    fontFamily: 'inherit',
    transition: 'border 0.2s',
    minHeight: '120px',
  },
  quickLabel: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '10px',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '24px',
  },
  tag: {
    backgroundColor: '#e8f0fe',
    color: '#1a73e8',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  button: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default SymptomInput;