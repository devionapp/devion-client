import store from "@/store";
import validateToken from "@/helpers/validateToken";
export default class HttpAuthMiddleware {
  isAuthenticated() {
    return store.getters["User/getIsLoggedIn"];
  }

  async onRequest(config) {
    if (this.isAuthenticated()) {
      if (await validateToken()) {
        //Insere o token na requisicao
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "devionToken"
        )}`;
      }
    }

    return config;
  }

  async onResponseError(error) {
    if (
      error.response &&
      error.response.status === 401 &&
      this.isAuthenticated()
    ) {
      store.dispatch["User/logout"];
    }

    throw error;
  }
}
