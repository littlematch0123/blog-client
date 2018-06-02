// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import '@/assets/style.css'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'
import async from './utils/async'

sync(store, router)()
Vue.config.productionTip = false
Vue.use(Vuex)
// 将async注册到Vue中
Vue.use(async)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
