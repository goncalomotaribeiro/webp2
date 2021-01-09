<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#"><b-img src="../assets/logo.png" fluid alt="Fluid image"></b-img></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav  v-if="!this.$store.getters.isLoggedUser">
          <b-nav-item><router-link to="/">Entrar</router-link></b-nav-item>
          <b-nav-item><router-link to="/register" data-target="#register">Registar</router-link></b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav  v-else>
          <b-nav-item><router-link @click.native='logout' to="/">Sair</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form v-if="this.$store.getters.isLoggedUser">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right v-if="this.$store.getters.isLoggedUser">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
    display: flex;
    justify-content: space-around;
    padding: 0;
    background-color: #ffffff;
    color: #000000;
    border-bottom: 1px solid #DEDEDE;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
    display: inline;
    transition: all 0.3s ease 0s;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
