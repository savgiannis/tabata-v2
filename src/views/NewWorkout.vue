<template>
  <div>
    <h1 class="title text-center">Add new workout</h1>
    <v-subheader class="pa-0 d-flex justify-center mb-6">Customize intervals</v-subheader>

    <v-list rounded class="transparent pa-0 mb-6">
      <v-text-field
        class="hi"
        background-color="white"
        id="title"
        filled
        rounded
        height="60px"
        label="Workout title"
        hint="Workout title is required*"
        persistent-hint
      ></v-text-field>

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
      <v-btn class="primary flex-grow-1 mr-4">
        <v-icon left>icon-add</v-icon>Add Workout
      </v-btn>
      <v-btn class="flex-grow-1" color="error" outlined>
        <v-icon left>icon-close</v-icon>Cancel
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
.v-subheader {
  height: auto;
}

#title {
  text-align: center;
}

.v-label {
  left: 50% !important;
  transform: translateX(-50%);

  &--active {
    transform: translateX(-50%) !important;
    font-size: 14px;
    top: 4px !important;
  }
}

.hi {
  .v-input__slot {
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
  }
}
</style>