<template>
  <v-ons-page class="game-page">
    <v-ons-toolbar class="primary toolbar-title">
      <div class="left pt-2">
        <v-ons-back-button class="pl-4"></v-ons-back-button>
      </div>
      <div class="center fs-24 white--text">CLEAR</div>
      <div class="right" style="padding-top: 10px;">
        <v-ons-toolbar-button
          modifier="quiet"
          class="white--text"
          @click="doReset"
        >
          <v-ons-icon icon="ion-ios-refresh"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div class="mb-1 pa-2">
      <div class="pt-5">
        <v-ons-list>
          <v-ons-list-item modifier="longdivider" v-for="item in memoryClear" :key="item.level">
            <div class="left">LEVEL {{item.level}}</div>
            <div class="right">
              <v-ons-icon icon="ion-ios-checkmark" class="fs-32 primary--text" style="margin-top:-6px;"></v-ons-icon>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </div>
  </v-ons-page>
</template>
<script>
export default {
  name: "clear-list",
  data() {
    return {
      memoryClear: this.$store.state.gameSet.memoryClear,
    };
  },
  methods: {
    doReset(e) {
      this.$ons.notification
        .confirm("Are you sure?", { title: "Reset" })
        .then(response => {
          if (response) {
            this.$store.commit('gameSet/setClearListReset');
            this.memoryClear = this.$store.state.gameSet.memoryClear;
          }
        });
    },
  }
};
</script>