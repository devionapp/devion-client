import api from "@/modules/auth/api";

export default {
  async createNewAccount({ dispatch }, payload) {
    try {
      const { data: tenant } = await api.registerCompany({
        name: payload.companyName
      });

      await api.signUp({
        tenantId: tenant.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.userEmail,
        password: payload.userPassword
      });

      dispatch(
        "User/login",
        {
          email: payload.userEmail,
          password: payload.userPassword
        },
        { root: true }
      );
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        { show: true, text: e.response.data.error.message, color: "error" },
        { root: true }
      );
    }
  }
};
