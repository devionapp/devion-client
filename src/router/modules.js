import settings from "@/modules/settings/routes";
import projects from "@/modules/projects/routes";
import applications from "@/modules/applications/routes";
import users from "@/modules/users/routes";
import skills from "@/modules/skills/routes";
import flows from "@/modules/flows/routes";
import cards from "@/modules/cards/routes";
import tasks from "@/modules/tasks/routes";
import schedule from "@/modules/schedule/routes";

export default [
  ...settings,
  ...projects,
  ...applications,
  ...users,
  ...skills,
  ...flows,
  ...cards,
  ...tasks,
  ...schedule
];
