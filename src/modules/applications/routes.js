import crudRoute from "@/router/utils/createCrudRoute";

const ApplicationsList = () =>
  import(/* webpackChunkName: "ApplicationsList" */ "./views/ApplicationList");
const ApplicationsForm = () =>
  import(/* webpackChunkName: "ApplicationsForm" */ "./views/ApplicationForm");

export default crudRoute("aplicacoes", ApplicationsList, ApplicationsForm, {
  // READ: "VIEW_APPLICATIONS",
  // CREATE: "CREATE_APPLICATIONS",
  // UPDATE: "CREATE_APPLICATIONS"
});
