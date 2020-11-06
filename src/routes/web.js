import NotFound from '../pages/404.vue';
import Welcome from '../pages/index.vue';


export default [
  /**
   * Guest Routes
   */
  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404',
    },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      public: true,
    },
  },
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    meta: {
      public: true,
    },
  },
];
