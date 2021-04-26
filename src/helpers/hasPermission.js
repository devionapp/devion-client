import store from "@/store";
import { forOwn } from "lodash";

export default permission => {
  const permissions = store.getters["User/getUser"]?.role.permissions;

  let hasPermission = false;

  forOwn(permissions, ({ value }) => {
    if (value === permission) {
      hasPermission = true;
    }
  });

  return hasPermission;
};
