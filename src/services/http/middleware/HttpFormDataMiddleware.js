export default class HttpFormDataMiddleware {
  onRequest(config) {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  }
}
