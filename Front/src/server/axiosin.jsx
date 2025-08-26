// src/api/axiosInstance.js
import axios from 'axios';

export const axiosWithCredentials = axios.create({
  baseURL: 'http://localhost:5298',
  withCredentials: true, // Cookies dërgohen automatikisht
});

// Interceptor për axiosWithCredentials
axiosWithCredentials.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/Tokenservices/refresh')
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post('http://localhost:5298/api/Tokenservices/refresh', null, {
          withCredentials: true,
        });
        const newToken = refreshRes.data.token;
        axiosWithCredentials.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosWithCredentials(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token invalid:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const axiosPublic = axios.create({
  baseURL: 'http://localhost:5298',
  withCredentials: false, // Nuk dërgon cookies
});
