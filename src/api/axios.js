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

// 🛡️ Attach CSRF + Authorization headers
api.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase();
    // CSRF for unsafe methods
    if (['get','post', 'put', 'patch', 'delete'].includes(method)) {
      let csrfToken = getCookie('csrftoken');

      if (!csrfToken || csrfToken === 'None') {
        try {
          const res = await api.get('get-csrf-token');
          csrfToken = res.data.csrfToken;
        } catch (e) {
          console.warn('Could not fetch CSRF token:', e);
        }
      }

      if (csrfToken && csrfToken !== 'None') {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    // 👉 Attach Authorization header from access cookie
    const accessToken = getCookie('access');
    if (accessToken && accessToken !== 'None') {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('auth/token/refresh/')
    ) {
      originalRequest._retry = true;

      try {
        await api.post('auth/token/refresh/'); // refreshes cookie
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('user');
        router.push({ name: 'Login' });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
