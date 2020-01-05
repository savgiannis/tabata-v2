<template>
  <div>
    <h1 class="title text-center">Add new workout</h1>
    <v-subheader class="pa-0 d-flex justify-center mb-6">Customize intervals</v-subheader>

    <v-text-field
      class="new-workout-name"
      background-color="white"
      id="title"
      filled
      rounded
      height="60px"
      label="Workout title"
      hint="Workout title is required*"
      persistent-hint
      v-model="draftWorkout.name"
      :error-messages="nameErrors"
      placeholder="Give your work out a title"
    ></v-text-field>

    <v-list rounded class="transparent pa-0 mb-6">
      <v-list-item
        class="white elevation-1 mb-4"
        v-for="(setting,key,index) in draftWorkout.settings"
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

    <v-checkbox
      on-icon="icon-checkbox-on"
      off-icon="icon-checkbox-off"
      color="primary"
      dense
      v-model="draftWorkout.makeActive"
    >
      <template slot="label">
        <v-subheader class="pa-0">Make this workout active when added</v-subheader>
      </template>
    </v-checkbox>

    <div class="d-flex">
      <v-btn class="primary flex-grow-1 mr-4" @click="submit">
        <v-icon left>icon-add</v-icon>Add Workout
      </v-btn>
      <v-btn class="flex-grow-1" color="error">
        <v-icon left>icon-close</v-icon>Cancel
      </v-btn>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],
  data() {
    return {
      draftWorkout: this.$store.state.tabata.draftWorkout
    };
  },
  validations: {
    draftWorkout: {
      name: {
        required
      }
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.draftWorkout.name.$dirty) return errors;
      if (!this.$v.draftWorkout.name.required)
        errors.push("Workout title is required*");
      return errors;
    }
  },
  methods: {
    ...mapActions(["submitNewWorkout"]),
    increment(key) {
      this.draftWorkout.settings[key].value++;
    },
    decrement(key) {
      if (
        (key == "prepare" || key == "rest") &&
        this.draftWorkout.settings[key].value == 0
      )
        return;
      if (
        (key == "work" || key == "cycles" || key == "sets") &&
        this.draftWorkout.settings[key].value == 1
      )
        return;
      this.draftWorkout.settings[key].value--;
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.submitNewWorkout(this.draftWorkout);
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

<style lang="scss" scoped>
.v-subheader {
  height: auto;
}
</style>