import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store';
import LandingPage from "../views/LandingPage.vue"
import Login from "../views/Login.vue";
import Panel from "../views/Panel.vue";
import Register from "../views/Register.vue";
import MyChallenges from "../views/subviews/MyChallenges.vue";
import MyEvents from "../views/subviews/MyEvents.vue";
import Results from "../views/subviews/Results.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/panel",
    redirect: '/panel/my-challenges',
    name: "Panel",
    component: Panel,
    children: [
      {path: '/panel/my-challenges', component: MyChallenges, meta: {requiresAuth: true}},
      {path: '/panel/my-events', component: MyEvents, meta: {requiresAuth: true}},
      {path: '/panel/results', component: Results, meta: {requiresAuth: true}}
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Store.getters.isLoggedUser) {
    next({ name: 'LandingPage' })
  } else {
    next();
  }
  
});

export default router;
