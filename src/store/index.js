import Vue from "vue";
import Vuex from "vuex";

import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { ChallengeService } from '@/services/challenge.service';
import { EventService } from '@/services/event.service';
import { SubmissionService } from '@/services/submission.service';
import { MyEventService } from '@/services/my_event.service';

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
    submissions: [],
    submission: [],
    my_events: [],
    my_event: [],

    myEvents: localStorage.getItem("myEvents")
      ? JSON.parse(localStorage.getItem("myEvents"))
      : [],
  },

  getters: {
    getMessage: (state) => state.message,

    // -------------- AUTHENTICATION AND USERS --------------
    getLoggedUser: state => state.loggedUser,
    getUsers: state => state.users,
    getUser: state => state.user,
    isLoggedUser: state => (state.loggedUser == "" ? false : true),

    getUsersFiltered: state => (_sort, _userType, search) => {
      let users_filtered = state.users

      if(_userType != "all"){
        users_filtered = users_filtered.filter(
          user => (user.user_type.id == _userType)
        );
      }

      if(search){
        users_filtered = users_filtered.filter(
          user => (user.username.toLowerCase().includes(search.toLowerCase()))
        );
      }

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

    getEventsFiltered: state => (_sort, _eventArea, search, _eventState, _eventCategory) => {
      let events_filtered = state.events

      if(_eventArea != "all"){
        events_filtered = events_filtered.filter(
          event => (event.scientific_area.id == _eventArea)
        );
      }

      if(search){
        events_filtered = events_filtered.filter(
          event => (event.title.toLowerCase().includes(search.toLowerCase()))
        );
      }

      if(_eventCategory && _eventCategory != "all"){
        events_filtered = events_filtered.filter(
          event => (event.event_category.id == _eventCategory)
        );
      }

      if(_eventState){
        events_filtered = events_filtered.filter(
          event => (event.state.id == _eventState)
        );
      }

      return events_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },

    // -------------- SUBMISSIONS --------------

    getSubmissions: state => state.submissions,
    getSubmission: state => state.submission,

    getSubmissionsFiltered: state => (_sort, search) => {
      let submissions_filtered = state.submissions

      if(search){
        submissions_filtered = submissions_filtered.filter(
          submission => (submission.id_challenge == search)
        );
      }

      return submissions_filtered.sort((a, b) => {
        if (a.priority > b.priority) return -1 * _sort;
        if (a.priority < b.priority) return 1 * _sort;
        return 0;
      });
    },

    // -------------- MyEVENTS --------------

    getMyEvents: state => state.my_events,
    getMyEvent: state => state.my_event,
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

     // -------------- SUBMISSIONS --------------

     async editSubmission({ commit }, event) {
      try {
        const response = await SubmissionService.fetchUpdateSubmission(event);
        console.log("STORE SUBMISSION UPDATE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE SUBMISSION UPDATE FAILS')
        console.log(error)
        throw error;
      }
    },

    async deleteSubmission({ commit }, id) {
      try {
        const response = await SubmissionService.fetchDeleteSubmission(id);
        console.log("STORE SUBMISSION UPDATE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE SUBMISSION DELETE FAILS')
        console.log(error)
        throw error;
      }
    },

    async getAllSubmissions({ commit }) {
      try {
        const submissions = await SubmissionService.fetchAllSubmissions();
        commit('SET_SUBMISSIONS', submissions.submissions);
        //return Promise.resolve(submissions);
      }
      catch (error) {
        commit('SET_SUBMISSIONS', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
        //return Promise.reject(error);
      }
    },

    async getSubmissionById({ commit }, id) {
      try {
        const submission = await SubmissionService.fetchOneSubmissionByID(id);
        commit('SET_SUBMISSION', submission);
      }
      catch (error) {
        // console.log('STORE listSubmissions: ' + error);
        commit('SET_SUBMISSION', []);
        commit("SET_MESSAGE", error);
        throw error;
      }
    },

    async getSubmissionByIdChallenge({ commit }, {id_challenge, id_user}) {
      try {
        const submission = await SubmissionService.fetchOneSubmissionByIDChallenge(id_challenge, id_user);
        commit('SET_SUBMISSION', submission);
      }
      catch (error) {
        // console.log('STORE listSubmissions: ' + error);
        commit('SET_SUBMISSION', []);
        commit("SET_MESSAGE", error);
        throw error;
      }
    },

    async getSubmissionsByIdUser({ commit }, id) {
      try {
        const submissions = await SubmissionService.fetchSubmissionsByIDUser(id);
        commit('SET_SUBMISSIONS', submissions.submissions);
      }
      catch (error) {
        commit('SET_SUBMISSIONS', []);
        commit("SET_MESSAGE", error);
        throw error;
      }
    },

    async createSubmission({ commit }, submission) {
      try {
        console.log(submission.id_challenge);
        const response = await SubmissionService.fetchCreateSubmission(submission);
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE CREATE EVENT FAILS')
        console.log(error)
        throw error;
      }
    },

    // -------------- MYEVENTS --------------

    async deleteMyEvent({ commit }, id) {
      try {
        const response = await MyEventService.fetchDeleteMyEvent(id);
        console.log("STORE MYEVENT DELETE SUCCES: response is...")
        console.log(response)
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE EVENT DELETE FAILS')
        console.log(error)
        throw error;
      }
    },

    async getAllMyEvents({ commit }) {
      try {
        const my_events = await MyEventService.fetchAllMyEvents();
        commit('SET_MYEVENTS', my_events.my_events);
        //return Promise.resolve(my_events);
      }
      catch (error) {
        commit('SET_MYEVENTS', []);
        commit("SET_MESSAGE", error);
        throw error; // Needed to continue propagating the error
        //return Promise.reject(error);
      }
    },

    async getMyEventByIdEvent({ commit }, {id_event, id_user}) {
      try {
        const my_event = await MyEventService.fetchOneMyEventByIDEvent(id_event, id_user);
        commit('SET_MYEVENT', my_event);
      }
      catch (error) {
        commit('SET_MYEVENT', []);
        commit("SET_MESSAGE", error);
        throw error;
      }
    },

    async getMyEventById({ commit }, id) {
      try {
        const my_event = await MyEventService.fetchOneMyEventByID(id);
        commit('SET_MYEVENT', my_event);
      }
      catch (error) {
        commit('SET_MYEVENT', []);
        commit("SET_MESSAGE", error);
        throw error;
      }
    },

    async createMyEvent({ commit }, my_event) {
      console.log(my_event);
      try {
        const response = await MyEventService.fetchCreateMyEvent(my_event);
        commit('SET_MESSAGE', response.message);
      }
      catch (error) {
        console.log('STORE CREATE MYEVENTS FAILS')
        console.log(error)
        throw error;
      }
    },
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

    // -------------- SUBMISSIONS --------------

    SET_SUBMISSIONS(state, payload) {
      state.submissions = payload
    },

    SET_SUBMISSION(state, payload) {
      state.submission = payload
    },

    // -------------- SUBMISSIONS --------------

    SET_MYEVENTS(state, payload) {
      state.my_events = payload
    },

    SET_MYEVENT(state, payload) {
      state.my_event = payload
    },
  }
});
