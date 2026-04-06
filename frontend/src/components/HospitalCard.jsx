import React from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ hospital, department, symptoms }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <div style={styles.iconBox}>🏥</div>
        <div style={styles.info}>
          <h3 style={styles.name}>{hospital.name}</h3>
          <p style={styles.detail}>📍 {hospital.address}</p>
          <p style={styles.detail}>📞 {hospital.phone}</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/appointment', {
          state: { hospital, department, symptoms }
        })}
        style={styles.bookBtn}
      >
        📅 Book
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
  },
  iconBox: {
    fontSize: '36px',
    backgroundColor: '#e8f0fe',
    borderRadius: '10px',
    padding: '8px',
  },
  info: { flex: 1 },
  name: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4px',
  },
  detail: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '2px',
  },
  bookBtn: {
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    marginLeft: '16px',
  },
};

export default HospitalCard;