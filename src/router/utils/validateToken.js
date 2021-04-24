import store from "@/store";
import jwt from "jsonwebtoken";
export default async () => {
  const token = localStorage.getItem(`devionToken`);

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (decoded) {
      store.commit("User/SET_IS_LOGGED_IN", true);
      store.commit("User/SET_USER", decoded);
    } else {
      store.commit("User/SET_IS_LOGGED_IN", false);
    }
  });
};
