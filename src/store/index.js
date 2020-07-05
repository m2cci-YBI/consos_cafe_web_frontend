import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


export default new Vuex.Store({
  
  state: {
    auth: Boolean,
    consommation:{},
    roles:[],
    isResp:false
  },
  mutations: {
    setIsResp(state,bool){
      state.isResp=bool;
    },
    setAuth(state,bool){
      state.auth=bool;
    },
    setRoles(state,r){
      state.roles=r;
    },
    setConsommation(state,c){
      state.consommation=c;
    },

  },
  actions: {},
  
  plugins: [createPersistedState()],
});
