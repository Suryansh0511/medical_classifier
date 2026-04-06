import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '2:00 PM', '3:00 PM',  '4:00 PM'
];

const Appointment = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const { hospital, department, symptoms } = location.state || {};

  const [form, setForm]       = useState({ date: '', time_slot: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  // No hospital selected
  if (!hospital) {
    return (
      <div>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontSize: '48px' }}>🏥</p>
              <h2 style={{ color: '#333', marginBottom: '12px' }}>
                No Hospital Selected!
              </h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Please go back and select a hospital first
              </p>
              <button
                onClick={() => navigate('/predict')}
                style={styles.btn}>
                🔍 Go to Symptom Checker
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleBook = async () => {
    if (!form.date || !form.time_slot || !form.email) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await API.post('/appointment/book', {
        hospital_name:    hospital.name,
        hospital_address: hospital.address || 'Chennai',
        department:       department,
        symptoms:         symptoms || '',
        date:             form.date,
        time_slot:        form.time_slot,
        email:            form.email,
      });
      setSuccess(true);
    } catch (err) {
      console.error('Booking error:', err.response?.data || err.message);
      setError(err.response?.data?.detail || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.successCard}>
            <div style={styles.successIcon}>✅</div>
            <h1 style={styles.successTitle}>Appointment Confirmed!</h1>

            <div style={styles.detailBox}>
              <p>🏥 <b>Hospital:</b> {hospital.name}</p>
              <p>🏥 <b>Department:</b> {department}</p>
              <p>📅 <b>Date:</b> {form.date}</p>
              <p>🕐 <b>Time:</b> {form.time_slot}</p>
              <p>📍 <b>Address:</b> {hospital.address || 'Chennai'}</p>
            </div>

            <p style={styles.emailNote}>
              📧 Reminder sent to <b>{form.email}</b>
            </p>

            <div style={styles.btnRow}>
              <button
                onClick={() => navigate('/history')}
                style={styles.btn}>
                📋 View My Appointments
              </button>
              <button
                onClick={() => navigate('/predict')}
                style={styles.secondaryBtn}>
                🔍 Check Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Booking form
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>

          {/* Header */}
          <h1 style={styles.title}>📅 Book Appointment</h1>
          <div style={styles.hospitalInfo}>
            <p style={styles.hospitalName}>🏥 {hospital.name}</p>
            <p style={styles.hospitalDept}>Department: {department}</p>
            <p style={styles.hospitalAddr}>
              📍 {hospital.address || 'Chennai'}
            </p>
          </div>

          {error && (
            <div style={styles.error}>⚠️ {error}</div>
          )}

          {/* Date */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>📅 Select Date</label>
            <input
              type="date"
              value={form.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              style={styles.input}
            />
          </div>

          {/* Time Slots */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>🕐 Select Time Slot</label>
            <div style={styles.slotGrid}>
              {timeSlots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setForm({ ...form, time_slot: slot })}
                  style={{
                    ...styles.slotBtn,
                    backgroundColor: form.time_slot === slot
                      ? '#1a73e8' : '#e8f0fe',
                    color: form.time_slot === slot
                      ? '#fff' : '#1a73e8',
                    transform: form.time_slot === slot
                      ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>📧 Email for Reminder</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
            />
            <p style={styles.hint}>
              A confirmation email will be sent to this address
            </p>
          </div>

          {/* Symptoms Summary */}
          {symptoms && (
            <div style={styles.symptomsBox}>
              <p style={styles.symptomsLabel}>📋 Your Symptoms:</p>
              <p style={styles.symptomsText}>{symptoms}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleBook}
            disabled={loading}
            style={{
              ...styles.btn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Booking...' : '✅ Confirm Appointment'}
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={styles.backBtn}
          >
            ← Go Back
          </button>

        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '0 20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: '16px',
  },
  hospitalInfo: {
    backgroundColor: '#e8f0fe',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '24px',
  },
  hospitalName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4px',
  },
  hospitalDept: {
    fontSize: '14px',
    color: '#1a73e8',
    fontWeight: '600',
    marginBottom: '4px',
  },
  hospitalAddr: {
    fontSize: '13px',
    color: '#666',
  },
  error: {
    backgroundColor: '#fde8e8',
    color: '#c0392b',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    marginTop: '4px',
  },
  slotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  slotBtn: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  symptomsBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
  },
  symptomsLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '4px',
  },
  symptomsText: {
    fontSize: '13px',
    color: '#888',
    fontStyle: 'italic',
  },
  btn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  backBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  successCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '24px',
  },
  detailBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    textAlign: 'left',
    lineHeight: '2',
  },
  emailNote: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '24px',
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
  },
  secondaryBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#fff',
    color: '#1a73e8',
    border: '2px solid #1a73e8',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Appointment;