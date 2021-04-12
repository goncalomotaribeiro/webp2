import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store';
import LandingPage from "../views/LandingPage.vue"
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Panel from "../views/Panel.vue";
import MyChallenges from "../views/subviews/MyChallenges.vue";
import MyEvents from "../views/subviews/MyEvents.vue";
import Results from "../views/subviews/Results.vue";
import Challenges from "../views/Challenges.vue";
import OpenChallenges from "../views/subviews/OpenChallenges.vue";
import NextChallenges from "../views/subviews/NextChallenges.vue";
import ClosedChallenges from "../views/subviews/ClosedChallenges.vue";
import Challenge from "../views/subviews/Challenge.vue";
import Events from "../views/Events.vue";
import NextEvents from "../views/subviews/NextEvents.vue";
import ClosedEvents from "../views/subviews/ClosedEvents.vue";
import Event from "../views/subviews/Event.vue";
import Forum from "../views/Forum.vue"

//ADMIN
import Admin from "../views/admin/Admin.vue";
import UsersAdmin from "../views/admin/UsersAdmin.vue";
import ChallengesAdmin from "../views/admin/ChallengesAdmin.vue";
import EventsAdmin from "../views/admin/EventsAdmin.vue";
import SubmissionsAdmin from "../views/admin/SubmissionsAdmin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: { guest: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true }
  },
  {
    path: "/panel",
    redirect: '/panel/my-challenges',
    name: "Panel",
    component: Panel,
    children: [
      { path: '/panel/my-challenges', component: MyChallenges, meta: { requiresAuth: true } },
      { path: '/panel/my-events', component: MyEvents, meta: { requiresAuth: true } },
      { path: '/panel/results', component: Results, meta: { requiresAuth: true } }
    ]
  },
  {
    path: "/challenges",
    redirect: '/challenges/open-challenges',
    name: "Challenges",
    component: Challenges,
    children: [
      { path: '/challenges/open-challenges', component: OpenChallenges, meta: { requiresAuth: true } },
      { path: '/challenges/next-challenges', component: NextChallenges, meta: { requiresAuth: true } },
      { path: '/challenges/closed-challenges', component: ClosedChallenges, meta: { requiresAuth: true } },
    ]
  },
  {
    path: "/challenge/:challengeId",
    name: "Challenge",
    component: Challenge,
    meta: { requiresAuth: true }
  },
  {
    path: "/events",
    redirect: '/events/next-events',
    name: "Events",
    component: Events,
    children: [
      { path: '/events/next-events', component: NextEvents, meta: { requiresAuth: true } },
      { path: '/events/closed-events', component: ClosedEvents, meta: { requiresAuth: true } },
    ]
  },
  {
    path: "/event/:eventId",
    name: "Event",
    component: Event,
    meta: { requiresAuth: true }
  },

  {
    path: "/forum",
    name: "Forum",
    component: Forum
  },

  //ADMIN
  {
    path: "/admin",
    redirect: '/admin/challenges-admin',
    name: "Admin",
    component: Admin,
    children: [
      { path: '/admin/users-admin', component: UsersAdmin, meta: { requiresAuth: true, admin: true} },
      { path: '/admin/challenges-admin', component: ChallengesAdmin, meta: { requiresAuth: true, admin: true } },
      { path: '/admin/submissions-admin', component: SubmissionsAdmin, meta: { requiresAuth: true, admin: true } },
      { path: '/admin/events-admin', component: EventsAdmin, meta: { requiresAuth: true, admin: true } }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Store.getters.isLoggedUser) {
    next({ name: 'Login' })
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.guest && Store.getters.getLoggedUser.type == 2) {
    next({ name: 'Panel' });
  } else if (to.meta.guest && Store.getters.getLoggedUser.type == 1) {
    next({ name: 'Admin' });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.admin && Store.getters.getLoggedUser.type == 2) {
    next({ name: 'Panel' });
  } else if (!to.meta.admin && Store.getters.getLoggedUser.type == 1){
    next({ name: 'Admin' });
  }else {
    next();
  }
});


export default router;
