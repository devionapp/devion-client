import Model from "@/models/Model";

export default class Requirement extends Model {
  config() {
    return {
      resource: "requirements",
      storeName: "Requirement"
    };
  }
}

Requirement.use("CRUD");
