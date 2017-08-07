import Vue from 'vue'

import * as types from '../mutation-types'

const state = {
  hdxxData: null,
  wqHdxxData: null
}

export default {
  state: state,
  mutations: {
    [types.UPDATE_HDXX](state, hdxx) {
      Object.keys(hdxx).forEach(k => Vue.set(state, k, hdxx[k]));
    },
    [types.CLEAR_HDXX](state) {
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  getters: {
    GET_CURHDXX(state){
        return JSON.parse(state.hdxxData);
    },
    GET_WQHDXX(state){
        return JSON.parse(state.wqHdxxData);
    }
  },
  actions: {
    UPDATE_HDXX({ commit }, hdxx) {
      commit(types.UPDATE_HDXX, hdxx)
    },
    CLEAR_HDXX({ commit }) {
      commit(types.CLEAR_HDXX)
    }
  }
}
