const defaultActions = {
  list: true,
  create: true,
  edit: true,
  view: true
};

const crudRoute = (
  module,
  path,
  componentList,
  componentForm,
  permissions = {},
  actions = defaultActions,
  extraRoutes = null
) => {
  let routes = [];

  if (actions.list) {
    routes.push({
      path: `${path}`,
      name: `${module}.${path}`,
      component: componentList,
      meta: permissions.READ ? { permission: permissions.READ } : null
    });
  }

  if (actions.create) {
    routes.push({
      path: `${path}/adicionar`,
      name: `${module}.${path}.create`,
      component: componentForm,
      meta: permissions.CREATE ? { permission: permissions.CREATE } : null
    });
  }

  if (actions.edit) {
    routes.push({
      path: `${path}/:id/editar`,
      name: `${module}.${path}.edit`,
      component: componentForm,
      meta: permissions.UPDATE ? { permission: permissions.UPDATE } : null
    });
  }

  if (actions.view) {
    routes.push({
      path: `${path}/:id/visualizar`,
      name: `${module}.${path}.view`,
      component: componentForm,
      meta: permissions.READ ? { permission: permissions.READ } : null
    });
  }

  if (extraRoutes) {
    routes = routes.concat(extraRoutes);
  }

  return routes;
};

export { crudRoute as default };
