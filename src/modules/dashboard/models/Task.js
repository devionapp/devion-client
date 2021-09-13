import Model from "@/models/Model";
import store from "@/store";
export default class Task extends Model {
  config() {
    return {
      resource: "cards",
      storeName: "Task"
    };
  }

  async countTasks() {
    const where = {
      userId: store.getters["User/getUser"].id,
      type: "task"
    };
    return (await this.request.get(`/count?where=${JSON.stringify(where)}`))
      .data.count;
  }

  async countBugs() {
    const where = {
      userId: store.getters["User/getUser"].id,
      type: "bug"
    };
    return (await this.request.get(`/count?where=${JSON.stringify(where)}`))
      .data.count;
  }
}
Task.use("CRUD");
