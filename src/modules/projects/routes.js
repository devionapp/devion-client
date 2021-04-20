const routes = [
  {
    path: "/projetos",
    name: "projetos",
    component: () =>
      import(
        /* webpackChunkName: "projetos" */ "@/modules/projects/views/Projects.vue"
      )
  }
];

export default routes;
