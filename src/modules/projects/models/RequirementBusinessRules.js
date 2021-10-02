import Model from "@/models/Model";

export default class RequirementBusinessRules extends Model {
  _requirementId = null;

  constructor(id) {
    super();
    this._requirementId = id;
    this.setConfig();
  }

  config() {
    return {
      resource: `requirements/${this._requirementId}/business-rules`,
      storeName: "requirementBusinessRules"
    };
  }

  beforeSave(record) {
    delete record.index;
    return record;
  }
}

RequirementBusinessRules.use("CRUD");
