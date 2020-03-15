import Vue from 'vue'
import Vuex from 'vuex'
import stage from "@/assets/js/stage.js";
import clickSound from "@/assets/mp3/click.mp3";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameSet: {
      namespaced: true,
      state: {
        clickSound: new Audio(clickSound),
        stage: [],
        memoryClear: [],
        isSound: true,
        isShowAd: true,
        isVibration: true,
      },
      mutations: {
        setVibrate(state, value) {
          state.isVibration = value;
        },
        setStage(state){
          state.stage = stage;
          console.log(state.stage)
        },
        // setting sound
        setSound(state, value) {
          state.isSound = value;
          if(value) {
            state.clickSound.play();
          }
        },
        // setting success sound
        setClickSound(state) {
          if(state.isSound){
            state.clickSound.pause();
            state.clickSound.currentTime = 0;
            state.clickSound.play();
          }
        },
        setShowAd(state){
          // 1 minutes = 60000

          let getTime = Number(localStorage['adTime']);
          if((new Date()).getTime() > Number(getTime) + 60000 * 1){ // 1 minutes 30 seconds
            localStorage['adTime'] = (new Date()).getTime();
            state.isShowAd = true;
          } else {
            state.isShowAd = false;
          }
        },
        setGameInit(state){
          state.memoryClear = localStorage['memoryClear'] === undefined ? [] : JSON.parse(localStorage['memoryClear']);

          if(localStorage['adTime'] === undefined) {
            localStorage['adTime'] = (new Date()).getTime();
          }
        },
        setClearListReset(state){
          state.memoryClear = [];
          localStorage.removeItem('memoryClear');
        },
      },
      actions: {
        setGameClear(context, obj) {
          let state = context.state;

          state.memoryClear.push({
            level: obj.level,
            time: obj.time,
          });
          localStorage['memoryClear'] = JSON.stringify(state.memoryClear);
        }
      }
    }
  }
})
