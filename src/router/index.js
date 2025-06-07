import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/waitlist/Home.vue'),
    meta: { keepAlive: true, layout: 'default' }
  },
  {
    path: '/waitlist',
    name: 'waitlist',
    component: () => import('@/views/waitlist/SignUp.vue'),
    meta: { keepAlive: false, layout: 'default' }
  },
  {
    path: '/vendor/dashboard/',
    name: 'Vendor',
    component: () => import('@/views/vendorDashboard/DashboardHome.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/orders/',
    name: 'orders',
    component: () => import('@/views/vendorDashboard/OrderDashboard.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/products/',
    name: 'products',
    component: () => import('@/views/vendorDashboard/ProductDashboard.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/sales/',
    name: 'sales',
    component: () => import('@/views/vendorDashboard/SalesDashboard.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/parcels/',
    name: 'parcels',
    component: () => import('@/views/vendorDashboard/Parcel.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/customers/',
    name: 'customers',
    component: () => import('@/views/vendorDashboard/Customer.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/support/',
    name: 'support',
    component: () => import('@/views/vendorDashboard/Support.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/notifications/',
    name: 'notification',
    component: () => import('@/views/vendorDashboard/Notification.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/profile/',
    name: 'profile',
    component: () => import('@/views/vendorDashboard/ProfileSettings.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/transactions/',
    name: 'transactions',
    component: () => import('@/views/vendorDashboard/Transactions.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
  {
    path: '/vendor/dashboard/track/',
    name: 'trackParcel',
    component: () => import('@/views/vendorDashboard/TrackParcel.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard', requiresAuth: true, role: 'vendor' }
  },
    // Admin Dashboard (Example Route)
  // {
  //   path: '/admin/dashboard/',
  //   name: 'AdminDashboard',
  //   component: () => import('@/views/adminDashboard/Dashboard.vue'),
  //   meta: { keepAlive: false, layout: 'admindashboard', requiresAuth: true, role: 'admin' }
  // },

  // Affiliate Dashboard (Example Route)
  // {
  //   path: '/affiliate/dashboard/',
  //   name: 'AffiliateDashboard',
  //   component: () => import('@/views/affiliateDashboard/Dashboard.vue'),
  //   meta: { keepAlive: false, layout: 'affiliatedashboard', requiresAuth: true, role: 'affiliate' }
  // },
  {
    path: '/auth/login/dashboard/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { keepAlive: false, layout: 'default' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Error404.vue'),
    meta: { layout: 'default' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'smooth' };
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

/// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('[Router] Navigating to:', to.name);
  console.log('[Router] User:', user);

  if (to.meta.requiresAuth && !user) {
    console.log('[Router] Auth required but user missing. Redirecting to login.');
    return next({ name: 'Login' });
  }

  if (to.meta.role && user?.role?.toLowerCase() !== to.meta.role.toLowerCase()) {
    console.log(`[Router] Role mismatch: expected ${to.meta.role}, got ${user?.role}`);
    switch (user?.role?.toLowerCase()) {
      case 'vendor':
        return next({ name: 'Vendor' });
      case 'admin':
        return next({ name: 'AdminDashboard' });
      case 'affiliate':
        return next({ name: 'AffiliateDashboard' });
      default:
        return next({ name: 'Login' });
    }
  }

  if (to.name === 'Login' && user) {
    console.log('[Router] Already logged in, redirecting from Login page.');
    switch (user?.role?.toLowerCase()) {
      case 'vendor':
        return next({ name: 'Vendor' });
      case 'admin':
        return next({ name: 'AdminDashboard' });
      case 'affiliate':
        return next({ name: 'AffiliateDashboard' });
      default:
        return next({ name: 'Vendor' });
    }
  }

  next();
});

router.afterEach((to, from) => {
  console.log(`[Router] Route changed: ${from.fullPath} -> ${to.fullPath}`);
});

export default router;