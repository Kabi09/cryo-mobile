import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.cryoerp.local/v1';
const DATA_MODE = import.meta.env.VITE_DATA_MODE || 'mock';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor reserved for real authentication token injection
apiClient.interceptors.request.use(
  (config) => {
    // In future phases:
    // const token = localStorage.getItem('cryo_token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Shared API error formatting
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.warn(`[Cryo API Error] (${DATA_MODE} mode):`, message);
    return Promise.reject(error);
  }
);

export default apiClient;
