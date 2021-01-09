<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#" class="offset-lg-1"><b-img src="../assets/logo.png" fluid alt="Fluid image"></b-img></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" ></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="offset-lg-7 justify-content-center" is-nav>
        <b-navbar-nav  v-if="!this.$store.getters.isLoggedUser">
          <b-nav-item><router-link to="/">Entrar</router-link></b-nav-item>
          <b-nav-item><router-link to="/register" data-target="#register">Registar</router-link></b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="this.$store.getters.isLoggedUser">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown v-if="this.$store.getters.isLoggedUser">
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Editar Perfil</b-dropdown-item>
            <b-dropdown-item @click.native='logout' to="/">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
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
  }

  #nav .nav-link, #button-content {
    margin-left: 20px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid black;
    padding: 2px;
    padding-inline: 25px;
  }

  #nav .nav-link:hover {
    background-color: rgb(255, 230, 255);
  }

  #nav a.router-link-exact-active {
    color: #000000;
  }
</style>
