/* eslint-disable */
import Vue from 'vue'
import createApp from './main'

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

/* 获得初始数据 */
import { LOAD_CATEGORIES_ASYNC } from '@/components/Category/module'
import { LOAD_POSTS_ASYNC } from '@/components/Post/module'
import { LOAD_LIKES_ASYNC } from '@/components/Like/module'
import { LOAD_COMMENTS_ASYNC } from '@/components/Comment/module'
import { LOAD_USERS_ASYNC } from '@/components/User/module'
(function getInitialData() {
  const { postCount, categoryCount, userCount, likeCount, commentCount } = store.getters
  const { dispatch } = store
  // 获取类别信息
  !categoryCount && dispatch(LOAD_CATEGORIES_ASYNC),
  // 获取文章信息
  !postCount && dispatch(LOAD_POSTS_ASYNC),
  // 获取点赞信息
  !likeCount && dispatch(LOAD_LIKES_ASYNC),
  // 获取评论信息
  !commentCount && dispatch(LOAD_COMMENTS_ASYNC),
  // 获取用户信息
  !userCount && dispatch(LOAD_USERS_ASYNC)
})()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })
  app.$mount('#root')
})
