import store from "@/store";

export default routeName => {
  const dontNeedAuth = ["login", "cadastro", "recuperar-senha"];

  return (
    dontNeedAuth.includes(routeName) || store.getters["User/getIsLoggedIn"]
  );
};
