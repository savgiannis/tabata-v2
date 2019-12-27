<template>
  <div>
    <div class="d-flex flex-column">
      <h1 class="title text-center mb-4">Default Workout</h1>

      <v-progress-linear color="primary" height="5" value="10" background-color="grey lighten-2"></v-progress-linear>
      <div class="d-flex justify-space-between mb-4 mt-1 grey--text text--darken-3">
        <v-subheader class="pa-0" height="auto">00:08</v-subheader>
        <v-subheader class="pa-0" height="auto">1/16</v-subheader>
        <v-subheader class="pa-0" height="auto">03:52</v-subheader>
      </div>

      <v-btn icon small class="align-self-center mb-4" color="primary">
        <v-icon small>icon-sound-off</v-icon>
      </v-btn>

      <v-progress-circular
        class="mb-4 align-self-center"
        color="primary"
        size="220"
        width="5"
        :value="(initialValue - timer) / initialValue * 100"
        :rotate="-90"
      >
        <span class="display-4 font-weight-medium">{{timer}}</span>
      </v-progress-circular>

      <div class="d-flex align-self-center mb-4">
        <v-btn icon class="mr-4" color="primary">
          <v-icon>icon-prev</v-icon>
        </v-btn>
        <v-btn icon class="mr-4" color="primary">
          <v-icon>icon-pause</v-icon>
        </v-btn>
        <v-btn icon color="primary">
          <v-icon>icon-next</v-icon>
        </v-btn>
      </div>

      <v-list :elevation="1" class="intervals pa-0">
        <v-list-item-group :value="activeStep">
          <v-list-item v-for="(interval, index) in intervalList" :key="index">
            <v-list-item-content>
              <v-list-item-subtitle class="text-center">Current interval</v-list-item-subtitle>
              <v-list-item-title class="text-center title">{{interval.name}}</v-list-item-title>
              <v-list-item-subtitle class="text-center">{{index + 1}}/{{intervalList.length}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["intervalList"])
  },
  data() {
    return {
      activeStep: 0,
      timer: null
    };
  },
  created() {
    this.initialValue = this.intervalList[this.activeStep].value;
    this.timer = this.intervalList[this.activeStep].value;
    setInterval(() => {
      this.timer -= 1;
      if (this.timer == -1) {
        this.activeStep++;
        this.initialValue = this.intervalList[this.activeStep].value;
        this.timer = this.intervalList[this.activeStep].value;
      }
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.v-list.intervals {
  height: 276px;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: #e0e0e0;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1976d2;
    border-radius: 4px;
  }
}

.v-item--active {
  background-color: #1976d2;

  .v-list-item__subtitle,
  .v-list-item__title {
    color: #fff !important;
  }
}

.v-subheader {
  height: auto;
}
</style>