const module1 = {
  namespaced: true,
  state: {
    token: ''
  },
  getters: {
    getToken: state => state.token
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      if (token) {
        state.token = token
      } else {
        state.token = ''
      }
    }
  },
  actions: {}
}

export default module1
