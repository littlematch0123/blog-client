import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName:'home' */ '@/components/Home/Home'),
      name: 'home',
      meta: { index: 0 }
    },
    {
      path: '/posts',
      component: () => import(/* webpackChunkName:'postlist' */ '@/components/Post/PostList'),
      name: 'postlist'
    },
    {
      path: '/posts/:postid',
      component: () => import(/* webpackChunkName:'post' */ '@/components/Post/Post'),
      name: 'post',
      children: [
        {
          path: 'comments',
          name: 'commentlist',
          component: () => import(/* webpackChunkName:'commentlist' */ '@/components/Comment/CommentList'),
          children: [
            {
              path: 'add',
              name: 'addcomment',
              component: () => import(/* webpackChunkName:'comment' */ '@/components/Comment/AddComment')
            },
            {
              path: ':commentid/update',
              name: 'updatecomment',
              component: () => import(/* webpackChunkName:'comment' */ '@/components/Comment/UpdateComment')
            },
            {
              path: ':commentid/delete',
              name: 'deletecomment',
              component: () => import(/* webpackChunkName:'comment' */ '@/components/Comment/DeleteComment')
            }
          ]
        }
      ]
    },
    {
      path: '/categories',
      component: () => import(/* webpackChunkName:'categorylist' */ '@/components/Category/CategoryList'),
      name: 'categorylist'
    },
    {
      path: '/categories/:number',
      component: () => import(/* webpackChunkName:'category' */ '@/components/Category/Category'),
      name: 'category'
    },
    {
      path: '/topics/:number',
      component: () => import(/* webpackChunkName:'category' */ '@/components/Category/CategoryTopic'),
      name: 'topic'
    },
    // 注册
    {
      path: '/signup',
      component: () => import(/* webpackChunkName:'auth' */ '@/components/User/AuthSignup'),
      name: 'signup'
    },
    // 按手机号登录
    {
      path: '/signin_by_phonenumber',
      component: () => import(/* webpackChunkName:'auth' */ '@/components/User/AuthSigninByPhoneNumber'),
      name: 'signin_by_phonenumber'
    },
    // 按用户名登录
    {
      path: '/signin_by_username',
      component: () => import(/* webpackChunkName:'auth' */ '@/components/User/AuthSigninByUsername'),
      name: 'signin_by_username'
    },
    // 用户页面
    {
      path: '/users/:userid',
      component: () => import(/* webpackChunkName:'user' */ '@/components/User/UserDesk'),
      name: 'user'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})
