import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const departments = [
  { icon: '❤️', name: 'Cardiology' },
  { icon: '🧠', name: 'Neurology' },
  { icon: '🦴', name: 'Orthopedics' },
  { icon: '🧴', name: 'Dermatology' },
  { icon: '🍽️', name: 'Gastroenterology' },
  { icon: '🦠', name: 'Infectious Disease' },
  { icon: '⚗️', name: 'Endocrinology' },
  { icon: '🫁', name: 'Pulmonology' },
  { icon: '💧', name: 'Urology' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={styles.container}>

        {/* Hero Section */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            🏥 Find the Right Doctor,<br />Instantly
          </h1>
          <p style={styles.heroSubtitle}>
            Describe your symptoms and our AI will recommend
            the right medical department and nearby hospitals in Chennai
          </p>
          <button
            onClick={() => navigate('/predict')}
            style={styles.heroBtn}
          >
            🔍 Check Your Symptoms
          </button>
        </div>

        {/* Stats Section */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>4500+</h2>
            <p style={styles.statLabel}>Medical Cases Trained</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>9</h2>
            <p style={styles.statLabel}>Departments Covered</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>85%+</h2>
            <p style={styles.statLabel}>Accuracy Rate</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>Free</h2>
            <p style={styles.statLabel}>Always Free to Use</p>
          </div>
        </div>

        {/* Departments Section */}
        <h2 style={styles.sectionTitle}>Departments We Cover</h2>
        <div style={styles.deptGrid}>
          {departments.map((dept, i) => (
            <div key={i} style={styles.deptCard}>
              <span style={styles.deptIcon}>{dept.icon}</span>
              <p style={styles.deptName}>{dept.name}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.stepsRow}>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>1</div>
            <h3>Describe Symptoms</h3>
            <p>Type your symptoms in plain English</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>2</div>
            <h3>AI Analyzes</h3>
            <p>Our ML model classifies your symptoms</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>3</div>
            <h3>Get Results</h3>
            <p>See department recommendation + nearby hospitals</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>4</div>
            <h3>Book Appointment</h3>
            <p>Book directly and get email reminder</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' },
  hero: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#1a73e8',
    borderRadius: '20px',
    color: '#fff',
    marginBottom: '40px',
  },
  heroTitle: { fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' },
  heroSubtitle: { fontSize: '16px', opacity: 0.9, marginBottom: '32px', lineHeight: '1.6' },
  heroBtn: {
    backgroundColor: '#fff',
    color: '#1a73e8',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    minWidth: '150px',
  },
  statNumber: { fontSize: '32px', fontWeight: 'bold', color: '#1a73e8' },
  statLabel: { fontSize: '14px', color: '#666', marginTop: '4px' },
  sectionTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#333' },
  deptGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px',
    marginBottom: '40px',
  },
  deptCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px 16px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    cursor: 'pointer',
  },
  deptIcon: { fontSize: '32px' },
  deptName: { fontSize: '13px', fontWeight: '600', color: '#333', marginTop: '8px' },
  stepsRow: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' },
  stepCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    minWidth: '200px',
  },
  stepNum: {
    width: '40px',
    height: '40px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 auto 12px',
  },
};

export default Home;