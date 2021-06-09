import Model from "@/models/Model";
import store from "@/store";

export default class Project extends Model {
  config() {
    return {
      resource: "projects",
      storeName: "Project"
    };
  }

  async beforeSave(record) {
    delete record.applications;
    delete record.createdBy;
    record.tenantId = store.getters["User/getUser"].tenantId;
    return record;
  }
}

Project.use("CRUD");
