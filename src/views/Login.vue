<template>
  <div>
    <h1 class="body-1 text-center mb-5 grey--text text--darken-2">LOG IN WITH CREDENTIALS</h1>

    <v-form @submit.prevent="submit">
      <v-text-field v-model="email" label="Email" :error-messages="emailErrors" solo></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        :error-messages="passwordErrors"
        solo
      ></v-text-field>

      <div class="d-flex flex-column flex-sm-row align-sm-start mt-2">
        <v-btn :loading="$store.state.loading" type="submit" color="primary">Log in</v-btn>
        <div
          class="d-flex flex-column align-center justify-center align-sm-end ml-sm-auto mt-5 mt-sm-0"
        >
          <a class="body-2 mb-1" @click="$router.push('/auth/reset')">Forgot password</a>
          <p class="body-2 mb-0">
            Dont have an account?
            <a @click="$router.push('/signup')">Sign up</a>
          </p>
        </div>
      </div>
    </v-form>

    <SocialLogin />
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import SocialLogin from "@/components/SocialLogin";

const loginValidator = function() {
  return !this.loginFailed;
};
export default {
  mixins: [validationMixin],
  components: {
    SocialLogin
  },
  data() {
    return {
      email: "",
      password: "",
      loginFailed: false
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required) errors.push("Please, Enter your email");
      if (!this.$v.email.loginValidator) errors.push("Wrong Email Or password");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required)
        errors.push("Please, Enter your password");
      if (!this.$v.password.loginValidator)
        errors.push("Wrong Email Or password");
      return errors;
    }
  },
  validations: {
    email: { required, loginValidator },
    password: { required, loginValidator }
  },
  methods: {
    submit() {
      this.loginFailed = false;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const credentials = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("login", credentials)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            this.loginFailed = true;
          });
      }
    }
  },
  watch: {
    email(newVal, oldVal) {
      if (oldVal !== "" && newVal === "") {
        this.loginFailed = false;
      }
    },
    password(newVal, oldVal) {
      if (oldVal !== "" && newVal === "") {
        this.loginFailed = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>