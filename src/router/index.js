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
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardHome.vue'),
    meta: { keepAlive: false, layout: 'dashboard' }
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
