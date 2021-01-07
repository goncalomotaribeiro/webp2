<template>
  <div id="register">
    <b-container class="container-fluid p-5">
      <b-card bg-variant="light">
        <b-img src="../assets/logo_2.png" fluid alt="Responsive image"></b-img>
        <b-form @submit.prevent="onSubmit" id="formRegister">
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

          <b-form-checkbox value="me" required
            >Aceita os nossos termos e condições?</b-form-checkbox
          >

          <br />
          <b-button id="btnRegister" type="submit">Registo</b-button><br />
          <b-button id="btnLogin" type="submit">Entrar</b-button>
        </b-form>
      </b-card>
    </b-container>

    <!-- <form @submit.prevent="register">
          Username: <input type="text" id="txtUsername" v-model='username'><br>
          Password: <input type="password" id="txtPassword" v-model='password'><br>
          Location: <input type="text" id="txtLocation" v-model='location'><br>
          
          <input type="submit" value="REGISTER">
      </form> -->
  </div>
</template>

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
    // register() {
    //   try {
    //     // Chamar a ação login que está na Store
    //     //this.$store.dispatch('login',{username: this.username, password: this.password})
    //     this.$store.dispatch("register", this.$data);
    //     // Saltar para a view Home
    //     this.$router.push({ name: "Login" });
    //   } catch (error) {
    //     alert(error);
    //   }
    // },
  },
};
</script>

<style>

.container-fluid  {
  padding-top: 20px;
  padding-bottom: 20px;
}

button:focus {
  outline: 0;
}

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
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
  font-size: 15px;
  font-family: "Segoe UI";
}

#btnLogin {
  background-color: #ffffff;
  border: 2px solid;
  border-radius: 7px;
  padding-left: 50px;
  padding-right: 50px;
  margin: 6px;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-family: "Segoe UI";
}

</style>