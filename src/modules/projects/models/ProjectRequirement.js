import Model from "@/models/Model";

export default class ProjectRequirement extends Model {
  _projectId = null;

  constructor(id) {
    super();
    this._projectId = id;
    this.setConfig();
  }

  config() {
    return {
      resource: `projects/${this._projectId}/requirements`,
      storeName: "projectRequirement"
    };
  }
}

ProjectRequirement.use("CRUD");
