import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore.js';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Response interceptor: auto-refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refresh } = useAuthStore.getState();
        const newAccessToken = await refresh();

        if (newAccessToken) {
          // Optionally attach Authorization header if you use it
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError.message);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
