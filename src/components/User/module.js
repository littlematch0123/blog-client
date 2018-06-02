import { SIGNUP_URL, SIGNIN_BYUSERNAME_URL, SIGNIN_BYPHONENUMBER_URL, VERIFICATE_URL, BASE_USER_URL } from '@/constants/API'

export const SIGNUP_ASYNC = 'SIGNUP_ASYNC'
export const SIGNIN_BYUSERNAME_ASYNC = 'SIGNIN_BYUSERNAME_ASYNC'
export const SIGNIN_BYPHONENUMBER_ASYNC = 'SIGNIN_BYPHONENUMBER_ASYNC'
export const AUTH_VERIFICATE_ASYNC = 'AUTH_VERIFICATE_ASYNC'
export const LOAD_USERS_ASYNC = 'LOAD_USERS_ASYNC'
export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_USER_ASYNC = 'LOAD_USER_ASYNC'
export const LOAD_USER = 'LOAD_USER'
export const SIGNIN = 'SIGNIN'
export const SIGNOUT = 'SIGNOUT'

const auth = {
  state: {
    token: null,
    user: null,
    users: []
  },
  getters: {
    userCount: state => state.users.length
  },
  actions: {
    /* 获取当前用户信息 */
    [LOAD_USER_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: `${BASE_USER_URL}/${payload.id}`,
          doHideAlert: true,
          success(result) {
            // 向前端通知操作成功
            resolve()
            commit(LOAD_USER, result.doc)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 获取所有用户信息 */
    [LOAD_USERS_ASYNC]({ commit }) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: BASE_USER_URL,
          doHideAlert: true,
          success(result) {
            // 向前端通知操作成功
            resolve()
            commit(LOAD_USERS, result.docs)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 发送注册信息 */
    [SIGNUP_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SIGNUP_URL,
          method: 'post',
          data: payload,
          success() {
            // 向前端通知操作成功
            resolve()
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 发送用户名登录信息 */
    [SIGNIN_BYUSERNAME_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SIGNIN_BYUSERNAME_URL,
          method: 'post',
          data: payload,
          success(result) {
            // 用户登录
            commit(SIGNIN, result)
            // 向前端通知操作成功
            resolve()
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 发送手机号登录信息 */
    [SIGNIN_BYPHONENUMBER_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SIGNIN_BYPHONENUMBER_URL,
          method: 'post',
          data: payload,
          success() {
            // 向前端通知操作成功
            resolve()
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 发送验证信息 */
    [AUTH_VERIFICATE_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: VERIFICATE_URL,
          method: 'post',
          data: payload,
          success(result) {
            // 用户登录
            commit(SIGNIN, result)
            // 向前端通知操作成功
            resolve()
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    }
  },
  mutations: {
    /* 保存当前用户信息 */
    [SIGNIN](state, payload) {
      const { token, user } = payload
      state.user = user
      state.token = token
      // 将用户信息保存到sessionStorage中
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    /* 删除当前用户信息 */
    [SIGNOUT](state) {
      state.user = null
      state.token = null
      // 将用户信息从sessionStorage中删除
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    },
    /* 保存所有用户信息 */
    [LOAD_USERS](state, payload) {
      state.users = payload
    },
    /* 保存当前用户的所有信息 */
    [LOAD_USER](state, payload) {
      state.user = payload
    }
  }
}
export default auth
