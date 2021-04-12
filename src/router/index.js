import Vue from "vue";
import VueRouter from "vue-router";
import navigationGuard from "./utils/navigationGuard";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "loginform" */ "@/modules/auth/LoginForm.vue")
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: () =>
      import(
        /* webpackChunkName: "registerform" */ "@/modules/auth/RegisterForm.vue"
      )
  },
  {
    path: "/recuperar-senha",
    name: "recuperar-senha",
    component: () =>
      import(
        /* webpackChunkName: "forgotpasswordform" */ "@/modules/auth/ForgotPasswordForm.vue"
      )
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/modules/dashboard/Dashboard.vue"
      )
  },
  {
    path: "/configuracoes",
    name: "configuracoes",
    component: () =>
      import(
        /* webpackChunkName: "configuracoes" */ "@/modules/settings/views/Settings.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const dontNeedAuth = ["login", "cadastro", "recuperar-senha"];

  if (!navigationGuard(to.name, dontNeedAuth)) {
    next({ name: "login" });
  } else {
    // if (dontNeedAuth.includes(to.name)) {
    //   next("dashboard");
    // } else {
    next();
    // }
  }
});

export default router;
