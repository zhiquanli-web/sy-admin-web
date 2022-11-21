import 'normalize.css';
import 'uno.css';
import { createPinia } from 'pinia';

import './assets/styles/style.css';
import App from './App.vue';
const pinia = createPinia();
import router from './router';
import { useStore } from './store';
import { setupMock } from './mock';
import { globalRegister } from './registers';

const app = createApp(App);
if (import.meta.env.VITE_USE_MOCK === 'true') {
  setupMock();
}

app.use(pinia);
const userStore = useStore();
await userStore.user.loadLocalLogin();
app.use(globalRegister);
app.use(router);

app.mount('#app');
