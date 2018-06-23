import { BASE_COMMENT_URL } from '@/constants/API'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const LOAD_COMMENTS_ASYNC = 'LOAD_COMMENTS_ASYNC'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_COMMENT_ASYNC = 'ADD_COMMENT_ASYNC'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_COMMENT_ASYNC = 'UPDATE_COMMENT_ASYNC'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_ASYNC = 'DELETE_COMMENT_ASYNC'

const comment = {
  state: {
    docs: []
  },
  getters: {
    commentCount: state => state.docs.length,
    getCommentById: state => id => state.docs.find(doc => doc._id === id),
    getCommentsByPostId: state => id => state.docs.filter(doc => doc.post && doc.post._id === id),
    getCommentsByUserId: state => id => state.docs.filter(doc => doc.user && doc.user._id === id),
    getCommentsCountByPostId: (state, getters) => id => getters.getCommentsByPostId(id).length
  },
  actions: {
    /* 获取全部评论 */
    [LOAD_COMMENTS_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          data: payload,
          url: BASE_COMMENT_URL,
          doHideAlert: true,
          success(result) {
            // 保存类别
            commit(LOAD_COMMENTS, result.docs)
            // 向前端通知操作成功
            resolve(result.docs)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 增加评论 */
    [ADD_COMMENT_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          method: 'post',
          headers: { Authorization: sessionStorage.getItem('token') },
          data: payload,
          url: BASE_COMMENT_URL,
          success(result) {
            // 保存类别
            commit(ADD_COMMENT, result.doc)
            // 向前端通知操作成功
            resolve(result.doc)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 更新评论 */
    [UPDATE_COMMENT_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          method: 'put',
          headers: { Authorization: sessionStorage.getItem('token') },
          data: payload.data,
          url: `${BASE_COMMENT_URL}/${payload.id}`,
          success(result) {
            // 保存类别
            commit(UPDATE_COMMENT, result.doc)
            // 向前端通知操作成功
            resolve(result.doc)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 删除评论 */
    [DELETE_COMMENT_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          method: 'delete',
          headers: { Authorization: sessionStorage.getItem('token') },
          url: `${BASE_COMMENT_URL}/${payload.id}`,
          success(result) {
            // 保存类别
            commit(DELETE_COMMENT, result.doc)
            // 向前端通知操作成功
            resolve(result.doc)
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
    /* 保存所有评论 */
    [LOAD_COMMENTS](state, payload) {
      state.docs = payload
    },
    /* 保存增加的评论到评论数组中 */
    [ADD_COMMENT](state, payload) {
      state.docs = [payload, ...state.docs]
    },
    /* 更新评论 */
    [UPDATE_COMMENT](state, payload) {
      state.docs = state.docs.map(t => {
        if (t._id === payload._id) {
          return payload
        }
        return t
      })
    },
    /* 删除评论 */
    [DELETE_COMMENT](state, payload) {
      state.docs = state.docs.filter(t => t._id !== payload._id)
    }
  }
}
export default comment
