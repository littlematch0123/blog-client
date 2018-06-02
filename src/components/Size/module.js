export const SET_HEIGHT = 'SET_HEIGHT'

const size = {
  state: {
    height: ''
  },
  mutations: {
    /* 保存高度信息 */
    [SET_HEIGHT](state, payload) {
      state.height = payload.height
    }
  }
}
export default size
