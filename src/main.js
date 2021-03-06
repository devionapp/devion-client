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
import JsonExcel from "vue-json-excel";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwZg8lwGEIMp74DL7AfQBd6s7fX_RcjvQ",
  authDomain: "devion-30f06.firebaseapp.com",
  projectId: "devion-30f06",
  storageBucket: "devion-30f06.appspot.com",
  messagingSenderId: "840660513594",
  appId: "1:840660513594:web:d59a94ae7dfa8421f95603"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);
getToken(messaging, {
  vapidKey:
    "BIxaNwxHX7HV56jD-perNRFjH5uJKiEiNQwXB7Ya8P7vSJN7Imnj2d97do0U-apjF_zAHJrQJ821pQ0x1f4j-bI"
})
  .then(currentToken => {
    if (currentToken) {
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch(err => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

onMessage(messaging, payload => {
  console.log("Message received. ", payload);
  // ...
});

Vue.component("downloadExcel", JsonExcel);
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
