import axios from "axios";
import { Service } from "axios-middleware";
import { queryParamsHelper } from "@/helpers";
import HttpErrorMiddleware from "./middleware/HttpErrorMiddleware";
import HttpAuthMiddleware from "./middleware/HttpAuthMiddleware";
import HttpFormDataMiddleware from "./middleware/HttpFormDataMiddleware";

const HttpRequest = (resource = "", baseURL = null, params = null) => {
  let URL = baseURL || process.env.VUE_APP_BASE_URL;
  URL = `${URL}/${resource}`;

  const headers = {
    "Content-Type": "application/json"
  };

  const axiosInstance = axios.create({
    baseURL: URL,
    headers
  });

  if (params) {
    axiosInstance.interceptors.request.use(config => {
      config.params = {
        ...params,
        ...config.params
      };

      config.paramsSerializer = queryParamsHelper.serializer;

      return config;
    });
  }

  const service = new Service(axiosInstance);

  service.register([
    new HttpErrorMiddleware(axiosInstance),
    new HttpAuthMiddleware(axiosInstance),
    new HttpFormDataMiddleware(axiosInstance)
  ]);

  return axiosInstance;
};

export default HttpRequest;
