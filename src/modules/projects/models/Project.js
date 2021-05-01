import Model from "@/models/Model";
export default class Project extends Model {
  config() {
    return {
      resource: "projects",
      storeName: "Project"
    };
  }
}

Project.use("CRUD");
