import Vue from 'vue';
import VueRouter from 'vue-router'
import routers from './routers'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
Vue.config.productionTip = false

