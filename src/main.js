import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)
const pinia = createPinia();
AOS.init()
app.use(pinia);
app.use(router);
app.mount('#app');

