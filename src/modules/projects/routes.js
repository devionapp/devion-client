import crudRoute from "@/router/utils/createCrudRoute";

const ProjectsList = () =>
  import(/* webpackChunkName: "projects" */ "./views/ProjectsList");
const ProjectsForm = () =>
  import(/* webpackChunkName: "projects" */ "./views/ProjectsForm");

export default crudRoute("projetos", ProjectsList, ProjectsForm, {
  READ: "VIEW_PROJECTS",
  CREATE: "CREATE_PROJECTS",
  UPDATE: "CREATE_PROJECTS"
});
