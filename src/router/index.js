import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store';
import LandingPage from "../views/LandingPage.vue"
import Login from "../views/Login.vue";
import Home from "../views/Panel.vue";
import Register from "../views/Register.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: {
      requiresLogOff: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresLogOff: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresLogOff: true
    }
  },
  {
    path: "/panel",
    name: "Panel",
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Store.getters.isLoggedUser) {    
    next({name: 'LandingPage'})
  } else {
    next();  
  }

  if (to.meta.requiresLogOff && Store.getters.isLoggedUser) {    
    next({name: 'Panel'})
  } else {
    next();  
  }
  
});

export default router;
