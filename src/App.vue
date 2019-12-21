<template>
  <div>
    <h1 v-if="!$store.state.auth.isLoggedIn">I am NOT logged in</h1>
    <ul>
      <li>
        <a @click="$router.push({ name: 'home'})">Home</a>
      </li>
      <li>
        <a @click="$router.push({ name: 'login'})">Login</a>
      </li>
      <li>
        <a @click="$router.push({ name: 'register'})">Register</a>
      </li>
      <li>
        <a @click="$store.dispatch('logout')">Logout</a>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<style lang="scss">
</style>
