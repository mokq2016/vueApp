import Vue from 'vue'
import * as types from '../mutation-types'

export default {
  state: {},
  mutations: {
    [types.UPDATE_CACHE](state, cache) {
      Object.keys(cache).forEach((k)=>{
        Vue.set(state, k, cache[k])
      })
    }
  },
  actions: {
    [types.UPDATE_CACHE]({ commit },cache) {
      commit(types.UPDATE_CACHE, cache)
    }
  }
}
