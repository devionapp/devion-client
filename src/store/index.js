import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Modules
import User from "@/store/modules/User";
import Snackbar from "@/store/modules/Snackbar";

export default new Vuex.Store({
  modules: {
    User,
    Snackbar
  }
});
