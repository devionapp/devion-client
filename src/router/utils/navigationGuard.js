import store from "@/store";

export default (routeName, dontNeedAuth) => {
  const isLoggedIn = localStorage.getItem(`login`);
  store.commit("User/SET_IS_LOGGED_IN", !!isLoggedIn);

  return (
    dontNeedAuth.includes(routeName) || store.getters["User/getIsLoggedIn"]
  );
};
