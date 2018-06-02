export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDE_LOADING = 'HIDE_LOADING'
export const SHOW_ALERTTEXT = 'SHOW_ALERTTEXT'
export const HIDE_ALERTTEXT = 'HIDE_ALERTTEXT'
const alert = {
  state: {
    doShowLoading: false,
    alertText: ''
  },
  mutations: {
    [SHOW_LOADING](state) {
      state.doShowLoading = true
    },
    [HIDE_LOADING](state) {
      state.doShowLoading = false
    },
    [SHOW_ALERTTEXT](state, payload) {
      state.alertText = payload
    },
    [HIDE_ALERTTEXT](state) {
      state.alertText = ''
    }
  }
}

export default alert
