import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import "@babel/polyfill";

Vue.config.productionTip = false;

Vue.component("Button", Button);
Vue.component("TextField", TextField);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
