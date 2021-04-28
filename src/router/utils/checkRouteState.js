export default route => {
  const stateName = route.name.split(".").pop();

  if (stateName.includes("create")) {
    return "INSERT";
  } else if (stateName.includes("edit")) {
    return "EDIT";
  } else {
    return "VIEW";
  }
};
