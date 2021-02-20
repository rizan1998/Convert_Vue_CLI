import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Toasted from 'vue-toasted';
Vue.use(Toasted)

import 'bootstrap/dist/css/bootstrap.css'; //bootstrap css
import 'bootstrap'; //bootstap js

import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

Vue.component('pagination', require('laravel-vue-pagination'));

import 'vuejs-datatable/dist/themes/bootstrap-4.esm';
import { VuejsDatatableFactory } from 'vuejs-datatable';
Vue.use(VuejsDatatableFactory);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
