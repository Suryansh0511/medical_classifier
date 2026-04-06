import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const deptEmojis = {
  DERMATOLOGY: '🧴', GASTROENTEROLOGY: '🍽️',
  'INFECTIOUS DISEASE': '🦠', ENDOCRINOLOGY: '⚗️',
  CARDIOLOGY: '❤️', PULMONOLOGY: '🫁',
  UROLOGY: '💧', ORTHOPEDICS: '🦴', NEUROLOGY: '🧠'
};

const severityColors = {
  LOW: '#27ae60', MEDIUM: '#f39c12', HIGH: '#e74c3c'
};

const Result = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const { result, symptoms } = location.state || {};

  if (!result) {
    navigate('/predict');
    return null;
  }

  return (
    <div>
      <Navbar />
      <div style={styles.container}>

        {/* Result Card */}
        <div style={styles.resultCard}>
          <p style={styles.symptomsLabel}>Symptoms Entered:</p>
          <p style={styles.symptomsText}>"{symptoms}"</p>

          <div style={styles.deptBox}>
            <span style={styles.deptEmoji}>
              {deptEmojis[result.department] || '🏥'}
            </span>
            <h1 style={styles.deptName}>{result.department}</h1>
            <p style={styles.deptSubtitle}>Recommended Department</p>
          </div>

          {/* Confidence Bar */}
          <div style={styles.confRow}>
            <span style={styles.confLabel}>Confidence</span>
            <span style={styles.confValue}>{result.confidence}%</span>
          </div>
          <div style={styles.confBarBg}>
            <div style={{
              ...styles.confBarFill,
              width: `${result.confidence}%`
            }} />
          </div>

          {/* Severity */}
          <div style={{
            ...styles.severityBadge,
            backgroundColor: severityColors[result.severity] + '20',
            color: severityColors[result.severity]
          }}>
            ⚠️ Severity: {result.severity}
          </div>
        </div>

        {/* Hospitals */}
        {result.hospitals && result.hospitals.length > 0 && (
          <div>
            <h2 style={styles.hospitalTitle}>
              🏥 Nearby Hospitals in Chennai
            </h2>
            {result.hospitals.map((h, i) => (
              <div key={i} style={styles.hospitalCard}>
                <div style={styles.hospitalInfo}>
                  <h3 style={styles.hospitalName}>🏥 {h.name}</h3>
                  <p style={styles.hospitalAddr}>📍 {h.address}</p>
                  <p style={styles.hospitalPhone}>📞 {h.phone}</p>
                </div>
                <button
                  onClick={() => navigate('/appointment', {
                    state: { hospital: h, department: result.department, symptoms }
                  })}
                  style={styles.bookBtn}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div style={styles.btnRow}>
          <button onClick={() => navigate('/predict')} style={styles.secondaryBtn}>
            🔍 Check Again
          </button>
          <button onClick={() => navigate('/history')} style={styles.primaryBtn}>
            📋 View History
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '700px', margin: '40px auto', padding: '0 20px' },
  resultCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '24px', textAlign: 'center' },
  symptomsLabel: { fontSize: '13px', color: '#999', marginBottom: '4px' },
  symptomsText: { fontSize: '15px', color: '#555', marginBottom: '24px', fontStyle: 'italic' },
  deptBox: { backgroundColor: '#e8f0fe', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
  deptEmoji: { fontSize: '48px' },
  deptName: { fontSize: '28px', fontWeight: 'bold', color: '#1a73e8', margin: '8px 0 4px' },
  deptSubtitle: { color: '#666', fontSize: '14px' },
  confRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  confLabel: { fontSize: '14px', color: '#666' },
  confValue: { fontSize: '14px', fontWeight: 'bold', color: '#1a73e8' },
  confBarBg: { backgroundColor: '#e0e0e0', borderRadius: '10px', height: '10px', marginBottom: '16px' },
  confBarFill: { backgroundColor: '#1a73e8', height: '10px', borderRadius: '10px', transition: 'width 0.5s' },
  severityBadge: { display: 'inline-block', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' },
  hospitalTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#333' },
  hospitalCard: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  hospitalInfo: { flex: 1 },
  hospitalName: { fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '4px' },
  hospitalAddr: { fontSize: '13px', color: '#666', marginBottom: '2px' },
  hospitalPhone: { fontSize: '13px', color: '#666' },
  bookBtn: { backgroundColor: '#1a73e8', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '16px' },
  btnRow: { display: 'flex', gap: '16px', marginTop: '24px' },
  primaryBtn: { flex: 1, padding: '14px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  secondaryBtn: { flex: 1, padding: '14px', backgroundColor: '#fff', color: '#1a73e8', border: '2px solid #1a73e8', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
};

export default Result;