import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/views/waitlist/Home.vue'), meta: { keepAlive: true}, },
  { path: '/waitlist', name:'waitlist', component: () => import('@/views/waitlist/SignUp.vue'), meta: { keepAlive: false}, },

//   { path: '/:category', name:'ProductsByCategory', component: () => import('@/pages/ProductsByCategory.vue'), props: route => ({ category: route.params.category }), meta: { keepAlive: false},  },
//   { path: '/product/:id', name: 'ProductDetail', component: () => import('@/pages/SingleProduct.vue'), meta: { keepAlive: false},  },
//   { path: '/checkout', component: () => import('@/pages/Checkout.vue'), meta: { keepAlive: false},},
//   { path: '/payment/verify', component: () => import('@/pages/Payment.vue'), meta: { keepAlive: false},},



// Catch-all route (MUST be last)
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/Error404.vue'), }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'smooth' };
    }
    else {
      return { top: 0, behavior: 'smooth' };
    }
    
  },
});

export default router
