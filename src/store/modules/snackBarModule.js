export default {
  namespaced: true,
  state: {
    snackbar: false,
    color: '',
    timeout: null,
    text: ''
  },
  mutations: {
    setSnackBar: (state, value) => state.snackbar = value,
    openSnackBar: (state, object) => {
      state.snackbar = true
      state.color = object.color !== undefined ? object.color : ''
      state.timeout = object.timeout !== undefined ? object.timeout : ''
      state.text = object.text !== undefined ? object.text : ''
    }
  },
  actions: {
    setSnackBar: ({commit}, value) => {
      commit('setSnackBar', value)
    },
    openSnackBar: ({commit}, object) => {
      commit('openSnackBar', object)
    },
  },
  getters: {
    getSnackBar: state => state.snackbar,
    getTimeout: state => state.timeout,
    getText: state => state.text,
    getColor: state => state.color
  }
}