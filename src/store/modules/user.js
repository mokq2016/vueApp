import Vue from 'vue'

import * as types from '../mutation-types'

export default {
  state: JSON.parse(localStorage.getItem('user')) || {},
  mutations: {
    [types.USER_SIGNIN] (state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)
    },
    [types.USER_SIGNOUT] (state) {
      localStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  getters:{
    GET_NSRINFO(state){
        return state.user.nsrInfo;
    },
  },
  actions: {
    USER_SIGNIN ({ commit }, user) {
      commit(types.USER_SIGNIN, user)
    },
    USER_SIGNOUT ({ commit }) {
      commit(types.USER_SIGNOUT)
    }
  }
}
