import Model from "@/models/Model";

export default class Flow extends Model {
  config() {
    return {
      resource: "flows",
      storeName: "Flow"
    };
  }

  async prepareCollectionOnLoad(collection) {
    await Promise.all(
      collection.map(async flow => {
        const tasks = await this.getTasks(flow);

        flow.steps.map(step => {
          step.title = step.name;
          step.tasks = tasks.filter(t => t.stepId === step.id);
        });
      })
    );

    return collection;
  }

  async getTasks(flow, filters = {}) {
    const where = filters.where ?? null;
    let isEmpty;

    if (filters.where) {
      isEmpty = Object.values(where).every(x => x === null || x === "");
    }

    if (isEmpty) {
      filters = null;
    }
    const tasks = (
      await this.request(`${flow.id}/cards?filter=${JSON.stringify(filters)}`)
    ).data;

    return tasks;
  }
}
Flow.use("CRUD");
