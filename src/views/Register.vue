<template>
  <div id="register">
    <b-container class="container p-5" id="registo">
      <b-card id="cardRegister">
        <b-img src="../assets/logo_2.png" fluid alt="Responsive image"></b-img>
        <b-button type="button" class="close">
          <span aria-hidden="false" style="font-family: Segoe UI">&times;</span>
        </b-button>
        <b-form @submit.prevent="onSubmit" id="formRegister" class="mt-5 mb-5">
          <!--EMAIL-->
          <b-form-input
            id="txtEmail"
            v-model="form.email"
            type="email"
            placeholder="email"
            required
          ></b-form-input>
          <br />
          <!--PASSWORD-->
          <b-form-input
            id="txtPassword"
            v-model="form.password"
            type="password"
            placeholder="password"
            required
          ></b-form-input>

          <br />

          <!--PASSWORD-->
          <b-form-input
            id="txtPassword2"
            v-model="form.password2"
            type="password"
            placeholder="password (novamente)"
            required
          ></b-form-input>

          <br />

          <b-form-checkbox class="form-checkbox" required>
            <label
              class="form-check-label"
              for="exampleCheck1"
              style="
                font-family: Segoe UI;
                text-transform: uppercase;
                font-size: 11px;
              "
              >Aceita os nossos termos e condições?</label
            >
          </b-form-checkbox>

          <br />
          <b-button id="btnRegister" type="submit">Registo</b-button><br />
          <b-button id="btnLogin" type="submit">Entrar</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>


   <!-- <form @submit.prevent="register">
          Username: <input type="text" id="txtUsername" v-model='username'><br>
          Password: <input type="password" id="txtPassword" v-model='password'><br>
          Location: <input type="text" id="txtLocation" v-model='location'><br>
          
          <input type="submit" value="REGISTER">
      </form> -->

      
<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password: "",
        password2: "",
      },
    };
  },
  methods: {
    register() {
      try {
        // Chamar a ação login que está na Store
        //this.$store.dispatch('login',{username: this.username, password: this.password})
        this.$store.dispatch("register", this.$data);
        // Saltar para a view Home
        this.$router.push({ name: "Login" });
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin-top: 10px;
  color: #000000;
  text-align: center;
  padding-left: 550%;
}

#cardRegister {
  background: white;
  border: 2px solid;
  border-radius: 7px;
  box-shadow: #ebceff 10px 10px;
}

button:focus {
  outline: 0;
}

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

::placeholder {
  font-family: "Consolas";
}

#btnRegister {
  background-color: #fff2bf;
  border: 2px solid;
  border-radius: 7px;
  padding-left: 50px;
  padding-right: 50px;
  margin: 6px;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  font-family: "Segoe UI";
}

button:hover{
  box-shadow: #ebceff 4px 4px;
}

#btnLogin {
  background-color: #ffffff;
  border: 2px solid;
  border-radius: 7px;
  padding-left: 55px;
  padding-right: 55px;
  margin: 6px;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  font-family: "Segoe UI";
}

@media only screen and (min-width: 1500px) {
    #registo{
      width: 30%;
    }
  }
</style>