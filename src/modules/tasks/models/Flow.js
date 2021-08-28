import Model from "@/models/Model";

export default class Flow extends Model {
  config() {
    return {
      resource: "flows",
      storeName: "Flow"
    };
  }

  prepareCollectionOnLoad(collection) {
    collection.map(async flow => {
      const tasks = (await this.request(`${flow.id}/cards`)).data;

      flow.steps.map(step => {
        step.title = step.name;
        step.tasks = tasks.filter(t => t.stepId === step.id);
      });
    });

    return collection;
  }
}
Flow.use("CRUD");
