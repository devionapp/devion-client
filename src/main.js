import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vuelidate from "./plugins/vuelidate";
import moment from "./plugins/moment";
import Button from "@/components/Form/Button";
import TextField from "@/components/Form/TextField";
import "./plugins/axios";
import "@babel/polyfill";

Vue.config.productionTip = false;

Vue.component("Button", Button);
Vue.component("TextField", TextField);

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  moment,
  render: h => h(App)
}).$mount("#app");
