import Model from "@/models/Model";

export default class Project extends Model {
  config() {
    return {
      resource: "projects",
      storeName: "Project"
    };
  }

  async countProjects() {
    return (await this.request.get("/count")).data.count;
  }
}

Project.use("CRUD");
