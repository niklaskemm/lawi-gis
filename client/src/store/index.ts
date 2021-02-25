import createPersistedState from "vuex-persistedstate"
import { createStore } from "vuex"

export default createStore({
  state: {
    user: null,
    token: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setToken(state, payload) {
      state.token = payload
    }
  },

  actions: {
    setUser({ commit }, payload) {
      commit("setUser", payload)
    },
    setToken({ commit }, payload) {
      commit("setToken", payload)
    }
  },

  modules: {},
  getters: {
    getUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    },
    isLoggedIn(state) {
      return !!state.token
    }
  },
  plugins: [createPersistedState()]
})
