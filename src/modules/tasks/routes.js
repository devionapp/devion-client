import crudRoute from "@/router/utils/createCrudRoute";

const TasksList = () =>
  import(/* webpackChunkName: "taskslist" */ "./views/TasksList");
const TasksForm = () =>
  import(/* webpackChunkName: "tasks" */ "./views/TasksForm");

export default crudRoute("atividades", TasksList, TasksForm, {
  READ: "VIEW_TASKS",
  CREATE: "CREATE_TASKS",
  UPDATE: "CREATE_TASKS"
});
