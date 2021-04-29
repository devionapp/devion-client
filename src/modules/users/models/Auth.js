import Model from "@/models/Model";
export default class Auth extends Model {
  config() {
    return {
      resource: "auth",
      storeName: "Auth"
    };
  }
}

Auth.use("CRUD");
