import settings from "@/modules/settings/routes";
import projects from "@/modules/projects/routes";
import applications from "@/modules/applications/routes";
import users from "@/modules/users/routes";
import skills from "@/modules/skills/routes";
import flows from "@/modules/flows/routes";
import tasks from "@/modules/tasks/routes";

export default [
  ...settings,
  ...projects,
  ...applications,
  ...users,
  ...skills,
  ...flows,
  ...tasks
];
