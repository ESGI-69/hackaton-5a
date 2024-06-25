import App from '@/App.vue';
import '@/assets/main.css';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { createPinia } from 'pinia';
import 'vfonts/FiraCode.css';
import 'vfonts/Lato.css';
import { createApp } from 'vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore();
authStore.initLogged();

app.mount('#app');
