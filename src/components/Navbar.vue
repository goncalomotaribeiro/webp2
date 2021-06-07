<template>
  <div id="nav" class="fixed-top">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand
        to="/panel"
        class="offset-lg-1"
        style="background-color: white"
        ><b-img src="../assets/logo_.png" id="smallLogo" alt="logo"></b-img
      ></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        class="offset-1 offset-xl-2 d-xl-flex justify-content-xl-center"
        is-nav
      >
        <!--REGISTER MENU-->
        <b-navbar-nav
          v-if="!this.$store.getters.isLoggedUser"
          class="offset-lg-8"
          id="autentic"
        >
          <b-nav-item to="/login">Entrar</b-nav-item>
          <b-nav-item to="/register">Registar</b-nav-item>
        </b-navbar-nav>

        <!--LOGGEDIN MENU-->
        <b-navbar-nav
          v-if="this.$store.getters.isLoggedUser"
          class="links ml-xl-3"
        >
          <b-nav-item
            to="/panel"
            :class="{ 'router-link-exact-active': subIsActive('/panel') }"
            >PAINEL</b-nav-item
          >
          <b-nav-item
            to="/challenges"
            :class="{ 'router-link-exact-active': subIsActive('/challenges') }"
            >DESAFIOS</b-nav-item
          >
          <b-nav-item
            to="/events"
            :class="{ 'router-link-exact-active': subIsActive('/events') }"
            >EVENTOS</b-nav-item
          >
          <!-- <b-nav-item to="/register">ATIVIDADE</b-nav-item> -->
          <b-nav-item to="/forum">FORUM</b-nav-item>
        </b-navbar-nav>

        <!--SEARCH BAR-->
        <b-navbar-nav
          v-if="this.$store.getters.isLoggedUser"
          class="offset-xl-2 mt-3 mt-lg-0"
        >
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Pesquisa..."
            ></b-form-input>
            <!-- <b-button size="sm" id="search" class="my-2 my-sm-0" type="submit" aria-label="Button search in Navbar"><b-img src="../assets/search.png" class="w-75" id="imgSearch" alt=""></b-img></b-button> -->
          </b-nav-form>

          <!--NOTIFICATIONS MENU-->
          <b-nav-item-dropdown
            class="d-none d-lg-block mt-2 ml-xl-3"
            width="32px"
            height="32px"
            no-caret
          >
            <template slot="button-content"
              ><b-img
                src="../assets/notification.png"
                alt="Notification image"
                width="25px"
                height="25px"
              ></b-img
            ></template>
            <b-dropdown-item href="#">Notificação</b-dropdown-item>
          </b-nav-item-dropdown>

          <!--PROFILE MENU-->
          <b-nav-item-dropdown class="profile d-none d-lg-block w-25" no-caret>
            <template slot="button-content"
              ><b-img
                src="../assets/profile-picture.png"
                alt="Profile image"
                width="60px"
                height="45px"
              ></b-img
            ></template>
            <b-dropdown-item id="btnEditarPerfil" @click="goToEditProfile()"
              >Editar Perfil</b-dropdown-item
            >

            <!--LOGOUT-->
            <b-dropdown-item id="btnSair" @click.native="logout"
              >Sair</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-navbar-nav
            class="d-lg-none"
            v-if="this.$store.getters.isLoggedUser"
          >
          </b-navbar-nav>
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
      //dispatches logout action from store ( removes localstorage data from logged user and commits mutation logout)
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    },
    goToEditProfile() {
      let nav = JSON.parse(localStorage.getItem("nav"));
      if (!nav) {
        localStorage.setItem("nav", JSON.stringify(false));
      }
      this.$router.push({ path: "/panel/edit-profile" });
      this.$router.go()
    },
  },
};
</script>

<style>
.profile:hover .dropdown-menu {
  display: block;
  margin-top: 0;
}

#nav {
  padding: 0;
  background-color: #ffffff;
  color: #000000;
  border-bottom: 1px solid #dedede;
}

#nav .links a {
  font-style: italic;
  font-size: 13px;
  text-decoration: none;
  font-weight: bold;
  font-family: "Consolas";
  color: #000000;
  transition: all 0.3s ease 0s;
  text-align: left;
}

#nav .links .router-link-exact-active {
  background-color: #fff9c5;
}

#nav #autentic a,
#nav a {
  text-decoration: none;
  font-weight: 500;
  font-family: "Segoe UI";
  color: #000000;
  transition: all 0.3s ease 0s;
  text-align: left;
}

#nav #autentic .nav-item {
  background-color: white;
  border-radius: 8px;
}

#nav .nav-link {
  padding: 2px;
  outline: none;
}

#nav #autentic .router-link-exact-active {
  background-color: #f8ecff;
  border-radius: 8px;
}

@media only screen and (min-width: 1000px) {
  #nav #autentic .nav-item {
    margin-left: 20px;
    border: 2px solid black;
  }

  #nav .nav-link {
    padding-inline: 25px;
  }

  #nav #autentic .nav-item:hover {
    box-shadow: #ebceff 4px 4px;
  }
}

#nav #search {
  background-color: white;
  border: 0;
}

#nav #imgSearch {
  width: 17px;
  height: 17px;
}
</style>
