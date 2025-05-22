import axios from 'axios';
import router from '@/router'; 
const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Helper to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// 🔁 Refresh token function
async function refreshToken() {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) throw new Error('No refresh token available');

  const response = await axios.post(`${baseURL}auth/token/refresh/`, { refresh });
  const newAccess = response.data.access;
  localStorage.setItem('access_token', newAccess);
  return newAccess;
}

// 🛡️ Request interceptor
api.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase();

    // Attach Authorization header
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Attach CSRF for unsafe methods
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
      let csrfToken = getCookie('csrftoken');
      if (!csrfToken || csrfToken === 'None') {
        try {
          const response = await api.get('get-csrf-token');
          csrfToken = response.data.csrfToken;
        } catch (err) {
          console.error('Failed to fetch CSRF token:', err);
        }
      }
      if (csrfToken && csrfToken !== 'None') {
        config.headers['X-CSRFToken'] = csrfToken;
      } else {
        console.warn('CSRF token not available.');
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Response interceptor: Auto refresh on 401
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        router.push({ name: 'Login' }); // make sure this route exists
      }
    }

    return Promise.reject(error);
  }
);

export default api;
