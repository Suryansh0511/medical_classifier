import axios from 'axios';

const API = axios.create({
    baseURL: 'https://medi-classify.onrender.com',
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000  // ← Increased to 30s for Render free tier
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;