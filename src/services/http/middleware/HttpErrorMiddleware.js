// import { Modal, Toast } from "@/services/messages";
import URLHelper from "@/helpers/URLHelper";

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
    // const exception = JSON.parse(error.response.data);
    // await Modal.showError(exception.mensagem || "", "Solicitação inválida");
    throw error;
  }

  /**
   *
   * @param {*} error
   */
  forbiddenError(error) {
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
    // var URL = `${error.config.baseURL}/${error.config.url}`;
    // if (!URL.includes("oauth/token")) {
    //   // const exception = JSON.parse(error.response.data);
    //   // await Modal.showError(exception.mensagem || "", "Solicitação inválida");
    // }
    throw error;
  }

  /**
   *
   * @param {*} error
   */
  async checkHttpStatusCode(error) {
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

      default:
        throw error;
    }
  }

  /**
   *
   * @param {*} error
   */
  async onRequestError(error) {
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
    if (error.config.ignoreErrors) {
      throw error;
    }

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
