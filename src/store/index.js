import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [],
    loggedUser: localStorage.getItem("loggedUser") ? JSON.parse(localStorage.getItem("loggedUser")) : "",
  },
  getters: {
    getLoggedUser: (state) => state.loggedUser,
    isLoggedUser: (state) => (state.loggedUser == "" ? false : true),
    getUsers: (state) => state.users
    

    // -------------- Admin -------------- 



  },
  actions: {
    login(context, payload) {
      // verificar se login é válido
      const user = context.state.users.find(
        (user) =>
          user.email === payload.email &&
          user.password === payload.password
      );
      if (user != undefined) {
        // login com sucesso
        context.commit("LOGIN", user);
        localStorage.setItem("loggedUser", JSON.stringify(user));
      } else {
        // login sem sucesso
        throw Error("Login inválido!");
      }
    },
    logout(context) {
      context.commit("LOGOUT");
      localStorage.removeItem("loggedUser");
    },

    register(context, payload) {
      // verificar se este user já existe
      const user = context.state.users.find(
        (user) => user.email === payload.email
      );
      if (user == undefined) {
        // login com sucesso
        context.commit("REGISTER", payload);
        localStorage.setItem('users', JSON.stringify(context.state.users))
      } else {
        // login sem sucesso
        throw Error("Conta já existente.");
      }
    },


    // -------------- Admin -------------- 
    //Eliminar utilizador
    deleteUser(context, user) {
      context.commit("REMOVE_USER", user);
    },

  },
  mutations: {
    LOGIN(state, user) {
      state.loggedUser = user;
    },
    LOGOUT(state) {
      state.loggedUser = "";
    },
    REGISTER(state, user) {
      state.users.push(user);
    },

    // -------------- ADMINISTRADOR -------------- 
    //Eliminar utilizador
    REMOVE_USER(state, email) {
      state.users = state.users.filter((user) => user.email != email);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    //Editar utilizador


    //
  },
});
