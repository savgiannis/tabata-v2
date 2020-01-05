<template>
  <v-app>
    <Header />

    <v-content class="py-5">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="8"
            lg="6"
            xl="4"
            offset="0"
            offset-sm="2"
            offset-lg="3"
            offset-xl="4"
          >
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
a {
  transition: all 0.2s;
}
a:hover {
  opacity: 0.8;
}

#buttons-toolbar {
  border-radius: 4px;

  .v-toolbar__content {
    padding-left: 0;
    padding-right: 0;
  }
}

#title {
  text-align: center;
}

.new-workout-name {
  .v-input__slot {
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
  }

  .v-label {
    font-size: 14px;
    left: 50% !important;
    transform: translateX(-50%);

    &--active {
      transform: translateX(-50%) !important;
      font-size: 14px;
      top: 4px !important;
    }
  }
}
</style>
