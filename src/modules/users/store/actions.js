import authApi from "@/modules/auth/api";
import userApi from "@/modules/users/api";
import router from "@/router";

export default {
  async login({ dispatch }, payload) {
    try {
      const { data } = await authApi.login(payload);

      localStorage.setItem("devionToken", data.token);

      router.push({ name: "dashboard" });
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        { show: true, text: e.response.data.error.message, color: "error" },
        { root: true }
      );
    }
  },

  async create({ dispatch, getters }, payload) {
    try {
      delete payload.skill;
      delete payload.skillLevel;
      payload.tenantId = getters["getUser"].tenantId;
      const { data } = await authApi.signUp(payload);
      dispatch(
        "Snackbar/setSnackbar",
        {
          show: true,
          text: "Usuário criado com sucesso!",
          color: "success"
        },
        { root: true }
      );
      router.push({ name: "usuarios" });
      return data;
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        {
          show: true,
          text: e?.response?.data.error.message ?? e,
          color: "error"
        },
        { root: true }
      );
    }
  },

  async update({ dispatch }, payload) {
    try {
      delete payload.skill;
      delete payload.skillLevel;
      delete payload.tenant;
      delete payload.tenantId;
      delete payload.role;

      const { data } = await userApi.patch(payload);

      dispatch(
        "Snackbar/setSnackbar",
        {
          show: true,
          text: "Usuário atualizado com sucesso!",
          color: "success"
        },
        { root: true }
      );

      router.push({ name: "usuarios" });
      return data;
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        {
          show: true,
          text: e?.response?.data.error.message ?? e,
          color: "error"
        },
        { root: true }
      );
    }
  },

  async getUser({ dispatch }, payload) {
    try {
      const { data } = await userApi.get(payload);
      return data;
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        { show: true, text: e?.response?.data.error.message, color: "error" },
        { root: true }
      );
    }
  },

  async getAllUsers({ dispatch }, payload) {
    try {
      const { data: users } = await userApi.getAll(payload);
      users.forEach(u => {
        u.name = `${u.firstName} ${u.lastName}`;
        switch (u.roleId) {
          case 1:
            u.role = "Administrador";
            break;
          case 2:
            u.role = "Gestor";
            break;
          case 3:
            u.role = "Colaborador";
            break;
          case 4:
            u.role = "Consultor";
            break;
        }
      });
      return users;
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        {
          show: true,
          text: e.response.data.error.message ?? e,
          color: "error"
        },
        { root: true }
      );
    }
  },

  async deleteUser({ dispatch }, payload) {
    try {
      await userApi.deleteRecord(payload);
    } catch (e) {
      dispatch(
        "Snackbar/setSnackbar",
        {
          show: true,
          text: e.response.data.error.message ?? e,
          color: "error"
        },
        { root: true }
      );
    }
  }
};
