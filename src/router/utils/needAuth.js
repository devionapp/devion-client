export default routeName => {
  const dontNeedAuth = ["login", "cadastro", "recuperar-senha"];

  return !dontNeedAuth.includes(routeName);
};
