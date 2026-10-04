import axios from 'axios';

// Auth memakai cookie HttpOnly: withCredentials membuat cookie 'token'
// otomatis terkirim. Tidak ada token di localStorage (mitigasi XSS).
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  withCredentials: true,
});

export default api;
