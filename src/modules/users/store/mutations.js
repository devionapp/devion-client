export default {
  SET_IS_LOGGED_IN(state, payload) {
    state.isLoggedIn = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  }
};
