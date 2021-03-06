import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import pt from "vuetify/lib/locale/pt";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#8C183E",
        secondary: "#183059",
        accent: "#82B1FF",
        error: "#C9000F",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        text: "#102333"
      }
    }
  },
  lang: {
    locales: { pt },
    current: "pt"
  }
});
