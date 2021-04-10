<template>
  <v-app id="app">
    <component :is="layout" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
const Home = () => import("@/views/Home");
const Auth = () => import("@/views/Auth");

export default {
  name: "App",
  components: { Home, Auth },
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
      if (this.isLoggedIn) {
        return "Home";
      }

      return "Auth";
    }
  }
};
</script>
