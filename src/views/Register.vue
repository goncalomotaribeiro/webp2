<template>
  <div id="register">
    <b-container class="container p-5" id="registo">
      <b-card id="cardRegister">
        <b-button type="button" class="close" to="/">
          <span aria-hidden="false">&times;</span>
        </b-button>

        <label class="title">Criar uma conta.</label>
        <label class="subtitle">Já tens uma conta?
          <router-link to="/login" class="ml-3">Faz Login.</router-link>
        </label>

        <b-form
          @submit.prevent="handleRegister"
          id="formRegister"
          class="mt-5 mb-5"
        >
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

          <!--EMAIL-->
          <label class="lblFields">Email</label>
          <b-form-input
            id="txtEmail"
            v-model="user.email"
            type="email"
            placeholder="email"
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

          <!--PASSWORD2-->
          <label class="lblFields">Palavra-passe (novamente)</label>
          <b-form-input
            id="txtPassword2"
            v-model="password2"
            type="password"
            placeholder="palavra-passe (novamente)"
            required
          ></b-form-input
          ><br />

          <!-- <b-form-checkbox class="form-checkbox" required>
            <label class="form-check-label" for="exampleCheck1">
              Aceita os nossos termos e condições?</label
            > </b-form-checkbox
          ><br /> -->

          <!--MESSAGE-->
          <label
            v-if="message"
            :class="successful ? 'successMsg' : 'errorMsgRegister'"
            >{{ message }}</label
          ><br />

          <b-button id="btnRegister" :disabled="loading" type="submit">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm">
            </span>
            <span>Registar</span>
          </b-button
          ><br />

        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// to make code clear and easy to read, define User model
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export default {
  name: "Register",
  data() {
    return {
      user: new User(null, null, null),
      successful: false,
      message: "",
      loading: false,
      errors: [],
      password2: "",
    };
  },
  computed: {
    ...mapGetters(["getMessage"]),
  },
  methods: {
    //dispatch 'register' Action to Vuex Store
    async handleRegister() {
      this.message = "";
      this.loading = true;
      this.successful = false;
      this.errors = [];

      if (this.user.password == this.password2) {
        try {
          await this.$store.dispatch("register", this.user);
          // console.log("REGISTER OK");
          this.message = this.$store.getters.getMessage;
          this.successful = true;
        } catch (error) {
          // console.log(error);
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        } finally {
          this.loading = false;
          setTimeout( () => this.$router.push({ path: '/login'}), 500);
        }
      } else {
        this.message = "Passwords não coincidem!";
        this.loading = false;
      }
    },
  },
};
</script>

<style>
#register {
  /*background-image: url('../assets/background.jpg');*/
  margin-top: 100px;
}

.errorMsgRegister {
  margin-bottom: 15px;
  color: rgb(255, 100, 100);
  font-family: Consolas;
  font-size: 16px;
}

.successMsg {
  margin-bottom: 15px;
  color: rgb(0, 179, 125);
  font-family: Consolas;
  font-size: 16px;
}

.title {
  margin: 20px 20px 0px 0px;
  display: flex;
  justify-content: start;
  font-weight: 600;
  font-family: Consolas;
  font-size: 23px;
  color: black;
}

.subtitle {
  margin: 10px 20px 0px 0px;
  display: flex;
  justify-content: start;
  font-family: Consolas;
  font-size: 14px;
  color: rgb(100, 100, 100);
}

.form-control {
  font-family: "Consolas";
}

body .close {
  padding: 1px 6px 1px 6px;
  background-color: white;
  border: none;
  border: 1px solid rgb(0, 0, 0);
  outline: none;
  opacity: 1;
}

.form-check-label {
  font-family: Consolas;
  text-transform: uppercase;
  font-size: 13px;
}

body .form-control:focus,
.form-checkbox:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

body .close:focus {
  outline: none;
}

body .close:hover {
  background-color: #ebceff;
  opacity: 1;
}

#cardRegister {
  background: white;
  border: 2px solid;
  border-radius: 10px;
  box-shadow: #ebceff 10px 10px;
}

body .btn:focus {
  box-shadow: none;
}

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#btnRegister {
  font-weight: 500;
  background-color: #fff7d7;
  border: 2px solid;
  border-radius: 7px;
  padding: 7px 43px 7px 43px;
  margin: 6px;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-family: "Segoe UI";
}

#register button:hover {
  box-shadow: #ebceff 4px 4px;
}

@media only screen and (min-width: 1000px) {
  #registo {
    width: 40%;
  }
}
</style>
