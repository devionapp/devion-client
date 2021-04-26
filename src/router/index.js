import Vue from "vue";
import VueRouter from "vue-router";
import needAuth from "./utils/needAuth";
import validateToken from "./utils/validateToken";
import modules from "./modules";
import store from "@/store";
import hasPermission from "@/helpers/hasPermission";

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
  ...modules
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  await validateToken();

  const isLoggedIn = store.getters["User/getIsLoggedIn"];

  if (!isLoggedIn && needAuth(to.name)) {
    next({ name: "login" });
  } else if (isLoggedIn && !needAuth(to.name)) {
    next({ name: "dashboard" });
  } else if (to.meta.permission && !hasPermission(to.meta.permission)) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
