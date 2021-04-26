import settings from "@/modules/settings/routes";
import projects from "@/modules/projects/routes";
import users from "@/modules/users/routes";

export default [...settings, ...projects, ...users];
