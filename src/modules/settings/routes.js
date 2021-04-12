const routes = [
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "settings" */ "@/modules/settings/views/Settings.vue"
      )
  }
];

export default routes;
