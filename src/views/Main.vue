<template>
  <v-ons-page class="main-page">
    <div class="background main"></div>
    <div class="content">
      <div class="content-wrap">
        <v-ons-card class="game-select-card text-center pa-5">
          <div class="pt-7 pb-8"><strong class="fs-24">GAME SELECT</strong></div>
          <v-ons-button class="btn-item"
            v-hammer:tap="(e)=> goPage(e, 'memory')"
            v-hammer:press="(e)=> goPage(e, 'memory')"
            v-hammer:pressup="(e)=> goPage(e, 'memory')"
            v-hammer:pan.start="(e)=> goPage(e, 'memory')">MEMORY</v-ons-button>
          <v-ons-button class="btn-item"
            v-hammer:tap="(e)=> goPage(e, 'order')"
            v-hammer:press="(e)=> goPage(e, 'order')"
            v-hammer:pressup="(e)=> goPage(e, 'order')"
            v-hammer:pan.start="(e)=> goPage(e, 'order')">ORDER</v-ons-button>
        </v-ons-card>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import memoryPage from "@/views/Memory"
import orderPage from "@/views/Order"
// import { showBanner } from "@/assets/js/admob.js";
export default {
  name: 'main-component',
  data(){
    return {
      isTimeLimit: false,
      stage: this.$store.state.gameSet.stage,
    }
  },
  mounted(){
    // setTimeout(() => {
    //   showBanner()
    // }, 1000)
  },
  methods: {
    goPage(e, gType){
      if(e.type === 'tap' || e.type === 'pressup' || e.type === 'panstart'){
        let params = {};
        let level = 1;

        // level = this.$store.state.gameSet.limitClear.length + 1 : this.$store.state.gameSet.noLimitClear.length + 1

        params = {
          level: level,
        }

        if(gType === 'memory'){ 
          this.$emit("push-page", {...memoryPage, onsNavigatorProps: params});
        } else {
          this.$emit("push-page", {...orderPage, onsNavigatorProps: params});
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