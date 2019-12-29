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
</style>
