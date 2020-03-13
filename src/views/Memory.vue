<template>
  <v-ons-page>
    <v-ons-toolbar class="primary toolbar-title">
      <div class="left pt-2">
        <v-ons-back-button class="pl-4"></v-ons-back-button>
      </div>
      <div class="center fs-24 white--text">{{time}}</div>
    </v-ons-toolbar>

    <div class="content">
      <div class="px-5">
        <div id="board-real">
          <div
            v-for="item in realBoardItems"
            :key="item.id"
            class="piece-wrap"
            :style="`width: ${pWidth}px; height: ${pHeight}px;`"
            v-hammer:tap="(event)=> clickPiece(event, item.id)"
            v-hammer:press="(event)=> clickPiece(event, item.id)"
            v-hammer:pan.start="(event)=> clickPiece(event, item.id)"
          >
            <div class="piece" :class="[item.isCover ? 'on' : '']">
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-ons-modal :visible="startVisible">
      <div class="clear-modal-wrap w-100 on">
        <div class="fs-48">
          <div class="mb-3 fs-24">LEVEL {{gameLevel}}</div>
          {{goTime === 0 ? 'START' : goTime}}
          <div class=" fs-20 pt-4">Preview : <strong class="reverse--text">{{previewTime}}s</strong></div>
        </div>
      </div>
    </v-ons-modal>

    <v-ons-modal :visible="clearVisible">
      <div class="clear-modal-wrap w-100 on">
        <v-ons-card>
          <div class="black--text fs-24 text-center">STAGE {{gameLevel}} CLEAR</div>
          <div class="grey--text text-center fs-14 pt-4">Congratulations</div>
          <div class="pt-8 px-4">
            <v-ons-button
              class="w-100 text-center"
              v-hammer:tap="(e)=> goClose(e, 'cancel')"
              v-hammer:press="(e)=> goClose(e, 'cancel')"
              v-hammer:pressup="(e)=> goClose(e, 'cancel')"
              v-hammer:pan.start="(e)=> goClose(e, 'cancel')"
            >NEXT</v-ons-button>
          </div>
        </v-ons-card>
      </div>
    </v-ons-modal>
    
    <v-ons-modal :visible="timeoverVisible">
      <div class="clear-modal-wrap w-100 on">
        <v-ons-card>
          <div class="black--text fs-24 text-center">Wrong</div>
          <div class="grey--text text-center fs-14 pt-4">Shall we try again?</div>
          <div class="pt-8 px-4">
            <v-ons-button
              class="w-100 text-center"
              modifier="quiet"
              v-hammer:tap="setCancel"
              v-hammer:press="setCancel"
              v-hammer:pressup="setCancel"
              v-hammer:pan.start="setCancel"
              style="width:48%"
            >Cancel</v-ons-button>
            <v-ons-button
              class="w-100 text-center"
              v-hammer:tap="setRetry"
              v-hammer:press="setRetry"
              v-hammer:pressup="setRetry"
              v-hammer:pan.start="setRetry"
              style="width:48%"
            >Retry</v-ons-button>
          </div>
        </v-ons-card>
      </div>
    </v-ons-modal>

  </v-ons-page>
</template>

<style>
.piece-wrap {
  padding: 4px; 
  box-sizing: border-box;
}
.piece {
  height:100%; 
  background: #dcdcdc;
  border-radius: 2px;
}
.piece.on { 
  background: #e49be8;
  transition: 0.05s;
  pointer-events: none;
}
.piece:active { 
  background: #e49be8;
  transition: 0.05s;
}
</style>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 35
    }
  },
  name: "memory",
  data() {
    return {
      gameLevel: this.level,
      pWidth: 0,
      pHeight: 0,
      boardHeight: 0,
      realBoardItems: [],
      randomArr: [],
      previewTime: 3,
      time: 3,
      goTime: 0,
      answerCount: 0,
      setGoTime: null,
      setPreviewTime: null,
      startVisible: false,
      timeoverVisible: false,
      clearVisible: false,
      isWait: true,
      gameParams: {}
    };
  },
  watch: {
    gameLevel(value) {
      this.setGameInit();
    }
  },
  created() {
    this.setGameInit();
    // this.setBoard();
  },
  methods: {
    setCancel(e){
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
        this.$emit('pop-page');
      }
    },
    setRetry(e) {
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
        this.timeoverVisible = false;
        this.isWait = true;
        this.setGameInit();
      }
    },
    setPreview(){
      this.setPreviewTime = setInterval(() => {
        this.time -= 1;
      }, 1000);
      
      setTimeout(() => {
        for(const i in this.realBoardItems){
          this.realBoardItems[i].isCover = false;
        }
        if(this.time < 1) {
          this.time = 'START';
          this.isWait = false;
        }
        clearInterval(this.setPreviewTime);

        // this.setPreviewTime = setInterval(() => {
        //   this.time += 1;
        // }, 1000);
      }, this.previewTime * 1000);
    },
    isClear(){
      // 클리어시
      this.clearVisible = true;
      this.$store.dispatch("gameSet/setGameClear", {
        gameType: this.gameType,
        level: this.gameLevel,
        time: this.time
      });
      // clearInterval(this.setPreviewTime);
    },
    clickPiece(e, i) {
      if(this.isWait || this.realBoardItems[i].isAnswer === 'OK'){
        return ;
      }

      if(this.realBoardItems[i].isAnswer === true){
        this.realBoardItems[i].isCover = true;
        this.realBoardItems[i].isAnswer = 'OK';
        this.answerCount++;

        if(this.answerCount === this.randomArr.length){
          this.isClear();
        }
      } else if(this.realBoardItems[i].isAnswer === false) {
        this.timeoverVisible = true;
        clearInterval(this.setPreviewTime);
      }
    },
    setBoard() {
      this.isWait = true;
      this.time = this.previewTime = this.gameParams.previewTime;

      this.answerCount = 0;
      this.randomArr = [];
      
      let randomCount = this.gameParams.randomCount;
      let totalCount = this.gameParams.totalCount;

      let temp = [];
      let random = 0;
      
      while (this.randomArr.length !== randomCount) {
        random = this.makeRandom(0, totalCount - 1);
        if (this.randomArr.indexOf(random) === -1) {
          this.randomArr.push(random);
        }
      }

      for(let i = 0 ; i < totalCount ; i++){
        temp.push({
          id: i,
          isAnswer: this.randomArr.some(num => i === num) ? true : false,
          isCover: this.randomArr.some(num => i === num) ? true : false
        })
      }

      this.realBoardItems = temp;
      this.setPreview();
    },
    makeRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    goStart() {
      this.startVisible = false;
      this.setBoard();
      clearInterval(this.setGoTime);
    },
    goClose(e, title) {
      if (e.type === "tap" || e.type === "pressup" || e.type === "panstart") {
   
        this.clearVisible = false;
        this.$store.commit('gameSet/setShowAd')
        clearInterval(this.setPreviewTime);

        if (this.$store.state.gameSet.isShowAd && this.gameLevel > 5) {
          // showInterstitial();
          this.gameLevel += 1;
        } else {
          this.gameLevel += 1;
        }
      }
    },
    setGameInit() {
      this.gameParams = this.$store.state.gameSet.stage[this.gameLevel];
      let clientWidth = document.body.clientWidth - 40;
      this.pWidth = this.pHeight = clientWidth / this.gameParams.row;
      this.boardHeight = clientWidth;
      
      this.startVisible = true;
      this.goTime = 3;
      // this.setGoTime = setInterval(() => {
      //   this.goTime -= 1;
      //   if (this.goTime === -1) {
      //     this.goStart();
      //   }
      // }, 1000);
          this.goStart();
    }
  }
};
</script>