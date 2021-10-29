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

  async getProjectsTimeRegistered(projectId) {
    const filters = {
      where: {
        projectId: projectId
      }
    };

    return await this.request.get(
      `projects-time-registered?filter=${JSON.stringify(filters)}`
    );
  }
}

Dashboard.use("CRUD");
