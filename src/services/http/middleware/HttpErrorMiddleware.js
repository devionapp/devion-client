import URLHelper from "@/helpers/URLHelper";
import store from "@/store";
export default class HttpErrorMiddleware {
  /**
   *
   * @param {*} http
   */
  constructor(http) {
    this.http = http;
  }

  /**
   *
   * @param {*} config
   * @param {*} auto
   */
  retryRequest(config, auto = false) {
    return this.http({
      ...config,
      autoRetried: auto
    });
  }

  /**
   *
   * @param {*} error
   */
  async serverError(error) {
    console.log("ServerError");
    const retryMessages = ["GENERAL", "COMMAND_EXCEPTION"];
    const exception = JSON.parse(error.response.data);
    if (
      retryMessages.includes(exception.message) &&
      !error.config.autoRetried
    ) {
      // return this.retryRequest(error.config, true);
    } else {
      // await Modal.showQuestionRetry(
      //   `HTTP ${error.response.status} - Ocorreu um erro no servidor`
      // );
      // return this.retryRequest(error.config);
    }
  }

  /**
   *
   * @param {*} error
   */
  async conflictError(error) {
    console.log("conflictError");
    // const exception = JSON.parse(error.response.data);
    // await Modal.showError(exception.mensagem || "", "Solicitação inválida");
    throw error;
  }

  /**
   *
   * @param {*} error
   */
  forbiddenError(error) {
    console.log("forbiddenError");
    const url = URLHelper.getLocation(error.config.baseURL);

    if (url && url.pathname) {
      // Toast.error(
      //   `Usuário sem permissão para acessar o recurso "${url.pathname}". Solicite ao administrador.`,
      //   "Permissão negada"
      // );
    }
    throw error;
  }

  /**
   *
   * @param {*} error
   */
  async badRequestError(error) {
    console.log("badRequestError");
    // var URL = `${error.config.baseURL}/${error.config.url}`;
    // if (!URL.includes("oauth/token")) {
    //   // const exception = JSON.parse(error.response.data);
    //   // await Modal.showError(exception.mensagem || "", "Solicitação inválida");
    // }
    throw error;
  }

  async unprocessableEntityError(error) {
    console.log("unprocessableEntityError");
    if (error.response.data.error.code === "ER_DUP_ENTRY") {
      //  erro de key duplicada
    }

    throw error;
  }

  /**
   *
   * @param {*} error
   */
  async checkHttpStatusCode(error) {
    console.log("checkHttpStatusCode");
    switch (error.response.status) {
      case 500:
      case 501:
        return this.serverError(error);
      case 409:
        return this.conflictError(error);
      case 403:
        return this.forbiddenError(error);
      case 400:
        return this.badRequestError(error);
      case 422:
        return this.unprocessableEntityError(error);
      default:
        throw error;
    }
  }

  /**
   *
   * @param {*} error
   */
  async onRequestError(error) {
    console.log("onRequestError");
    // if (error.message.includes("timeout")) {
    //   // await Modal.showQuestionRetry(
    //   //   `O servidor está demorando muito para responder. (${error.message})`
    //   // );
    //   return this.retryRequest(error.config);
    // } else if (error.message.includes("Network Error")) {
    //   // await Modal.showQuestionRetry(
    //   //   `Não foi possível se conectar com o servidor. (${error.message})`
    //   // );
    //   return this.retryRequest(error.config);
    // }

    throw error;
  }

  /**
   *
   * @param {*} error
   */
  async onResponseError(error) {
    console.log("onResponseError");

    if (error.config.ignoreErrors) {
      throw error;
    }

    if (typeof error.response.data === "string") {
      error.response.data = JSON.parse(error.response.data);
    }

    store.dispatch(
      "Snackbar/setSnackbar",
      {
        show: true,
        text: error.response.data.error.message,
        color: "error"
      },
      { root: true }
    );

    if (error.message.includes("timeout")) {
      // await Modal.showQuestionRetry(
      //   `O servidor está demorando muito para responder. (${error.message})`
      // );
      return this.retryRequest(error.config);
    } else if (error.message.includes("Network Error")) {
      // await Modal.showQuestionRetry(
      //   `Não foi possível conectar-se ao o servidor. (${error.message})`
      // );
      return this.retryRequest(error.config);
    } else if (error.response) {
      return this.checkHttpStatusCode(error);
    }

    throw error;
  }
}
