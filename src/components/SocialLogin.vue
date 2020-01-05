<template>
  <div>
    <div class="or">
      <span></span>
      <p class="body-1 mb-0">OR</p>
      <span></span>
    </div>

    <div class="d-flex flex-column">
      <v-btn color="#385aa5" depressed class="mb-4 white--text" @click="facebookLogin">
        <v-icon small left>icon-facebook</v-icon>Login with facebook
      </v-btn>
      <v-btn color="#dd422d" depressed class="white--text" @click="googleLogin">
        <v-icon small left>icon-google</v-icon>Login with google
      </v-btn>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    async googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      // console.log(result);
    },
    async facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      // console.log(result);
    }
  }
};
</script>

<style lang="scss" scoped>
.or {
  display: flex;
  align-items: center;
  color: #616161;
  margin-top: 50px;
  margin-bottom: 50px;

  span {
    height: 1px;
    border-top: 1px solid #616161;
    flex: 1;
    &:first-child {
      margin-right: 20px;
    }
    &:last-child {
      margin-left: 20px;
    }
  }
}
</style>