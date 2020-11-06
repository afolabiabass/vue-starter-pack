<template>
  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
</template>

<script>
import DefaultLayout from './layouts/default.vue';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      layout: DefaultLayout,
    };
  },
};
</script>

<style>
</style>
