import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router if used
import vuetify from './plugins/vuetify'; // Import Vuetify

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');

