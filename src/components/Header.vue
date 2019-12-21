<template>
  <div>
    <v-app-bar flat color="primary" class="white--text">
      <v-btn icon fab class="d-md-none white--text" small @click="drawer = !drawer">
        <v-icon>icon-menu</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-md-0" @click="$router.push({name: 'home'})">Tabata</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="mr-2 white--text d-none d-md-flex"
        text
        v-if="!isLoggedIn"
        :to="{name: 'login'}"
      >Log in</v-btn>

      <v-btn
        class="white--text d-none d-md-flex"
        text
        v-if="!isLoggedIn"
        :to="{name: 'register'}"
      >Register</v-btn>

      <v-btn
        class="white--text d-none d-md-flex"
        text
        v-if="isLoggedIn"
        @click.stop="dialog = true"
      >Log out</v-btn>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer">
      <v-list nav>
        <v-list-item v-if="!isLoggedIn" :to="{name: 'login'}">Log in</v-list-item>
        <v-list-item v-if="!isLoggedIn" :to="{name: 'register'}">Register</v-list-item>
        <v-list-item v-if="isLoggedIn" @click.stop="dialog = true">Log out</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Log out</v-card-title>

        <v-card-text>Are you sure you want to log out?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" outlined @click="logout">Yes</v-btn>

          <v-btn color="primary" @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="4000" top multi-line>
      You have been successfully logged out.
      <v-btn color="primary" text @click="snackbar = false">OK</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      dialog: false,
      snackbar: false
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.drawer = false;
      this.dialog = false;
      this.snackbar = true;
    }
  }
};
</script>


<style lang="scss" scoped>
.v-toolbar__title {
  cursor: pointer;
}
</style>