<template>
  <div>
    <h1>Login</h1>

    <button @click="googleLogin">Login with google</button>
    <br />
    <button @click="facebookLogin">Login with facebook</button>
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
      console.log(result);
    },
    async facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>