import api from "@/modules/auth/api";
import router from "@/router";

export default {
  async login({ dispatch }, payload) {
    try {
      const { data } = await api.login(payload);

      localStorage.setItem("devionToken", data.token);

      router.push({ name: "dashboard" });
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        { show: true, text: e.response.data.error.message, color: "error" },
        { root: true }
      );
    }
  }
};
