import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/components/User/module'
import alert from '@/components/Alert/module'
import post from '@/components/Post/module'
import category from '@/components/Category/module'
import like from '@/components/Like/module'
import size from '@/components/Size/module'
import comment from '@/components/Comment/module'

Vue.use(Vuex)
export default function createStore() {
  return new Vuex.Store({
    modules: {
      auth,
      alert,
      post,
      category,
      like,
      size,
      comment
    }
  })
}
