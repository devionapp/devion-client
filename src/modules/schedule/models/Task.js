import Model from "@/models/Model";

export default class Task extends Model {
  config() {
    return {
      resource: "cards",
      storeName: "Task"
    };
  }
}
Task.use("CRUD");
