import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import store from '../store';
import routes from './web';

Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

sync(store, router);

/**
 * Export
 */
export default router;
