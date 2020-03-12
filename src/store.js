import Vue from 'vue'
import Vuex from 'vuex'
import stage from "@/assets/js/stage.js";
import clickSound from "@/assets/mp3/click.mp3";
import success from "@/assets/mp3/success.mp3";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameSet: {
      namespaced: true,
      state: {
        clickSound: new Audio(clickSound),
        successSound: new Audio(success),
        stage: [],
        memoryClear: [],
        orderClear: [],
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
        },
        // setting sound
        setSound(state, value) {
          state.isSound = value;
          if(value) {
            state.clickSound.play();
          }
        },
        // setting success sound
        setSuccessSound(state) {
          state.successSound.play();
        },
        setShowAd(state){
          // 1 minutes = 60000

          let getTime = Number(localStorage['adTime']);
          if((new Date()).getTime() > Number(getTime) + 60000 * 1.5){ // 1 minutes 30 seconds
            localStorage['adTime'] = (new Date()).getTime();
            state.isShowAd = true;
          } else {
            state.isShowAd = false;
          }
        },
        setGameInit(state){
          state.memoryClear = localStorage['memoryClear'] === undefined ? [] : JSON.parse(localStorage['memoryClear']);
          state.orderClear = localStorage['orderClear'] === undefined ? [] : JSON.parse(localStorage['orderClear']);

          if(localStorage['adTime'] === undefined) {
            localStorage['adTime'] = (new Date()).getTime();
          }
        }
      },
      actions: {
        setGameClear(context, obj) {
          let state = context.state;

          if(obj.gameType === 'memory') { // 시간제한 없는것
            state.memoryClear.push({
              level: obj.level,
              time: obj.time,
            });
            localStorage['memoryClear'] = JSON.stringify(state.memoryClear);
          } else {
            state.orderClear.push({
              level: obj.level,
              time: obj.time,
            });
            localStorage['orderClear'] = JSON.stringify(state.orderClear);
          }
        }
      }
    }
  }
})
