import React, { useState } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const departments = [
  'CARDIOLOGY', 'NEUROLOGY', 'ORTHOPEDICS',
  'DERMATOLOGY', 'GASTROENTEROLOGY', 'INFECTIOUS DISEASE',
  'ENDOCRINOLOGY', 'PULMONOLOGY', 'UROLOGY'
];

const Hospitals = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('');
  const [hospitals,    setHospitals]    = useState([]);
  const [loading,      setLoading]      = useState(false);

  const fetchHospitals = async (dept) => {
    setSelectedDept(dept);
    setLoading(true);
    try {
      const response = await API.get(`/hospitals/${dept}`);
      setHospitals(response.data.hospitals);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>🏥 Hospitals in Chennai</h1>
        <p style={styles.subtitle}>Select a department to find nearby hospitals</p>

        {/* Department Filter */}
        <div style={styles.deptGrid}>
          {departments.map((dept, i) => (
            <button key={i}
              onClick={() => fetchHospitals(dept)}
              style={{
                ...styles.deptBtn,
                backgroundColor: selectedDept === dept ? '#1a73e8' : '#fff',
                color: selectedDept === dept ? '#fff' : '#333',
              }}>
              {dept}
            </button>
          ))}
        </div>

        {/* Hospital List */}
        {loading && <p style={styles.loading}>⏳ Finding hospitals...</p>}

        {!loading && hospitals.length > 0 && (
          <div>
            <h2 style={styles.resultsTitle}>
              {hospitals.length} hospitals found for {selectedDept}
            </h2>
            {hospitals.map((h, i) => (
              <div key={i} style={styles.hospitalCard}>
                <div>
                  <h3 style={styles.hospitalName}>🏥 {h.name}</h3>
                  <p style={styles.hospitalAddr}>📍 {h.address}</p>
                  <p style={styles.hospitalPhone}>📞 {h.phone}</p>
                </div>
                <button
                  onClick={() => navigate('/appointment', {
                    state: { hospital: h, department: selectedDept, symptoms: '' }
                  })}
                  style={styles.bookBtn}>
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && selectedDept && hospitals.length === 0 && (
          <p style={styles.noResults}>No hospitals found for {selectedDept}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '40px auto', padding: '0 20px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '8px' },
  subtitle: { color: '#666', marginBottom: '24px' },
  deptGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' },
  deptBtn: { padding: '12px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  loading: { textAlign: 'center', padding: '40px', color: '#666' },
  resultsTitle: { fontSize: '16px', color: '#666', marginBottom: '16px' },
  hospitalCard: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  hospitalName: { fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '4px' },
  hospitalAddr: { fontSize: '13px', color: '#666', marginBottom: '2px' },
  hospitalPhone: { fontSize: '13px', color: '#666' },
  bookBtn: { backgroundColor: '#1a73e8', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '16px' },
  noResults: { textAlign: 'center', color: '#999', padding: '40px' },
};

export default Hospitals;