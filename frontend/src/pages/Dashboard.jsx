import React, { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user }   = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get('/dashboard');
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div><Navbar />
      <div style={styles.loading}>⏳ Loading dashboard...</div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>
          👋 Welcome, {user?.name}!
        </h1>

        {/* Stats Cards */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>{data?.total_predictions || 0}</h2>
            <p style={styles.statLabel}>Total Checks</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>{data?.total_appointments || 0}</h2>
            <p style={styles.statLabel}>Appointments</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>
              {Object.keys(data?.department_counts || {}).length}
            </h2>
            <p style={styles.statLabel}>Departments Visited</p>
          </div>
        </div>

        {/* Department Distribution */}
        {data?.department_counts && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Department Distribution</h2>
            {Object.entries(data.department_counts)
              .sort((a, b) => b[1] - a[1])
              .map(([dept, count], i) => (
                <div key={i} style={styles.barRow}>
                  <span style={styles.barLabel}>{dept}</span>
                  <div style={styles.barBg}>
                    <div style={{
                      ...styles.barFill,
                      width: `${(count / data.total_predictions) * 100}%`
                    }} />
                  </div>
                  <span style={styles.barCount}>{count}</span>
                </div>
              ))
            }
          </div>
        )}

        {/* Recent Predictions */}
        {data?.recent_predictions && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recent Activity</h2>
            {data.recent_predictions.map((p, i) => (
              <div key={i} style={styles.recentCard}>
                <div>
                  <p style={styles.recentDept}>{p.department}</p>
                  <p style={styles.recentSymptoms}>{p.symptoms}</p>
                </div>
                <p style={styles.recentDate}>
                  {new Date(p.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '900px', margin: '40px auto', padding: '0 20px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '32px' },
  loading: { textAlign: 'center', padding: '60px', fontSize: '18px' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', minWidth: '150px' },
  statNum: { fontSize: '36px', fontWeight: 'bold', color: '#1a73e8' },
  statLabel: { fontSize: '14px', color: '#666', marginTop: '4px' },
  section: { backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '24px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '20px' },
  barRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  barLabel: { fontSize: '13px', color: '#555', width: '180px', flexShrink: 0 },
  barBg: { flex: 1, backgroundColor: '#e0e0e0', borderRadius: '10px', height: '8px' },
  barFill: { backgroundColor: '#1a73e8', height: '8px', borderRadius: '10px' },
  barCount: { fontSize: '13px', fontWeight: 'bold', color: '#1a73e8', width: '24px' },
  recentCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' },
  recentDept: { fontWeight: '600', color: '#333', marginBottom: '2px' },
  recentSymptoms: { fontSize: '13px', color: '#999' },
  recentDate: { fontSize: '13px', color: '#999' },
};

export default Dashboard;