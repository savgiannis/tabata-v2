<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="submit">
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit">register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      const credentials = {
        email: this.email,
        password: this.password
      };

      this.$store.dispatch("register", credentials).then(asd=>{
        console.log(asd);
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>