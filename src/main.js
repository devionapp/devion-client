import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vuelidate from "./plugins/vuelidate";
import moment from "./plugins/moment";
import "./plugins/axios";
import "@babel/polyfill";
import "./assets/scss/main.scss";

Vue.config.productionTip = false;

import Button from "@/components/Form/Button";
import TextField from "@/components/Form/TextField";
import Select from "@/components/Form/Select";
import Subheader from "@/components/Form/Subheader";
import Table from "@/components/Table";
Vue.component("Button", Button);
Vue.component("TextField", TextField);
Vue.component("Select", Select);
Vue.component("Table", Table);
Vue.component("Subheader", Subheader);

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  moment,
  render: h => h(App)
}).$mount("#app");
