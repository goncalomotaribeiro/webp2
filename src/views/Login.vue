<template>
  <div id="login">
    <b-container class="container p-5" id="entrar">
      <b-card id="cardLogin">
        <b-button type="button" class="close" to="/">
          <span aria-hidden="false">&times;</span>
        </b-button>
        <label class="title">Fazer Login.</label>
        <label class="subtitle"
          >Novo utilizador?
          <router-link to="/register" class="ml-3">Cria uma conta.</router-link>
        </label>

        <b-form @submit.prevent="handleLogin" id="formLogin" class="mt-5 mb-5">
          <!--USERNAME-->
          <label class="lblFields">Username</label>
          <b-form-input
            id="txtUsername"
            v-model="user.username"
            type="text"
            placeholder="username"
            required
          ></b-form-input
          ><br />

          <!--PASSWORD-->
          <label class="lblFields">Palavra-passe</label>
          <b-form-input
            id="txtPassword"
            v-model="user.password"
            type="password"
            placeholder="palavra-passe"
            required
          ></b-form-input
          ><br />

          <!-- <b-form-checkbox class="form-checkbox" required>
            <label class="form-check-label" for="exampleCheck1">
              Lembrar-me?</label
            > </b-form-checkbox
          ><br /> -->

          <!--MESSAGE-->
          <label
            v-if="message"
            :class="successful ? 'successMsg' : 'errorMsgRegister'"
            >{{ message }} </label
          ><br />

          <b-button id="btnRegister" :disabled="loading" type="submit">
            <span v-show="loading" class="spinner-border spinner-border-sm">
            </span>
            <span>Entrar</span> </b-button
          ><br />
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

export default {
  name: "Login",
  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      successful: false,
      message: "",
      errors: [],
    };
  },
  computed: {
    //check user logged in status using Vuex Store
    ...mapGetters(["getMessage", "getLoggedUser"]),
  },
  methods: {
    //dispatch 'login' Action to Vuex Store
    async handleLogin() {
      this.loading = true;
      this.successful = false,
      this.errors = [];

      //makes request by dispatching an action
      try {
        await this.$store.dispatch("login", this.user);
        this.successful = true
        this.message = "Login successful!"
        // if successfull login, navigate to pages corresponding to logged user role
        if (this.$store.getters.getLoggedUser.user_type === "ADMIN")
          setTimeout( () => this.$router.push({ path: '/admin'}), 300);
        else 
          setTimeout( () => this.$router.push({ path: '/panel'}), 300);
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>

<style>
#login {
  margin-top: 100px;
}

#cardLogin {
  background: white;
  border: 2px solid;
  border-radius: 10px;
  box-shadow: #ebceff 10px 10px;
}

@media only screen and (min-width: 1000px) {
  #entrar {
    width: 40%;
  }
}
</style>
