import '@/assets/scss/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import plugins from '@/plugins';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Plugins
plugins.forEach((plugin) => app.use(plugin));

app.mount('#app');
