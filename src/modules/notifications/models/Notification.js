import Model from "@/models/Model";

export default class Notification extends Model {
  config() {
    return {
      resource: "notifications",
      storeName: "Notification",
      silent: true
    };
  }
}
Notification.use("CRUD");
