import Model from "@/models/Model";

export default class RequirementFields extends Model {
  _requirementId = null;

  constructor(id) {
    super();
    this._requirementId = id;
    this.setConfig();
  }

  config() {
    return {
      resource: `requirements/${this._requirementId}/fields`,
      storeName: "requirementFields"
    };
  }

  beforeSave(record) {
    record.min = parseInt(record.min);
    record.max = parseInt(record.max);
    if (!record.rule) {
      delete record.rule;
    } else {
      record.rule = parseInt(record.rule);
    }
    return record;
  }
}

RequirementFields.use("CRUD");
