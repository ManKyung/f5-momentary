<template>
  <v-ons-page class="main-page">
    <div class="background" :style="`background:url(${logoImage});height:100%; background-size:contain; background-repeat:repeat`"></div>
    <div class="content">
      <div class="content-wrap">
        <v-ons-card class="game-select-card text-center pa-5">
          <div class="pt-7 pb-8">
            <strong class="fs-24">MEMORY GAME</strong>
            <div class="pt-3">
              <small class="grey--text text--darken-1">Remember the color in a short time!</small>
            </div>
          </div>
          <v-ons-button class="btn-item"
            v-hammer:tap="(e)=> goPage(e, 'memory')"
            v-hammer:press="(e)=> goPage(e, 'memory')"
            v-hammer:pressup="(e)=> goPage(e, 'memory')"
            v-hammer:pan.start="(e)=> goPage(e, 'memory')">PLAY</v-ons-button>
        </v-ons-card>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import logoImage from '@/assets/img/logo.png';
import memoryPage from "@/views/Memory"
// import orderPage from "@/views/Order"
import { showBanner } from "@/assets/js/admob.js";
export default {
  name: 'main-component',
  data(){
    return {
      logoImage,
      isTimeLimit: false,
      stage: this.$store.state.gameSet.stage,
    }
  },
  mounted(){
    setTimeout(() => {
      showBanner()
    }, 1000)
  },
  methods: {
    goPage(e, gameType){
      if(e.type === 'tap' || e.type === 'pressup' || e.type === 'panstart'){
        let params = {
          level: this.$store.state.gameSet[`${gameType}Clear`].length + 1
        }
        if(gameType === 'memory'){ 
          this.$emit("push-page", {...memoryPage, onsNavigatorProps: params});
        // } else {
        //   this.$emit("push-page", {...orderPage, onsNavigatorProps: params});
        }
      }
    },
    goClose(e, title){
      if(e.type === 'tap' || e.type === 'pressup' || e.type === 'panstart'){
        setTimeout(() => {
          this.isModalOn = false;
        }, 100)
        setTimeout(() => {
          this.clearVisible = false;
        }, 400)
      }
    },
    isClear(){
      for(const item of this.realBoardItems){
        if(item.open === false){
          return false;
        }
      }
      setTimeout(() => {
        this.clearVisible = true;
      }, 10)
      setTimeout(() => {
        this.isModalOn = true;
      }, 200)
    },
  }
}
</script>