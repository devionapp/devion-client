import Model from "@/models/Model";
export default class Application extends Model {
  config() {
    return {
      resource: "apps",
      storeName: "Application"
    };
  }
}

Application.use("CRUD");
