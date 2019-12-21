<template>
  <div>
    <v-footer class="justify-center py-3" color="#424242">
      <p class="body-2 text-center mb-0 white--text">
        &copy;&nbsp;2020 - Created by
        <a id="devbrains">Dev Brains</a>
      </p>
    </v-footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
img {
  width: 120px;
}

a#devbrains {
  font-weight: 500;
  color: lighten(#1976d2, 10%);

  &:hover {
    color: lighten(#1976d2, 15%);
    opacity: 1;
  }
}
</style>