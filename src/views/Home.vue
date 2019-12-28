<template>
  <div>
    <div class="d-flex justify-center mb-6">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="primary" small v-on="on">
            <v-icon left small>icon-list</v-icon>My Workouts
          </v-btn>
        </template>
        <v-list dense class="py-0">
          <v-list-item
            class="d-flex align-center"
            v-for="(tabata,index) in $store.state.tabata.tabatas"
            :key="index"
            @click="switchWorkout"
          >
            <v-list-item-content>
              <v-list-item-title>{{tabata.name}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon class="my-0 align-self-center d-flex align-center">
              <v-chip color="success white--text" x-small>
                <v-icon left x-small>icon-workout</v-icon>active
              </v-chip>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn class="primary ml-2" small @click="addNew">
        <v-icon left small>icon-plus</v-icon>New
      </v-btn>

      <v-btn class="primary ml-2" small :disabled="!saveEnabled" @click="save">
        <v-icon left small>icon-save</v-icon>Save
      </v-btn>
    </div>

    <v-list rounded class="transparent pa-0 mb-6">
      <v-list-item class="white tabata-settings-header elevation-1 mb-4">
        <v-list-item-content class="py-1">
          <v-list-item-title class="text-center title">{{$store.state.tabata.selectedTabata.name}}</v-list-item-title>
          <v-list-item-subtitle
            class="text-center"
          >{{duration | minutesSeconds}} minutes &#x2022; {{intervals}} intervals</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        class="white elevation-1 mb-4"
        v-for="(setting,key,index) in $store.state.tabata.selectedTabata.settings"
        :key="index"
      >
        <v-list-item-action class="mr-4">
          <v-btn icon>
            <v-icon color="primary" @click="decrement(key)">icon-minus</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-content class="py-1">
          <v-list-item-subtitle class="text-center">{{setting.name}}</v-list-item-subtitle>
          <v-list-item-title class="text-center title">{{setting.value}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action class="ml-4">
          <v-btn icon>
            <v-icon color="primary" @click="increment(key)">icon-plus</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <div class="d-flex">
      <v-btn class="primary flex-grow-1" @click="startTimer">
        <v-icon left>icon-play</v-icon>Start
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <div class="d-flex justify-end pa-2 pb-0">
          <v-btn icon small @click="dialog=false">
            <v-icon>icon-close</v-icon>
          </v-btn>
        </div>

        <v-card-title class="headline justify-center pt-0">Log in</v-card-title>

        <v-card-text
          class="text-center"
        >Please login or create an account to add or save many tabata settings.</v-card-text>

        <v-card-actions class="px-6 pb-4 d-flex justify-center">
          <v-btn color="primary" outlined :to="{name: 'login'}">Login</v-btn>

          <v-btn color="primary" :to="{name: 'register'}">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["intervals", "duration", "saveEnabled", "isLoggedIn"])
  },
  methods: {
    ...mapActions(["increment", "decrement"]),
    switchWorkout() {},
    save() {
      if (!this.isLoggedIn) this.dialog = true;
    },
    addNew() {
      if (!this.isLoggedIn) this.dialog = true;
    },
    startTimer() {
      this.$router.push({ name: "timer" });
    }
  }
};
</script>


<style lang="scss" scoped>
.tabata-settings-header {
  height: 60px;

  .tabata-settings-header {
    margin: 0 52px;
  }
}

.toolbar-btn {
  height: 36px !important;
  width: 36px !important;
}
</style>