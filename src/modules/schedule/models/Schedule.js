import Model from "@/models/Model";

export default class Schedule extends Model {
  config() {
    return {
      resource: "schedule",
      storeName: "Schedule"
    };
  }
}
Schedule.use("CRUD");
