import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App'
import createRouter from './router'
import createStore from './store'
import async from './utils/async'

Vue.use(async)
Vue.use(VueLazyload, {
  loading: require('./assets/imgs/loading.gif'),
  listenEvents: ['scroll'],
  filter: {
    webp(listener, options) {
      if (!options.supportWebp) return
      const isCDN = /xiaohuochai.site/
      if (isCDN.test(listener.src)) {
        listener.src += '?imageView2/2/format/webp'
      }
    }
  }
})

export default function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
