import Vue from 'vue';
import Element from 'element-ui';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style.css';
import '@/assets/fontawesome.css';

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(VueMeta);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
