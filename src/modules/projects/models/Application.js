import Model from "@/models/Model";
export default class Application extends Model {
  config() {
    return {
      resource: "applications",
      storeName: "Application"
    };
  }
}

Application.use("CRUD");
