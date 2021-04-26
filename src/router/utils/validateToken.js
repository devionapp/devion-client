import store from "@/store";
import jwt from "jsonwebtoken";
export default async () => {
  const token = localStorage.getItem(`devionToken`);

  jwt.verify(token, "secret_key", async (err, decoded) => {
    if (decoded) {
      store.commit("User/SET_IS_LOGGED_IN", true);

      if (!store.getters["User/getUser"]) {
        const user = await store.dispatch("User/getUser", decoded.id);
        store.commit("User/SET_USER", user);
      }
    } else {
      store.commit("User/SET_IS_LOGGED_IN", false);
    }
  });
};
