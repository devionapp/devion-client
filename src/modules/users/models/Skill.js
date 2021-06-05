import Model from "@/models/Model";

export default class Skill extends Model {
  config() {
    return {
      resource: "skills",
      storeName: "Skill"
    };
  }
}

Skill.use("CRUD");
