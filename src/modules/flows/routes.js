import crudRoute from "@/router/utils/createCrudRoute";

const FlowsList = () =>
  import(/* webpackChunkName: "flows" */ "./views/FlowsList");
const FlowsForm = () =>
  import(/* webpackChunkName: "flows" */ "./views/FlowsForm");

export default crudRoute("flows", FlowsList, FlowsForm, {
  READ: "VIEW_FLOWS",
  CREATE: "CREATE_FLOWS",
  UPDATE: "CREATE_FLOWS"
});
