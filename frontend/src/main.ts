import App from '@/App.vue';
import '@/assets/main.scss';
import router from '@/router';
import { createPinia } from 'pinia';
import 'vfonts/FiraCode.css';
import 'vfonts/Lato.css';
import { createApp } from 'vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
