export default {
  async setSnackbar(context, payload) {
    context.commit("SET_SNACKBAR", payload);
  }
};
