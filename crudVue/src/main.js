// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import HelloWorld from './components/HelloWorld';
import CadastroPedido from './components/Pedido/CadastroPedido';
import router from './router'
import axios from 'axios';
import VueResource from 'vue-resource';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment';

library.add(faPlus)
 
Vue.component('font-awesome-icon', FontAwesomeIcon )
Vue.prototype.$http = axios;
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(moment);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, HelloWorld, CadastroPedido },
  template: '<App/>'
})

