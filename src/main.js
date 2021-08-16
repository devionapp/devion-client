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
import Checkbox from "@/components/Form/Checkbox";
import TextArea from "@/components/Form/TextArea";
import Select from "@/components/Form/Select";
import DatePicker from "@/components/Form/DatePicker";
import Textheader from "@/components/Form/Textheader";
import Subheader from "@/components/Subheader";
import Table from "@/components/Table";
import Modal from "@/components/Modal";

Vue.component("Button", Button);
Vue.component("TextField", TextField);
Vue.component("Checkbox", Checkbox);
Vue.component("TextArea", TextArea);
Vue.component("Select", Select);
Vue.component("DatePicker", DatePicker);
Vue.component("Textheader", Textheader);
Vue.component("Table", Table);
Vue.component("Subheader", Subheader);
Vue.component("Modal", Modal);

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  moment,
  render: h => h(App)
}).$mount("#app");
