import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const deptEmojis = {
  DERMATOLOGY: '🧴', GASTROENTEROLOGY: '🍽️',
  'INFECTIOUS DISEASE': '🦠', ENDOCRINOLOGY: '⚗️',
  CARDIOLOGY: '❤️', PULMONOLOGY: '🫁',
  UROLOGY: '💧', ORTHOPEDICS: '🦴', NEUROLOGY: '🧠'
};

const History = () => {
  const navigate = useNavigate();
  const [predictions,  setPredictions]  = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab,    setActiveTab]    = useState('predictions');
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [predRes, apptRes] = await Promise.all([
          API.get('/history'),
          API.get('/appointment/my')
        ]);
        setPredictions(predRes.data);
        setAppointments(apptRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div><Navbar />
      <div style={styles.loading}>⏳ Loading history...</div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>📋 My History</h1>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('predictions')}
            style={{ ...styles.tab, ...(activeTab === 'predictions' ? styles.activeTab : {}) }}>
            🔍 Predictions ({predictions.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            style={{ ...styles.tab, ...(activeTab === 'appointments' ? styles.activeTab : {}) }}>
            📅 Appointments ({appointments.length})
          </button>
        </div>

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div>
            {predictions.length === 0 ? (
              <div style={styles.empty}>
                <p>No predictions yet!</p>
                <button onClick={() => navigate('/predict')} style={styles.btn}>
                  Check Symptoms Now
                </button>
              </div>
            ) : (
              predictions.map((p, i) => (
                <div key={i} style={styles.card}>
                  <div style={styles.cardLeft}>
                    <span style={styles.emoji}>
                      {deptEmojis[p.department] || '🏥'}
                    </span>
                    <div>
                      <h3 style={styles.dept}>{p.department}</h3>
                      <p style={styles.symptoms}>{p.symptoms}</p>
                      <p style={styles.date}>
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div style={styles.cardRight}>
                    <span style={styles.confidence}>{p.confidence}%</span>
                    <span style={{
                      ...styles.severity,
                      color: p.severity === 'HIGH' ? '#e74c3c' :
                             p.severity === 'MEDIUM' ? '#f39c12' : '#27ae60'
                    }}>
                      {p.severity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div>
            {appointments.length === 0 ? (
              <div style={styles.empty}>
                <p>No appointments yet!</p>
              </div>
            ) : (
              appointments.map((a, i) => (
                <div key={i} style={styles.card}>
                  <div style={styles.cardLeft}>
                    <span style={styles.emoji}>🏥</span>
                    <div>
                      <h3 style={styles.dept}>{a.hospital_name}</h3>
                      <p style={styles.symptoms}>{a.department}</p>
                      <p style={styles.date}>
                        📅 {a.date} at {a.time_slot}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    ...styles.status,
                    backgroundColor: a.status === 'confirmed' ? '#e8f5e9' : '#fde8e8',
                    color: a.status === 'confirmed' ? '#27ae60' : '#e74c3c'
                  }}>
                    {a.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '40px auto', padding: '0 20px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '24px' },
  loading: { textAlign: 'center', padding: '60px', fontSize: '18px' },
  tabs: { display: 'flex', gap: '12px', marginBottom: '24px' },
  tab: { padding: '10px 24px', borderRadius: '8px', border: '2px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#666' },
  activeTab: { backgroundColor: '#1a73e8', color: '#fff', borderColor: '#1a73e8' },
  card: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  emoji: { fontSize: '32px' },
  dept: { fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '4px' },
  symptoms: { fontSize: '13px', color: '#666', marginBottom: '2px' },
  date: { fontSize: '12px', color: '#999' },
  cardRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' },
  confidence: { fontSize: '18px', fontWeight: 'bold', color: '#1a73e8' },
  severity: { fontSize: '12px', fontWeight: 'bold' },
  status: { padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' },
  empty: { textAlign: 'center', padding: '60px', color: '#999' },
  btn: { marginTop: '16px', padding: '12px 24px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' },
};

export default History;