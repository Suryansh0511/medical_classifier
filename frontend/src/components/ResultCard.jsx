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

const deptDescriptions = {
  DERMATOLOGY: 'Treats skin, hair and nail conditions',
  GASTROENTEROLOGY: 'Treats digestive system disorders',
  'INFECTIOUS DISEASE': 'Treats infections caused by bacteria, viruses and parasites',
  ENDOCRINOLOGY: 'Treats hormonal and metabolic disorders',
  CARDIOLOGY: 'Treats heart and cardiovascular conditions',
  PULMONOLOGY: 'Treats lung and respiratory conditions',
  UROLOGY: 'Treats urinary tract and kidney conditions',
  ORTHOPEDICS: 'Treats bone, joint and muscle conditions',
  NEUROLOGY: 'Treats brain and nervous system conditions',
};

const severityColors = {
  LOW: '#27ae60',
  MEDIUM: '#f39c12',
  HIGH: '#e74c3c',
};

const severityMessages = {
  LOW: 'Self care at home is sufficient',
  MEDIUM: 'Schedule an appointment soon',
  HIGH: 'Visit a doctor today',
};

const ResultCard = ({ department, confidence, severity }) => {
  return (
    <div style={styles.card}>

      {/* Department */}
      <div style={styles.deptBox}>
        <span style={styles.emoji}>
          {deptEmojis[department] || '🏥'}
        </span>
        <h1 style={styles.deptName}>{department}</h1>
        <p style={styles.deptDesc}>
          {deptDescriptions[department] || 'Medical department'}
        </p>
      </div>

      {/* Confidence Bar */}
      <div style={styles.section}>
        <div style={styles.confRow}>
          <span style={styles.confLabel}>Confidence Score</span>
          <span style={styles.confValue}>{confidence}%</span>
        </div>
        <div style={styles.barBg}>
          <div style={{
            ...styles.barFill,
            width: `${confidence}%`,
            backgroundColor: confidence > 70
              ? '#27ae60'
              : confidence > 40
              ? '#f39c12'
              : '#e74c3c'
          }} />
        </div>
      </div>

      {/* Severity */}
      <div style={{
        ...styles.severityBox,
        backgroundColor: severityColors[severity] + '15',
        borderLeft: `4px solid ${severityColors[severity]}`
      }}>
        <span style={{
          ...styles.severityTitle,
          color: severityColors[severity]
        }}>
          ⚠️ Severity: {severity}
        </span>
        <p style={styles.severityMsg}>
          {severityMessages[severity]}
        </p>
      </div>

    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginBottom: '24px',
  },
  deptBox: {
    textAlign: 'center',
    backgroundColor: '#e8f0fe',
    borderRadius: '12px',
    padding: '28px',
    marginBottom: '24px',
  },
  emoji: { fontSize: '52px' },
  deptName: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#1a73e8',
    margin: '10px 0 6px',
  },
  deptDesc: {
    fontSize: '14px',
    color: '#666',
  },
  section: { marginBottom: '20px' },
  confRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  confLabel: { fontSize: '14px', color: '#666' },
  confValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  barBg: {
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    height: '12px',
  },
  barFill: {
    height: '12px',
    borderRadius: '10px',
    transition: 'width 0.8s ease',
  },
  severityBox: {
    padding: '16px',
    borderRadius: '8px',
  },
  severityTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '4px',
  },
  severityMsg: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
  },
};

export default ResultCard;