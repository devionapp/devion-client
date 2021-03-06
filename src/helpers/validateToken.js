import store from "@/store";
import jwt from "jsonwebtoken";
export default async () => {
  const token = localStorage.getItem(`devionToken`);

  return jwt.verify(token, "secret_key", async (err, decoded) => {
    if (decoded) {
      store.commit("User/SET_IS_LOGGED_IN", true);
      store.commit("User/SET_USER", decoded);

      return true;
    } else {
      store.commit("User/SET_IS_LOGGED_IN", false);
      return false;
    }
  });
};
