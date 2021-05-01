import Model from "@/models/Model";
import Tenant from "./Tenant";
import router from "@/router";
import HttpRequest from "../../../services/http/HttpRequest";

export default class Auth extends Model {
  _tenantModel = new Tenant();

  config() {
    return {
      resource: "auth",
      storeName: "Auth",
      silent: true
    };
  }

  async login(record) {
    try {
      const { data } = await HttpRequest("login", this.baseURL).post(
        "",
        record
      );
      localStorage.setItem("devionToken", data.token);
      router.push({ name: "dashboard" });
      return Promise.resolve(data);
    } catch (error) {
      console.error(error);
    }
  }

  async createNewAccount(payload) {
    try {
      const { data: tenant } = await this._tenantModel.request.post("", {
        name: payload.companyName
      });

      await HttpRequest("signup", this.baseURL).post("", {
        tenantId: tenant.id,
        roleId: 1,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.userEmail,
        password: payload.userPassword
      });

      this.login({
        email: payload.userEmail,
        password: payload.userPassword
      });
    } catch (e) {
      console.error(e);
    }
  }
}

Auth.use("CRUD");
