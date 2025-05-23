import api from '@/api/axios'
import router from '@/router'

export async function loginUser({ email, password }) {
  const response = await api.post('auth/login/', { email, password });

  const { user } = response.data;

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
    await api.post('auth/logout/');
    localStorage.removeItem('user');
    router.push({ name: 'Login' });
  } catch (err) {
    console.error('Logout failed:', err);
    localStorage.clear();
    router.push({ name: 'Login' });
  }
}