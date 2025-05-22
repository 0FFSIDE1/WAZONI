import api from '@/api/axios'
import router from '@/router'

export async function loginUser({ email, password }) {
  const response = await api.post('auth/login/', { email, password });

  const { access, refresh, user } = response.data;

  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('user', JSON.stringify(user));

  switch (user.role?.toLowerCase()) {
    case 'admin':
      router.push({ name: 'AdminDashboard' });
      break;
    case 'vendor':
      router.push({ name: 'Vendor' });
      break;
    case 'affiliate':
      router.push({ name: 'AffiliateDashboard' });
      break;
    default:
      router.push({ name: 'Dashboard' });
  }

  return user;
}


export async function logoutUser() {
  try {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No refresh token found');

    await api.post('auth/token/logout/', { refresh });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    router.push({ name: 'Login' });
  } catch (err) {
    console.error('Logout failed:', err);
    // Still clear local data even if the API call fails
    localStorage.clear();
    router.push({ name: 'Login' });
  }
}