import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/base.css'
import "./assets/font-awesome-4.7.0/css/font-awesome.css";
import {store}  from './store'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
