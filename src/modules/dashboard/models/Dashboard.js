import Model from "@/models/Model";

export default class Dashboard extends Model {
  config() {
    return {
      resource: "dashboard",
      storeName: "Dashboard"
    };
  }

  async getActiveProjects() {
    return await this.request.get("active-projects");
  }
}

Dashboard.use("CRUD");
