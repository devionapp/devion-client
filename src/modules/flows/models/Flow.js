import Model from "@/models/Model";

export default class Flow extends Model {
  config() {
    return {
      resource: "flows",
      storeName: "Flow"
    };
  }
}
Flow.use("CRUD");
