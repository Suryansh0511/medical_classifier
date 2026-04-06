import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Predict from './pages/Predict';
import Result from './pages/Result';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Appointment from './pages/Appointment';
import Hospitals from './pages/Hospitals';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/signup"      element={<Signup />} />
          <Route path="/predict"     element={<ProtectedRoute><Predict /></ProtectedRoute>} />
          <Route path="/result"      element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/history"     element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
          <Route path="/hospitals"   element={<ProtectedRoute><Hospitals /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;