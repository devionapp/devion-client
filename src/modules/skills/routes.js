import crudRoute from "@/router/utils/createCrudRoute";

const SkillsList = () =>
  import(/* webpackChunkName: "skills" */ "./views/SkillsList");
const SkillsForm = () =>
  import(/* webpackChunkName: "skills" */ "./views/SkillsForm");

export default crudRoute("skills", SkillsList, SkillsForm, {
  READ: "VIEW_SKILLS",
  CREATE: "CREATE_SKILLS",
  UPDATE: "CREATE_SKILLS"
});
