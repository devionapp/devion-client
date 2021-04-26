import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Modules
import User from "@/modules/users/store";
import Auth from "@/modules/auth/store";
import Snackbar from "@/store/modules/Snackbar";

export default new Vuex.Store({
  modules: {
    User,
    Auth,
    Snackbar
  }
});
