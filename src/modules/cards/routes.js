import crudRoute from "@/router/utils/createCrudRoute";

const CardsList = () =>
  import(/* webpackChunkName: "Cardslist" */ "./views/CardsList");

export default crudRoute("atividades", CardsList, null, {
  READ: "VIEW_TASKS",
  CREATE: "CREATE_TASKS",
  UPDATE: "CREATE_TASKS"
});
