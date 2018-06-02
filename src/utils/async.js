import { SHOW_LOADING, HIDE_LOADING, SHOW_ALERTTEXT, HIDE_ALERTTEXT } from '@/components/Alert/module'
import { SIGNOUT } from '@/components/User/module'
import axios from 'axios'

const async = {
  install(Vue) {
    Vue.prototype.$axios = ({ commit, url, method, data, headers, success, fail, doHideAlert }) => {
      // 显示loading
      commit(SHOW_LOADING)
      let axiosObj = url
      if (method) {
        axiosObj = { method, url, data, headers }
      }
      axios(axiosObj)
        .then(res => {
          const { message, result } = res.data
          // 关闭loading
          commit(HIDE_LOADING)
          // 显示成功提示
          !doHideAlert && commit(SHOW_ALERTTEXT, message)
          // 1秒后自动关闭提示
          setTimeout(() => { commit(HIDE_ALERTTEXT) }, 1000)
          // 成功后的回调函数
          success && success(result)
        })
        .catch(err => {
          // 关闭loading
          commit(HIDE_LOADING)
          if (err.response) {
            const { data } = err.response
            // 自定义错误
            if (data.code === 1) {
              commit(SHOW_ALERTTEXT, data.message)
              // 系统错误
            } else if (data.code === 2) {
              commit(SHOW_ALERTTEXT, data.message)
              fail && fail(err)
              // 认证错误
            } else if (data.code === 3) {
              commit(SHOW_ALERTTEXT, data.message)
              commit(SIGNOUT)
              window.location.href = '/signin_by_username'
            } else {
              // 显示错误提示
              commit(SHOW_ALERTTEXT, '服务器故障')
              // 失败后的回调函数
              fail && fail(err)
            }
          } else {
            // 显示错误提示
            commit(SHOW_ALERTTEXT, '服务器故障')
            // 失败后的回调函数
            fail && fail(err)
          }
        })
    }
  }
}

export default async
