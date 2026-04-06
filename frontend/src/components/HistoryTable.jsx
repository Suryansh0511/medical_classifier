import React from 'react';

const deptEmojis = {
  DERMATOLOGY: '🧴',
  GASTROENTEROLOGY: '🍽️',
  'INFECTIOUS DISEASE': '🦠',
  ENDOCRINOLOGY: '⚗️',
  CARDIOLOGY: '❤️',
  PULMONOLOGY: '🫁',
  UROLOGY: '💧',
  ORTHOPEDICS: '🦴',
  NEUROLOGY: '🧠'
};

const severityColors = {
  LOW: '#27ae60',
  MEDIUM: '#f39c12',
  HIGH: '#e74c3c',
};

const HistoryTable = ({ predictions }) => {
  if (!predictions || predictions.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No predictions yet!</p>
        <p style={styles.emptySubtext}>
          Start by checking your symptoms
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {predictions.map((p, i) => (
        <div key={i} style={styles.row}>

          {/* Left side */}
          <div style={styles.left}>
            <span style={styles.emoji}>
              {deptEmojis[p.department] || '🏥'}
            </span>
            <div>
              <h3 style={styles.dept}>{p.department}</h3>
              <p style={styles.symptoms}>{p.symptoms}</p>
              <p style={styles.date}>
                🗓️ {new Date(p.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div style={styles.right}>
            <span style={styles.confidence}>
              {p.confidence}%
            </span>
            <span style={{
              ...styles.severity,
              color: severityColors[p.severity],
              backgroundColor: severityColors[p.severity] + '15',
            }}>
              {p.severity}
            </span>
          </div>

        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { width: '100%' },
  row: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '18px 20px',
    marginBottom: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  emoji: { fontSize: '30px' },
  dept: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '3px',
  },
  symptoms: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '3px',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  date: { fontSize: '12px', color: '#aaa' },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  confidence: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  severity: {
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '20px',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  emptyText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#999',
  },
};

export default HistoryTable;