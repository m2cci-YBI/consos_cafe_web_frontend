import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: Boolean,
    consommation:{},
    roles:[],
    isResp:false
  },
  mutations: {},
  actions: {},
  modules: {},
});
