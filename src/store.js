import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameSet: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        setStage(){

        },
        setGameInit(state){
          // state.noLimitClear = localStorage['noLimitClear'] === undefined ? [] : JSON.parse(localStorage['noLimitClear']);
          // state.limitClear = localStorage['limitClear'] === undefined ? [] : JSON.parse(localStorage['limitClear']);

          // if(localStorage['adTime'] === undefined) {
          //   localStorage['adTime'] = (new Date()).getTime();
          // }
        }
      }
    }
  }
})
