import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App)
app.use(
    Toast, {
        transition: 'Vue-Toastification__bounce',
        maxToasts: 5,
        newestOnTop: true,
    }
);
const pinia = createPinia();
AOS.init()
app.use(pinia);
app.use(router);
app.mount('#app');

