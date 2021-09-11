import Model from "@/models/Model";

export default class Task extends Model {
  config() {
    return {
      resource: "cards",
      storeName: "Task"
    };
  }

  async changeStep(card, step) {
    await this.request.patch(`${card}`, { stepId: step });
  }
}
Task.use("CRUD");
