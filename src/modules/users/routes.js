import crudRoute from "@/router/utils/createCrudRoute";

const UsersList = () =>
  import(/* webpackChunkName: "usuarios" */ "./views/UsersList");
const UsersForm = () =>
  import(/* webpackChunkName: "usuarios" */ "./views/UsersForm");

export default crudRoute("usuarios", UsersList, UsersForm, {
  READ: "VIEW_USERS",
  CREATE: "CREATE_USERS",
  UPDATE: "CREATE_USERS"
});
