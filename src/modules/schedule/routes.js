import crudRoute from "@/router/utils/createCrudRoute";

const ScheduleList = () =>
  import(/* webpackChunkName: "schedule" */ "./views/ScheduleList");
const ScheduleForm = () =>
  import(/* webpackChunkName: "schedule" */ "./views/ScheduleForm");

export default crudRoute("schedule", ScheduleList, ScheduleForm, {
  READ: "VIEW_SCHEDULE",
  CREATE: "CREATE_SCHEDULE",
  UPDATE: "CREATE_SCHEDULE"
});
