const routes = [
  {
    path: "/configuracoes",
    name: "configuracoes",
    component: () =>
      import(
        /* webpackChunkName: "configuracoes" */ "@/modules/settings/views/Settings.vue"
      )
  }
];

export default routes;
