<template>
  <div id="nav" class="fixed-top">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#" class="offset-lg-1"><b-img src="../assets/logo.png" fluid alt="Fluid image"></b-img></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" ></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="offset-lg-7" is-nav>
        <b-navbar-nav  v-if="!this.$store.getters.isLoggedUser" class="offset-lg-3" id="autentic">
          <b-nav-item><router-link to="/login">Entrar</router-link></b-nav-item>
          <b-nav-item><router-link to="/register" data-target="#register">Registar</router-link></b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="this.$store.getters.isLoggedUser">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" id="search" class="my-2 my-sm-0" type="submit"><b-img src="../assets/search.png" fluid alt="Fluid image"></b-img></b-button>
          </b-nav-form>

          <b-dropdown size="lg" toggle-class="text-decoration-none bg-white border-0 ml-3" no-caret>
            <template slot="button-content"><b-img src="../assets/notification.png" fluid alt="Fluid image"></b-img></template>
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here...</b-dropdown-item>
          </b-dropdown>

          <b-nav-item-dropdown text="User" class="d-none d-lg-block">
            <template slot="button-content" ><b-img src="../assets/profile-picture.png" fluid alt="Fluid image"></b-img></template>
            <b-dropdown-item href="#">Editar Perfil</b-dropdown-item>
            <b-dropdown-item @click.native='logout' to="/">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="d-lg-none" v-if="this.$store.getters.isLoggedUser">
          <b-nav-item>Editar Perfil</b-nav-item>
          <b-nav-item @click.native='logout' to="/">Sair</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
      logout() {
          this.$store.dispatch('logout')
      }
  }
};
</script>

<style>

  #nav {
    padding: 0;
    background-color: #ffffff;
    color: #000000;
    border-bottom: 1px solid #DEDEDE;
  }

  #nav a {
    text-decoration: none;
    font-weight: 500;
    font-family: 'Segoe UI';
    color: #000000;
    transition: all 0.3s ease 0s;
    text-align: left;
  }

  #nav #autentic .nav-item {
    background-color: white;
    border-radius: 8px;
    
  }

  #nav .nav-link{
    padding: 2px;
    outline:none;
  }

   #nav a.router-link-exact-active {
    color: #000000;
  }

  @media only screen and (min-width: 1000px) {
    #nav #autentic .nav-item{
      margin-left: 20px;
      border: 2px solid black;
    }

    #nav .nav-link{
      padding-inline: 25px;
    }

    #nav #autentic .nav-item:hover {
      box-shadow: #ebceff 4px 4px;
    }
  }

  #search{
    background-color: white;
    border: 0;
  }

  ::placeholder {
    font-family: "Consolas";
  }

  #search:focus{
   box-shadow: none;
  }

  #button-content:focus{
    box-shadow: none;   
  } 
</style>
