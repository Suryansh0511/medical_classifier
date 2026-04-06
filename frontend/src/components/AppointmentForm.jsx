import React, { useState } from 'react';
import API from '../api/axios';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '2:00 PM', '3:00 PM',  '4:00 PM'
];

const AppointmentForm = ({ hospital, department, symptoms, onSuccess }) => {
  const [form, setForm] = useState({
    date: '', time_slot: '', email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

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
        hospital_address: hospital.address,
        department,
        symptoms,
        date:      form.date,
        time_slot: form.time_slot,
        email:     form.email,
      });
      onSuccess(form);
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      {error && <div style={styles.error}>⚠️ {error}</div>}

      {/* Date */}
      <div style={styles.group}>
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
      <div style={styles.group}>
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
              }}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Email */}
      <div style={styles.group}>
        <label style={styles.label}>📧 Email for Reminder</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
        />
      </div>

      <button
        onClick={handleBook}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '⏳ Booking...' : '✅ Confirm Appointment'}
      </button>
    </div>
  );
};

const styles = {
  container: { width: '100%' },
  error: {
    backgroundColor: '#fde8e8',
    color: '#c0392b',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  group: { marginBottom: '20px' },
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
  slotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  slotBtn: {
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '8px',
  },
};

export default AppointmentForm;