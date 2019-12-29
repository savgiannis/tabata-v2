<template>
  <div>
    <div class="d-flex flex-column">
      <h1 class="title text-center mb-4">Default Workout</h1>

      <v-progress-linear
        :color="isWork ? 'error' : 'primary'"
        height="5"
        :value="100 - (totalRemaining / duration * 100)"
        background-color="grey lighten-2"
      ></v-progress-linear>

      <div class="d-flex justify-space-between mb-4 mt-1 grey--text text--darken-3">
        <v-subheader class="pa-0">{{globalTimer | minutesSeconds}}</v-subheader>
        <v-subheader
          class="pa-0"
        >{{activeStep == intervals ? intervals : activeStep + 1}}/{{intervals}}</v-subheader>
        <v-subheader class="pa-0">{{totalRemaining | minutesSeconds}}</v-subheader>
      </div>

      <v-btn icon small class="align-self-center mb-4" :color="isWork ? 'error' : 'primary'">
        <v-icon small>icon-sound-off</v-icon>
      </v-btn>

      <v-progress-circular
        class="mb-4 align-self-center"
        :color="isWork ? 'error' : 'primary'"
        size="220"
        width="5"
        :value="(initialValue - timer) / initialValue * 100"
        :rotate="-90"
      >
        <span class="display-4 font-weight-medium" v-if="!tabataFinished">{{timer}}</span>
        <div class="display-3 font-weight-medium primary--text text-center" v-else>Finish</div>
      </v-progress-circular>

      <div class="d-flex align-self-center mb-4">
        <v-btn icon class="mr-4" :color="isWork ? 'error' : 'primary'" @click="prev">
          <v-icon>icon-prev</v-icon>
        </v-btn>
        <v-btn
          icon
          class="mr-4"
          :color="isWork ? 'error' : 'primary'"
          @click="isPaused ? start() : pause()"
          v-if="!tabataFinished"
        >
          <v-icon>{{isPaused ? 'icon-play' : 'icon-pause'}}</v-icon>
        </v-btn>
        <v-btn icon class="mr-4" v-if="tabataFinished" color="primary" @click="replay">
          <v-icon>icon-replay</v-icon>
        </v-btn>
        <v-btn icon :color="isWork ? 'error' : 'primary'" @click="next">
          <v-icon>icon-next</v-icon>
        </v-btn>
      </div>

      <v-list :elevation="1" class="intervals pa-0">
        <v-list-item-group :value="activeStep">
          <v-list-item
            v-for="(interval, index) in intervalList"
            :key="index"
            :active-class="isWork ? 'work-active' : 'rest-active'"
          >
            <v-list-item-content>
              <v-list-item-subtitle class="text-center">
                <span v-if="index === activeStep">Current Interval</span>
                <span v-else>{{index > activeStep ? 'Following Interval' : 'Past Interval'}}</span>
              </v-list-item-subtitle>
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
import { mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["intervalList", "intervals", "duration"])
  },
  data() {
    return {
      activeStep: 0,
      timer: null,
      initialValue: null,
      globalTimer: 0,
      totalRemaining: this.$store.getters.duration,
      timerInterval: null,
      globalTimerInterval: null,
      tabataFinished: false,
      isPaused: false,
      isWork: false
    };
  },
  created() {
    this.initialValue = this.intervalList[this.activeStep].value;
    this.timer = this.initialValue;

    this.start();
  },
  methods: {
    start() {
      this.timerInterval = setInterval(() => {
        this.timer -= 1;

        if (this.timer == 0) {
          this.activeStep++;

          if (this.activeStep == this.intervals) {
            clearInterval(this.timerInterval);
            clearInterval(this.globalTimerInterval);
            this.tabataFinished = true;
            this.globalTimer++;
            this.totalRemaining--;
            return;
          }

          this.initialValue = this.intervalList[this.activeStep].value;
          this.timer = this.initialValue;
        }
      }, 1000);

      this.globalTimerInterval = setInterval(() => {
        this.globalTimer++;
        this.totalRemaining--;
      }, 1000);

      this.isPaused = false;
    },
    pause() {
      clearInterval(this.timerInterval);
      clearInterval(this.globalTimerInterval);
      this.isPaused = true;
    },
    next() {
      if (this.activeStep > this.intervals - 1) return;

      if (this.activeStep == this.intervals - 1) {
        this.activeStep++;
        return;
      }

      this.pause();
      let globalTimer = 0;

      for (let [index, interval] of this.intervalList.entries()) {
        if (index > this.activeStep) break;
        globalTimer += interval.value;
      }

      this.globalTimer = globalTimer;
      this.totalRemaining = this.duration - this.globalTimer;

      this.activeStep++;
      this.initialValue = this.intervalList[this.activeStep].value;
      this.timer = this.initialValue;
      this.start();
    },
    prev() {
      if (this.activeStep == 0) return;
      if (this.tabataFinished) this.tabataFinished = false;
      this.pause();
      this.activeStep--;

      let globalTimer = 0;

      for (let [index, interval] of this.intervalList.entries()) {
        if (index >= this.activeStep) break;
        globalTimer += interval.value;
      }

      this.globalTimer = globalTimer;
      this.totalRemaining = this.duration - this.globalTimer;

      this.initialValue = this.intervalList[this.activeStep].value;
      this.timer = this.initialValue;
      this.start();
    },
    replay() {
      clearInterval(this.timerInterval);
      clearInterval(this.globalTimerInterval);

      this.activeStep = 0;

      this.initialValue = this.intervalList[this.activeStep].value;
      this.timer = this.initialValue;
      this.tabataFinished = false;
      this.globalTimer = 0;
      this.totalRemaining = this.duration;
      this.start();
    }
  },
  watch: {
    activeStep(newValue) {
      if (newValue == this.intervals) {
        this.tabataFinished = true;
        this.globalTimer = this.duration;
        this.totalRemaining = 0;
        this.timer = 0;
        clearInterval(this.timerInterval);
        clearInterval(this.globalTimerInterval);
        this.isWork = false;
        return;
      }

      if (newValue > this.intervals) return;

      this.intervalList[newValue].name === "Work"
        ? (this.isWork = true)
        : (this.isWork = false);
    }
  },
  destroyed() {
    clearInterval(this.timerInterval);
    clearInterval(this.globalTimerInterval);
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

.rest-active {
  background-color: #1976d2;

  .v-list-item__subtitle,
  .v-list-item__title {
    color: #fff !important;
  }
}

.work-active {
  background-color: #ff5252;

  .v-list-item__subtitle,
  .v-list-item__title {
    color: #fff !important;
  }
}

.v-subheader {
  height: auto;
}
</style>