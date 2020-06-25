import Vue from "vue";
import VueRouter from "vue-router";

import WelcomePage from "../components/welcome/welcome.vue";

import SigninPage from "../components/auth/signin.vue";
import DashboardPage from "../components/dashboard/dashboard.vue";
import ChoixAffichagePage from "../components/dashboard/choixAffichage.vue";
import ConsommationsPage from "../components/dashboard/consommations.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: WelcomePage },

  { path: "/signin", component: SigninPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    children: [
      { path: "", component: ChoixAffichagePage },
      {
        path: "/consommations/:week",
        name: "consommations",
        component: ConsommationsPage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
