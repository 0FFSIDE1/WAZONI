import { createRouter, createWebHistory } from 'vue-router';

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
    name: 'dashboard',
    component: () => import('@/views/vendorDashboard/DashboardHome.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
  },
  {
    path: '/vendor/dashboard/orders/',
    name: 'orders',
    component: () => import('@/views/vendorDashboard/OrderDashboard.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
  },
  {
    path: '/vendor/dashboard/products/',
    name: 'products',
    component: () => import('@/views/vendorDashboard/ProductDashboard.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
  },
  {
    path: '/vendor/dashboard/transactions/',
    name: 'transactions',
    component: () => import('@/views/vendorDashboard/SalesDashboard.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
  },
  {
    path: '/vendor/dashboard/parcels/',
    name: 'parcels',
    component: () => import('@/views/vendorDashboard/Parcel.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
  },
  {
    path: '/vendor/dashboard/customers/',
    name: 'customers',
    component: () => import('@/views/vendorDashboard/Customer.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
  },
  {
    path: '/vendor/dashboard/support/',
    name: 'support',
    component: () => import('@/views/vendorDashboard/Support.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
  },
    {
    path: '/vendor/dashboard/notifications/',
    name: 'notification',
    component: () => import('@/views/vendorDashboard/Notification.vue'),
    meta: { keepAlive: false, layout: 'vendordashboard' }
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
    }
    else {
      return { top: 0, behavior: 'smooth' };
    }
    
  },
});

export default router
