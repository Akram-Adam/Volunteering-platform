import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Import Font Awesome Core
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import Specific Icons
import { faGauge, faCalendar, faEnvelope, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faGauge, faCalendar, faEnvelope, faUser, faPlus);

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Register FontAwesomeIcon globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
