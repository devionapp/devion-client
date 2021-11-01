import Model from "@/models/Model";
import store from "@/store";
export default class Project extends Model {
  config() {
    return {
      resource: "projects",
      storeName: "Project"
    };
  }

  async countProjects() {
    const where = {
      tenantId: store.getters["User/getUser"].tenantId
    };
    return (await this.request.get(`/count?where=${JSON.stringify(where)}`))
      .data.count;
  }
}

Project.use("CRUD");
