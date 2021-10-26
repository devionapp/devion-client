import Model from "@/models/Model";

export default class User extends Model {
  config() {
    return {
      resource: "users",
      storeName: "User"
    };
  }
}

User.use("CRUD");
