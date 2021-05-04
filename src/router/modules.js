import settings from "@/modules/settings/routes";
import projects from "@/modules/projects/routes";
import users from "@/modules/users/routes";
import skills from "@/modules/skills/routes";

export default [...settings, ...projects, ...users, ...skills];
