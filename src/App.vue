<template>
  <v-app id="app">
    <Snackbar />

    <transition name="fade" mode="out-in">
      <component :is="layout" />
    </transition>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
const Home = () => import("@/views/Home");
const Auth = () => import("@/views/Auth");
const Snackbar = () => import("@/components/Snackbar");

export default {
  name: "App",
  components: { Home, Auth, Snackbar },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    ...mapGetters("User", {
      isLoggedIn: "getIsLoggedIn"
    }),
    layout() {
      if (!this.isLoggedIn) {
        return "Auth";
      }

      return "Home";
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
