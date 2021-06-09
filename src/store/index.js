import Vue from "vue";
import Vuex from "vuex";

import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { ChallengeService } from '@/services/challenge.service';
import { EventService } from '@/services/event.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    users: [],
    user: [],
    loggedUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "",
    challenges: [],
    challenge: [],
    events: [],
    event: [],
    // challenges: localStorage.getItem("challenges")
    //   ? JSON.parse(localStorage.getItem("challenges"))
    //   : [
    //     {
    //       id: 1,
    //       title: "Mega Desafio X",
    //       description: "Descrição do Mega Desafio X",
    //       scientific_area: 1,
    //       img: "challenge1.jpg",
    //       state: 1
    //     },
    //     {
    //       id: 2,
    //       title: "Mega Desafio Y",
    //       description:
    //         "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
    //       scientific_area: 2,
    //       img: "challenge2.jpg",
    //       state: 2
    //     },
    //     {
    //       id: 3,
    //       title: "Mega Desafio Z",
    //       description:
    //         "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
    //       scientific_area: 3,
    //       img: "challenge3.jpg",
    //       state: 3
    //     },
    //     {
    //       id: 4,
    //       title: "Mega Desafio A",
    //       description:
    //         "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
    //       scientific_area: 3,
    //       img: "challenge4.jpg",
    //       state: 1
    //     },
    //     {
    //       id: 5,
    //       title: "Mega Desafio B",
    //       description:
    //         "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
    //       scientific_area: 2,
    //       img: "challenge5.jpg",
    //       state: 1
    //     },
    //     {
    //       id: 6,
    //       title: "Mega Desafio C",
    //       description:
    //         "Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque vulputate. Praesent lacinia est felis, ut bibendum est placerat ac. Nam non laoreet augue. Vivamus sagittis metus in feugiat interdum. Duis ac posuere justo, eget congue lorem. Nam fringilla risus scelerisque metus volutpat aliquam. Phasellus orci nulla, tempor in erat vitae, sodales lobortis sem.tur adipiscing elit...",
    //       scientific_area: 2,
    //       img: "challenge6.jpg",
    //       state: 1
    //     }
    //   ],

    submissions: localStorage.getItem("submissions")
      ? JSON.parse(localStorage.getItem("submissions"))
      : [],

    challengeStates: localStorage.getItem("challengeStates")
      ? JSON.parse(localStorage.getItem("challengeStates"))
      : [
        {
          id: 1,
          state: "Aberto"
        },
        {
          id: 2,
          state: "Próximo"
        },
        {
          id: 3,
          state: "Fechado"
        }
      ],

    // events: localStorage.getItem("events")
    //   ? JSON.parse(localStorage.getItem("events"))
    //   : [
    //     {
    //       id: 1,
    //       title: "Plug-in",
    //       description:
    //         "Evento que visa potenciar parcerias de estágios curriculares e desenvolvimento de projetos, integrar os finalistas no mercado de trabalho e apoiar as empresas no processo de seleção de perfis.",
    //       scientific_area: 2,
    //       img: "plugin.webp",
    //       link: "https://eventos.esmad.ipp.pt/plug-in/",
    //       date: "Fev 23 2021 14:00:00",
    //       state: 1
    //     },
    //     {
    //       id: 2,
    //       title: "MAD Game Jam",
    //       description:
    //         "A competição MAD Game Jam, desafia as equipas a criarem, em 48 horas non-stop, videojogos cuja temática só vão conhecer no próprio dia. Ambiente fantástico e ótimos prémios são algumas razões para a comunidade gaming não perder este evento!",
    //       scientific_area: 2,
    //       img: "madgamejam.webp",
    //       link: "https://eventos.esmad.ipp.pt/mad-gamejam/",
    //       date: "Fev 2 2021 15:00:00",
    //       state: 1
    //     },
    //     {
    //       id: 3,
    //       title: "Drive",
    //       description:
    //         "Ciclo de conferências promovido pelo Mestrado em Design, com um foco especial nas temáticas da investigação procurando promover um encontro entre investigadores, profissionais e estudantes interessados na área do Design.",
    //       scientific_area: 3,
    //       img: "drive.webp",
    //       link: "",
    //       date: "Fev 2 2021 15:00:00",
    //       state: 2
    //     }
    //   ],

    topics: localStorage.getItem("topics")
      ? JSON.parse(localStorage.getItem("topics"))
      : [
        {
          id: 1,
          user: "Carlos Pereira",
          title: "Lorem ipsum dolor",
          state: "Aberto",
          content: `Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed lacinia in tortor id interdum. Quisque vitae pharetra dui. Curabitur rutrum pellentesque...`,
          img: "https://eventos.esmad.ipp.pt/images/events/drive.jpg",
          nrComments: "10"
        }
      ],

    myEvents: localStorage.getItem("myEvents")
      ? JSON.parse(localStorage.getItem("myEvents"))
      : [],

    eventStates: localStorage.getItem("eventStates")
      ? JSON.parse(localStorage.getItem("eventStates"))
      : [
        {
          id: 1,
          state: "Próximo"
        },
        {
          id: 2,
          state: "Fechado"
        }
      ],

    scientificAreas: [
      {
        id: 1,
        name: "Multimédia",
        color: "#FFEC9E"
      },
      {
        id: 2,
        name: "Web",
        color: "#bde6ff"
      },
      {
        id: 3,
        name: "Design",
        color: "#C4FFC8"
      }
    ],
  },

  getters: {
    getMessage: (state) => state.message,

    // -------------- AUTHENTICATION AND USERS --------------
    getLoggedUser: state => state.loggedUser,
    getUsers: state => state.users,
    getUser: state => state.user,
    isLoggedUser: state => (state.loggedUser == "" ? false : true),

    getUsersFiltered: state => (_sort, _userType, search) => {
      const users_filtered = state.users.filter(
        user =>
          user.user_type.id == _userType ||
          (_userType == "all" && user.username.toLowerCase().includes(search.toLowerCase()))
      );

      return users_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },

    // -------------- CHALLENGES --------------

    getChallenges: state => state.challenges,
    getChallenge: state => state.challenge,

    getChallengesFiltered: state => (_sort, _challengeArea, search, _challengeState, _challengeCategory) => {
      let challenges_filtered = state.challenges

      if(_challengeArea != "all"){
        challenges_filtered = challenges_filtered.filter(
          challenge => (challenge.scientific_area.id == _challengeArea)
        );
      }

      if(search){
        challenges_filtered = challenges_filtered.filter(
          challenge => (challenge.title.toLowerCase().includes(search.toLowerCase()))
        );
      }

      if(_challengeCategory && _challengeCategory != "all"){
        challenges_filtered = challenges_filtered.filter(
          challenge => (challenge.challenge_category.id == _challengeCategory)
        );
      }

      if(_challengeState){
        challenges_filtered = challenges_filtered.filter(
          challenge => (challenge.state.id == _challengeState)
        );
      }

      return challenges_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },

    // -------------- EVENTS --------------

    getEvents: state => state.events,
    getEvent: state => state.event,

    getEventsFiltered: state => (_sort, _eventArea, search, _eventState) => {
      let events_filtered = state.events.filter(
        event =>
          event.scientific_area.id == _eventArea ||
          (_eventArea == "all" && event.title.toLowerCase().includes(search.toLowerCase()))
      );

      if(_eventState){
        events_filtered = state.events.filter(
          event => (event.state.id == _eventState)
        );
      }

      return events_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },

    // -------------- CHALLENGE STATES --------------

    getChallengeStateById: state => id => {
      return state.challengeStates.find(
        challengeState => challengeState.id == id
      );
    },

    getChallengeStatesForSelect: state =>
      state.challengeStates.map(challengeState => ({
        value: challengeState.id,
        text: challengeState.state
      })),

    // -------------- SCIENTIFIC AREAS --------------

    getScientificAreasById: state => id => {
      return state.scientificAreas.find(
        scientificArea => scientificArea.id == id
      );
    },

    getScientificAreas(state) {
      return state.scientificAreas;
    },
    getScientificAreasForSelect: state =>
      state.scientificAreas.map(scientificArea => ({
        value: scientificArea.id,
        text: scientificArea.name
      })),

    // -------------- SUBMISSIONS --------------

    getNextSubmissionId: state => {
      return state.submissions.length > 0
        ? state.submissions[state.submissions.length - 1].id + 1
        : 1;
    },

    getSubmissions(state) {
      const userSubmissions = state.submissions.filter(
        submission => submission.user == state.loggedUser.id
      );
      return userSubmissions;
    },

    getSubmissionsFiltered: state => (_sort, search) => {
      let submissions_filtered = state.submissions;
      if (search != "") {
        submissions_filtered = state.submissions.filter(
          submission => submission.challenge == search
        );
      }

      return submissions_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },

    getSubmissionById: state => id => {
      return state.submissions.find(submission => submission.id == id);
    },

    // -------------- MyEVENTS --------------

    getMyEventNextId: state => {
      return state.myEvents.length > 0
        ? state.myEvents[state.myEvents.length - 1].id + 1
        : 1;
    },

    getMyEventById: state => id => {
      return state.events.find(event => event.id == id);
    },

    getMyEvents(state) {
      const userEvents = state.myEvents.filter(
        myEvent => myEvent.user == state.loggedUser.id
      );
      return userEvents;
    },

    // -------------- EVENT STATES --------------

    getEventStateById: state => id => {
      return state.eventStates.find(challengeState => challengeState.id == id);
    },

    getEventStatesForSelect: state =>
      state.eventStates.map(eventState => ({
        value: eventState.id,
        text: eventState.state
      }))
  },

  actions: {
    async getAPIRoot({ commit }) {
      const result = await UserService.getPublicContent()
      commit("SET_MESSAGE", result.message);
    },

    // -------------- AUTHENTICATION AND USERS --------------

    async register({ commit }, user) {
      try {
        const response = await AuthService.register(user);
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE REGISTER FAILS')
        console.log(error)
        throw error;
      }
    },

    async login({ commit }, user) {
      try {
        const loggedUser = await AuthService.login(user);
        commit('loginSuccess', loggedUser);
      }
      catch (error) {
        commit('loginFailure');
        throw error;
      }
    },

    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },

    async editProfile({ commit }, user) {
      try {
        const response = await UserService.fetchUpdateUser(user);
        // console.log("STORE USER UPDATE SUCCES: response is...")
        // console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE USER UPDATE FAILS')
        console.log(error)
        throw error;
      }
    },

    async deleteUser({ commit }, id) {
      try {
        const response = await UserService.fetchDeleteUser(id);
        console.log("STORE USER UPDATE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE USER DELETE FAILS')
        console.log(error)
        throw error;
      }
    },

    async getAllUsers({ commit }) {
      try {
        const users = await UserService.fetchAllUsers();
        // console.log(users.users);
        // console.log('STORE listUsers: ' + users.users.length)
        commit('SET_USERS', users.users);
        //return Promise.resolve(users);
      }
      catch (error) {
        // console.log('STORE listUsers: ' + error);
        commit('SET_USERS', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
        //return Promise.reject(error);
      }
    },

    async getUserById({ commit }, id) {
      try {
        const user = await UserService.fetchOneUserByID(id);
        // console.log(user);
        commit('SET_USER', user);
      }
      catch (error) {
        // console.log('STORE listUsers: ' + error);
        commit('SET_USER', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
        //return Promise.reject(error);
      }
    },

    // -------------- CHALLENGES --------------

    async editChallenge({ commit }, challenge) {
      try {
        const response = await ChallengeService.fetchUpdateChallenge(challenge);
        console.log("STORE CHALLENGE UPDATE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE CHALLENGE UPDATE FAILS')
        console.log(error)
        throw error;
      }
    },

    async deleteChallenge({ commit }, id) {
      try {
        const response = await ChallengeService.fetchDeleteChallenge(id);
        console.log("STORE CHALLENGE UPDATE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE CHALLENGE DELETE FAILS')
        console.log(error)
        throw error;
      }
    },

    async getAllChallenges({ commit }) {
      try {
        const challenges = await ChallengeService.fetchAllChallenges();
        // console.log('STORE listUsers: ' + challenges.challenges.length)
        commit('SET_CHALLENGES', challenges.challenges);
        //return Promise.resolve(users);
      }
      catch (error) {
        // console.log('STORE listUsers: ' + error);
        commit('SET_CHALLENGES', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
        //return Promise.reject(error);
      }
    },

    async getChallengeById({ commit }, id) {
      try {
        const challenge = await ChallengeService.fetchOneChallengeByID(id);
        commit('SET_CHALLENGE', challenge);
      }
      catch (error) {
        // console.log('STORE listUsers: ' + error);
        commit('SET_CHALLENGE', []);
        commit("SET_MESSAGE", error);
        throw error;
      }
    },

    async createChallenge({ commit }, challenge) {
      try {
        const response = await ChallengeService.fetchCreateChallenge(challenge);
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE CREATE CHALLENGE FAILS')
        console.log(error)
        throw error;
      }
    },

    // -------------- EVENTS --------------

    async editEvent({ commit }, event) {
      try {
        const response = await EventService.fetchUpdateEvent(event);
        console.log("STORE EVENT UPDATE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE EVENT UPDATE FAILS')
        console.log(error)
        throw error;
      }
    },

    async deleteEvent({ commit }, id) {
      try {
        const response = await EventService.fetchDeleteEvent(id);
        console.log("STORE EVENT UPDATE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE EVENT DELETE FAILS')
        console.log(error)
        throw error;
      }
    },

    async getAllEvents({ commit }) {
      try {
        const events = await EventService.fetchAllEvents();
        commit('SET_EVENTS', events.events);
        //return Promise.resolve(events);
      }
      catch (error) {
        commit('SET_EVENTS', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
        //return Promise.reject(error);
      }
    },

    async getEventById({ commit }, id) {
      try {
        const event = await EventService.fetchOneEventByID(id);
        commit('SET_EVENT', event);
      }
      catch (error) {
        // console.log('STORE listEvents: ' + error);
        commit('SET_EVENT', []);
        commit("SET_MESSAGE", error);
        throw error;
      }
    },

    async createEvent({ commit }, event) {
      try {
        const response = await EventService.fetchCreateEvent(event);
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE CREATE EVENT FAILS')
        console.log(error)
        throw error;
      }
    },

    // -------------- AUTENTICAÇÃO --------------

    insertSubmission(context, submission) {
      context.commit("INSERT_SUBMISSION", submission);
    },

    insertMyEvent(context, myEvent) {
      context.commit("INSERT_MyEvent", myEvent);
    },

    deleteMyEvent(context, myEvent) {
      context.commit("DELETE_MyEvent", myEvent);
    },

    // -------------- ADMIN --------------

    updateUser(context, id) {
      context.commit("UPDATE_USER", id);
    },

    updateChallenge(context, id) {
      context.commit("UPDATE_CHALLENGE", id);
    },

    insertChallenge(context, challenge) {
      context.commit("INSERT_CHALLENGE", challenge);
    },

    updateSubmission(context, id) {
      context.commit("UPDATE_SUBMISSION", id);
    },
    deleteSubmission(context, id) {
      context.commit("DELETE_SUBMISSION", id);
    }
  },


  mutations: {
    SET_MESSAGE(state, payload) {
      state.message = payload
    },

    // -------------- AUTHENTICATION AND USERS --------------

    loginSuccess(state, payload) {
      state.loggedIn = true;
      state.loggedUser = payload;
    },

    loginFailure(state) {
      state.loggedIn = false;
      state.loggedUser = "";
    },

    logout(state) {
      state.loggedIn = false;
      state.loggedUser = "";
    },

    SET_USERS(state, payload) {
      state.users = payload
    },

    SET_USER(state, payload) {
      state.user = payload
    },

    // -------------- CHALLENGES --------------

    SET_CHALLENGES(state, payload) {
      state.challenges = payload
    },

    SET_CHALLENGE(state, payload) {
      state.challenge = payload
    },

    // -------------- EVENTS --------------

    SET_EVENTS(state, payload) {
      state.events = payload
    },

    SET_EVENT(state, payload) {
      state.event = payload
    },

    // -------------- AUTENTICAÇÃO --------------

    INSERT_SUBMISSION(state, submission) {
      state.submissions.push(submission);
      localStorage.setItem("submissions", JSON.stringify(state.submissions));
    },

    INSERT_MyEvent(state, myEvent) {
      state.myEvents.push(myEvent);
      localStorage.setItem("myEvents", JSON.stringify(state.myEvents));
    },

    DELETE_MyEvent(state, id) {
      state.myEvents = state.myEvents.filter(myEvent => myEvent.event != id);
      localStorage.setItem("myEvents", JSON.stringify(state.myEvents));
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
        state.challenges = state.challenges.filter(
          challenge => challenge.id != id
        );
        localStorage.setItem("challenges", JSON.stringify(state.challenges));
      }
    },
    INSERT_CHALLENGE(state, challenge) {
      state.challenges.push(challenge);
      localStorage.setItem("challenges", JSON.stringify(state.challenges));
    },

    DELETE_SUBMISSION(state, id) {
      if (confirm("Deseja mesmo remover?")) {
        state.submissions = state.submissions.filter(
          submission => submission.id != id
        );
        localStorage.setItem("submissions", JSON.stringify(state.submissions));
      }
    },
    UPDATE_SUBMISSION(state, newSubmission) {
      for (const submission of state.submissions) {
        if (submission.id == newSubmission.id) {
          submission.user = newSubmission.user;
          submission.challenge = newSubmission.challenge;
          submission.work = newSubmission.work;
          submission.result = newSubmission.result;
          submission.date = newSubmission.date;
        }
      }

      for (const challenge of state.challenges) {
        if (
          newSubmission.result != "" &&
          newSubmission.challenge == challenge.id
        ) {
          challenge.state = 3;
        }
      }
      localStorage.setItem("submissions", JSON.stringify(state.submissions));
      localStorage.setItem("challenges", JSON.stringify(state.challenges));
    }
  }
});
