import axios from 'axios';
import { getToken } from './auth'; // importante!

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Interceptador que adiciona o token JWT automaticamente
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
