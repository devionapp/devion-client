import Model from "@/models/Model";

export default class Task extends Model {
  config() {
    return {
      resource: "tasks",
      storeName: "Task"
    };
  }
}
Task.use("CRUD");
