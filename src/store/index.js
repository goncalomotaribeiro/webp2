import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [
      {
        id: 1,
        username: "admin",
        email: "admin@gmail.com",
        password: "123",
        type: 1
        },
        {
          id: 2,
          username: "teacher",
          email: "teacher@gmail.com",
          password: "123",
          type: 3
        },
    ],
    challenges: localStorage.getItem("challenges")
    ? JSON.parse(localStorage.getItem("challenges")) : [
      {
        id: 1,
        title: "Mega Desafio X",
        description: "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
        scientific_area: 1,
        img: "https://www.infobranding.com.br/wp-content/uploads/2018/03/gestao-design_img-800x4151.jpg"
      },
      {
        id: 2,
        title: "Mega Desafio Y",
        description: "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
        scientific_area: 2,
        img: "https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
      },
      {
        id: 3,
        title: "Mega Desafio Z",
        description: "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
        scientific_area: 3,
        img: "https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png"
      }
    ],

    submissions: localStorage.getItem("submissions")
    ? JSON.parse(localStorage.getItem("submissions")) : [],

    loggedUser: localStorage.getItem("loggedUser") ? JSON.parse(localStorage.getItem("loggedUser")) : "",

    scientificAreas:  [
      {
        id: 1,
        name: "Multimédia",
        color: "#FFEC9E",
      },
      {
        id: 2,
        name: "Web",
        color: "#bde6ff",
      },
      {
        id: 3,
        name: "Design",
        color: "#C4FFC8",
      },
    ],

    userTypes:  [
      {
        id: 1,
        type: "Admin"
      },
      {
        id: 2,
        type: "Student"
      },
      {
        id: 3,
        type: "Teacher"
      }
    ],
  },
  getters: {
    
    getLoggedUser: (state) => state.loggedUser,

    isLoggedUser: (state) => (state.loggedUser == "" ? false : true),

    getUsers: (state) => state.users,

    getNextUserId: (state) => {
      return state.users.length > 0 ? state.users[state.users.length - 1].id + 1 : 1;
    },

    getUserById: (state) => (id) => {
      return state.users.find(user => user.id == id);
    },

    getUsersFiltered: (state) => (_sort, _userType, search) => {
      const challenges_filtered = state.users.filter(
        (user) => user.type == _userType || _userType == "all" &&
        user.username.toLowerCase().includes(search.toLowerCase())
      );

      return challenges_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },

    getUserTypesById: (state) => (id) => {
      return state.userTypes.find((userType) => userType.id == id);
    },
    getUserTypes(state) {
      return state.userTypes;
    },

    getUserTypesForSelect: (state) =>
      state.userTypes.map(userType => ({
        value: userType.id,
        text: userType.type,
    })),



    getScientificAreasById: (state) => (id) => {
      return state.scientificAreas.find((scientificArea) => scientificArea.id == id);
    },
    
    getScientificAreas(state) {
      return state.scientificAreas;
    },
    getScientificAreasForSelect: (state) =>
      state.scientificAreas.map(scientificArea => ({
        value: scientificArea.id,
        text: scientificArea.name,
      })),

    getChallenges(state) {
      return state.challenges;
    },

    getChallengesFiltered: (state) => (_sort, _scientific_area, search) => {
      const challenges_filtered = state.challenges.filter(
        (challenge) => challenge.scientific_area == _scientific_area || _scientific_area == "all" &&
        challenge.title.toLowerCase().includes(search.toLowerCase())
      );

      return challenges_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },
    getNextChallengeId: (state) => {
      return state.challenges.length > 0
        ? state.challenges[state.challenges.length - 1].id + 1
        : 1;
    },

    getChallengeById: (state) => (id) => {
      return state.challenges.find(challenge => challenge.id == id);
    },

    getNextSubmissionId: (state) => {
      return state.submissions.length > 0
        ? state.submissions[state.submissions.length - 1].id + 1
        : 1;
    },

    getSubmissions(state) {
      return state.submissions;
    },

  },
  actions: {
    // -------------- AUTENTICAÇÃO --------------
    login(context, payload) {
      // verificar se login é válido
      const user = context.state.users.find(
        (user) =>
          user.username === payload.username && user.password === payload.password
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
      const verifyUsername = context.state.users.find(
        (user) => user.username === payload.username
      );
      const verifyEmail = context.state.users.find(
        (user) => user.email === payload.email
      );

      if (verifyUsername == undefined && verifyEmail == undefined) {
        // login com sucesso
        context.commit("REGISTER", payload);
        localStorage.setItem('users', JSON.stringify(context.state.users))
      } else if(verifyUsername != undefined){
        // login sem sucesso
        throw Error("Username já existente.");
      } else if (verifyEmail != undefined) {

        throw Error("Email já associado a uma conta.");
      }
    },

    insertSubmission(context, submission) {
      context.commit("INSERT_SUBMISSION", submission);
    },


    // -------------- ADMIN -------------- 
    deleteUser(context, user) {
      context.commit("DELETE_USER", user);
    },

    updateUser(context, id){
      context.commit("UPDATE_USER", id);
    },


    updateChallenge(context, id){
      context.commit("UPDATE_CHALLENGE", id);
    },
    deleteChallenge(context, id) {
      context.commit("DELETE_CHALLENGE", id);
    },

    insertChallenge(context, challenge) {
      context.commit("INSERT_CHALLENGE", challenge);
    },

  },
  mutations: {

    // -------------- AUTENTICAÇÃO --------------
    LOGIN(state, user) {
      state.loggedUser = user;
    },
    LOGOUT(state) {
      state.loggedUser = "";
    },
    REGISTER(state, user) {
      state.users.push(user);
    },

    INSERT_SUBMISSION(state, submission){
      state.submissions.push(submission)
      localStorage.setItem("submissions", JSON.stringify(state.submissions));
    },

    // -------------- ADMINISTRADOR --------------
    DELETE_USER(state, id) {
      if (confirm("Deseja mesmo remover?")) {
        state.users = state.users.filter(user => user.id != id);
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    UPDATE_USER(state, newUser) {

      for (const user of state.users) {
        if (user.id == newUser.id) {
                      
          user.username = newUser.username;
          user.email = newUser.email;
          user.password = newUser.password;
          user.type = newUser.type;
        }
      }
      localStorage.setItem("users", JSON.stringify(state.users));
    },


    UPDATE_CHALLENGE(state, newChallenge) {

      for (const challenge of state.challenges) {
        if (challenge.id == newChallenge.id) {
          challenge.title = newChallenge.title;
          challenge.description = newChallenge.description;
          challenge.img = newChallenge.img;
          challenge.scientific_area = newChallenge.scientific_area;
        }
      }
      localStorage.setItem("challenges", JSON.stringify(state.challenges));
    },
    DELETE_CHALLENGE(state, id) {
      if (confirm("Deseja mesmo remover?")) {
        state.challenges = state.challenges.filter(challenge => challenge.id != id);
        localStorage.setItem("challenges", JSON.stringify(state.challenges));
      }
    },
    INSERT_CHALLENGE(state, challenge) {
      state.challenges.push(challenge);
      localStorage.setItem("challenges", JSON.stringify(state.challenges));
    },
  },

});
