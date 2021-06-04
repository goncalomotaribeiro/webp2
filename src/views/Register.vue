<template>
  <div id="register">
    <b-container class="container p-5" id="registo">
      <b-card id="cardRegister">
        <b-button type="button" class="close" to="/">
          <span aria-hidden="false">&times;</span>
        </b-button>

        <label class="title">Criar uma conta.</label>
        <label class="subtitle"
          >Já tem uma conta?<router-link to="/login" class="ml-3"
            >Faça Login.</router-link
          ></label
        >

        <b-form @submit.prevent="register" id="formRegister" class="mt-5 mb-5">
          <!--USERNAME-->
          <b-form-input
            id="txtUsername"
            v-model="form.username"
            type="text"
            placeholder="username"
            required
          ></b-form-input
          ><br />
          <!--EMAIL-->
          <b-form-input
            id="txtEmail"
            v-model="form.email"
            type="email"
            placeholder="email"
            required
          ></b-form-input
          ><br />
          <!--PASSWORD-->
          <b-form-input
            id="txtPassword"
            v-model="form.password"
            type="password"
            placeholder="password"
            required
          ></b-form-input
          ><br />
          <!--PASSWORD2-->
          <b-form-input
            id="txtPassword2"
            v-model="form.password2"
            type="password"
            placeholder="password (novamente)"
            required
          ></b-form-input
          ><br />
          <label class="errorMsg">{{ ErrorMsg }}</label>

          <b-form-checkbox class="form-checkbox" required>
            <label class="form-check-label" for="exampleCheck1">
              Aceita os nossos termos e condições?</label
            > </b-form-checkbox
          ><br />

          <b-button id="btnRegister" type="submit">Registar</b-button><br />
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      id: this.$store.getters.getNextUserId,
      form: {
        username: "",
        email: "",
        password: ""
      },
      type: 2,
      ErrorMsg: ""
    };
  },
  methods: {
    register() {
      try {
        if (this.form.password == this.form.password2) {
          // Chamar a ação register que está na Store
          this.$store.dispatch("register", {
            id: this.id,
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            name: "",
            biography: "",
            location: "",
            url: "",
            profile_picture: "",
            type: this.type
          });

          // Saltar para a view Home
          this.$router.push({ name: "Login" });
        } else {
          throw Error("Passwords não coincidem.");
        }
      } catch (error) {
        this.ErrorMsg = error;
      }
    }
  }
};
</script>

<style>
#register {
  /*background-image: url('../assets/background.jpg');*/
  margin-top: 150px;
}

.errorMsg {
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  justify-content: start;
  color: rgb(255, 100, 100);
  font-family: Consolas;
  font-size: 14px;
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
    width: 45%;
  }
}
</style>
