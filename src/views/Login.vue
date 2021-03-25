<template>

<div id="login">
    <b-container class="container p-5" id="entrar">
      <b-card id="cardLogin">
        <b-button type="button" class="close" to="/">
          <span aria-hidden="false">&times;</span>
        </b-button>
        <label class="title">Fazer Login.</label>
        <label class="subtitle">Novo utilizador?<router-link to="/register" class="ml-3">Crie uma conta.</router-link></label>

        <b-form @submit.prevent="login" id="formLogin" class="mt-5 mb-5">
            <!--EMAIL-->
           
            <b-form-input id="txtUsername" v-model="form.username" type="text" placeholder="username" required></b-form-input><br/>
            
            <!--PASSWORD-->
            <b-form-input id="txtPassword" v-model="form.password" type="password" placeholder="password" required></b-form-input><br/>
            <label class="errorMsg">{{ErrorMsg}}</label>

            <b-form-checkbox class="form-checkbox" required>
                <label class="form-check-label" for="exampleCheck1">
                Lembrar-me?</label>
            </b-form-checkbox><br/>

            <b-button id="btnRegister"  type="submit">Entrar</b-button><br/>

        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
    name:'Login',
    data() {
      return {
          form: {
              username: "",
              password: "",
          },
          ErrorMsg: ""
      }
    },
    methods: {
      login() {
          try {
            // Chamar a ação login que está na Store
            this.$store.dispatch('login',{username: this.form.username, password: this.form.password})
            //this.$store.dispatch('login',this.$data)
            // Saltar para a view Home

            if(this.$store.getters.getLoggedUser.type == 2){
              this.$router.push({path: "/panel"})
            }else{
              this.$router.push({path: "/admin"})
            }

          } catch (error) {
              this.ErrorMsg = error
          }
      }
    }
}
</script>

<style>

#login{
  margin-top: 150px;
}

#cardLogin {
  background: white;
  border: 2px solid;
  border-radius: 10px;
  box-shadow: #ebceff 10px 10px;
}

@media only screen and (min-width: 1000px) {
  #entrar{
    width: 35%;
  }
}
</style>