import Model from "@/models/Model";

export default class Flow extends Model {
  config() {
    return {
      resource: "flows",
      storeName: "Flow"
    };
  }

  prepareCollectionOnLoad(collection) {
    collection.map(flow => {
      flow.steps.map(step => {
        step.title = step.name;
        step.tasks = [];
      });
    });

    return collection;
  }
}
Flow.use("CRUD");
